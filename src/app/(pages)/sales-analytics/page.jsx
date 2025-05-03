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
  DollarSign,
  ShoppingBag,
  Calendar,
  RefreshCw,
  Download,
  ChevronDown,
  Repeat,
  ShoppingCart,
  Cloud,
  Store,
  Filter,

} from "lucide-react";
import { useTranslations } from "next-intl";

import { kpiData } from "./data"; // Import the data
import OverviewTabContent from "./Tabs/OverviewTabContent";
import InsightCard from "@/components/analytics/InsightCard";
import { containerVariants, itemVariants } from "@/components/animations"; // Import animation variants

function SalesAnalytics() {
  const t = useTranslations("SalesAnalyticsPage");
  const [timeRange, setTimeRange] = useState("30d");
  const [dataSource, setDataSource] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedChart, setSelectedChart] = useState("line");

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  //Kpi cards
  const kpiCards = [
    {
      icon: DollarSign,
      title: t("totalRevenue"),
      value: kpiData.totalRevenue.value,
      change: kpiData.totalRevenue.change,
      trend: kpiData.totalRevenue.trend,
      className:
        "bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20",
    },
    {
      icon: ShoppingBag,
      title: t("totalOrders"),
      value: kpiData.totalOrders.value,
      change: kpiData.totalOrders.change,
      trend: kpiData.totalOrders.trend,
      className:
        "bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/20",
    },
    {
      icon: ShoppingCart,
      title: t("averageOrderValue"),
      value: kpiData.averageOrderValue.value,
      change: kpiData.averageOrderValue.change,
      trend: kpiData.averageOrderValue.trend,
      className:
        "bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-900/20 dark:to-secondary-800/20",
    },
    {
      icon: Repeat,
      title: t("returnRate"),
      value: kpiData.returnRate.value,
      change: kpiData.returnRate.change,
      trend: kpiData.returnRate.trend,
      className:
        "bg-gradient-to-br from-warning-50 to-warning-100 dark:from-warning-900/20 dark:to-warning-800/20",
    },
  ];

  // Data source options
  const dataSourceOptions = [
    { key: "all", label: t("allOrders"), icon: <Filter size={16} /> },
    { key: "online", label: t("onlineOrders"), icon: <Cloud size={16} /> },
    { key: "store", label: t("storeOrders"), icon: <Store size={16} /> },
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
              {t("pageTitle")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t("pageDescription")}
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
                  {timeRange === "7d"
                    ? t("last7Days")
                    : timeRange === "30d"
                    ? t("last30Days")
                    : timeRange === "90d"
                    ? t("last90Days")
                    : t("lastYear")}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Time range options"
                onAction={(key) => setTimeRange(key)}
                selectedKeys={[timeRange]}
                selectionMode="single"
              >
                <DropdownItem key="7d">{t("last7Days")}</DropdownItem>
                <DropdownItem key="30d">{t("last30Days")}</DropdownItem>
                <DropdownItem key="90d">{t("last90Days")}</DropdownItem>
                <DropdownItem key="1y">{t("lastYear")}</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="flat"
                  startContent={<Filter size={16} />}
                  endContent={<ChevronDown size={16} />}
                >
                  {dataSource === "all"
                    ? t("allOrders")
                    : dataSource === "online"
                    ? t("onlineOrders")
                    : t("storeOrders")}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Data source options"
                onAction={(key) => setDataSource(key)}
                selectedKeys={[dataSource]}
                selectionMode="single"
              >
                {dataSourceOptions.map((option) => (
                  <DropdownItem key={option.key} startContent={option.icon}>
                    {option.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Button
              variant="solid"
              color="primary"
              startContent={<Download size={16} />}
              onClick={() => alert("Downloading sales report...")}
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

      {/* Stats Overview */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {kpiCards.map((card, index) => (
          <InsightCard
            key={index}
            icon={card.icon}
            title={card.title}
            value={card.value}
            change={card.change}
            isTrendingUp={card.trend === "up"}
            className={card.className}
            isLoading={isLoading}
          />
        ))}
      </motion.div>

      <OverviewTabContent
        dataSource={dataSource}
        isLoading={isLoading}
        timeRange={timeRange}
        selectedChart={selectedChart}
        setSelectedChart={setSelectedChart}
      />
    </motion.div>
  );
}

export default SalesAnalytics;
