import { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { apiClient } from "@/config/request";
import { useNotification } from "@/components/CustomNotification/NotificationProvider";
import { useRouter } from "next/navigation";
import { deleteCookie } from "@/lib/utils/cookies";
import { messages } from "./message";
import { refreshAccessToken } from "./refreshAccessToken";
import { useProjectSettings } from "../settings/useProjectSettings";

// Use an environment variable for the auth redirection URL
const authRedirectUrl = process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL;

export const useApiV3 = (prefix, endpoint, config = {}, redirectUri = "/") => {
  const { notify = true } = config;
  const queryClient = useQueryClient();
  const { sendNotification } = useNotification();
  const {
    settings: { locale },
  } = useProjectSettings();

  const router = useRouter();
  const successMessage = messages[locale].dataCreatedSuccess;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState(null);

  // Updated logout function using the environment variable
  const logout = () => {
    const cookieOptions = {
      domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || 'localhost',
      path: '/'
    };
    ["token", "access", "refresh", "access_expiry", "csrftoken"].forEach(name =>
      deleteCookie(name, cookieOptions)
    );
    router.refresh();
    router.push(process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL || "/login?" + redirectUri);
  };

  const handleError = useCallback(
    async (err) => {
      setError(err); // Set the error in state

      if (err.response?.status === 500) {
        sendNotification("Server error: No connection to the server", "warning");
      } else if (err.response?.status === 401) {
        try {
          const refreshed = await refreshAccessToken(sendNotification);
          if (refreshed) {
            // Retry the original request if the token was refreshed
            return true;
          } else {
            logout();
            return false;
          }
        } catch (refreshErr) {
          logout();
          return false;
        }
      } else if (err.response?.status === 403) {
        sendNotification("You don't have permission to access this resource", "error");
      } else if (err.message === "Network Error") {
        sendNotification("There is a problem with your connection.", "warning");
      } else if (notify) {
        sendNotification(`Failed to fetch data: ${err.message}`, "error");
      }
      return false; // Indicate that retry is not possible or necessary
    },
    [notify, sendNotification, logout]
  );

  const createMutation = useMutation(
    async (newData) => {
      setLoading(true); // Set loading to true on start
      setError(null);   // Clear any previous error
      try {
        const response = await apiClient.post(`${prefix}${endpoint}/`, newData);
        return response.data;
      } catch (error) {
        throw error;
      } finally {
        setLoading(false); // Set loading to false on finish
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([prefix, endpoint]);
        if (notify) sendNotification(successMessage, "success");
        setValidationErrors(null); // Clear validation errors on success
      },
      onError: async (err) => {
        setValidationErrors(err.response?.data?.errors || null);
        const shouldRetry = await handleError(err); // Now awaits handleError
        if (!shouldRetry) throw err;
      },
    }
  );

  const updateMutation = useMutation(
    async ({ id, ...updatedData }) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.patch(`${prefix}${endpoint}/${id}`, updatedData);
        return response.data;
      } catch (error) {
        throw error;
      } finally {
        setLoading(false); // Set loading to false on finish
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([prefix, endpoint]);
        if (notify) sendNotification("Data updated successfully", "success");
        setValidationErrors(null); // Clear validation errors on success
      },
      onError: async (err) => {
        setValidationErrors(err.response?.data?.errors || null);
        const shouldRetry = await handleError(err); // Now awaits handleError
        if (!shouldRetry) throw err;
      },
    }
  );

  const deleteMutation = useMutation(
    async (id) => {
      setLoading(true); // Set loading to true on start
      setError(null);   // Clear any previous error
      try {
        const response = await apiClient.delete(`${prefix}${endpoint}/${id}/`);
        return response.data;
      } catch (error) {
        throw error;
      } finally {
        setLoading(false); // Set loading to false on finish
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([prefix, endpoint]);
        if (notify) sendNotification("Data deleted successfully", "success");
        setValidationErrors(null); // Clear validation errors on success
      },
      onError: async (err) => {
        const shouldRetry = await handleError(err); // Now awaits handleError
        if (!shouldRetry) throw err;
      },
    }
  );

  const fetchTrashedData = useCallback(async () => {
    try {
      const url = `${prefix}${endpoint}/trashed/`;
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      await handleError(error);
      throw error;
    }
  }, [prefix, endpoint, handleError]);

  const restoreData = useCallback(
    async (id) => {
      try {
        const url = `${prefix}${endpoint}/restore/${id}/`;
        const response = await apiClient.post(url);
        queryClient.invalidateQueries([prefix, endpoint]);
        return response.data;
      } catch (error) {
        await handleError(error);
        throw error;
      }
    },
    [prefix, endpoint, queryClient, handleError]
  );

  const forceDeleteData = useCallback(
    async (id) => {
      try {
        const url = `${prefix}${endpoint}/${id}/force-delete/`;
        const response = await apiClient.delete(url);
        queryClient.invalidateQueries([prefix, endpoint]);
        return response.data;
      } catch (error) {
        await handleError(error);
        throw error;
      }
    },
    [prefix, endpoint, queryClient, handleError]
  );

  return {
    error,
    loading,
    validationErrors,
    createData: createMutation.mutate,
    updateData: updateMutation.mutate,
    deleteData: deleteMutation.mutate,
    trash: {
      fetchTrashedData,
      restoreData,
      forceDeleteData,
    },
  };
};
