import React, { useState } from 'react';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        // Add actual authentication logic here.
        console.log("Email:", email, "Password:", password);
        // Clear the form after submission
        setEmail('');
        setPassword('');
        setError('');
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
                <button type="submit" className="login-btn">Login</button>
            </form>

            <p className="register-link">
                Don't have an account? <a href="../register/Register">Register here</a>
            </p>

            <div className="oauth-login">
                <button className="google-login-btn">Login with Google</button>
                <button className="facebook-login-btn">Login with Facebook</button>
            </div>
        </div>
    );
}

export default Login;