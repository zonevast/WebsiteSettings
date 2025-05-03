"use client";
import React, { useState } from "react";
import { Button, Tabs, Tab, Input } from "@nextui-org/react";
import { Download, FileText, Calendar, History, Plus } from "lucide-react";
import { ExportHistoryTab } from "@/components/exportData/ExportHistoryTab";
import { ScheduledExportsTab } from "@/components/exportData/ScheduledExportsTab";
import { useDisclosure } from "@nextui-org/react";
import { ScheduleExportModal } from "@/components/exportData/ScheduledExportsTab/ScheduleExportModal";
import { motion, AnimatePresence } from "framer-motion";

const ExportDataPage = () => {
  const [activeTab, setActiveTab] = useState("history");

  const {
    isOpen: isScheduleModalOpen,
    onOpen: onScheduleModalOpen,
    onClose: onScheduleModalClose,
  } = useDisclosure();

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Export Data
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Export reports in various formats for analysis and sharing
          </p>
        </div>

        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            as="a"
            href="/reports"
            color="primary"
            variant="flat"
            startContent={<FileText size={16} />}
          >
            My Reports
          </Button>
          <Button
            color="primary"
            startContent={<Plus size={16} />}
            onClick={onScheduleModalOpen}
          >
            New Schedule
          </Button>
        </motion.div>
      </div>

      {/* Tabs */}
      <Tabs
        aria-label="Export Options"
        selectedKey={activeTab}
        onSelectionChange={setActiveTab}
        color="primary"
        variant="underlined"
        classNames={{
          tabList:
            "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-primary",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-primary",
        }}
      >
        <Tab
          key="history"
          title={
            <div className="flex items-center gap-2">
              <History size={18} />
              <span>Export History</span>
            </div>
          }
        />
        <Tab
          key="scheduled"
          title={
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>Scheduled Exports</span>
            </div>
          }
        />
      </Tabs>

      {/* Tab Content with Animation */}
      <AnimatePresence mode="wait">
        {activeTab === "history" ? (
          <motion.div
            key="history"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <ExportHistoryTab />
          </motion.div>
        ) : (
          <motion.div
            key="scheduled"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <ScheduledExportsTab onScheduleClick={onScheduleModalOpen} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Schedule Modal */}
      <ScheduleExportModal
        isOpen={isScheduleModalOpen}
        onClose={onScheduleModalClose}
      />
    </div>
  );
};

export default ExportDataPage;
