import { Navigate } from 'react-router-dom';
import { getExpiryForJwtToken, getExpiryForOuth2Token, isGoogleAuthTokenExpired, isJwtTokenExpired, doNormalLogOut } from '@/utils/AuthUtils';

const ProtectedRoutes = ({ children }) => {
  const jwtTokenExpiry = getExpiryForJwtToken();
  const outh2TokenExpiry = getExpiryForOuth2Token();

  const hasValidJwtToken = !isJwtTokenExpired(jwtTokenExpiry);
  const hasValidOuth2Token = !isGoogleAuthTokenExpired(outh2TokenExpiry);

  const isAuthenticated = hasValidJwtToken || hasValidOuth2Token;


  if (!isAuthenticated) {
    doNormalLogOut();
  }

  return children;
};

export default ProtectedRoutes;
