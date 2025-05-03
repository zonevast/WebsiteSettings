// useTableBuilderModal.js
import { useState } from "react";
import { useTranslations } from "next-intl";

export const useTableBuilderModal = () => {
  const t = useTranslations("ReportBuilderPage.TableBuilderModal.useTableBuilderModal"); // Changed translation key
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSource, setSelectedSource] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [filters, setFilters] = useState([]);
  const [tableName, setTableName] = useState("");

  const steps = [
    {
      title: t("dataSource"),
      description: t("dataSourceStepDescription"),
    },
    {
      title: t("filters"),
      description: t("filtersStepDescription"),
    },
  ];

  // Updated data sources with real order fields
  const dataSources = [
    {
      id: "orders",
      name: t("orders"), // Translated
      fields: [
        { id: "id", name: t("orderId") }, // Translated
        { id: "created_at", name: t("orderDate") }, // Translated
        { id: "customer", name: t("customer") },  // Translated
        { id: "status", name: t("status") },  // Translated
        { id: "payment_status", name: t("paymentStatus") }, // Translated
        { id: "total_amount", name: t("totalAmount") }, // Translated
        { id: "tags", name: t("tags") }, // Translated
        { id: "updated_at", name: t("lastUpdated") }, // Translated
      ],
    },
    {
      id: "products",
      name: t("products"), // Translated
      fields: [
        { id: "id", name: t("productId") }, // Translated
        { id: "title", name: t("name") }, // Translated
        { id: "content", name: t("description") }, // Translated
        { id: "tags", name: t("tags") }, // Translated
        { id: "category", name: t("category") }, // Translated
        { id: "specification.0.selling_price", name: t("price") }, // Translated
        { id: "specification.0.profit_percent", name: t("profitPercent") }, // Translated
        { id: "specification.0.main_attachment.path", name: t("mainImage") }, // Translated
        { id: "brand", name: t("brand") }, // Translated
        { id: "schema", name: t("schema") }, // Translated
        { id: "visibility_status", name: t("visibility") }, // Translated
        { id: "created_at", name: t("createdDate") } // Translated
      ],
    },
    {
      id: "customers",
      name: t("customers"), // Translated
      fields: [
        { id: "id", name: t("customerId") }, // Translated
        { id: "name", name: t("name") }, // Translated
        { id: "email", name: t("email") }, // Translated
        { id: "phone", name: t("phone") }, // Translated
        { id: "total_orders", name: t("totalOrders") }, // Translated
      ],
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreateTable = () => {
    // Generate a unique ID for the table
    const tableId = `table_${Date.now()}`;

    // Get the data source name for display
    const dataSourceName = dataSources.find(ds => ds.id === selectedSource)?.name || selectedSource;

    // Create the table configuration
    const tableConfig = {
      id: tableId,
      name: tableName || `${dataSourceName} Table`,
      dataSource: selectedSource,
      columns: selectedColumns.length > 0 ? selectedColumns : null, // If no columns selected, use all
      filters: filters,
      createdAt: new Date().toISOString(),
    };

    return tableConfig;
  };

  return {
    currentStep,
    handleNext,
    handleBack,
    selectedSource,
    setSelectedSource,
    selectedColumns,
    setSelectedColumns,
    filters,
    setFilters,
    tableName,
    setTableName,
    handleCreateTable,
    steps,
    dataSources,
  };
};

