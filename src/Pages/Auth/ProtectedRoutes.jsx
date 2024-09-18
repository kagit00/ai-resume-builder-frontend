import { getExpiryForJwtToken, isJwtTokenExpired, doNormalLogOut, getAuthTypeForOAuth2  } from '@/utils/AuthUtils';
import { console } from 'inspector';

const ProtectedRoutes = ({ children }) => {
  const jwtTokenExpiry = getExpiryForJwtToken();

  const hasValidJwtToken = !isJwtTokenExpired(jwtTokenExpiry);
  const authType = getAuthTypeForOAuth2();

  const isAuthenticated = hasValidJwtToken || authType;
  console.log(hasValidJwtToken, authType, isAuthenticated)


  if (!isAuthenticated) {
    //doNormalLogOut();
  }

  return children;
};

export default ProtectedRoutes;
