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
            </div>
        </Layout>
    );
};

export default HomePage;
