import { Navigate } from 'react-router-dom';
import { getExpiryForJwtToken, getExpiryForOuth2Token, isGoogleAuthTokenExpired, isJwtTokenExpired, logUserOut } from '@/utils/AuthUtils';

const ProtectedRoutes = ({ children }) => {
  const jwtTokenExpiry = getExpiryForJwtToken();
  const outh2TokenExpiry = getExpiryForOuth2Token();

  const isAuthenticated = !(outh2TokenExpiry && isGoogleAuthTokenExpired(outh2TokenExpiry)) && !(jwtTokenExpiry && isJwtTokenExpired(jwtTokenExpiry));

  if (!isAuthenticated) {
    logUserOut();
    return <Navigate to="/auth/sign-in" />;
  }

  return children;
};

export default ProtectedRoutes;
