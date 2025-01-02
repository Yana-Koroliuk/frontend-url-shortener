import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        try {
            const response = await axiosInstance.post('/login', formData);
            localStorage.setItem('token', response.data.access_token);

            navigate('/dashboard');
        } catch (error) {
            if (error.response) {
                setErrorMsg('Invalid username or password.');
            } else {
                setErrorMsg('Network error.');
            }
        }
    };

    return (
        <div style={styles.container}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label>Username:</label>
                <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label>Password:</label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
            </form>
            {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
        </div>
    );
}

export default LoginPage;

const styles = {
    container: {
        maxWidth: '400px',
        margin: '50px auto',
        backgroundColor: '#f9f9f9',
        padding: '1.5rem',
        borderRadius: '6px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '.75rem',
    },
};
