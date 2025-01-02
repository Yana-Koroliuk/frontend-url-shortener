import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import UserDetailsPage from './pages/UserDetailsPage';
import LinkRedirectsPage from './pages/LinkRedirectsPage';
import './App.css';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/me" element={<UserDetailsPage />} />
                <Route path="/redirects/:short" element={<LinkRedirectsPage />} />
            </Routes>
        </div>
    );
}

export default App;
