import { useChart } from "./useChart";

export const useMetricsOrders = (extend = "") => {
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

        // New metrics
        regionMetrics: appendQueryParams("ecommerce/orders/m/orders/chart/?group_by=address__governorate__name", extend),
        shippingStatusMetrics: appendQueryParams("ecommerce/orders/m/orders/chart/?group_by=status__label", extend),
        paymentStatusMetrics: appendQueryParams("ecommerce/orders/m/invoices/chart/?group_by=payment", extend),


    };

    const { data, error, isLoading } = useChart(metricsConfig);

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


    };
};

