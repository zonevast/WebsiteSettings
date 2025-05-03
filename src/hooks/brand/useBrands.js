import { useProjectSettings } from "../settings/useProjectSettings";
import { useApiV2 } from "../useApi/useApiV2";

export const useBrands = (more, pagination = true, initial = {}) => {
  const { settings: { locale, project } } = useProjectSettings();

  const {
    data,
    error,
    loading,
    fetchData,
    createData,
    updateData,
    deleteData,
    search,
    pagination: pagination1,
    options,
    refreshData,
    ById, // Ensure ById is included
  } = useApiV2(`/${locale}/${project}/ecommerce/products`, "/brands", {
    pagination,
    more,
    initial,
  });

  return {
    brands: data,
    errorBrands: error,
    loadingBrands: loading,

    search: {
      searchBrands: search.handleSearch,
      searchData: search.searchData,
      searchError: search.searchError,
      isSearchLoading: search.isSearchLoading,
    },

    fetchBrands: fetchData,
    refreshBrands: refreshData, // Added missing refresh function
    createBrand: createData,
    updateBrand: updateData,
    deleteBrand: deleteData,

    brandById: {  // Added ById support
      fetchBrandById: ById.fetchDataById,
      brandDataById: ById.dataById,
      isLoadingById: ById.isLoadingById,
      errorById: ById.errorById,
    },

    totalPagesBrands: pagination1.totalPages,
    setCurrentPageBrands: pagination1.setCurrentPage,
    currentPage: pagination1.currentPage,

    brandsOptions: options.optionsData, // Updated options handling
    fetchBrandOptions: options.fetchOptions, // Added fetchOptions function
  };
};
