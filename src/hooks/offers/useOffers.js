import { useProjectSettings } from "../settings/useProjectSettings";
import { useApiV2 } from "../useApi/useApiV2";

export const useOffers = () => {
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
        pagination: { currentPage, setCurrentPage, totalPages },
    } = useApiV2(`/${locale}/${project}/ecommerce/products`, "/discount/product");

    return {
        offers: data,
        errorOffers: error,
        loadingOffers: loading,
        fetchOffers: fetchData,
        createOffer: createData,
        updateOffer: updateData,
        deleteOffer: deleteData,
        currentPageOffers: currentPage,
        totalPagesOffers: totalPages,
        setCurrentPageOffers: setCurrentPage,
    };
};