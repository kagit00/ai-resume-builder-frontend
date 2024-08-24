import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
    const jwtToken = Cookies.get('JWT_TOKEN');
    const googleAuthToken = Cookies.get('GOOGLE_OAUTH2_TOKEN');
    
    const isGoogleAuthTokenExpired = () => {
        const expiresAt = Cookies.get('GOOGLE_OAUTH2_TOKEN_EXPIRATION');
        if (!expiresAt) return true; // Token expiration is unknown, consider it expired.
        const expiresDate = new Date(expiresAt);
        const now = new Date();
        return expiresDate < now;
    }

    if (!jwtToken && !googleAuthToken || (googleAuthToken && isGoogleAuthTokenExpired())) {
        Cookies.remove('JWT_TOKEN');
        Cookies.remove('GOOGLE_OAUTH2_TOKEN');
        Cookies.remove('GOOGLE_OAUTH2_TOKEN_EXPIRATION');
        
        return <Navigate to="/auth/sign-in" replace />;
    }

    return children;
};

export default ProtectedRoute;
