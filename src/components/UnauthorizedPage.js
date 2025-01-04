import React from "react";

const UnauthorizedPage = () => (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-red-100 to-red-300 text-gray-800">
        <h1 className="text-6xl font-extrabold mb-4 text-red-600">401</h1>
        <h2 className="text-2xl font-semibold mb-2">Unauthorized</h2>
        <p className="mb-6 text-lg">
            You are not authorized to view this page. Please login to continue.
        </p>
        <button
            onClick={() => (window.location.href = "/login")}
            className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow hover:bg-blue-600 transition"
        >
            Go to Login
        </button>
    </div>
);

export default UnauthorizedPage;
