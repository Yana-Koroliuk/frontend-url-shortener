import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home-page';
import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page';
import DashboardPage from './pages/dashboard-page';
import UserDetailsPage from './pages/user-details-page';
import LinkRedirectsPage from './pages/link-redirects-page';
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
