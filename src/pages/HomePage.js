import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div style={styles.container}>
            <h1>Welcome to URL Shortener</h1>
            <div style={styles.buttons}>
                <Link to="/login" style={styles.link}>Log In</Link>
                <Link to="/register" style={styles.link}>Register</Link>
            </div>
        </div>
    );
}

export default HomePage;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '3rem',
    },
    buttons: {
        marginTop: '2rem',
        display: 'flex',
        gap: '2rem',
    },
    link: {
        border: '1px solid #ccc',
        padding: '0.5rem 1rem',
        textDecoration: 'none',
    },
};
