import React from "react";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import {
  ComposedChart,
  Bar,
  Line,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
} from "recharts";
import { Filter, TrendingUp, TrendingDown } from "lucide-react";
import {
  revenueData,
  categoryData,
  channelData,
  fulfillmentData,
  topProductsData,
} from "../data"; // Import the data
import { itemVariants } from "@/components/animations";
import { useTranslations } from "next-intl";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { ChartCard } from "@/components/analytics/ChartCard";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];
const CHANNEL_COLORS = ["#8884D8", "#82CA9D", "#FFC658"];
const FULFILLMENT_COLORS = ["#FFC658", "#8884D8", "#00C49F"];

function OverviewTabContent() {
  const t = useTranslations("SalesAnalyticsPage.OverviewTabContent");

  const renderRevenueChart = () => {
    return (
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" />
          <YAxis yAxisId="right" orientation="right" />
          <RechartsTooltip />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey="orders"
            fill="#8884d8"
            name={t("orders")}
            radius={[4, 4, 0, 0]}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="revenue"
            stroke="#ff7300"
            name={t("revenue")}
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  };

  const renderSalesTrendChart = () => {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="name" />
          <YAxis />
          <RechartsTooltip />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  const renderSalesByChannelChart = () => {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={channelData}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="name" />
          <YAxis />
          <RechartsTooltip />
          <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]}>
            {channelData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={CHANNEL_COLORS[index % CHANNEL_COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <>
      {/* Revenue & Orders Chart */}
      <motion.div variants={itemVariants}>
        <ChartCard
          title={t("revenueAndOrders")}
          subtitle={t("revenueAndOrdersDescription")}
          actionButton={
            <Dropdown>
              <DropdownTrigger>
                <Button variant="light" startContent={<Filter size={16} />}>
                  {t("filter")}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Chart filters">
                <DropdownItem key="all">{t("allChannels")}</DropdownItem>
                <DropdownItem key="website">{t("website")}</DropdownItem>
                <DropdownItem key="mobile">{t("mobileApp")}</DropdownItem>
                <DropdownItem key="marketplace">
                  {t("marketplace")}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          }
        >
          {renderRevenueChart()}
        </ChartCard>
      </motion.div>

      {/* Category, Channel, and Fulfillment Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <motion.div variants={itemVariants}>
          <ChartCard title={t("categoryDistribution")}>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <ChartCard title={t("channelDistribution")}>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {channelData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CHANNEL_COLORS[index % CHANNEL_COLORS.length]}
                    />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <ChartCard title={t("orderFulfillment")}>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={fulfillmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {fulfillmentData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        FULFILLMENT_COLORS[index % FULFILLMENT_COLORS.length]
                      }
                    />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>
      </div>

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <motion.div variants={itemVariants}>
          <ChartCard title={t("salesTrend")}>
            {renderSalesTrendChart()}
          </ChartCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <ChartCard title={t("salesByChannel")}>
            {renderSalesByChannelChart()}
          </ChartCard>
        </motion.div>
      </motion.div>

      {/* Top Products Table */}
      <motion.div variants={itemVariants} className="mt-6">
        <ChartCard title={t("topSellingProducts")}>
          <Table aria-label={t("topSellingProducts")}>
            <TableHeader>
              <TableColumn>{t("product")}</TableColumn>
              <TableColumn>{t("sales")}</TableColumn>
              <TableColumn>{t("revenue")}</TableColumn>
              <TableColumn>{t("growth")}</TableColumn>
            </TableHeader>
            <TableBody>
              {topProductsData.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.sales}</TableCell>
                  <TableCell>${product.revenue.toLocaleString()}</TableCell>
                  <TableCell>
                    <Chip
                      size="sm"
                      color={product.growth > 0 ? "success" : "danger"}
                      variant="flat"
                      startContent={
                        product.growth > 0 ? (
                          <TrendingUp size={12} />
                        ) : (
                          <TrendingDown size={12} />
                        )
                      }
                    >
                      {product.growth > 0 ? "+" : ""}
                      {product.growth}%
                    </Chip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ChartCard>
      </motion.div>
    </>
  );
}

export default OverviewTabContent;
