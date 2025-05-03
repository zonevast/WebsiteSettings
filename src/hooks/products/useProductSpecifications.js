"use client";
import { useApiV2 } from "@/hooks/useApi/useApiV2";
import { useProjectSettings } from "../settings/useProjectSettings";

export const useProductSpecifications = (more, pagination = true, initial = {}) => {
    const { settings: {
        locale,
        project,
    } } = useProjectSettings();

    const {
        data,
        error,
        loading,
        search,
        createData,
        updateData,
        deleteData,
        fetchData,
        ById,
        refreshData,
        options,
        pagination: pageination1,
    } = useApiV2(`/${locale}/${project}/ecommerce/products/m`, `/specification`, {
        pagination,
        more,
        initial,
    });

    return {
        // Product Specifications Data
        productSpecifications: data, // Renamed data to be specific
        errorProductSpecifications: error, // Renamed error
        loadingProductSpecifications: loading, // Renamed loading
        fetchProductSpecifications: fetchData, // Renamed fetch
        refreshSpecificationsData: refreshData,
        
        search: {
            searchProductSpecifications: search.handleSearch, // Renamed search handler
            searchData: search.searchData,
            searchError: search.searchError,
            isSearchLoading: search.isSearchLoading,
        },

        productSpecificationById: { // Renamed to singular
            fetchProductSpecificationById: ById.fetchDataById, // Renamed fetch
            productSpecificationDataById: ById.dataById, // Renamed data
            isLoadingById: ById.isLoadingById,
            errorById: ById.errorById,
        },

        optionProductSpecification: options.optionsData, // Renamed options data
        fetchOptions: options.fetchOptions,

        createProductSpecification: createData, // Renamed create
        updateProductSpecification: updateData, // Renamed update
        deleteProductSpecification: deleteData, // Renamed delete

        currentPageProductSpecifications: pageination1.currentPage, // Renamed current page
        totalPagesProductSpecifications: pageination1.totalPages, // Renamed total pages
        setCurrentPageProductSpecifications: pageination1.setCurrentPage, // Renamed set current page
    };
};