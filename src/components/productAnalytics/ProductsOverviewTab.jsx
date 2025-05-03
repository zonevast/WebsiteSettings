"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Button,
  Avatar,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Tooltip,
  Divider,
  Badge,
} from "@nextui-org/react";
import {
  TrendingUp,
  BarChart2,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  RefreshCw,
  ArrowRight,
  ChevronDown,
  Filter,
  Eye,
  Share2,
  Bookmark,
  Zap,
  Clock,
  AlertCircle,
  CheckCircle,
  Star,
  Printer,
  FileText,
  HelpCircle,
  DollarSign,
  ShoppingBag,
  Package,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import { ChartCard } from "@/components/analytics/ChartCard";
import InsightCard from "@/components/analytics/InsightCard";

import { itemVariants } from "@/components/animations";

import {
  topProducts,
  categoryPerformance,
  COLORS,
  productPerformanceData,
  salesData,
  kpiData,
} from "@/app/(pages)/product-analytics/data";

export const ProductsOverviewTab = ({ isLoading, selectedChart, setSelectedChart }) => {
  const renderSalesChart = () => {
    switch (selectedChart) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
              <XAxis dataKey="month" />
              <YAxis />
              <RechartsTooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  border: "none",
                }}
              />
              <Legend />
              <Bar
                dataKey="sales"
                name="Sales"
                fill="#8884d8"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="orders"
                name="Orders"
                fill="#82ca9d"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="profit"
                name="Profit"
                fill="#ffc658"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );
      case "area":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ffc658" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
              <XAxis dataKey="month" />
              <YAxis />
              <RechartsTooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  border: "none",
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="sales"
                name="Sales"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorSales)"
              />
              <Area
                type="monotone"
                dataKey="orders"
                name="Orders"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorOrders)"
              />
              <Area
                type="monotone"
                dataKey="profit"
                name="Profit"
                stroke="#ffc658"
                fillOpacity={1}
                fill="url(#colorProfit)"
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      default:
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
              <XAxis dataKey="month" />
              <YAxis />
              <RechartsTooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  border: "none",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                name="Sales"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{
                  r: 6,
                  stroke: "#8884d8",
                  strokeWidth: 2,
                  fill: "white",
                }}
              />
              <Line
                type="monotone"
                dataKey="orders"
                name="Orders"
                stroke="#82ca9d"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{
                  r: 6,
                  stroke: "#82ca9d",
                  strokeWidth: 2,
                  fill: "white",
                }}
              />
              <Line
                type="monotone"
                dataKey="profit"
                name="Profit"
                stroke="#ffc658"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{
                  r: 6,
                  stroke: "#ffc658",
                  strokeWidth: 2,
                  fill: "white",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };

  const kpiCards = [
    {
      icon: DollarSign,
      title: "Total Sales",
      value: kpiData.totalSales.value,
      change: kpiData.totalSales.change,
      trend: kpiData.totalSales.trend,
      className:
        "bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20",
    },
    {
      icon: ShoppingBag,
      title: "Total Orders",
      value: kpiData.totalOrders.value,
      change: kpiData.totalOrders.change,
      trend: kpiData.totalOrders.trend,
      className:
        "bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/20",
    },
    {
      icon: Package,
      title: "Products Sold",
      value: kpiData.productsSold.value,
      change: kpiData.productsSold.change,
      trend: kpiData.productsSold.trend,
      className:
        "bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-900/20 dark:to-secondary-800/20",
    },
    {
      icon: TrendingUp,
      title: "Growth Rate",
      value: kpiData.growthRate.value,
      change: kpiData.growthRate.change,
      trend: kpiData.growthRate.trend,
      className:
        "bg-gradient-to-br from-warning-50 to-warning-100 dark:from-warning-900/20 dark:to-warning-800/20",
    },
  ];

  return (
    <>
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <motion.div variants={itemVariants}>
          <ChartCard
            title="Sales & Revenue Trends"
            subtitle="Track your product performance over time"
            actionButton={
              <div className="flex gap-1">
                <Button
                  isIconOnly
                  size="sm"
                  variant={selectedChart === "line" ? "solid" : "flat"}
                  color="primary"
                  onClick={() => setSelectedChart("line")}
                >
                  <LineChartIcon size={16} />
                </Button>
                <Button
                  isIconOnly
                  size="sm"
                  variant={selectedChart === "bar" ? "solid" : "flat"}
                  color="primary"
                  onClick={() => setSelectedChart("bar")}
                >
                  <BarChart2 size={16} />
                </Button>
                <Button
                  isIconOnly
                  size="sm"
                  variant={selectedChart === "area" ? "solid" : "flat"}
                  color="primary"
                  onClick={() => setSelectedChart("area")}
                >
                  <PieChartIcon size={16} />
                </Button>
              </div>
            }
            footer={
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                  <Badge color="primary" variant="flat">
                    <Clock size={14} className="mr-1" />
                    Updated 2h ago
                  </Badge>
                  {selectedChart === "line" && (
                    <Badge color="success" variant="flat">
                      <TrendingUp size={14} className="mr-1" />
                      12.5% growth
                    </Badge>
                  )}
                </div>
                <Button
                  size="sm"
                  variant="light"
                  color="primary"
                  endContent={<ArrowRight size={14} />}
                >
                  Detailed Report
                </Button>
              </div>
            }
          >
            {renderSalesChart()}
          </ChartCard>
        </motion.div>

        {/* Top Products */}
        <motion.div variants={itemVariants}>
          <ChartCard
            title="Top Performing Products"
            subtitle="Your best selling products by volume"
            actionButton={
              <div className="flex gap-1">
                <Tooltip content="Save Report">
                  <Button isIconOnly size="sm" variant="flat">
                    <Bookmark size={16} />
                  </Button>
                </Tooltip>
                <Tooltip content="Share Report">
                  <Button isIconOnly size="sm" variant="flat">
                    <Share2 size={16} />
                  </Button>
                </Tooltip>
              </div>
            }
            footer={
              <div className="w-full flex justify-between items-center">
                <Badge color="warning" variant="flat">
                  <Zap size={14} className="mr-1" />
                  High demand products
                </Badge>
                <Button
                  size="sm"
                  variant="light"
                  color="primary"
                  endContent={<ArrowRight size={14} />}
                >
                  View All Products
                </Button>
              </div>
            }
          >
            <div className="flex flex-col md:flex-row gap-4">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={topProducts}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                    labelLine={false}
                  >
                    {topProducts.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        stroke="none"
                      />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    formatter={(value, name, props) => [`${value} units`, name]}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      border: "none",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Performance */}
        <motion.div variants={itemVariants}>
          <ChartCard
            title="Category Performance"
            subtitle="Sales distribution across product categories"
            actionButton={
              <Tooltip content="Help">
                <Button isIconOnly size="sm" variant="light">
                  <HelpCircle size={16} />
                </Button>
              </Tooltip>
            }
            footer={
              <div className="flex justify-between items-center">
                <Badge color="secondary" variant="flat">
                  <CheckCircle size={14} className="mr-1" />
                  Electronics leading sales
                </Badge>
                <Button
                  size="sm"
                  variant="flat"
                  color="primary"
                  startContent={<Filter size={14} />}
                >
                  Filter Categories
                </Button>
              </div>
            }
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryPerformance} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={true}
                  vertical={false}
                />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <RechartsTooltip
                  formatter={(value, name, props) => [`$${value}k`, "Revenue"]}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    border: "none",
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="#8884d8"
                  radius={[0, 4, 4, 0]}
                  barSize={30}
                  label={{
                    position: "right",
                    formatter: (value) => `$${value}k`,
                  }}
                >
                  {categoryPerformance.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>

        {/* Product Performance Radar */}
        <motion.div variants={itemVariants}>
          <ChartCard
            title="Product Performance Metrics"
            subtitle="Multi-dimensional analysis of key products"
            actionButton={
              <div className="flex gap-1">
                <Tooltip content="Print Report">
                  <Button isIconOnly size="sm" variant="flat">
                    <Printer size={16} />
                  </Button>
                </Tooltip>
                <Tooltip content="Export as PDF">
                  <Button isIconOnly size="sm" variant="flat">
                    <FileText size={16} />
                  </Button>
                </Tooltip>
              </div>
            }
            footer={
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="text-xs">Current Period</span>
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <span className="text-xs">Previous Period</span>
                </div>
                <Button
                  size="sm"
                  variant="light"
                  color="primary"
                  endContent={<ArrowRight size={14} />}
                >
                  Detailed Analysis
                </Button>
              </div>
            }
          >
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart outerRadius={90} data={productPerformanceData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 150]} />
                <Radar
                  name="Current Period"
                  dataKey="A"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
                <Radar
                  name="Previous Period"
                  dataKey="B"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.6}
                />
                <Legend />
                <RechartsTooltip />
              </RadarChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>
      </div>

      {/* Product Details Section */}
      <motion.div variants={itemVariants}>
        <ChartCard
          title="Top Selling Products Details"
          subtitle="Comprehensive view of your best performers"
          actionButton={
            <Button
              size="sm"
              variant="flat"
              color="primary"
              startContent={<AlertCircle size={16} />}
            >
              Low Stock Alert
            </Button>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topProducts.map((product, index) => (
              <Card key={index} className="p-0">
                <CardHeader className="flex gap-3">
                  <Avatar
                    radius="sm"
                    size="md"
                    src={`https://placehold.co/200x200/${COLORS[
                      index % COLORS.length
                    ].replace("#", "")}/FFFFFF/png?text=${product.name.charAt(
                      0
                    )}`}
                  />
                  <div className="flex flex-col">
                    <p className="text-md font-semibold">{product.name}</p>
                    <p className="text-small text-default-500">
                      ${product.price}
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-small text-default-500">
                        Units Sold:
                      </span>
                      <span className="text-small font-semibold">
                        {product.value}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-small text-default-500">
                        Growth:
                      </span>
                      <span
                        className={`text-small font-semibold ${
                          product.growth > 0 ? "text-success" : "text-danger"
                        }`}
                      >
                        {product.growth > 0 ? "+" : ""}
                        {product.growth}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-small text-default-500">
                        Stock Level:
                      </span>
                      <span className="text-small font-semibold">
                        {product.stock < 100 ? (
                          <Badge color="warning" variant="flat">
                            {product.stock} units
                          </Badge>
                        ) : (
                          <Badge color="success" variant="flat">
                            {product.stock} units
                          </Badge>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-small text-default-500">
                        Revenue:
                      </span>
                      <span className="text-small font-semibold">
                        ${(product.value * product.price).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardBody>
                <Divider />
                <CardFooter>
                  <div className="flex justify-between items-center w-full">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={14}
                          className={
                            star <= 4 ? "text-warning" : "text-gray-300"
                          }
                          fill={star <= 4 ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <Button size="sm" color="primary" variant="flat">
                      View Details
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ChartCard>
      </motion.div>
    </>
  );
};
