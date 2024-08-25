import React from 'react';
import { logOut } from '@/utils/AuthUtils';

const ProtectedRoutes = ({ children }) => {
    logOut()
    return children;
};

export default ProtectedRoutes;
