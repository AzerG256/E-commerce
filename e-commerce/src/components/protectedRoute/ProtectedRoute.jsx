import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const payload = jwtDecode(token);
        const isExpired = payload.exp * 1000 < Date.now();
        if (isExpired) {
            localStorage.removeItem('token'); // Clear expired token
            console.warn('Token expired.');
            return false;
        }
        return payload; // Return payload for role-based validation
    } catch (error) {
        console.error('Error decoding token:', error);
        return false;
    }
};

const ProtectedRoute = ({ role }) => {
    const user = isAuthenticated();
    if (!user) return <Navigate to="/login" />;

    if (role && user.role !== role) {
        return <Navigate to="/unauthorized" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
