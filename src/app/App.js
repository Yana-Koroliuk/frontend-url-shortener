import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import UrlsPage from "../pages/UrlsPage";
import UrlDetailsPage from "../pages/UrlDetailsPage";
import CreateUrlPage from "../pages/CreateUrlPage";
import NotFoundPage from "../components/NotFoundPage";
import UnauthorizedPage from "../components/UnauthorizedPage";
import Paths from "../config/paths";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path={Paths.HOME} element={<HomePage />} />
                <Route path={Paths.LOGIN} element={<LoginPage />} />
                <Route path={Paths.REGISTER} element={<RegisterPage />} />
                <Route path={Paths.URLS} element={<UrlsPage />} />
                <Route path={Paths.URL_DETAILS()} element={<UrlDetailsPage />} />
                <Route path={Paths.CREATE} element={<CreateUrlPage />} />
                <Route path={Paths.UNAUTHORIZED} element={<UnauthorizedPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

export default App;
