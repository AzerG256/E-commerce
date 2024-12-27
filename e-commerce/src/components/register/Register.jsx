import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../utils/api.js';
import './Register.css';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Form validation
        if (!name || !email || !password || !confirmPassword) {
            setError('All fields are required.');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        // Password match validation
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // Password strength validation (example: min 6 characters)
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        try {
            const response = await API.post('/auth/register', { name, email, password });

            // Save the JWT token and userId to localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.id); // Store userId in localStorage

            // Display success message
            setSuccessMessage('Registration successful!');
            setError('');

            // Redirect to login or dashboard after a short delay
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || 'Something went wrong.');
            } else {
                setError('Something went wrong. Please try again.');
            }
            console.error(err);
        }

        // Clear form after submission
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form onSubmit={handleRegister} className="register-form">
                <div className="input-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
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
                <div className="input-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="register-btn">Register</button>
            </form>
            <p className="login-link">
                Already have an account? <a href="./login">Login here</a>
            </p>
        </div>
    );
}

export default Register;