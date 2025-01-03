const NotFoundPage = () => (
    <div className="text-center p-4">
        <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <button
            onClick={() => (window.location.href = "/")}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
            Go to Home
        </button>
    </div>
);

export default NotFoundPage;
