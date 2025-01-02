import React, { useEffect, useState } from 'react';
import authInterceptors from '../api/auth-interceptors';

function UserDetailsPage() {
    const [user, setUser] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await authInterceptors.get('/me');
            setUser(response.data);
        } catch (error) {
            setErrorMsg('Could not load user info. Are you logged in?');
        }
    };

    if (errorMsg) {
        return <p style={{ color: 'red' }}>{errorMsg}</p>;
    }
    if (!user) {
        return <p>Loading user info...</p>;
    }

    return (
        <div style={styles.container}>
            <h2>User Details</h2>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Full Name:</strong> {user.full_name || 'Not provided'}</p>
            <p><strong>Total Links:</strong> {user.links}</p>
        </div>
    );
}

export default UserDetailsPage;

const styles = {
    container: {
        maxWidth: '400px',
        margin: '50px auto',
    },
};
