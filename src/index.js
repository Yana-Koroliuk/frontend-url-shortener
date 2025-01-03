import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import ErrorBoundary from "./app/ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </StrictMode>
);
