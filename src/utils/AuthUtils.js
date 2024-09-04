import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

export const isGoogleAuthTokenExpired = () => {
     const expiresAt = Cookies.get('OAUTH2_TOKEN_EXPIRY');
     if (!expiresAt) return false;
     return expiresAt < new Date().getTime();
};

export const isJwtTokenExpired = () => {
     const expiresAt = Cookies.get('JWT_TOKEN_EXPIRY');
     if (!expiresAt) return false;
     return expiresAt < new Date().getTime();
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
        console.error('Failed to decrypt data:', e);
        return null;
    }
};