import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setSuccessMsg('');

        try {
            await axiosInstance.post('/register', {
                username,
                password,
                full_name: fullName || null,
            });

            setSuccessMsg('Registration successful!');
            setTimeout(() => navigate('/login'), 2000);

        } catch (error) {
            if (error.response) {
                setErrorMsg(error.response.data.detail || 'Registration failed.');
            } else {
                setErrorMsg('Network error.');
            }
        }
    };

    return (
        <div style={styles.container}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label>Username:</label>
                <input
                    type="text"
                    required
                    minLength={3}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label>Password:</label>
                <input
                    type="password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label>Full Name (optional):</label>
                <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />

                <button type="submit">Register</button>
            </form>
            {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
            {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
        </div>
    );
}

export default RegisterPage;

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
