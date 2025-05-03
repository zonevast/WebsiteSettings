"use client";
import { useApiV2 } from "@/hooks/useApi/useApiV2";
import { useProjectSettings } from "../settings/useProjectSettings";

export const useVendors = () => {
    const { settings: {
        locale,
        project,
    } } = useProjectSettings();
    const {
        data,
        error,
        loading: isLoading,
        validationErrors,
        createData: createMutation,
        updateData: updateMutation,
        deleteData: deleteMutation,
        fetchData,

        trash: { fetchTrashedData, restoreData, forceDeleteData },
        ById: { fetchDataById, dataById, isLoadingById, errorById },
        search: { handleSearch, searchData, searchError, isSearchLoading },
        options,
        pagination: { currentPage, setCurrentPage, totalPages },
    } = useApiV2(`/${locale}/${project}/ecommerce/storage`, `/vendor`);

    return {
        vendors: data,
        errorVendors: error,
        loadingVendors: isLoading,
        validationErrors,
        createVendor: createMutation,
        updateVendor: updateMutation,
        deleteVendor: deleteMutation,
        fetchVendors: fetchData,

        trashVendors: {
            fetchTrashedVendors: fetchTrashedData,
            restoreVendor: restoreData,
            forceDeleteVendor: forceDeleteData,
        },
        getVendorById: fetchDataById,
        vendorById: dataById,
        loadingVendorById: isLoadingById,
        errorVendorById: errorById,

        searchVendors: {
            handleVendorSearch: handleSearch,
            vendorSearchData: searchData,
            vendorSearchError: searchError,
            loadingVendorSearch: isSearchLoading,
        },

        optionsVendor: options,

        paginationVendors: {
            currentPageVendor: currentPage,
            setCurrentPageVendor: setCurrentPage,
            totalPagesVendor: totalPages,
        },
    };
};