import { useApiV2 } from "../useApi/useApiV2";
import { useProjectSettings } from "../settings/useProjectSettings";

export const useCollections = () => {
    const { settings: {
        locale,
        project,
    } } = useProjectSettings();


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
    } = useApiV2(`/en/${project}/ecommerce/products/`, "collection");

    return {
        collections: data,
        errorCollections: error,
        loadingCollections: loading,
        searchCollections: search.handleSearch,
        fetchCollections: fetchData,
        createCollections: createData,
        updateCollections: updateData,
        deleteCollections: deleteData,
        totalPagesCollections: pagination.totalPages,
        setCurrentPageCollections: pagination.setCurrentPage,
        currentPageCollections: pagination.currentPage,
        collectionOptions: options,
    };
};