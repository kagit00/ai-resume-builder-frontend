import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const jwtToken = localStorage.getItem('JWT_TOKEN');
    const googleAuthToken = localStorage.getItem('GOOGLE_OAUTH2_TOKEN');

    if (!jwtToken && !googleAuthToken) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default ProtectedRoute;
