import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { doLogOut } from '@/services/ApiService';

export const isGoogleAuthTokenExpired = (expiresAt) => {
    if (!expiresAt) return false;
    return BigInt(expiresAt) < new Date().getTime();
};

export const isJwtTokenExpired = (expiresAt) => {
    if (!expiresAt) return false;
    return BigInt(expiresAt) < new Date().getTime();
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

export const logUserOut = async () => {
    sessionStorage.clear()
    toast.error('Session expired. Redirecting you to the login page...', {
        position: "top-center",
        autoClose: 2000, 
        className: 'bg-red-600 text-white',
    });

    setTimeout(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.pushState(null, null, window.location.href);
        };

        window.location.href = '/auth/sign-in';
    }, 2000); 
}