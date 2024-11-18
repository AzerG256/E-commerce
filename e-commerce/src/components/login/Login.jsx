import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize history for redirection

    const handleLogin = async (e) => {
        e.preventDefault();
        const handleLoginSuccess = (userData) => {
                // Save user data to localStorage (optional)
                localStorage.setItem('user', JSON.stringify(userData));
                // Redirect to the dashboard
                navigate('/');
                // Optionally clear form and error state
                setEmail('');
                setPassword('');
                setError('');
        };

        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            // Replace with your actual backend endpoint
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                handleLoginSuccess(data); // Call the login success handler
            } else {
                setError(data.message || 'Invalid credentials');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
            console.error(err);
        }


        // Clear form fields
        setEmail('');
        setPassword('');
    };
    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleLogin} className="login-form">
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button onClick={handleLogin} className="login-btn">Login</button>
            </form>

            <p className="register-link">
                Don't have an account? <a href="../register">Register here</a>
            </p>

            <div className="oauth-login">
                <button className="google-login-btn">Login with Google</button>
                <button className="facebook-login-btn">Login with Facebook</button>
            </div>
        </div>
    );
}

export default Login;
