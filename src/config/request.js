import { normalizePath } from "@/lib/utils/normalizePath";
import axios from "axios";
import { getCookie, deleteCookie, setCookie } from "@/lib/utils/cookies";
import { getTokenFromCookie } from "./getTokenFromCookie";

export const apiClient = axios.create({
    baseURL: normalizePath(process.env.NEXT_PUBLIC_BASE_URL),
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export const apiClientAdmin = axios.create({
    baseURL: normalizePath(process.env.NEXT_PUBLIC_ADMIN_URL),
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export const authClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_AUTH_URL,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export const fileClientUpload = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    timeout: 30000,
    headers: {
        "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
});

// Add a request interceptor to set the Authorization header
const setAuthorizationHeader = (config) => {
    const token = getTokenFromCookie("access");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
};

const handleTokenRefresh = async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            const refreshToken = getCookie("refresh");
            if (refreshToken) {
                const response = await authClient.post("/api/token/refresh/", {
                    refresh: refreshToken,
                });

                const newAccessToken = response.data.access;

                if (newAccessToken) {
                    // Set cookie with proper attributes
                    setCookie("access", newAccessToken, {
                        domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || 'localhost',
                        path: "/",
                        secure: true,
                        sameSite: "none",
                        maxAge: 3600
                    });

                    // Update authorization header
                    originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return apiClient(originalRequest);
                } else {
                    handleLogout();
                }
            } else {
                handleLogout();
            }
        } catch (err) {
            console.error("Token refresh failed:", err);
            handleLogout();
        }
    }

    return Promise.reject(error);
};

// Updated helper function to handle logout with environment variable
const handleLogout = () => {
    // Get the auth redirect URL from environment variables
    const authRedirectUrl = process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL;

    // Clear tokens
    localStorage.removeItem("access");
    deleteCookie("access", { domain: cookieDomain, path: "/" });

    // Save current path for potential redirect back after login
    const currentPath = window.location.pathname;
    if (currentPath !== '/login' && currentPath !== '/signup') {
        localStorage.setItem('returnPath', currentPath);
    }

    // Redirect to the configured auth URL
    window.location.href = authRedirectUrl;
};

apiClient.interceptors.request.use(setAuthorizationHeader, (error) =>
    Promise.reject(error)
);
apiClient.interceptors.response.use((response) => response, handleTokenRefresh);

apiClientAdmin.interceptors.request.use(setAuthorizationHeader, (error) =>
    Promise.reject(error)
);
apiClientAdmin.interceptors.response.use(
    (response) => response,
    handleTokenRefresh
);

authClient.interceptors.request.use(setAuthorizationHeader, (error) =>
    Promise.reject(error)
);
// authClient does not refresh tokens, so omit the response interceptor.

fileClientUpload.interceptors.request.use(setAuthorizationHeader, (error) =>
    Promise.reject(error)
);
fileClientUpload.interceptors.response.use(
    (response) => response,
    handleTokenRefresh
);