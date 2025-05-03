import { useProjectSettings } from "../settings/useProjectSettings";
import { useApiV2 } from "../useApi/useApiV2";

export const useCoupons = () => {

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
    } = useApiV2(`/${locale}/${project}/ecommerce/orders/m`, "/coupons");

    return {
        coupons: data,
        errorCoupons: error,
        loadingCoupons: loading,
        fetchCoupons: fetchData,
        createCoupon: createData,
        updateCoupon: updateData,
        deleteCoupon: deleteData,
        currentPageCoupons: currentPage,
        totalPagesCoupons: totalPages,
        setCurrentPageCoupons: setCurrentPage,
    };
};
