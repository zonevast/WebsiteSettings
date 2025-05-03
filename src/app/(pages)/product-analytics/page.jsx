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
  RefreshCw,
  ChevronDown,
  Filter,
} from "lucide-react";

import { containerVariants, itemVariants } from "@/components/animations";
import { ProductsOverviewTab } from "@/components/productAnalytics/ProductsOverviewTab";
import { useTranslations } from "next-intl";

export default function ProductAnalytics() {
  const [timeRange, setTimeRange] = useState("30");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedChart, setSelectedChart] = useState("line");
  const [selectedTab, setSelectedTab] = useState("overview");

  const t = useTranslations("ProductAnalyticsPage");

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

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
              {t("productAnalytics")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t("productAnalyticsDescription")}
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
                  {t("filters")}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Filter options">
                <DropdownItem key="category">{t("byCategory")}</DropdownItem>
                <DropdownItem key="price">{t("byPriceRange")}</DropdownItem>
                <DropdownItem key="stock">{t("byStockLevel")}</DropdownItem>
                <DropdownItem key="performance">
                  {t("byPerformance")}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Button
              variant="solid"
              color="primary"
              startContent={<Download size={16} />}
              onClick={() => alert("Downloading report...")}
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
        <ProductsOverviewTab
          isLoading={isLoading}
          selectedChart={selectedChart}
          setSelectedChart={setSelectedChart}
        />
      )}
    </motion.div>
  );
}
