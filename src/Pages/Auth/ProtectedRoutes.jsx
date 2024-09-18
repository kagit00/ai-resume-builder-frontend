import { Navigate } from 'react-router-dom';
import { getExpiryForJwtToken, getExpiryForOuth2Token, isGoogleAuthTokenExpired, isJwtTokenExpired, logUserOut } from '@/utils/AuthUtils';

const ProtectedRoutes = ({ children }) => {
  const jwtTokenExpiry = getExpiryForJwtToken();
  const outh2TokenExpiry = getExpiryForOuth2Token();

  const hasValidJwtToken = !isJwtTokenExpired(jwtTokenExpiry);
  const hasValidOuth2Token = !isGoogleAuthTokenExpired(outh2TokenExpiry);

  const isAuthenticated = hasValidJwtToken || hasValidOuth2Token;

  console.log("OAuth2 Expiry:", outh2TokenExpiry);
  console.log("JWT Expiry:", jwtTokenExpiry);
  console.log("OAuth2 Check:", isGoogleAuthTokenExpired(outh2TokenExpiry));
  console.log("JWT Check:", isJwtTokenExpired(jwtTokenExpiry));
  console.log("Is Authenticated:", isAuthenticated);


  if (!isAuthenticated) {
    //logUserOut();
    //return <Navigate to="/auth/sign-in" />;
  }

  return children;
};

export default ProtectedRoutes;
