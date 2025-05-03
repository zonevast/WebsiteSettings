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
  Download,
  RefreshCw,
  ChevronDown,
  Filter,
  MapPin,
  Calendar,
  Zap,
  ArrowRight,
  Map,
  Users,
  DollarSign
} from "lucide-react";
import { containerVariants, itemVariants } from "@/components/animations";

import { useTranslations } from "next-intl";
import GeographyTabContent from "@/components/GeographicAnalysis/GeographyTabContent";
import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
  ZAxis,
  Cell,
} from "recharts";
import { ChartCard } from "@/components/analytics/ChartCard";
import { COLORS, geographicData } from "@/app/(pages)/customer-analytics/data";
import { Badge } from "@nextui-org/react";
import InsightCard from "@/components/analytics/InsightCard";

function GeographicAnalysis() {
  const [timeRange, setTimeRange] = useState("30");
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState("all"); // Initialize data source
  const t = useTranslations("GeographicAnalysisPage");

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const kpiCards = [
    {
      icon: Users,
      title: t("totalRegions"), // Regions are the key
      value: 10, // Example number of regions
      change: 2,
      trend: "up",
      className:
        "bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20",
    },
    {
      icon: MapPin,
      title: t("mostPopularRegion"), // Best performing region
      value: "Asia", // Example region name
      change: null,
      trend: null,
      className:
        "bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/20",
    },
    {
      icon: DollarSign,
      title: t("avgRevenuePerRegion"), // Averege revenue per region
      value: 50000, // Example revenue figure
      change: 10,
      trend: "up",
      className:
        "bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-900/20 dark:to-secondary-800/20",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 p-4 max-w-7xl mx-auto"
    >
      {/* Header with Controls */}
      <motion.div variants={itemVariants} className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t("geographicAnalysis")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t("geographicAnalysisDescription")}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="flat"
                  color="primary"
                  startContent={<MapPin size={16} />}
                  endContent={<ChevronDown size={16} />}
                >
                  {dataSource === "all"
                    ? t("allRegions")
                    : dataSource === "online"
                    ? t("onlineSales")
                    : t("inStoreSales")}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Data Source Options"
                onAction={(key) => setDataSource(key)}
                selectedKeys={[dataSource]}
                selectionMode="single"
              >
                <DropdownItem key="all">{t("allRegions")}</DropdownItem>
                <DropdownItem key="online">{t("onlineSales")}</DropdownItem>
                <DropdownItem key="inStore">{t("inStoreSales")}</DropdownItem>
              </DropdownMenu>
            </Dropdown>

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
                <DropdownItem key="region">{t("byRegion")}</DropdownItem>
                {/* Add other filter options as needed */}
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

      {/* Stats Overview */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
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

      {/* Geographic Distribution */}
      <motion.div variants={itemVariants}>
        <ChartCard
          title={t("geographicDistribution")}
          subtitle={t("customerDistributionAndRevenueByRegion")}
          actionButton={
            <Button
              size="sm"
              variant="flat"
              color="primary"
              startContent={<Map size={16} />}
            >
              {t("viewMap")}
            </Button>
          }
          footer={
            <div className="flex justify-between items-center">
              <Badge color="success" variant="flat">
                <Zap size={14} className="mr-1" />
                {t("asiaShowingFastestGrowth")}
              </Badge>
              <Button
                size="sm"
                variant="light"
                color="primary"
                endContent={<ArrowRight size={14} />}
              >
                {t("regionalAnalysis")}
              </Button>
            </div>
          }
        >
          <ResponsiveContainer width="100%" height={350}>
            <ScatterChart
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid />
              <XAxis
                type="number"
                dataKey="customers"
                name={t("customers")}
                unit=""
              />
              <YAxis type="number" dataKey="revenue" name={t("revenue")} unit="$" />
              <ZAxis
                type="number"
                dataKey="growth"
                range={[100, 1000]}
                name={t("growth")}
                unit="%"
              />
              <RechartsTooltip
                cursor={{ strokeDasharray: "3 3" }}
                formatter={(value, name) => {
                  if (name === "Growth") return [`${value}%`, name];
                  if (name === "Revenue")
                    return [`$${value.toLocaleString()}`, name];
                  return [value, name];
                }}
              />
              <Legend />
              <Scatter name="Regions" data={geographicData} fill="#8884d8">
                {geographicData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
            {geographicData.map((region, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 bg-default-50 rounded-lg"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                />
                <div>
                  <p className="text-sm font-medium">{region.region}</p>
                  <p className="text-xs text-default-500">
                    {region.customers.toLocaleString()} customers
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </motion.div>

      {/* Geographic Analysis Content */}
      <motion.div variants={itemVariants}>
        <GeographyTabContent dataSource={dataSource} />
      </motion.div>
    </motion.div>
  );
}

export default GeographicAnalysis;