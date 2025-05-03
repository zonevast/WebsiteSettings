import { useProjectSettings } from "../settings/useProjectSettings";
import { useApiV2 } from "../useApi/useApiV2";

export const useBlocks = (storageID = null, more = "", pagination = true) => {

    const { settings: {
        locale,
        project,
    } } = useProjectSettings();


    const getEndpoint = `/storage/${storageID}/block`;
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
    } = useApiV2(`/${locale}/${project}/ecommerce/storage`, getEndpoint, {
        pagination,
        more,
    });


    return {
        blocks: data,
        errorBlocks: error,
        loadingBlocks: loading,
        searchBlocks: search,
        totalPagesBlock: pagination1.totalPages,
        fetchBlocks: fetchData,
        createBlock: createData,
        updateBlock: updateData,
        deleteBlock: deleteData,
        setCurrentPageBlock: pagination1.setCurrentPage,
        currentPageBlock: pagination1.currentPage,
        // fetchOptionInventory: fetchOptions,
        optionBlock: options,
    };
};
