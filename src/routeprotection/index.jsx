import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const jwtToken = sessionStorage.getItem('JWT_TOKEN');
    const googleAuthToken = sessionStorage.getItem('GOOGLE_OAUTH2_TOKEN');

    if (!jwtToken && !googleAuthToken) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default ProtectedRoute;
