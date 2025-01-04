import axios from 'axios';
import {jwtDecode} from "jwt-decode";

const auth = axios.create({
    baseURL: `http://localhost:8000/api`,
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
            // Clear token and redirect to login
            localStorage.removeItem("token");
            window.location.href = "/unauthorized";
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


export default auth;

export const isAuthenticated = () => {
    return isTokenValid();
};

// src/services/authService.js
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("full_name");
};