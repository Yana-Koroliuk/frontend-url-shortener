import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Layout from "../components/Layout";
import Table from "../components/Table";
import auth, {handleLogout, isAuthenticated} from "../api/auth";
import Paths from "../config/paths";


const urlsPerPage = 10;
const columns = ["#", "Full URL", "Short URL", "Redirects", "Created At", "Actions"];

const UrlsPage = () => {
    const navigate = useNavigate();
    const [urls, setUrls] = useState([]);
    const [totalUrls, setTotalUrls] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchTotalUrls = async () => {
        try {
            const response = await auth.get(`/me`);
            setTotalUrls(response.data.links);
        } catch (err) {
            setError("Failed to fetch total URLs. Please try again.");
        }
    };

    const fetchUrls = async (page) => {
        setLoading(true);
        setError("");
        try {
            const response = await auth.get(`/me/urls`, {
                params: {page},
            });

            setUrls(
                response.data.map((url, idx) => ({
                    "#": (page - 1) * urlsPerPage + idx + 1,
                    "Full URL": (
                        <a
                            href={url.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            {url.url}
                        </a>
                    ),
                    "Short URL": (
                        <a
                            href={`${process.env.REACT_APP_BACKEND_URL}/${url.short}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            {url.short}
                        </a>
                    ),
                    Redirects: url.redirects,
                    "Created At": new Date(url.created_at).toLocaleString(),
                    Actions: (
                        <button
                            onClick={() => navigate(Paths.URL_DETAILS(url.short), {state: {url}})}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Details
                        </button>
                    ),
                }))
            );
        } catch (err) {
            setError("Failed to fetch URLs. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTotalUrls();
        fetchUrls(currentPage);
    }, [currentPage]);

    const handlePageChange = (direction) => {
        setCurrentPage((prevPage) => prevPage + direction);
    };

    return (
        <Layout isAuthenticated={isAuthenticated()} onLogout={() => handleLogout(navigate)}>
            <div className="max-w-4xl mx-auto mt-8 p-4">
                <h1 className="text-2xl font-bold mb-4">Your Shortened URLs</h1>
                <div className="flex justify-between items-center mb-4">
                    <p className="text-lg font-medium text-gray-700">
                        Total URLs: <span className="text-blue-600 font-bold">{totalUrls}</span>
                    </p>
                    <button
                        onClick={() => navigate(Paths.CREATE)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Create New Short URL
                    </button>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <>
                        <Table columns={columns} data={urls}/>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => handlePageChange(-1)}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded ${
                                    currentPage === 1
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        : "bg-gray-500 text-white hover:bg-gray-600"
                                }`}
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => handlePageChange(1)}
                                disabled={currentPage * urlsPerPage >= totalUrls}
                                className={`px-4 py-2 rounded ${
                                    currentPage * urlsPerPage >= totalUrls
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        : "bg-gray-500 text-white hover:bg-gray-600"
                                }`}
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
