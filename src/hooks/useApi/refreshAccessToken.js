import { getCookie, setCookie } from "@/lib/utils/cookies";


const cookieConfig = {
  domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || 'localhost',
  path: '/',
  secure: true,
  sameSite: 'none'
};
// In refreshAccessToken function
export const refreshAccessToken = async (sendNotification) => {
  try {
    const refresh = getCookie("refresh");
    if (!refresh) {
      throw new Error("No refresh token available");
    }

    const response = await authClient.post("/api/token/refresh/", { refresh });
    const data = response.data;
    if (data.access) {
      // Set cookies with proper attributes
      setCookie("access", data.access, cookieConfig);
      setCookie("access_expiry", Date.now() + 3600000, cookieConfig);

      // Update headers
      authClient.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
      return data.access;
    } else {
      throw new Error("Failed to refresh token");
    }
  } catch (err) {
    sendNotification("Session expired. Please log in again.", "error");
    throw err;
  }
};