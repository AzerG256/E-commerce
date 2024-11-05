import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = ({ errorCode = "404", errorMessage = "Page Not Found" }) => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/'); // Redirect to homepage
    };

    return (
        <div className="error-page">
            <div className="error-content">
                <h1 className="error-code">{errorCode}</h1>
                <p className="error-message">{errorMessage}</p>
                <button className="back-home-button" onClick={handleBackToHome}>
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;
