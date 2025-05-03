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
  Users,
  Calendar,
  Download,
  RefreshCw,
  ChevronDown,
  Filter,
  UserCheck,
  DollarSign,
  Repeat,
} from "lucide-react";
import { kpiData } from "./data";
import CustomersOverviewTab from "@/components/customerAnalytics/CustomersOverviewTab";
import { containerVariants, itemVariants } from "@/components/animations"; // Import animation variants
import { useTranslations } from "next-intl";

const CustomerAnalytics = () => {
  const [timeRange, setTimeRange] = useState("30");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedChart, setSelectedChart] = useState("line");
  const [selectedTab, setSelectedTab] = useState("overview");

  const t = useTranslations("CustomerAnalyticsPage");

  const kpiCards = [
    {
      icon: Users,
      title: t("totalCustomers"),
      value: kpiData.totalCustomers.value,
      change: kpiData.totalCustomers.change,
      trend: kpiData.totalCustomers.trend,
      className:
        "bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20",
    },
    {
      icon: UserCheck,
      title: t("activeCustomers"),
      value: kpiData.activeCustomers.value,
      change: kpiData.activeCustomers.change,
      trend: kpiData.activeCustomers.trend,
      className:
        "bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/20",
    },
    {
      icon: DollarSign,
      title: t("avgLifetimeValue"),
      value: kpiData.customerLifetimeValue.value,
      change: kpiData.customerLifetimeValue.change,
      trend: kpiData.customerLifetimeValue.trend,
      className:
        "bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-900/20 dark:to-secondary-800/20",
    },
    {
      icon: Repeat,
      title: t("churnRate"),
      value: kpiData.churnRate.value,
      change: kpiData.churnRate.change,
      trend: kpiData.churnRate.trend,
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
              {t("customerAnalyticsTitle")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t("customerAnalyticsDescription")}
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
                  {t("segments")}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Customer segment options">
                <DropdownItem key="all">{t("allSegments")}</DropdownItem>
                <DropdownItem key="loyal">{t("loyalCustomers")}</DropdownItem>
                <DropdownItem key="regular">{t("regularBuyers")}</DropdownItem>
                <DropdownItem key="occasional">
                  {t("occasionalShoppers")}
                </DropdownItem>
                <DropdownItem key="new">{t("newCustomers")}</DropdownItem>
                <DropdownItem key="at-risk">{t("atRiskCustomers")}</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Button
              variant="solid"
              color="primary"
              startContent={<Download size={16} />}
              onClick={() => alert("Downloading customer report...")}
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

        {/*  Removed Tabs Component because its not mentioned in the latest ui design code */}
      </motion.div>

      {selectedTab === "overview" && (
        <CustomersOverviewTab
          selectedChart={selectedChart}
          setSelectedChart={setSelectedChart}
          isLoading={isLoading}
          kpiCards={kpiCards}
        />
      )}
    </motion.div>
  );
};

export default CustomerAnalytics;