import { useProjectSettings } from "../settings/useProjectSettings";
import { useApiAdmin } from "../useApi/useApiAdmin";


export const useCustomers = () => {
  const { settings: {
    locale,
    project,
  } } = useProjectSettings();


  const {
    data,
    error,
    loading,
    validationErrors,
    createData,
    updateData,
    deleteData,
    fetchData,
    trash: { fetchTrashedData, restoreData, forceDeleteData },
    ById: { fetchDataById, dataById, isLoadingById, errorById },
    search: { handleSearch, searchData, searchError, isSearchLoading },
    options: { optionsData, optionsError, isOptionsLoading },
    pagination: { currentPage, setCurrentPage, totalPages },
    mutations,
  } = useApiAdmin(`/${locale}/project/${project}`, `/users`, {
    pagination: true,
    notify: true,
    usingParams: true,
  });

  return {
    // Basic CRUD operations
    customers: data,
    errorCustomers: error,
    loadingCustomers: loading,
    validationErrorsCustomers: validationErrors,
    fetchCustomers: fetchData,
    createCustomer: createData,
    updateCustomer: updateData,
    deleteCustomer: deleteData,

    // Single customer operations
    fetchCustomerById: fetchDataById,
    customerById: dataById,
    isLoadingCustomerById: isLoadingById,
    errorCustomerById: errorById,

    // Search functionality
    searchCustomers: handleSearch,
    searchResults: searchData,
    searchError,
    isSearching: isSearchLoading,

    // Trash operations
    fetchTrashedCustomers: fetchTrashedData,
    restoreCustomer: restoreData,
    forceDeleteCustomer: forceDeleteData,

    // Options/Schema
    customerOptions: optionsData,
    optionsError,
    isLoadingOptions: isOptionsLoading,

    // Pagination
    currentPage,
    setCurrentPage,
    totalPages,

    // Mutation states
    mutations,
  };
};
