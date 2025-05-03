import { useProjectSettings } from "../settings/useProjectSettings";
import { useApiV2 } from "../useApi/useApiV2";

export const useCategories = (more, pagination = true, initial = {}) => {
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
    refreshData,  // Added refreshData
  } = useApiV2(`/${locale}/${project}/ecommerce/products/m`, "/categories", {
    pagination,
    more,
    initial,
  });

  return {
    categories: data,
    errorCategories: error,
    loadingCategories: loading,

    search: {
      searchCategories: search.handleSearch,
      searchData: search.searchData,
      searchError: search.searchError,
      isSearchLoading: search.isSearchLoading,
    },

    fetchCategories: fetchData,
    refreshCategories: refreshData,
    createCategory: createData,
    updateCategory: updateData,
    deleteCategory: deleteData,

    totalPagesCategories: pagination1.totalPages,
    setCurrentPageCategories: pagination1.setCurrentPage,
    currentPage: pagination1.currentPage,

    categoriesOptions: options.optionsData,
    fetchCategoryOptions: options.fetchOptions,
  };
};
