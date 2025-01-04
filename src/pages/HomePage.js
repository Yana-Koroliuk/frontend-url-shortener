import {useNavigate} from "react-router-dom";
import Layout from "../components/Layout";
import {handleLogout, isAuthenticated} from "../api/auth";
import userService from "../api/userService";

const HomePage = () => {
    const navigate = useNavigate();
    const userInfo = userService.getUserInfo();

    return (
        <Layout isAuthenticated={isAuthenticated()} onLogout={() => handleLogout(navigate)}>
            <div className="flex flex-col items-center justify-center text-center">
                {isAuthenticated() ? (
                    <h1 className="text-4xl font-bold text-blue-700 mb-4">
                        Hello, {userInfo.fullName || userInfo.username}!
                    </h1>
                ) : (
                    <h1 className="text-4xl font-bold text-blue-700 mb-4">
                        You aren't authenticated.
                    </h1>
                )}
                <p className="text-lg text-gray-600">
                    Welcome to Link Shortener! Easily create, manage, and share shortened URLs.
                </p>
            </div>
        </Layout>
    );
};

export default HomePage;
