import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authInterceptors from '../api/auth-interceptors';

function DashboardPage() {
    const [urls, setUrls] = useState([]);
    const [newUrl, setNewUrl] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchUrls(1);
    }, []);

    const fetchUrls = async (page) => {
        try {
            const response = await authInterceptors.get(`/me/urls?page=${page}`);
            setUrls(response.data);
        } catch (error) {
            setErrorMsg('Error loading URLs. Perhaps you are not logged in?');
        }
    };

    const handleCreateShortUrl = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        try {
            await authInterceptors.post('/me/urls', { url: newUrl });
            setNewUrl('');
            fetchUrls(1);
        } catch (error) {
            setErrorMsg('Error creating short URL. Check if logged in or URL is valid.');
        }
    };

    const handleViewRedirects = (shortValue) => {
        navigate(`/redirects/${shortValue}`);
    };

    return (
        <div style={styles.container}>
            {/* Top bar with page title and "User Info" link in top-right corner */}
            <div style={styles.topBar}>
                <h2>My Short URLs</h2>
                <Link to="/me" style={styles.userInfoLink}>User Info</Link>
            </div>

            <form onSubmit={handleCreateShortUrl} style={styles.form}>
                <input
                    type="url"
                    required
                    placeholder="Enter long URL..."
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                />
                <button type="submit">Create Short URL</button>
            </form>

            {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

            <table style={styles.table}>
                <thead>
                <tr>
                    <th>Original URL</th>
                    <th>Short</th>
                    <th>Redirects</th>
                    <th>Created At</th>
                </tr>
                </thead>
                <tbody>
                {urls.map((item) => (
                    <tr key={item.short}>
                        <td>
                            <a href={item.url} target="_blank" rel="noreferrer">
                                {item.url}
                            </a>
                        </td>
                        <td>{item.short}</td>
                        <td>
                            <button
                                style={styles.redirectBtn}
                                onClick={() => handleViewRedirects(item.short)}
                            >
                                {item.redirects}
                            </button>
                        </td>
                        <td>{new Date(item.created_at).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default DashboardPage;

const styles = {
    container: {
        maxWidth: '800px',
        margin: '50px auto',
    },
    topBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
    },
    userInfoLink: {
        color: 'blue',
        textDecoration: 'underline',
        fontSize: '1rem',
    },
    form: {
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1rem',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    redirectBtn: {
        background: 'none',
        border: 'none',
        color: 'blue',
        cursor: 'pointer',
        textDecoration: 'underline',
        fontSize: '1rem',
    },
};
