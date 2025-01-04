import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import UrlsPage from "../pages/UrlsPage";
import UrlDetailsPage from "../pages/UrlDetailsPage";
import CreateUrlPage from "../pages/CreateUrlPage";
import NotFoundPage from "../components/NotFoundPage";
import UnauthorizedPage from "../components/UnauthorizedPage";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/urls" element={<UrlsPage />} />
                <Route path="/urls/:id" element={<UrlDetailsPage />} />
                <Route path="/create" element={<CreateUrlPage />} />
                <Route path="/unauthorized" element={<UnauthorizedPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

export default App;
