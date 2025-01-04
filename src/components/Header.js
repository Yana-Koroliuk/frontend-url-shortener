import React from "react";
import { Link } from "react-router-dom";
import Paths from "../config/paths";

const Header = ({ isAuthenticated, onLogout }) => (
    <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md">
        <nav className="container mx-auto flex justify-between items-center p-4">
            <Link to="/" className="text-2xl font-bold tracking-wide hover:opacity-80">
                Link Shortener
            </Link>
            <div className="space-x-4">
                {!isAuthenticated ? (
                    <>
                        <Link
                            to={Paths.REGISTER}
                            className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
                        >
                            Sign Up
                        </Link>
                        <Link
                            to={Paths.LOGIN}
                            className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
                        >
                            Login
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            to={Paths.URLS}
                            className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
                        >
                            Your Links
                        </Link>
                        <button
                            onClick={onLogout}
                            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300"
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
