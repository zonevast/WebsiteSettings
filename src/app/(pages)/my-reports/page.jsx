"use client";
import React, { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tabs,
  Tab,
  useDisclosure,
} from "@nextui-org/react";
import {
  Search,
  Filter,
  ChevronDown,
  FileText,
  Package,
  Users,
  Layers,
  ShoppingBag,
  Download,
} from "lucide-react";
import { ExportReportModal } from "@/components/exportData/ExportHistoryTab/ExportReportModal";
import { MyReportsTab } from "@/components/myReports/MyReportsTab";
import { UsedTemplatesTab } from "@/components/myReports/UsedTemplatesTab";
import { reportData } from "../export-data/data";
import { motion, AnimatePresence } from "framer-motion";

const MyReportsPage = () => {
  const [activeTab, setActiveTab] = useState("my-reports");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFormat, setSelectedFormat] = useState(new Set([]));
  const [selectedReport, setSelectedReport] = useState(null);
  const [favoriteReports, setFavoriteReports] = useState(
    reportData.filter((report) => report.favorite).map((report) => report.id)
  );

  const {
    isOpen: isExportModalOpen,
    onOpen: onExportModalOpen,
    onClose: onExportModalClose,
  } = useDisclosure();

  const {
    isOpen: isScheduleModalOpen,
    onOpen: onScheduleModalOpen,
    onClose: onScheduleModalClose,
  } = useDisclosure();

  const filteredReports = reportData.filter((report) => {
    const matchesSearch = report.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || report.category === selectedCategory;
    const matchesFormat =
      selectedFormat.size === 0 ||
      Array.from(selectedFormat).some((format) =>
        report.formats.includes(format)
      );

    return matchesSearch && matchesCategory && matchesFormat;
  });

  const usedTemplates = reportData.filter((report) => report.installed);

  const handleReportSelect = (report) => {
    setSelectedReport(report);
    onExportModalOpen();
  };

  const toggleFavorite = (reportId) => {
    if (favoriteReports.includes(reportId)) {
      setFavoriteReports(favoriteReports.filter((id) => id !== reportId));
    } else {
      setFavoriteReports([...favoriteReports, reportId]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            My Reports
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and export your reports and templates
          </p>
        </div>

        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Button
            as="a"
            href="/templates-marketplace"
            color="primary"
            variant="flat"
          >
            Browse Templates
          </Button>
          <Button
            as="a"
            href="/export-data"
            color="primary"
            startContent={<Download size={16} />}
          >
            Export History
          </Button>
        </motion.div>
      </div>

      {/* Tabs */}
      <Tabs
        aria-label="Reports Options"
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
          key="my-reports"
          title={
            <div className="flex items-center gap-2">
              <FileText size={18} />
              <span>My Reports</span>
            </div>
          }
        />
        <Tab
          key="used"
          title={
            <div className="flex items-center gap-2">
              <Download size={18} />
              <span>Used Templates</span>
            </div>
          }
        />
      </Tabs>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search reports..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          startContent={<Search size={16} />}
          className="w-full md:w-1/3"
        />

        <div className="flex gap-2 flex-wrap">
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="flat"
                startContent={<Filter size={16} />}
                endContent={<ChevronDown size={16} />}
              >
                Category:{" "}
                {selectedCategory === "all"
                  ? "All"
                  : selectedCategory.charAt(0).toUpperCase() +
                    selectedCategory.slice(1)}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Category filter"
              onAction={(key) => setSelectedCategory(key)}
              selectedKeys={[selectedCategory]}
              selectionMode="single"
            >
              <DropdownItem key="all">All Categories</DropdownItem>
              <DropdownItem
                key="product"
                startContent={<Package size={16} className="text-primary" />}
              >
                Product
              </DropdownItem>
              <DropdownItem
                key="inventory"
                startContent={<Layers size={16} className="text-success" />}
              >
                Inventory
              </DropdownItem>
              <DropdownItem
                key="customers"
                startContent={<Users size={16} className="text-secondary" />}
              >
                Customers
              </DropdownItem>
              <DropdownItem
                key="order"
                startContent={
                  <ShoppingBag size={16} className="text-warning" />
                }
              >
                Orders
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="flat"
                startContent={<FileText size={16} />}
                endContent={<ChevronDown size={16} />}
              >
                Format:{" "}
                {selectedFormat.size === 0
                  ? "All"
                  : Array.from(selectedFormat).join(", ")}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Format filter"
              closeOnSelect={false}
              selectedKeys={selectedFormat}
              selectionMode="multiple"
              onSelectionChange={setSelectedFormat}
            >
              <DropdownItem key="xlsx">Excel (XLSX)</DropdownItem>
              <DropdownItem key="pdf">PDF</DropdownItem>
              <DropdownItem key="csv">CSV</DropdownItem>
              <DropdownItem key="json">JSON</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      {/* Tab Content with Animation */}
      <AnimatePresence mode="wait">
        {activeTab === "my-reports" ? (
          <motion.div
            key="my-reports"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <MyReportsTab
              reports={filteredReports}
              favoriteReports={favoriteReports}
              toggleFavorite={toggleFavorite}
              handleReportSelect={handleReportSelect}
              onScheduleModalOpen={onScheduleModalOpen}
            />
          </motion.div>
        ) : (
          <motion.div
            key="used"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <UsedTemplatesTab
              templates={usedTemplates}
              favoriteReports={favoriteReports}
              toggleFavorite={toggleFavorite}
              handleReportSelect={handleReportSelect}
              onScheduleModalOpen={onScheduleModalOpen}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Export Modal */}
      {selectedReport && (
        <ExportReportModal
          isOpen={isExportModalOpen}
          onClose={onExportModalClose}
          report={selectedReport}
        />
      )}
    </div>
  );
};

export default MyReportsPage;
