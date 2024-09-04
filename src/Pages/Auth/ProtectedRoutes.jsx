import React from 'react';
import { isGoogleAuthTokenExpired, isJwtTokenExpired } from '@/utils/AuthUtils';

const ProtectedRoutes = ({ children }) => {
     if (isGoogleAuthTokenExpired() || isJwtTokenExpired()) {
        return <Redirect to="/auth/sign-in" />;
     }
    return children;
};

export default ProtectedRoutes;
