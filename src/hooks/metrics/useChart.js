import { useState, useCallback } from "react";
import { useQueries } from "react-query";
import { apiClient } from "@/config/request";
import { useNotification } from "@/components/CustomNotification/NotificationProvider";
import { useProjectSettings } from "../settings/useProjectSettings";

export const useChart = (endpoints, config = {}) => {
  const {
    notify = true, // Whether to show notifications
    queryKey = "chartData", // Base React Query key
    initialParams = {}, // Initial query params
  } = config;

  const { sendNotification } = useNotification();
  const [params, setParams] = useState(initialParams);
  const { settings: {
    locale,
    project,
  } } = useProjectSettings();

  // Error handling for notifications
  const handleError = useCallback(
    (err, endpointKey) => {
      if (err.response?.status === 500) {
        sendNotification(`Server error on ${endpointKey}: No connection to the server`, "warning");
      } else if (err.message === "Network Error") {
        sendNotification(`Network issue on ${endpointKey}.`, "warning");
      } else if (notify) {
        sendNotification(`Failed to fetch data for ${endpointKey}: ${err.message}`, "error");
      }
    },
    [notify, sendNotification]
  );

  // Fetch chart data for a specific endpoint
  const fetchChartData = useCallback(
    async (endpointKey, endpointPath) => {
      const queryString = Object.entries(params)
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join("&");

      const url = `/en/${project}/${endpointPath}`;


      const response = await apiClient.get(url);
      return response.data;
    },
    [params]
  );

  // Generate queries for each endpoint using useQueries
  const queries = useQueries(
    Object.entries(endpoints).map(([key, path]) => ({
      queryKey: [queryKey, key, params],
      queryFn: () => fetchChartData(key, path),
      staleTime: 600000, // Cache time
      refetchOnWindowFocus: false,
      onError: (err) => handleError(err, key),
    }))
  );

  // Aggregate results, loading states, and error states
  const results = queries.reduce((acc, query, idx) => {
    const key = Object.keys(endpoints)[idx];
    acc[key] = query.data || null;
    return acc;
  }, {});

  const loadingStates = queries.reduce((acc, query, idx) => {
    const key = Object.keys(endpoints)[idx];
    acc[key] = query.isLoading;
    return acc;
  }, {});

  const errorStates = queries.reduce((acc, query, idx) => {
    const key = Object.keys(endpoints)[idx];
    acc[key] = query.error || null;
    return acc;
  }, {});

  return {
    data: results,
    error: errorStates,
    isLoading: loadingStates,
    setParams,
  };
};
