import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";
import {Line} from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import {useLocation} from "react-router";
import {handleLogout, isAuthenticated} from "../api/auth";
import Paths from "../config/paths";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const UrlDetailsPage = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const location = useLocation();
    const [urlInfo, setUrlInfo] = useState(location.state?.url || null);
    const [redirects, setRedirects] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(!urlInfo);

    const fetchRedirects = async () => {
        try {
            const token = localStorage.getItem("token");

            const redirectsResponse = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/api/me/links/${id}/redirects`,
                {headers: {Authorization: `Bearer ${token}`}}
            );

            setRedirects(redirectsResponse.data);
        } catch (err) {
            if (err.response?.status === 401) {
                navigate(Paths.LOGIN);
            } else {
                setError("Failed to fetch redirects. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!urlInfo) {
            navigate(Paths.URLS);
        } else {
            fetchRedirects();
        }
    }, [id, urlInfo]);

    const processRedirects = (timestamps, groupBy) => {
        const counts = {};
        timestamps.forEach((timestamp) => {
            const date = new Date(timestamp);
            let key;
            if (groupBy === "minutes") {
                key = `${String(date.getHours()).padStart(2, "0")}:${String(
                    date.getMinutes()
                ).padStart(2, "0")}`;
            } else if (groupBy === "hours") {
                key = `${String(date.getHours()).padStart(2, "0")}:00`;
            } else {
                key = date.toDateString();
            }
            counts[key] = (counts[key] || 0) + 1;
        });
        return Object.entries(counts).sort(([a], [b]) => new Date(a) - new Date(b));
    };

    const plotOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                min: 0,
                ticks: {
                    stepSize: 1,
                },
            },
        },
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
        <Layout isAuthenticated={isAuthenticated} onLogout={handleLogout(navigate)}>
            <div className="max-w-4xl mx-auto mt-8 p-4">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <>
                        <h1 className="text-4xl font-bold text-blue-600 mb-4">URL Details</h1>
                        <div className="bg-white shadow rounded-lg p-6 mb-6">
                            <p className="mb-2">
                                <span className="font-semibold">Full URL:</span>{" "}
                                <a
                                    href={urlInfo.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    {urlInfo.url}
                                </a>
                            </p>
                            <p className="mb-2">
                                <span className="font-semibold">Short URL:</span>{" "}
                                <a
                                    href={`${process.env.REACT_APP_BACKEND_URL}/${urlInfo.short}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    {urlInfo.short}
                                </a>
                            </p>
                            <p className="mb-2">
                                <span
                                    className="font-semibold">Created At:</span> {new Date(urlInfo.created_at).toLocaleString()}
                            </p>
                            <p>
                                <span className="font-semibold">Redirects Count:</span> {urlInfo.redirects}
                            </p>
                        </div>
                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-2xl font-bold mb-4">Redirect Metrics</h2>
                            <div className="mt-4" style={{height: "300px", width: "100%"}}>
                                <Line data={plotData("minutes")} options={plotOptions}/>
                            </div>
                            <div className="mt-8" style={{height: "300px", width: "100%"}}>
                                <Line data={plotData("hours")} options={plotOptions}/>
                            </div>
                            <div className="mt-8" style={{height: "300px", width: "100%"}}>
                                <Line data={plotData("days")} options={plotOptions}/>
                            </div>
                        </div>
                        <div className="flex space-x-4 mt-6">
                            <button
                                onClick={() => navigate(Paths.URLS)}
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
