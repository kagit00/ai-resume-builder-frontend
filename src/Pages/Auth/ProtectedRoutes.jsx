import { getExpiryForJwtToken, isJwtTokenExpired, doNormalLogOut, getAuthTypeForOAuth2  } from '@/utils/AuthUtils';

const ProtectedRoutes = ({ children }) => {
  const jwtTokenExpiry = getExpiryForJwtToken();

  const hasValidJwtToken = !isJwtTokenExpired(jwtTokenExpiry);
  const authType = getAuthTypeForOAuth2();

  const isAuthenticated = hasValidJwtToken || authType;


  if (!isAuthenticated) {
    doNormalLogOut();
  }

  return children;
};

export default ProtectedRoutes;
