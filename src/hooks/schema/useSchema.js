"use client";
import { useApiV2 } from "@/hooks/useApi/useApiV2";
import { useProjectSettings } from "../settings/useProjectSettings";

export const useSchema = (more, pagination = true, initial = {}) => {
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
    } = useApiV2(`/${locale}/${project}/ecommerce/products`, `/schema`, {
        pagination,
        more,
        initial,
    });

    return {

        schema: data,
        errorSchema: error,
        loadingSchema: loading,
        fetchSchema: fetchData,
        refreshData: refreshData,
        search: {
            searchSchemas: search.handleSearch,
            searchData: search.searchData,
            searchError: search.searchError,
            isSearchLoading: search.isSearchLoading,
        },

        schemaById: {
            fetchSchemaById: ById.fetchDataById,
            schemaDataById: ById.dataById,
            isLoadingById: ById.isLoadingById,
            errorById: ById.errorById,
        },

        optionSchema: options.optionsData,
        fetchOptions: options.fetchOptions,

        createSchema: createData,
        updateSchema: updateData,
        deleteSchema: deleteData,

        currentPageSchema: pagination1.currentPage,
        totalPagesSchema: pagination1.totalPages,
        setCurrentPageSchema: pagination1.setCurrentPage,
    };
};