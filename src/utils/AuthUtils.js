import Cookies from 'js-cookie';

export const isGoogleAuthTokenExpired = () => {
     const expiresAt = Cookies.get('OAUTH2_TOKEN_EXPIRY');
     if (!expiresAt) return true;
     return expiresAt < new Date().getTime();
};

export const isJwtTokenExpired = () => {
     const expiresAt = Cookies.get('JWT_TOKEN_EXPIRY');
     if (!expiresAt) return true;
     return expiresAt < new Date().getTime();
};

export const logOut = () => {
     removeJwtToken()
     removeOauth2Token()
     window.location.href = "/auth/sign-in";
}

export const logOutForced = () => {
     const jwtToken = getJwtToken()
     if (isGoogleAuthTokenExpired() || (jwtToken && isJwtTokenExpired())) {
          logOut()
     }
}

export const getJwtToken = () => {
     return Cookies.get('JWT_TOKEN');
}

export const removeJwtToken = () => {
     Cookies.remove('JWT_TOKEN');
     Cookies.remove('JWT_TOKEN_EXPIRY');
}

export const removeOauth2Token = () => {
     Cookies.remove('GOOGLE_OAUTH2_TOKEN_EXPIRATION');
}

export const setJwtToken = (data) => {
     Cookies.set('JWT_TOKEN', data.token);
     Cookies.set('JWT_TOKEN_EXPIRY', data.expiry)
}