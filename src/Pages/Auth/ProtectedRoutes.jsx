import { Navigate } from 'react-router-dom';
import { getExpiryForJwtToken, isJwtTokenExpired, doNormalLogOut, getAuthTypeForOAuth2  } from '@/utils/AuthUtils';

const ProtectedRoutes = ({ children }) => {
  const jwtTokenExpiry = getExpiryForJwtToken();

  const hasValidJwtToken = !isJwtTokenExpired(jwtTokenExpiry);

  const isAuthenticated = hasValidJwtToken || getAuthTypeForOAuth2();


  if (!isAuthenticated) {
    doNormalLogOut();
  }

  return children;
};

export default ProtectedRoutes;
