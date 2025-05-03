import { useChart } from "./useChart";

export const useMetricsSells = (extend = "") => {
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
        salesMetrics: appendQueryParams("ecommerce/orders/m/sells/chart/?value_type=sum&name=total", extend),
        customerMetrics: appendQueryParams("ecommerce/orders/m/sells/chart/?name=customer", extend),

        // New metrics
        regionMetrics: appendQueryParams("ecommerce/orders/m/sells/chart/?group_by=address__governorate__name", extend),
        paymentStatusMetrics: appendQueryParams("ecommerce/orders/m/invoices/chart/?group_by=payment", extend), // Assuming invoices are relevant for sells
    };

    const { data, error, isLoading } = useChart(metricsConfig);

    return {
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

        paymentStatusMetrics: data.paymentStatusMetrics,
        errorPaymentStatusMetrics: error.paymentStatusMetrics,
        loadingPaymentStatusMetrics: isLoading.paymentStatusMetrics,
    };
};