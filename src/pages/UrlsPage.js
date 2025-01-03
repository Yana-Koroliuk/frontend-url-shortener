import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Table from "../components/Table";
import axios from "axios";

const UrlsPage = () => {
    const navigate = useNavigate();
    const [urls, setUrls] = useState([]);
    const [totalUrls, setTotalUrls] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const columns = ["full_url", "short_url", "redirects", "created_at", "actions"];

    const fetchUrls = async (page) => {
        setLoading(true);
        setError("");
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            const response = await axios.get(`http://localhost:8000/api/me/urls`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { page },
            });

            setUrls(
                response.data.map((url) => ({
                    full_url: url.url,
                    short_url: (
                        <a
                            href={`http://localhost:8000/${url.short}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            {url.short}
                        </a>
                    ),
                    redirects: url.redirects,
                    created_at: new Date(url.created_at).toLocaleString(),
                    actions: (
                        <button
                            onClick={() => navigate(`/urls/${url.short}`)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Details
                        </button>
                    ),
                }))
            );
            setTotalUrls(response.data.length); // Update total if backend provides count
        } catch (err) {
            if (err.response?.status === 401) {
                navigate("/login");
            } else {
                setError("Failed to fetch URLs. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUrls(currentPage);
    }, [currentPage]);

    const handlePageChange = (direction) => {
        setCurrentPage((prevPage) => prevPage + direction);
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto mt-8 p-4">
                <h1 className="text-2xl font-bold mb-4">Your Shortened URLs</h1>
                <div className="mb-4">
                    <p>Total URLs: {totalUrls}</p>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <>
                        <Table columns={columns} data={urls} />
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => handlePageChange(-1)}
                                disabled={currentPage === 1}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:bg-gray-300"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => handlePageChange(1)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </Layout>
    );
};

export default UrlsPage;
