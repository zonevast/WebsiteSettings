"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tooltip,
} from "@nextui-org/react";
import {
  Calendar,
  Download,
  DollarSign,
  RotateCcw,
  AlertTriangle,
  Clock,
  RefreshCw,
  Filter,
  ChevronDown,
} from "lucide-react";
import { kpiData } from "./data";
import InventoryOverviewTab from "@/components/InventoryAnalytics/InventoryOverviewTab";
import { containerVariants, itemVariants } from "@/components/animations";
import { useTranslations } from "next-intl";

const InventoryAnalytics = () => {
  const [timeRange, setTimeRange] = useState("30");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedChart, setSelectedChart] = useState("line");
  const [selectedTab, setSelectedTab] = useState("overview");

  const t = useTranslations("InventoryAnalyticsPage");

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const kpiCards = [
    {
      icon: DollarSign,
      title: t("totalInventoryValue"),
      value: kpiData.totalInventoryValue.value,
      change: kpiData.totalInventoryValue.change,
      trend: kpiData.totalInventoryValue.trend,
      className:
        "bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20",
    },
    {
      icon: RotateCcw,
      title: t("inventoryTurnover"),
      value: kpiData.inventoryTurnover.value,
      change: kpiData.inventoryTurnover.change,
      trend: kpiData.inventoryTurnover.trend,
      className:
        "bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/20",
    },
    {
      icon: AlertTriangle,
      title: t("stockoutRate"),
      value: kpiData.stockoutRate.value,
      change: kpiData.stockoutRate.change,
      trend: kpiData.stockoutRate.trend,
      className:
        "bg-gradient-to-br from-danger-50 to-danger-100 dark:from-danger-900/20 dark:to-danger-800/20",
    },
    {
      icon: Clock,
      title: t("daysOfSupply"),
      value: kpiData.daysOfSupply.value,
      change: kpiData.daysOfSupply.change,
      trend: kpiData.daysOfSupply.trend,
      className:
        "bg-gradient-to-br from-warning-50 to-warning-100 dark:from-warning-900/20 dark:to-warning-800/20",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 p-4 max-w-7xl mx-auto"
    >
      {/* Header with Tabs */}
      <motion.div variants={itemVariants} className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t("inventoryAnalytics")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t("inventoryAnalyticsDescription")}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="flat"
                  color="primary"
                  startContent={<Calendar size={16} />}
                  endContent={<ChevronDown size={16} />}
                >
                  {timeRange === "7"
                    ? t("last7Days")
                    : timeRange === "30"
                    ? t("last30Days")
                    : timeRange === "90"
                    ? t("last90Days")
                    : t("customRange")}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Time range options"
                onAction={(key) => setTimeRange(key)}
                selectedKeys={[timeRange]}
                selectionMode="single"
              >
                <DropdownItem key="7">{t("last7Days")}</DropdownItem>
                <DropdownItem key="30">{t("last30Days")}</DropdownItem>
                <DropdownItem key="90">{t("last90Days")}</DropdownItem>
                <DropdownItem key="custom">{t("customRange")}</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="flat"
                  startContent={<Filter size={16} />}
                  endContent={<ChevronDown size={16} />}
                >
                  {t("warehouses")}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Warehouse options">
                <DropdownItem key="all">{t("allWarehouses")}</DropdownItem>
                <DropdownItem key="north">{t("north")}</DropdownItem>
                <DropdownItem key="south">{t("south")}</DropdownItem>
                <DropdownItem key="east">{t("east")}</DropdownItem>
                <DropdownItem key="west">{t("west")}</DropdownItem>
                <DropdownItem key="central">{t("central")}</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Button
              variant="solid"
              color="primary"
              startContent={<Download size={16} />}
              onClick={() => alert("Downloading inventory report...")}
            >
              {t("exportReport")}
            </Button>

            <Tooltip content={t("refreshData")}>
              <Button
                isIconOnly
                variant="light"
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => setIsLoading(false), 1000);
                }}
              >
                <RefreshCw size={16} />
              </Button>
            </Tooltip>
          </div>
        </div>
      </motion.div>

      {selectedTab === "overview" && (
        <InventoryOverviewTab
          selectedChart={selectedChart}
          setSelectedChart={setSelectedChart}
          isLoading={isLoading}
          kpiCards={kpiCards}
        />
      )}
    </motion.div>
  );
};

export default InventoryAnalytics;
