import { useApiV2 } from "../useApi/useApiV2";
import { useProjectSettings } from "../settings/useProjectSettings";

export const useProductInventory = (more = "", pagination = true, initial = {}) => {
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
        options,
        pagination: pagination1,
        refreshData
    } = useApiV2(`/${locale}/${project}/ecommerce/storage`, `/inventory`, {
        pagination,
        more,
        initial
    });

    return {
        products: data,
        errorProductsInventory: error,
        loadingProductsInventory: loading,
        fetchProductInventory: fetchData,
        refreshProductsData: refreshData,

        search: {
            searchProductsInventory: search.handleSearch,
            searchData: search.searchData,
            searchError: search.searchError,
            isSearchLoading: search.isSearchLoading,
        },

        productInventoryById: {
            fetchProductInventoryById: ById.fetchDataById,
            productInventoryDataById: ById.dataById,
            isLoadingById: ById.isLoadingById,
            errorById: ById.errorById,
        },

        optionProductInventory: options,
        fetchOptions: options.fetchOptions,

        createProductInventory: createData,
        updateProductInventory: updateData,
        deleteProductInventory: deleteData,

        currentPageProductsInventory: pagination1.currentPage,
        totalPagesProductsInventory: pagination1.totalPages,
        setCurrentPageProductInventory: pagination1.setCurrentPage,


    };
};

