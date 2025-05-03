"use client";
import { useApiV2 } from "@/hooks/useApi/useApiV2";
import { useProjectSettings } from "../settings/useProjectSettings";

export const useProducts = (more, pagination = true, initial = {}) => {
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
        pagination: pagination1,
    } = useApiV2(`/${locale}/${project}/ecommerce/products/m`, `/products`, {
        pagination,
        more,
        initial,
    });

    return {
        // Products Data
        products: data,
        errorProducts: error,
        loadingProducts: loading,
        fetchProducts: fetchData,
        refreshData: refreshData,
        search: {
            searchProducts: search.handleSearch,
            searchData: search.searchData,
            searchError: search.searchError,
            isSearchLoading: search.isSearchLoading,
        },

        productById: {
            fetchProductById: ById.fetchDataById,
            productDataById: ById.dataById,
            isLoadingById: ById.isLoadingById,
            errorById: ById.errorById,
        },

        optionProduct: options.optionsData,
        fetchOptions: options.fetchOptions,

        createProduct: createData,
        updateProduct: updateData,
        deleteProduct: deleteData,

        currentPageProducts: pagination1.currentPage,
        totalPagesProducts: pagination1.totalPages,
        setCurrentPageProducts: pagination1.setCurrentPage,
    };
};



