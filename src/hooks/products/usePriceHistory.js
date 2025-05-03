import { useProjectSettings } from "../settings/useProjectSettings";
import { useApiV2 } from "../useApi/useApiV2";

export const usePriceHistory = (productId) => {
  const { settings: { locale, project } } = useProjectSettings();

  const endpoint = `/${locale}/${project}/ecommerce/products/m/products/${productId}/price-history/`;

  const {
    data,
    error,
    loading,
    fetchData,
    createData,
    updateData,
    deleteData,
    search,
    pagination,
    options,
  } = useApiV2(endpoint, "/priceHistory"); //Changed second arg to /priceHistory to better reflect intent.

  return {
    priceHistory: data,
    errorPriceHistory: error,
    loadingPriceHistory: loading,
    searchPriceHistory: search.handleSearch,
    fetchPriceHistory: fetchData,
    createPriceHistoryEntry: createData,
    updatePriceHistoryEntry: updateData,
    deletePriceHistoryEntry: deleteData,
    totalPagesPriceHistory: pagination.totalPages,
    setCurrentPagePriceHistory: pagination.setCurrentPage,
    currentPage: pagination.currentPage,
    priceHistoryOptions: options,
  };
};