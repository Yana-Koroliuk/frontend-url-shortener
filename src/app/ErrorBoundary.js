import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorMessage: "" };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render shows the fallback UI.
        return { hasError: true, errorMessage: error.message };
    }

    componentDidCatch(error, errorInfo) {
        // Log error details for debugging.
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Fallback UI
            return (
                <div className="text-center p-4">
                    <h1 className="text-2xl font-bold">Something went wrong</h1>
                    <p>{this.state.errorMessage}</p>
                    <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                        Reload Page
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
