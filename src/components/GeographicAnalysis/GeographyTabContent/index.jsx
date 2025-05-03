// GeographyTabContent.jsx
"use client";
import React from "react";
import { Card, CardBody, CardHeader, Skeleton } from "@nextui-org/react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { itemVariants } from "@/components/animations";
import { useTranslations } from "next-intl";
import ChoroplethMap from "./ChoroplethMap";
import FastestGrowingCitiesTable from "./FastestGrowingCitiesTable"; // Import the component
import { useMapData } from "@/hooks/analytics/useMapData";

function GeographyTabContent({ dataSource }) {
  const t = useTranslations("GeographicAnalysisPage.GeographyTabContent");
  const { mapData, errorRegionMetrics, loadingRegionMetrics } =
    useMapData(dataSource);

  const governorateOrdersData = [
    { governorate: "Baghdad", orders: 540, revenue: 108000 },
    { governorate: "Basra", orders: 290, revenue: 58000 },
    { governorate: "Erbil", orders: 170, revenue: 34000 },
    { governorate: "Sulaymaniyah", orders: 420, revenue: 84000 },
    { governorate: "Najaf", orders: 320, revenue: 64000 },
  ];

  const topCitiesData = [
    { city: "Baghdad", orders: 420, growth: 12.5 },
    { city: "Basra", orders: 210, growth: 8.3 },
    { city: "Erbil", orders: 180, growth: -2.1 },
    { city: "Mosul", orders: 150, growth: 5.7 },
    { city: "Najaf", orders: 130, growth: 3.2 },
  ];

  return (
    <motion.div variants={itemVariants} className="space-y-6">
      {/* Iraq Map */}
      <Card className="border-none">
        <CardHeader className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">
              {t("orderDistributionByGovernorate")}
            </h3>
            <p className="text-sm text-default-500">{t("hoverForDetails")}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-primary/20"></div>
              <span className="text-xs">{t("low")}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-xs">{t("high")}</span>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          {loadingRegionMetrics ? (
            <Card className="border-none">
              <CardBody>
                <Skeleton className="w-full h-[400px] rounded-xl" />
              </CardBody>
            </Card>
          ) : errorRegionMetrics ? (
            <p>Error loading map data.</p>
          ) : (
            <ChoroplethMap data={mapData} />
          )}
        </CardBody>
      </Card>

      {/* Top Governorates Charts */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Card className="border-none">
          <CardHeader>
            <h3 className="text-lg font-semibold">
              {t("topGovernoratesByOrders")}
            </h3>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={governorateOrdersData} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={true}
                  vertical={false}
                  opacity={0.2}
                />
                <XAxis type="number" />
                <YAxis
                  dataKey="governorate"
                  type="category"
                  width={120} // Adjust width as needed to prevent overlap
                  tick={{ fontSize: 12 }} // Adjust font size for readability
                />
                <RechartsTooltip />
                <Bar
                  dataKey="orders"
                  fill="#7C3AED"
                  radius={[0, 4, 4, 0]}
                />{" "}
                {/* Primary Color */}
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card className="border-none">
          <CardHeader>
            <h3 className="text-lg font-semibold">
              {t("topGovernoratesByRevenue")}
            </h3>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={governorateOrdersData} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={true}
                  vertical={false}
                  opacity={0.2}
                />
                <XAxis type="number" />
                <YAxis
                  dataKey="governorate"
                  type="category"
                  width={120} // Adjust width as needed to prevent overlap
                  tick={{ fontSize: 12 }} // Adjust font size for readability
                />
                <RechartsTooltip />
                <Bar
                  dataKey="revenue"
                  fill="#EC4899"
                  radius={[0, 4, 4, 0]}
                />{" "}
                {/* Secondary Color */}
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </motion.div>

      <FastestGrowingCitiesTable topCitiesData={topCitiesData} />
    </motion.div>
  );
}

export default GeographyTabContent;
