import { getExpiryForJwtToken, getExpiryForOuth2Token, isGoogleAuthTokenExpired, isJwtTokenExpired, logUserOut } from '@/utils/AuthUtils';

const ProtectedRoutes = ({ children }) => {
   const jwtTokenExpiry = getExpiryForJwtToken();
   const outh2TokenExpiry = getExpiryForOuth2Token()

   if ((outh2TokenExpiry && isGoogleAuthTokenExpired(outh2TokenExpiry)) || (jwtTokenExpiry && isJwtTokenExpired(jwtTokenExpiry))) {
      logUserOut();
   }
   return children;
};

export default ProtectedRoutes;
