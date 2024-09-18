import { Navigate } from 'react-router-dom';
import { getExpiryForJwtToken, getExpiryForOuth2Token, isGoogleAuthTokenExpired, isJwtTokenExpired, logUserOut } from '@/utils/AuthUtils';

const ProtectedRoutes = ({ children }) => {
  const jwtTokenExpiry = getExpiryForJwtToken();
  const outh2TokenExpiry = getExpiryForOuth2Token();

  const hasValidJwtToken = !isJwtTokenExpired(jwtTokenExpiry);
  const hasValidOuth2Token = !isGoogleAuthTokenExpired(outh2TokenExpiry);

  // User is authenticated if they have a valid JWT token or a valid OAuth2 token
  const isAuthenticated = hasValidJwtToken || hasValidOuth2Token;

  if (!isAuthenticated) {
    logUserOut();
    return <Navigate to="/auth/sign-in" />;
  }

  return children;
};

export default ProtectedRoutes;
