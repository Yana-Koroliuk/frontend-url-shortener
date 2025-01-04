import React from "react";

const NotFoundPage = () => (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-100 to-gray-300 text-gray-800">
        <h1 className="text-6xl font-extrabold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="mb-6 text-lg">
            The page you are looking for does not exist. You may have mistyped the address or the page may have moved.
        </p>
        <button
            onClick={() => (window.location.href = "/")}
            className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow hover:bg-blue-600 transition"
        >
            Go to Home
        </button>
    </div>
);

export default NotFoundPage;
