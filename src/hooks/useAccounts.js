import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient, authClient } from "@/config/request";
import localforage from "localforage";
import { deleteCookie, setCookie } from "@/lib/utils/cookies";

// Read the cookie domain dynamically from the environment variable.
const cookieDomain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN || "localhost";

const isExpired = (timestamp, expiry = 3600000) => {
  return Date.now() - timestamp > expiry;
};

localforage.config({
  name: "dashboard",
  storeName: "apiCache",
});

const refreshAccessToken = async () => {
  const refresh = localStorage.getItem("refresh"); // Or use your cookie helper
  if (!refresh) {
    throw new Error("No refresh token available");
  }
  const response = await authClient.post("/api/token/refresh/", { refresh });
  const data = response.data;
  if (data.access) {
    // Optionally, add cookie options if needed
    setCookie("access", data.access, { domain: cookieDomain, path: "/" });
    setCookie("access_expiry", Date.now() + 3600000, { domain: cookieDomain, path: "/" });
    authClient.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
    return data.access;
  }
  throw new Error("Failed to refresh token");
};

const useAccounts = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = useCallback(() => {
    // Delete cookies using the dynamic cookieDomain
    deleteCookie("access", { domain: cookieDomain, path: "/" });
    deleteCookie("refresh", { domain: cookieDomain, path: "/" });
    deleteCookie("access_expiry", { domain: cookieDomain, path: "/" });

    setUser(null);
    router.refresh();
    const currentUrl = window.location.href;
    setCookie("returnUrl", currentUrl, { domain: cookieDomain, path: "/" });
    router.push(process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL);
    setLoading(false);
  }, [router]);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    const cacheKey = "/user/";
    try {
      const cachedData = await localforage.getItem(cacheKey);
      if (cachedData && !isExpired(cachedData.timestamp)) {
        setUser(cachedData.data);
        setLoading(false);
        return;
      }
    } catch (err) {
      console.error("Error accessing cache", err);
    }

    try {
      const response = await authClient.get("/user/");
      setUser(response.data);
      await localforage.setItem(cacheKey, {
        data: response.data,
        timestamp: Date.now(),
      });
    } catch (error) {
      try {
        // Try to refresh token before logging out
        await refreshAccessToken();
        // Retry fetching user after refreshing token
        const response = await authClient.get("/user/");
        setUser(response.data);
        await localforage.setItem(cacheKey, {
          data: response.data,
          timestamp: Date.now(),
        });
      } catch (refreshError) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  }, [handleLogout]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    user,
    error,
    validationErrors,
    loading,
    fetchUser,
    handleLogout,
  };
};

export default useAccounts;
