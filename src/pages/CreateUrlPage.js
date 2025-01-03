import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import InputField from "../components/InputField";
import axios from "axios";

const CreateUrlPage = () => {
    const navigate = useNavigate();
    const [longUrl, setLongUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const validateUrl = (url) => {
        const urlPattern = /^(https?:\/\/)/;
        return urlPattern.test(url);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");
        setShortUrl("");

        if (!validateUrl(longUrl)) {
            setErrorMessage("Invalid URL format. Please ensure it starts with http:// or https://");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            const response = await axios.post(
                "http://localhost:8000/api/me/urls",
                { url: longUrl },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setShortUrl(`http://localhost:8000/${response.data.short}`);
            setSuccessMessage("Short URL created successfully!");
        } catch (error) {
            if (error.response?.status === 422) {
                setErrorMessage("Validation error. Please ensure the URL is valid.");
            } else if (error.response?.status === 401) {
                navigate("/login");
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <Layout>
            <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
                <h1 className="text-2xl font-bold mb-4 text-center">Create New Short URL</h1>
                {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                {successMessage && (
                    <div className="mb-4 text-center">
                        <p className="text-green-500 mb-2">{successMessage}</p>
                        <p>
                            Short URL:{" "}
                            <a
                                href={shortUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                {shortUrl}
                            </a>
                        </p>
                        <button
                            onClick={() => navigator.clipboard.writeText(shortUrl)}
                            className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600"
                        >
                            Copy to Clipboard
                        </button>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Long URL"
                        name="longUrl"
                        type="text"
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                        placeholder="Enter the long URL"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Shorten
                    </button>
                </form>
                <div className="flex space-x-4 mt-4">
                    <button
                        onClick={() => navigate("/")}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Back to Home
                    </button>
                    <button
                        onClick={() => navigate("/urls")}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Back to All URLs
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default CreateUrlPage;
