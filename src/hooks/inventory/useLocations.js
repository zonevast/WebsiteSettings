import { useProjectSettings } from "../settings/useProjectSettings";
import { useApiV2 } from "../useApi/useApiV2";

export const useLocations = (storageID = null, more = "", pagination = true) => {


    const { settings: {
        locale,
        project,
    } } = useProjectSettings();



    const getEndpoint = `/storage/${storageID}/location`;
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
        locations: data,
        errorLocations: error,
        loadingLocations: loading,
        searchLocations: search,
        totalPagesLocations: pagination1.totalPages,
        fetchLocations: fetchData,
        createLocation: createData,
        updateLocation: updateData,
        deleteLocation: deleteData,
        setCurrentPageLocation: pagination1.setCurrentPage,
        currentPageLocation: pagination1.currentPage,
        // fetchOptionInventory: fetchOptions,
        optionLocation: options,
    };
};
