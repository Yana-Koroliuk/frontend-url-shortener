const UnauthorizedPage = () => (
    <div className="text-center p-4">
        <h1 className="text-2xl font-bold">401 - Unauthorized</h1>
        <p>You are not authorized to view this page. Please login.</p>
        <button
            onClick={() => (window.location.href = "/login")}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
            Go to Login
        </button>
    </div>
);

export default UnauthorizedPage;
