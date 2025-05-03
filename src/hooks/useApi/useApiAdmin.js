import { useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { apiClientAdmin } from "@/config/request"; // Assuming this is the correct path
import { useNotification } from "@/components/CustomNotification/NotificationProvider";
import { useRouter, useSearchParams } from "next/navigation";
import { deleteCookie } from "@/lib/utils/cookies";
import { messages } from "./message";
import { useLocale } from "next-intl";
import { refreshAccessToken } from "./refreshAccessToken";

// New hook for fetching data by ID
const useDataById = (prefix, endpoint, id, handleError) => {
  const { data: dataById, error: errorById, isLoading: isLoadingById } = useQuery(
    ["fetchDataById", id],
    () => {
      const url = `${prefix}${endpoint}/${id}/`;
      return apiClientAdmin.get(url).then(res => res.data);
    },
    {
      enabled: !!id,
      onError: handleError,
    }
  );

  return { dataById, errorById, isLoadingById };
};

export const useApiAdmin = (prefix, endpoint, config = {}, redirectUri = "/") => {
  const {
    pagination = true,
    more = "",
    initial = {},
    notify = true,
    usingParams = true,
    endpoint: endpoint2 = undefined,
  } = config;
  const queryClient = useQueryClient();
  const { sendNotification } = useNotification();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const router = useRouter();

  const successMessage = messages[locale].dataCreatedSuccess;

  const [validationErrors, setValidationErrors] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState(initial.search || "");
  const [internalId, setInternalId] = useState(null);

  const getURLParams = useCallback(() => {
    const params = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [searchParams]);


  // Updated logout function using the environment variable.
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

  // Updated handleError: try refreshing token on 401 instead of immediate logout.
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

  const fetchData = useCallback(
    async (page = currentPage, term) => {
      let search = "";
      if (!term) term = config.searchTerm;

      const ss = usingParams ? getURLParams() : {};
      const params = { ...term, ...ss, ...initial };

      const encodeParams = (params) => {
        return Object.keys(params)
          .filter((key) => params[key] !== "")
          .map((key) => {
            const value = params[key];
            if (typeof value === "object" && value !== null) {
              return Object.keys(value)
                .map((subKey) =>
                  `${encodeURIComponent(subKey)}=${encodeURIComponent(value[subKey])}`
                )
                .join("&");
            }
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
          })
          .join("&");
      };

      search = "?" + encodeParams(params);
      if (pagination) {
        search += (search ? "&" : "?") + `page=${page}`;
      }
      const cleanSearch = search.endsWith("?") ? search.slice(0, -1) : search;
      const pre = `${prefix}${endpoint}${more ? "/" + more : ""}`;
      const url = pre.endsWith("/")
        ? pre
        : pre + "/" + `${cleanSearch}`.replace("?&", "?");

      if (url.includes("/undefined/")) {
        console.warn("Url includes /undefined/ ", url);
        return;
      }

      const response = await apiClientAdmin.get(url);
      if (!pagination) {
        return response.data;
      } else {
        setCurrentPage(page);
        setTotalPages(Math.ceil(response.data.count / 10));
        return {
          data: response.data.results,
          totalPages: Math.ceil(response.data.count / 10),
        };
      }
    },
    [prefix, endpoint, more, config, initial, usingParams, getURLParams, currentPage, pagination]
  );

  const {
    data,
    error,
    isLoading,
  } = useQuery(
    [prefix, endpoint2 || endpoint, more, initial, currentPage],
    () => fetchData(),
    {
      refetchOnWindowFocus: false,
      staleTime: 10800000, // 3 hours
      cacheTime: 10800000, // 3 hours
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
    const response = await apiClientAdmin.options(url);
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
    ({ id, ...updatedData }) => {
      return apiClientAdmin.patch(`${prefix}${endpoint}/${id}/`, updatedData);
    },
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries([prefix, endpoint, more, initial, currentPage]); // Invalidate the query
        if (notify) sendNotification("Data updated successfully", "success");
      },
      onError: (err) => {
        setValidationErrors(err.response?.data?.errors || null);
        handleError(err);
      },
    }
  );

  const createMutation = useMutation(
    (newData) => apiClientAdmin.post(`${prefix}${endpoint}/`, newData),
    {
      onSuccess: (response) => {
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
    (id) => apiClientAdmin.delete(`${prefix}${endpoint}/${id}/`),
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
    const response = await apiClientAdmin.get(url);
    return response.data;
  }, [prefix, endpoint]);

  const restoreData = useCallback(
    async (id) => {
      const url = `${prefix}${endpoint}/${id}/restore/`;
      const response = await apiClientAdmin.put(url);
      queryClient.invalidateQueries([prefix, endpoint]);
      return response.data;
    },
    [prefix, endpoint, queryClient]
  );

  const forceDeleteData = useCallback(
    async (id) => {
      const url = `${prefix}${endpoint}/${id}/`;
      const response = await apiClientAdmin.delete(url);
      queryClient.invalidateQueries([prefix, endpoint]);
      return response.data;
    },
    [prefix, endpoint, queryClient]
  );

  // Hook Usage: Fetch data by ID
  const { dataById, errorById, isLoadingById } = useDataById(prefix, endpoint, internalId, handleError);
  const fetchDataById = useCallback(
    (id) => {
      setInternalId(id);
    },
    []
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
    fetchDataById, // Return fetchDataById function
    ById: {
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
      setCurrentPage,
      totalPages,
    },
  };
};
