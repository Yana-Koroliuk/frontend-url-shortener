import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import Paths from "../config/paths";

const auth = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
});

auth.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");

            const excludedEndpoints = [Paths.LOGIN];
            const requestUrl = error.config.url;
            if (!excludedEndpoints.some(endpoint => requestUrl.includes(endpoint))) {
                window.location.href = Paths.UNAUTHORIZED;
            }
        }
        return Promise.reject(error);
    }
);

const isTokenValid = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp > currentTime;
    } catch (error) {
        return false;
    }
};

export const isAuthenticated = () => {
    return isTokenValid();
};

export const handleLogout = () => (navigate) => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("full_name");

    navigate(Paths.LOGIN);
};

export default auth;
