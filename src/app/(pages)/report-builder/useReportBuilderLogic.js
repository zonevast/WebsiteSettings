// useReportBuilderLogic.js
import { useReportStore } from "@/stores/useReportStore";
import { useCallback } from "react";

export const useReportBuilderLogic = () => {
  const {
    reportData,
    setReportData,
    resetReport,
  } = useReportStore();

  const handleSave = useCallback(() => {
    try {
      if (!reportData) {
        throw new Error("No report data available");
      }
      // Implement save logic here
      console.log("Saving report...", reportData);
      // You could add API call here to save to backend
      return true;
    } catch (error) {
      console.error("Save error:", error);
      return false;
    }
  }, [reportData]);

  // Handle downloading the report as CSV
  const handleDownloadCSV = useCallback(() => {
    console.log("CSV Download triggered (dummy)");
  }, []);

  // Handle downloading the report as PDF
  const handleDownloadPDF = useCallback(() => {
    console.log("PDF Download triggered (dummy)");
  }, []);

  const handleProductSelection = useCallback(() => {
    console.log("Product Selection triggered (dummy)");
  }, []);

  // Handle adding a table to the report
  const handleAddTable = useCallback((tableConfig) => {
    setReportData({
      ...reportData,
      tables: [...(reportData.tables || []), tableConfig]
    });
  }, [reportData, setReportData]);

  // Handle editing a table in the report
  const handleEditTable = useCallback((tableId) => {
    // This would typically open the table builder modal with the existing config
    console.log("Edit table:", tableId);
  }, []);

  // Handle deleting a table from the report
  const handleDeleteTable = useCallback((tableId) => {
    setReportData({
      ...reportData,
      tables: (reportData.tables || []).filter(table => table.id !== tableId)
    });
  }, [reportData, setReportData]);

  // Handle adding a text block to the report
  const handleAddTextBlock = useCallback((blockConfig) => {
    setReportData({
      ...reportData,
      textBlocks: [...(reportData.textBlocks || []), blockConfig]
    });
  }, [reportData, setReportData]);

  // Handle updating a text block in the report
  const handleUpdateTextBlock = useCallback((blockId, updatedConfig) => {
    setReportData({
      ...reportData,
      textBlocks: (reportData.textBlocks || []).map(block => 
        block.id === blockId ? { ...block, ...updatedConfig } : block
      )
    });
  }, [reportData, setReportData]);

  return {
    reportData,
    setReportData,
    resetReport,
    handleSave,
    handleDownloadCSV,
    handleDownloadPDF,
    handleProductSelection,
    handleAddTable,
    handleEditTable,
    handleDeleteTable,
    handleAddTextBlock,

    handleUpdateTextBlock
  };
};