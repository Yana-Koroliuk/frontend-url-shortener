import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Layout from "../components/Layout";
import InputField from "../components/InputField";
import auth, {handleLogout, isAuthenticated} from "../api/auth";
import Paths from "../config/paths";

const urlPattern = /^(https?:\/\/)/;

const CreateUrlPage = () => {
    const navigate = useNavigate();
    const [longUrl, setLongUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const validateUrl = (url) => {
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
            const response = await auth.post("/me/urls", { url: longUrl });
            setShortUrl(`${process.env.REACT_APP_BACKEND_URL}/${response.data.short}`);
            setSuccessMessage("Short URL created successfully!");
        } catch (error) {
            if (error.response?.status === 422) {
                setErrorMessage("Validation error. Please ensure the URL is valid.");
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <Layout isAuthenticated={isAuthenticated()} onLogout={() => handleLogout(navigate)}>
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
                        onClick={() => navigate(Paths.URLS)}
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
