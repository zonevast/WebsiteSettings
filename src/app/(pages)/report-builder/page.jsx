// ReportBuilder.jsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useReportBuilderLogic } from "./useReportBuilderLogic";
import { ReportContent } from "./ReportContent";
import { AbilitiesPanel } from "@/components/reports/Builder/AbilitiesPanel";

export default function ReportBuilder() {
  const t = useTranslations("ReportBuilderPage");

  const {
    reportData,
    handleDownloadCSV,
    handleDownloadPDF,
    handleAddTable,
    handleEditTable,
    handleDeleteTable,
    handleAddTextBlock,
  } = useReportBuilderLogic();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {reportData.template?.title || t("reportTitle")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t("description")}
            </p>
          </div>
        </div>
        <AbilitiesPanel
          onAddTextBlock={handleAddTextBlock}
          onAddChart={() => console.log("Add Chart")}
          onAddTable={handleAddTable}
          reportData={reportData}
        />

        <div>
          {/* Report Content */}
          <ReportContent
            reportData={reportData}
            onEditTable={handleEditTable}
            onDeleteTable={handleDeleteTable}
          />
        </div>
      </motion.div>
    </div>
  );
}
