import React from "react";
import { Link } from "react-router-dom";

const Header = ({ isAuthenticated, onLogout }) => (
    <header className="bg-blue-600 text-white p-4">
        <nav className="flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">
                Link Shortener
            </Link>
            <div className="space-x-4">
                {!isAuthenticated ? (
                    <>
                        <Link to="/register" className="px-4 py-2 bg-white text-blue-600 rounded">
                            Sign Up
                        </Link>
                        <Link to="/login" className="px-4 py-2 bg-white text-blue-600 rounded">
                            Login
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/urls" className="px-4 py-2 bg-white text-blue-600 rounded">
                            Your Links
                        </Link>
                        <button
                            onClick={onLogout}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    </header>
);

export default Header;
