import Cookies from 'js-cookie';

export const isGoogleAuthTokenExpired = () => {
     const expiresAt = Cookies.get('GOOGLE_OAUTH2_TOKEN_EXPIRATION');
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
     const googleAuthToken = getGoogleOauth2Token()
     if (!jwtToken && !googleAuthToken || (googleAuthToken && isGoogleAuthTokenExpired())) {
          removeJwtToken()
          removeOauth2Token()
          window.location.href = "/auth/sign-in";
     }
}

export const getJwtToken = () => {
     return Cookies.get('JWT_TOKEN');
}

export const getGoogleOauth2Token = () => {
     return Cookies.get('GOOGLE_OAUTH2_TOKEN');
}

export const removeJwtToken = () => {
     Cookies.remove('JWT_TOKEN');
}

export const removeOauth2Token = () => {
     Cookies.remove('GOOGLE_OAUTH2_TOKEN');
     Cookies.remove('GOOGLE_OAUTH2_TOKEN_EXPIRATION');
}

export const setJwtToken = (token) => {
     Cookies.set('JWT_TOKEN', token);
}