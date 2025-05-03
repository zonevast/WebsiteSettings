import { useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { apiClient } from "@/config/request";
import { useNotification } from "@/components/CustomNotification/NotificationProvider";
import { useRouter, useSearchParams } from "next/navigation";
import { deleteCookie } from "@/lib/utils/cookies";
import { messages } from "./message";
import { refreshAccessToken } from "./refreshAccessToken";
import { encodeQueryParams } from "./encodeQueryParams";
import { useProjectSettings } from "../settings/useProjectSettings";

export const useApiV2 = (prefix, endpoint, config = {}, redirectUri = "/") => {

  const {
    pagination = true,
    limit = 10,
    more = "",
    initial = {},
    notify = true,
    usingParams = true,
    endpoint: endpoint2 = undefined,
  } = config;

  const queryClient = useQueryClient();
  const { sendNotification } = useNotification();
  const searchParams = useSearchParams();
  const {
    settings: { locale },
  } = useProjectSettings();

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(initial.search || "");
  const successMessage = messages[locale].dataCreatedSuccess;

  const [validationErrors, setValidationErrors] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [id, setId] = useState(null);

  const [dataById, setDataById] = useState(null);
  const [isLoadingById, setIsLoadingById] = useState(false);
  const [errorById, setErrorById] = useState(null);

  // Returns URL params (currently returns an empty string, adjust if needed)
  const getURLParams = useCallback(() => {
    const params = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return "";
  }, [searchParams]);

  // Updated logout function to use environment variable
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
      if (err.response?.status === 500) {
        sendNotification("Server error: No connection to the server", "warning");
      } else if (err.response?.status === 401) {
        try {
          await refreshAccessToken(sendNotification);
          return true;
        } catch (refreshErr) {
          logout();
        }
      } else if (err.response?.status === 403) {
        sendNotification("You don't have permission to access this resource", "error");
      } else if (err.message === "Network Error") {
        sendNotification("There is a problem with your connection.", "warning");
      } else if (notify) {
        sendNotification(`Failed to fetch data: ${err.message}`, "error");
      }
      return false;
    },
    [notify, sendNotification, logout]
  );

  const refreshData = useCallback(() => {
    queryClient.invalidateQueries([prefix, endpoint, more, initial, currentPage]);
    queryClient.refetchQueries([prefix, endpoint, more, initial, currentPage]);
  }, [queryClient, prefix, endpoint, more, initial, currentPage]);

  // Simplified fetchData function
  const fetchData = useCallback(
    async (page = currentPage, term) => {
      try {
        // Build params object
        const urlParams = usingParams ? getURLParams() : {};
        const queryParams = {
          ...urlParams,
          ...initial,
          ...(term || config.searchTerm || {})
        };

        // Add pagination params
        if (pagination) {
          queryParams.page = page;
          if (limit !== 10) queryParams.limit = limit;
        }

        // Build URL
        const queryString = encodeQueryParams(queryParams);
        const baseUrl = `${prefix}${endpoint}${more ? "/" + more : ""}`;
        const url = baseUrl.endsWith("/")
          ? baseUrl + (queryString ? `?${queryString}` : '')
          : baseUrl + "/" + (queryString ? `?${queryString}` : '');

        if (url.includes("/undefined/")) {
          console.warn("URL contains /undefined/:", url);
          return null;
        }

        // Make request
        const response = await apiClient.get(url);

        // Process response
        if (!pagination) {
          return response.data;
        } else {
          const pageSize = limit || 10;
          const totalPages = Math.ceil(response.data.count / pageSize);
          setCurrentPage(page);
          setTotalPages(totalPages);
          return {
            data: response.data.results,
            totalPages
          };
        }
      } catch (error) {
        const shouldRetry = await handleError(error);
        if (shouldRetry) return fetchData(page, term);
        throw error;
      }
    },
    [prefix, endpoint, more, config, initial, usingParams, getURLParams, currentPage, pagination, limit, handleError]
  );

  const fetchDataById = useCallback(
    async (id) => {
      setId(id);
      setIsLoadingById(true);
      setErrorById(null);
      try {
        const url = `${prefix}${endpoint}/${id}/`;
        const response = await apiClient.get(url);
        setDataById(response.data); // Store the fetched data
        return response.data;
      } catch (error) {
        setErrorById(error.message || "Failed to fetch item");
        const shouldRetry = await handleError(error);
        if (shouldRetry) return fetchDataById(id);
        throw error;
      } finally {
        setIsLoadingById(false);
      }
    },
    [prefix, endpoint, handleError]
  );

  const { data, error, isLoading } = useQuery(
    [prefix, endpoint2 || endpoint, more, initial, currentPage],
    () => fetchData(),
    {
      refetchOnWindowFocus: false,
      staleTime: 10800000,
      cacheTime: 10800000,
      onError: async (err) => {
        if (err.response?.status === 401) {
          try {
            await refreshAccessToken(sendNotification);
          } catch {
            logout();
          }
        } else {
          handleError(err);
        }
      },
    }
  );

  const fetchOptions = useCallback(async () => {
    const url = `${prefix}${endpoint}/`;
    if (url.includes("/undefined/")) {
      console.warn("Url includes /undefined/ ", url);
      return;
    }
    const response = await apiClient.options(url);
    return response.data;
  }, [prefix, endpoint]);

  const {
    data: optionsData,
    error: optionsError,
    isLoading: isOptionsLoading,
  } = useQuery(["fetchOptions", prefix, endpoint2 || endpoint], fetchOptions, {
    onError: (err) => {
      handleError(err);
    },
  });

  const handleSearch = useCallback(
    async (searchTerm) => {
      setSearchTerm(searchTerm);
      const data = await fetchData(currentPage, { search: searchTerm });
      return data;
    },
    [fetchData, currentPage]
  );

  const {
    data: searchData,
    error: searchError,
    isLoading: isSearchLoading,
  } = useQuery(
    ["handleSearch", currentPage, prefix, endpoint, more, searchTerm],
    () => handleSearch(searchTerm),
    {
      enabled: !!searchTerm,
      onError: (err) => {
        handleError(err);
      },
    }
  );

  const updateMutation = useMutation(
    ({ id, ...updatedData }) => apiClient.patch(`${prefix}${endpoint}/${id}/`, updatedData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([prefix, endpoint, more, initial, currentPage]);
        if (notify) sendNotification("Data updated successfully", "success");
      },
      onError: (err) => {
        setValidationErrors(err.response?.data?.errors || null);
        handleError(err);
      },
    }
  );

  const createMutation = useMutation(
    (newData) => apiClient.post(`${prefix}${endpoint}/`, newData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([prefix, endpoint]);
        if (notify) sendNotification(successMessage, "success");
      },
      onError: (err) => {
        setValidationErrors(err.response?.data?.errors || null);
        handleError(err);
      },
    }
  );

  const deleteMutation = useMutation(
    (id) => apiClient.delete(`${prefix}${endpoint}/${id}/`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([prefix, endpoint]);
        if (notify) sendNotification("Data deleted successfully", "success");
      },
      onError: (err) => {
        handleError(err);
      },
    }
  );

  const fetchTrashedData = useCallback(async () => {
    const url = `${prefix}${endpoint}/trash/`;
    const response = await apiClient.get(url);
    return response.data;
  }, [prefix, endpoint]);

  const restoreData = useCallback(
    async (id) => {
      const url = `${prefix}${endpoint}/${id}/restore/`;
      const response = await apiClient.put(url);
      queryClient.invalidateQueries([prefix, endpoint]);
      return response.data;
    },
    [prefix, endpoint, queryClient]
  );

  const forceDeleteData = useCallback(
    async (id) => {
      const url = `${prefix}${endpoint}/${id}/`;
      const response = await apiClient.delete(url);
      queryClient.invalidateQueries([prefix, endpoint]);
      return response.data;
    },
    [prefix, endpoint, queryClient]
  );

  return {
    data,
    error,
    loading: isLoading,
    validationErrors,
    createData: createMutation,
    updateData: updateMutation,
    deleteData: deleteMutation,
    fetchData,
    refreshData,
    trash: {
      fetchTrashedData,
      restoreData,
      forceDeleteData,
    },
    ById: {
      fetchDataById,
      dataById,
      isLoadingById,
      errorById,
    },
    search: {
      handleSearch,
      searchData,
      searchError,
      isSearchLoading,
    },
    options: {
      fetchOptions,
      optionsData: optionsData?.actions,
      optionsError,
      isOptionsLoading,
    },
    pagination: {
      currentPage,
      totalPages,
      setCurrentPage,
    },
  };
};