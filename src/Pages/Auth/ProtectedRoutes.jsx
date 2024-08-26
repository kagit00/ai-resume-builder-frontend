import React from 'react';
import { logOut, logOutForced } from '@/utils/AuthUtils';

const ProtectedRoutes = ({ children }) => {
    logOutForced()
    return children;
};

export default ProtectedRoutes;
