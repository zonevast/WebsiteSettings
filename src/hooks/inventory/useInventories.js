"use client";
import { useApiV2 } from "@/hooks/useApi/useApiV2";
import { useProjectSettings } from "../settings/useProjectSettings";


export const useInventories = (more = "", pagination = true) => {
    const { settings: {
        locale,
        project,
    } } = useProjectSettings();

    const {
        data,
        error,
        loading,
        search,
        fetchData,
        createData,
        updateData,
        deleteData,
        // totalPages,
        // setCurrentPage,
        pagination: pagination1,
        options,
    } = useApiV2(`/${locale}/${project}/ecommerce/storage`, `/storage`, {
        pagination,
        more,
    });



    return {
        inventories: data,
        errorInventories: error,
        loadingInventories: loading,
        searchInventories: search,
        totalPagesInventory: pagination1.totalPages,
        fetchInventories: fetchData,
        createInventory: createData,
        updateInventory: updateData,
        deleteInventory: deleteData,
        setCurrentPageInventory: pagination1.setCurrentPage,
        currentPageInventory: pagination1.currentPage,
        // fetchOptionInventory: fetchOptions,
        optionInventory: options,
    };
};

