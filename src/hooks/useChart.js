import { useState, useCallback } from "react";
import { useChart as useChartBase } from "./metrics/useChart";

/**
 * A custom hook to fetch chart data for the dashboard
 * 
 * @param {Object} metricsConfig - Configuration object with endpoints to fetch data from
 * @param {Object} options - Additional options for the chart
 * @returns {Object} - An object containing data, error and loading states
 */
export const useChart = (metricsConfig, options = {}) => {
  // Time period filter - can be used to filter data by time (day, week, month, year)
  const [timeFilter, setTimeFilter] = useState(options.defaultTimeFilter || "month");

  // Use the base chart hook to fetch data
  const { data, error, isLoading, setParams } = useChartBase(metricsConfig, {
    queryKey: "dashboardCharts",
    notify: options.notify !== false,
    initialParams: {
      time_period: timeFilter,
      ...options.initialParams
    },
  });

  // Function to change the time filter
  const changeTimeFilter = useCallback((newFilter) => {
    setTimeFilter(newFilter);
    setParams(prev => ({
      ...prev,
      time_period: newFilter
    }));
  }, [setParams]);

  // The structure of chart data is expected to be:
  // { chartKey: { categories: [], values: [] }, ... }

  // Calculate totals for each chart
  const totals = Object.keys(data).reduce((acc, key) => {
    if (data[key] && Array.isArray(data[key].values)) {
      acc[key] = data[key].values.reduce((sum, value) => sum + (value || 0), 0);
    } else {
      acc[key] = 0;
    }
    return acc;
  }, {});

  // Calculate the latest value for each chart
  const latest = Object.keys(data).reduce((acc, key) => {
    if (data[key] && Array.isArray(data[key].values) && data[key].values.length > 0) {
      acc[key] = data[key].values[data[key].values.length - 1] || 0;
    } else {
      acc[key] = 0;
    }
    return acc;
  }, {});

  return {
    data,
    error,
    isLoading,
    setParams,
    timeFilter,
    changeTimeFilter,
    totals,
    latest
  };
}; 