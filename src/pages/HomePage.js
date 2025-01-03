import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import {logout} from "../api/auth";

const HomePage = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const fullName = localStorage.getItem("full_name");

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <Layout isAuthenticated={isAuthenticated} onLogout={handleLogout}>
            <div className="text-center p-4">
                {isAuthenticated ? (
                    <h1 className="text-2xl font-bold">Hello, {fullName || username}</h1>
                ) : (
                    <h1 className="text-2xl font-bold">You aren't authenticated</h1>
                )}
                <div className="mt-4 space-x-4">
                    {!isAuthenticated && (
                        <>
                            <button
                                onClick={() => navigate("/register")}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Sign Up
                            </button>
                            <button
                                onClick={() => navigate("/login")}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Login
                            </button>
                        </>
                    )}
                    {isAuthenticated && (
                        <>
                            <button
                                onClick={() => navigate("/urls")}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Your Links
                            </button>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
