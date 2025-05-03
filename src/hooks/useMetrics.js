import {useChart} from "./useChart";

export const useMetrics = (extend = "") => {
    const appendQueryParams = (url, extend) => {
        // Check if the URL ends with '/' and does not already contain query params
        if (url.endsWith("/") && !url.includes("?")) {
            return url + "?" + extend;
        } else if (url.includes("?")) {
            return url + "&" + extend;
        } else {
            return url + "?" + extend;
        }
    };

    const metricsConfig = {
        orderMetrics: appendQueryParams("ecommerce/orders/m/orders/chart/", extend),
        salesMetrics: appendQueryParams("ecommerce/orders/m/invoices/chart/?value_type=sum&name=total", extend),
        customerMetrics: appendQueryParams("ecommerce/orders/m/orders/chart/?name=customer", extend),
        productMetrics: appendQueryParams("ecommerce/storage/products/chart/?value_type=sum&name=buying_price", extend),

        // New metrics
        regionMetrics: appendQueryParams("ecommerce/orders/m/orders/chart/?group_by=address__governorate__name", extend),
        shippingStatusMetrics: appendQueryParams("ecommerce/orders/m/orders/chart/?group_by=status__label", extend),
        paymentStatusMetrics: appendQueryParams("ecommerce/orders/m/invoices/chart/?group_by=payment", extend),

        // Stock-related metrics
        expiredCount: appendQueryParams("ecommerce/storage/products/chart/?is_expired=true", extend),
        inStockCount: appendQueryParams("ecommerce/storage/products/chart/?stock=in_stock", extend),
        lowStockCount: appendQueryParams("ecommerce/storage/products/chart/?stock=low_stock", extend),
        outOfStockCount: appendQueryParams("ecommerce/storage/products/chart/?stock=out_of_stock", extend),
    };

    const {data, error, isLoading} = useChart(metricsConfig);

    return {
        // Existing metrics
        orderMetrics: data.orderMetrics,
        errorOrderMetrics: error.orderMetrics,
        loadingOrderMetrics: isLoading.orderMetrics,

        salesMetrics: data.salesMetrics,
        errorSalesMetrics: error.salesMetrics,
        loadingSalesMetrics: isLoading.salesMetrics,

        customerMetrics: data.customerMetrics,
        errorCustomerMetrics: error.customerMetrics,
        loadingCustomerMetrics: isLoading.customerMetrics,

        productMetrics: data.productMetrics,
        errorProductMetrics: error.productMetrics,
        loadingProductMetrics: isLoading.productMetrics,

        // New metrics
        regionMetrics: data.regionMetrics,
        errorRegionMetrics: error.regionMetrics,
        loadingRegionMetrics: isLoading.regionMetrics,

        shippingStatusMetrics: data.shippingStatusMetrics,
        errorShippingStatusMetrics: error.shippingStatusMetrics,
        loadingShippingStatusMetrics: isLoading.shippingStatusMetrics,

        paymentStatusMetrics: data.paymentStatusMetrics,
        errorPaymentStatusMetrics: error.paymentStatusMetrics,
        loadingPaymentStatusMetrics: isLoading.paymentStatusMetrics,

        // Stock-related metrics
        expiredCount: data.expiredCount,
        errorExpiredCount: error.expiredCount,
        loadingExpiredCount: isLoading.expiredCount,

        inStockCount: data.inStockCount,
        errorInStockCount: error.inStockCount,
        loadingInStockCount: isLoading.inStockCount,

        lowStockCount: data.lowStockCount,
        errorLowStockCount: error.lowStockCount,
        loadingLowStockCount: isLoading.lowStockCount,

        outOfStockCount: data.outOfStockCount,
        errorOutOfStockCount: error.outOfStockCount,
        loadingOutOfStockCount: isLoading.outOfStockCount,
    };
};

// example :
// profit : https://apitest.zonevast.com/en/azTech/storage/products/chart/?name=(product__specification__selling_price-buying_price)*quantity&value_type=sum
// price all product :  https://apitest.zonevast.com/en/azTech/products/m/products/chart/?name=specification__selling_price&value_type=sum
// price all inventory product : https://apitest.zonevast.com/en/azTech/storage/products/chart/?name=buying_price*quantity&value_type=sum
// order by region : https://apitest.zonevast.com/en/azTech/orders/m/orders/chart/?group_by=address__governorate__name
// status count : https://apitest.zonevast.com/en/azTech/orders/m/orders/chart/?group_by=status__label

// expired count : https://apitest.zonevast.com/en/azTech/storage/products/chart/?is_expired=true
// in_stock count : https://apitest.zonevast.com/en/azTech/storage/products/chart/?stock=in_stock
// low_stock count : https://apitest.zonevast.com/en/azTech/storage/products/chart/?stock=low_stock
// out_of_stock count : https://apitest.zonevast.com/en/azTech/storage/products/chart/?stock=out_of_stock
