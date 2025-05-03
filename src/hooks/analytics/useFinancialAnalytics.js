import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useChart } from "../useChart";
import { 
  TrendUp, 
  TrendDown, 
  Wallet, 
  CreditCard, 
  Receipt, 
  ArrowUpRight,
  PieChart,
  DollarSign
} from "lucide-react";

/**
 * Custom hook for fetching and processing financial analytics data
 * 
 * @param {Object} options - Options for the hook
 * @param {string} options.timeFilter - Time filter to apply
 * @param {string} options.extend - Additional query parameters
 * @returns {Object} - Financial analytics data
 */
export const useFinancialAnalytics = ({ timeFilter = "monthly", extend = "" } = {}) => {
  const t = useTranslations("FinancialAnalytics");

  // Append query parameters to the URL
  const appendQueryParams = (url, extend) => {
    if (url.endsWith("/") && !url.includes("?")) {
      return url + "?" + extend;
    } else if (url.includes("?")) {
      return url + "&" + extend;
    } else {
      return url + "?" + extend;
    }
  };

  // Configure metrics endpoints
  const metricsConfig = {
    revenueMetrics: appendQueryParams(`ecommerce/orders/m/invoices/chart/?value_type=sum&name=total&time_period=${timeFilter}`, extend),
    profitMetrics: appendQueryParams(`ecommerce/storage/products/chart/?name=(product__specification__selling_price-buying_price)*quantity&value_type=sum&time_period=${timeFilter}`, extend),
    paymentMethodMetrics: appendQueryParams(`ecommerce/orders/m/invoices/chart/?group_by=payment&time_period=${timeFilter}`, extend),
    expensesMetrics: appendQueryParams(`ecommerce/inventory/expenses/chart/?value_type=sum&name=amount&time_period=${timeFilter}`, extend),
    refundsMetrics: appendQueryParams(`ecommerce/orders/m/returns/chart/?value_type=sum&name=amount&time_period=${timeFilter}`, extend),
    taxMetrics: appendQueryParams(`ecommerce/orders/m/invoices/chart/?value_type=sum&name=tax&time_period=${timeFilter}`, extend),
    unpaidInvoices: appendQueryParams(`ecommerce/orders/m/invoices/chart/?status=unpaid&time_period=${timeFilter}`, extend),
    paidInvoices: appendQueryParams(`ecommerce/orders/m/invoices/chart/?status=paid&time_period=${timeFilter}`, extend),
  };

  // Fetch data using the useChart hook
  const { data, error, isLoading } = useChart(metricsConfig);

  // Helper function to calculate percentage change
  const calculateChange = (values) => {
    if (!values || values.length < 2) return 0;
    
    const current = values[values.length - 1] || 0;
    const previous = values[values.length - 2] || 0;
    
    if (previous === 0) return current > 0 ? 100 : 0;
    
    return parseFloat(((current - previous) / previous * 100).toFixed(2));
  };

  // Create stats using the data from API
  const stats = useMemo(() => {
    if (isLoading) return [];

    return [
      {
        title: t("totalRevenue"),
        value: data.revenueMetrics?.values[data.revenueMetrics.values.length - 1] || 0,
        trend: calculateChange(data.revenueMetrics?.values) >= 0 ? "up" : "down",
        change: `${calculateChange(data.revenueMetrics?.values)}%`,
        description: t("revenueDescription"),
        icon: DollarSign,
        iconColor: "text-green-600",
        bgGradient: "bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
      },
      {
        title: t("totalProfit"),
        value: data.profitMetrics?.values[data.profitMetrics.values.length - 1] || 0,
        trend: calculateChange(data.profitMetrics?.values) >= 0 ? "up" : "down",
        change: `${calculateChange(data.profitMetrics?.values)}%`,
        description: t("profitDescription"),
        icon: ArrowUpRight,
        iconColor: "text-blue-600",
        bgGradient: "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
      },
      {
        title: t("totalExpenses"),
        value: data.expensesMetrics?.values[data.expensesMetrics.values.length - 1] || 0,
        trend: calculateChange(data.expensesMetrics?.values) >= 0 ? "up" : "down",
        change: `${calculateChange(data.expensesMetrics?.values)}%`,
        description: t("expensesDescription"),
        icon: Wallet,
        iconColor: "text-orange-600",
        bgGradient: "bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20",
      },
      {
        title: t("totalTax"),
        value: data.taxMetrics?.values[data.taxMetrics.values.length - 1] || 0,
        trend: calculateChange(data.taxMetrics?.values) >= 0 ? "up" : "down",
        change: `${calculateChange(data.taxMetrics?.values)}%`,
        description: t("taxDescription"),
        icon: Receipt,
        iconColor: "text-purple-600",
        bgGradient: "bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
      },
      {
        title: t("totalRefunds"),
        value: data.refundsMetrics?.values[data.refundsMetrics.values.length - 1] || 0,
        trend: calculateChange(data.refundsMetrics?.values) >= 0 ? "up" : "down",
        change: `${calculateChange(data.refundsMetrics?.values)}%`,
        description: t("refundsDescription"),
        icon: TrendDown,
        iconColor: "text-red-600",
        bgGradient: "bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20",
      },
      {
        title: t("paymentMethods"),
        value: Object.keys(data.paymentMethodMetrics?.categories || {}).length || 0,
        trend: "up",
        change: "0%",
        description: t("paymentMethodsDescription"),
        icon: CreditCard,
        iconColor: "text-indigo-600",
        bgGradient: "bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20",
      },
      {
        title: t("invoicesPaid"),
        value: data.paidInvoices?.values[data.paidInvoices.values.length - 1] || 0,
        trend: calculateChange(data.paidInvoices?.values) >= 0 ? "up" : "down",
        change: `${calculateChange(data.paidInvoices?.values)}%`,
        description: t("invoicesPaidDescription"),
        icon: TrendUp,
        iconColor: "text-emerald-600",
        bgGradient: "bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20",
      },
      {
        title: t("invoicesUnpaid"),
        value: data.unpaidInvoices?.values[data.unpaidInvoices.values.length - 1] || 0,
        trend: calculateChange(data.unpaidInvoices?.values) >= 0 ? "up" : "down",
        change: `${calculateChange(data.unpaidInvoices?.values)}%`,
        description: t("invoicesUnpaidDescription"),
        icon: PieChart,
        iconColor: "text-amber-600",
        bgGradient: "bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20",
      },
    ];
  }, [data, isLoading, t]);

  // Prepare payment method data for chart
  const paymentMethodData = useMemo(() => {
    if (!data.paymentMethodMetrics || !data.paymentMethodMetrics.categories) {
      return [];
    }

    return Object.keys(data.paymentMethodMetrics.categories).map((key) => ({
      name: key,
      value: data.paymentMethodMetrics.categories[key][data.paymentMethodMetrics.categories[key].length - 1] || 0,
    }));
  }, [data.paymentMethodMetrics]);

  // Return the processed data
  return {
    stats,
    paymentMethodData,
    revenueMetrics: data.revenueMetrics,
    profitMetrics: data.profitMetrics,
    expensesMetrics: data.expensesMetrics,
    refundsMetrics: data.refundsMetrics,
    taxMetrics: data.taxMetrics,
    paymentMethodMetrics: data.paymentMethodMetrics,
    unpaidInvoices: data.unpaidInvoices,
    paidInvoices: data.paidInvoices,
    isLoading,
    error,
  };
}; 