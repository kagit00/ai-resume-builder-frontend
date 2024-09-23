import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { doLogOut } from '@/services/ApiService';
import 'react-toastify/dist/ReactToastify.css';

export const isGoogleAuthTokenExpired = (expiresAt) => {
    if (expiresAt === undefined || expiresAt === null) return true; 
    return BigInt(expiresAt) < BigInt(new Date().getTime());
};

export const isJwtTokenExpired = (expiresAt) => {
    if (expiresAt === undefined || expiresAt === null) return true; 
    return BigInt(expiresAt) < BigInt(new Date().getTime());
};


export const setJwtToken = (token) => {
    sessionStorage.setItem('JWT_TOKEN', encryptData(token, 'passwordpassword'))
}

export const getJwtToken = () => {
    return decryptData(sessionStorage.getItem('JWT_TOKEN'), 'passwordpassword')
}

export const encryptData = (data, secretKey) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

export const decryptData = (encryptedData, secretKey) => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (e) {
        return null;
    }
};

export const getExpiryForOuth2Token = () => {
    return Cookies.get('OAUTH2_TOKEN_EXPIRY');
}

export const setExpiryForJwtToken = (tokenExpiresAt) => {
    sessionStorage.setItem('JWT_TOKEN_EXPIRY', tokenExpiresAt)
}

export const getExpiryForJwtToken = () => {
    return sessionStorage.getItem('JWT_TOKEN_EXPIRY')
}

export const setAuthTypeForOAuth2 = () => {
    sessionStorage.setItem('authTypeForOAuth2', true)
} 

export const getAuthTypeForOAuth2 = () => {
    return sessionStorage.getItem('authTypeForOAuth2')
} 

export const logUserOut = () => {
    /* This code snippet is creating an overlay element that will be displayed on top of the webpage
    when a user's session expires. Here's a breakdown of what each line is doing: */
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '9999';
    overlay.style.color = 'white';
    overlay.style.fontSize = '24px';
    overlay.style.fontWeight = '100';
    overlay.style.fontFamily = "'Helvetica Neue', sans-serif";
    overlay.innerText = 'Session expired. Redirecting to login page...';

    document.body.appendChild(overlay);

    setTimeout(() => {
        doNormalLogOut()
    }, 2000);
}

export const doNormalLogOut = async () => {
    sessionStorage.clear()
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
        window.history.pushState(null, null, window.location.href);
    };
    await doLogOut()
    window.location.href = '/auth/sign-in';
}