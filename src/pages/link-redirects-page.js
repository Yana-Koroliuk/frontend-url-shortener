import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import authInterceptors from '../api/auth-interceptors';

function LinkRedirectsPage() {
    const { short } = useParams();
    const [timestamps, setTimestamps] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRedirects = async () => {
            try {
                const response = await authInterceptors.get(`/me/links/${short}/redirects`);
                setTimestamps(response.data);
            } catch (error) {
                setErrorMsg('Error fetching timestamps. Possibly not authorized or link not found.');
            } finally {
                setLoading(false);
            }
        };
        fetchRedirects();
    }, [short]);

    if (loading) {
        return <p>Loading timestamps...</p>;
    }

    if (errorMsg) {
        return <p style={{ color: 'red' }}>{errorMsg}</p>;
    }

    if (!timestamps.length) {
        return (
            <div style={styles.container}>
                <h2>Redirect Timestamps for {short}</h2>
                <p>No redirects yet.</p>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <h2>Redirect Timestamps for {short}</h2>
            <ul>
                {timestamps.map((ts) => (
                    <li key={ts}>{new Date(ts).toLocaleString()}</li>
                ))}
            </ul>
        </div>
    );
}

export default LinkRedirectsPage;

const styles = {
    container: {
        maxWidth: '600px',
        margin: '50px auto',
    },
};
