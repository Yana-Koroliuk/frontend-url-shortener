import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const UrlDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [urlInfo, setUrlInfo] = useState(null);
    const [redirects, setRedirects] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchUrlDetails = async () => {
        setLoading(true);
        setError("");
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            const urlResponse = await axios.get(`http://localhost:8000/api/me/urls`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { short: id },
            });

            const redirectsResponse = await axios.get(
                `http://localhost:8000/api/me/links/${id}/redirects`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setUrlInfo(urlResponse.data);
            setRedirects(redirectsResponse.data);
        } catch (err) {
            if (err.response?.status === 401) {
                navigate("/login");
            } else if (err.response?.status === 404) {
                setError("URL not found.");
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUrlDetails();
    }, [id]);

    const processRedirects = (timestamps, groupBy) => {
        const counts = {};
        timestamps.forEach((timestamp) => {
            const date = new Date(timestamp);
            let key;
            if (groupBy === "minutes") {
                key = `${date.getHours()}:${date.getMinutes()}`;
            } else if (groupBy === "hours") {
                key = `${date.getHours()}:00`;
            } else {
                key = date.toDateString();
            }
            counts[key] = (counts[key] || 0) + 1;
        });
        return Object.entries(counts).sort(([a], [b]) => new Date(a) - new Date(b));
    };

    const plotData = (groupBy) => {
        const groupedRedirects = processRedirects(redirects, groupBy);
        return {
            labels: groupedRedirects.map(([key]) => key),
            datasets: [
                {
                    label: `Redirects per ${groupBy}`,
                    data: groupedRedirects.map(([, count]) => count),
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    fill: true,
                    tension: 0.4,
                },
            ],
        };
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto mt-8 p-4">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <>
                        <h1 className="text-2xl font-bold mb-4">URL Details</h1>
                        <div className="mb-4">
                            <p>
                                <strong>Full URL:</strong> {urlInfo.url}
                            </p>
                            <p>
                                <strong>Short URL:</strong>{" "}
                                <a
                                    href={`http://localhost:8000/${urlInfo.short}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    {urlInfo.short}
                                </a>
                            </p>
                            <p>
                                <strong>Created At:</strong> {new Date(urlInfo.created_at).toLocaleString()}
                            </p>
                            <p>
                                <strong>Redirects Count:</strong> {urlInfo.redirects}
                            </p>
                        </div>
                        <div className="mb-8">
                            <h2 className="text-xl font-bold">Redirect Metrics</h2>
                            <div className="mt-4">
                                <Line data={plotData("minutes")} />
                            </div>
                            <div className="mt-4">
                                <Line data={plotData("hours")} />
                            </div>
                            <div className="mt-4">
                                <Line data={plotData("days")} />
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => navigate("/urls")}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Back to All URLs
                            </button>
                            <button
                                onClick={() => navigate("/")}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Back to Home
                            </button>
                        </div>
                    </>
                )}
            </div>
        </Layout>
    );
};

export default UrlDetailsPage;
