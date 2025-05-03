
export const getCookie = (name) => {
    if (typeof document === 'undefined') {
        return null; // Handle server-side rendering case
    }
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

export const setCookie = (name, value, options = {}) => {
    if (typeof document === 'undefined') {
        return; // Handle server-side rendering case
    }
    const {
        days = 1,
        path = '/',
        domain = null,
        secure = false,
        sameSite = null
    } = options;

    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();

    let cookie = `${name}=${value}; expires=${expires}; path=${path};`;

    if (domain) cookie += `domain=${domain};`;
    if (secure) cookie += `Secure;`;
    if (sameSite) cookie += `SameSite=${sameSite};`;

    document.cookie = cookie;
};

export const deleteCookie = (name, options = {}) => {
    if (typeof document === 'undefined') {
        return; // Handle server-side rendering case
    }
    const {
        path = '/',
        domain = null
    } = options;

    let cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path};`;

    if (domain) cookie += `domain=${domain};`;

    document.cookie = cookie;
};