"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Badge,
  Button,
  Tooltip,
  Card,
  Progress,
} from "@nextui-org/react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";
import InsightCard from "@/components/analytics/InsightCard";
import { ChartCard } from "@/components/analytics/ChartCard";

import {
  BarChart2,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  Star,
  Printer,
  FileText,
  Share2,
  Bookmark,
  Clock,
  ShoppingCart,
  Map,
  Zap,
  Filter,
  Heart,
} from "lucide-react";
import {
  COLORS,
  customerLifetimeValue,
  customerSegments,
  customerTrendData,
  geographicData,
  purchaseFrequencyData,
} from "@/app/(pages)/customer-analytics/data";
import { itemVariants } from "@/components/animations"; // Import animation variants

const CustomersOverviewTab = ({
  selectedChart,
  setSelectedChart,
  isLoading,
  kpiCards,
}) => {
  const renderCustomerTrendChart = () => {
    switch (selectedChart) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={customerTrendData}>
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
                dataKey="newCustomers"
                name="New Customers"
                fill="#8884d8"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="activeCustomers"
                name="Active Customers"
                fill="#82ca9d"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );
      case "area":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={customerTrendData}>
              <defs>
                <linearGradient
                  id="colorNewCustomers"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient
                  id="colorActiveCustomers"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
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
                dataKey="newCustomers"
                name="New Customers"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorNewCustomers)"
              />
              <Area
                type="monotone"
                dataKey="activeCustomers"
                name="Active Customers"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorActiveCustomers)"
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      default:
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={customerTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" domain={[0, 5]} />
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
                yAxisId="left"
                type="monotone"
                dataKey="newCustomers"
                name="New Customers"
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
                yAxisId="left"
                type="monotone"
                dataKey="activeCustomers"
                name="Active Customers"
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
                yAxisId="right"
                type="monotone"
                dataKey="churnRate"
                name="Churn Rate (%)"
                stroke="#ff8042"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{
                  r: 6,
                  stroke: "#ff8042",
                  strokeWidth: 2,
                  fill: "white",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };

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
        {/* Customer Growth Trend */}
        <motion.div variants={itemVariants}>
          <ChartCard
            title="Customer Growth Trends"
            subtitle="Track acquisition and retention over time"
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
                    Updated 3h ago
                  </Badge>
                  <Badge color="success" variant="flat">
                    <Zap size={14} className="mr-1" />
                    8.5% growth
                  </Badge>
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
            {renderCustomerTrendChart()}
          </ChartCard>
        </motion.div>

        {/* Customer Segments */}
        <motion.div variants={itemVariants}>
          <ChartCard
            title="Customer Segments"
            subtitle="Distribution of customers by segment"
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
                <Badge color="secondary" variant="flat">
                  <Heart size={14} className="mr-1" />
                  Loyal customers are growing
                </Badge>
                <Button
                  size="sm"
                  variant="light"
                  color="primary"
                  endContent={<ArrowRight size={14} />}
                >
                  Segment Details
                </Button>
              </div>
            }
          >
            <div className="flex flex-col md:flex-row gap-4">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={customerSegments}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                    labelLine={false}
                  >
                    {customerSegments.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        stroke="none"
                      />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    formatter={(value, name, props) => [`${value}%`, name]}
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
        {/* Customer Lifetime Value */}
        <motion.div variants={itemVariants}>
          <ChartCard
            title="Customer Lifetime Value by Segment"
            subtitle="Average revenue generated per customer segment"
            actionButton={
              <Tooltip content="Help">
                <Button isIconOnly size="sm" variant="light">
                  <HelpCircle size={16} />
                </Button>
              </Tooltip>
            }
            footer={
              <div className="flex justify-between items-center">
                <Badge color="primary" variant="flat">
                  <CheckCircle size={14} className="mr-1" />
                  Premium segment has highest CLV
                </Badge>
                <Button
                  size="sm"
                  variant="flat"
                  color="primary"
                  startContent={<Filter size={14} />}
                >
                  Filter Segments
                </Button>
              </div>
            }
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={customerLifetimeValue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="segment" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <RechartsTooltip />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="clv"
                  name="Lifetime Value ($)"
                  fill="#8884d8"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  yAxisId="right"
                  dataKey="retention"
                  name="Retention Rate (%)"
                  fill="#82ca9d"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>

        {/* Purchase Frequency */}
        <motion.div variants={itemVariants}>
          <ChartCard
            title="Purchase Frequency"
            subtitle="How often customers make purchases"
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
                <Badge color="warning" variant="flat">
                  <ShoppingCart size={14} className="mr-1" />
                  Monthly buyers are dominant
                </Badge>
                <Button
                  size="sm"
                  variant="light"
                  color="primary"
                  endContent={<ArrowRight size={14} />}
                >
                  Frequency Analysis
                </Button>
              </div>
            }
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={purchaseFrequencyData} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={true}
                  vertical={false}
                />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <RechartsTooltip
                  formatter={(value) => [`${value}%`, "Customers"]}
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
                    formatter: (value) => `${value}%`,
                  }}
                >
                  {purchaseFrequencyData.map((entry, index) => (
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
      </div>



      {/* Customer Satisfaction */}
      <motion.div variants={itemVariants}>
        <ChartCard
          title="Customer Satisfaction Metrics"
          subtitle="NPS, CSAT, and review ratings"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-4">
              <div className="flex flex-col items-center">
                <h4 className="text-lg font-semibold mb-2">Net Promoter Score</h4>
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#f0f0f0"
                      strokeWidth="10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#0088FE"
                      strokeWidth="10"
                      strokeDasharray="283"
                      strokeDashoffset="70"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute text-3xl font-bold">75</div>
                </div>
                <p className="text-sm text-default-500 mt-2">
                  +5 pts from last period
                </p>
                <div className="flex mt-4">
                  <div className="flex-1 text-center">
                    <p className="text-xs text-default-500">Detractors</p>
                    <p className="font-semibold">10%</p>
                  </div>
                  <div className="flex-1 text-center">
                    <p className="text-xs text-default-500">Passives</p>
                    <p className="font-semibold">15%</p>
                  </div>
                  <div className="flex-1 text-center">
                    <p className="text-xs text-default-500">Promoters</p>
                    <p className="font-semibold">75%</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex flex-col items-center">
                <h4 className="text-lg font-semibold mb-2">CSAT Score</h4>
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#f0f0f0"
                      strokeWidth="10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#00C49F"
                      strokeWidth="10"
                      strokeDasharray="283"
                      strokeDashoffset="56"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute text-3xl font-bold">4.2</div>
                </div>
                <p className="text-sm text-default-500 mt-2">Out of 5.0</p>
                <div className="w-full mt-4">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
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
                    </div>
                    <span className="text-xs">84%</span>
                  </div>
                  <Progress size="sm" value={84} color="success" />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex flex-col items-center">
                <h4 className="text-lg font-semibold mb-2">Review Sentiment</h4>
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#f0f0f0"
                      strokeWidth="10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#FFBB28"
                      strokeWidth="10"
                      strokeDasharray="283"
                      strokeDashoffset="85"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute text-3xl font-bold">70%</div>
                </div>
                <p className="text-sm text-default-500 mt-2">
                  Positive sentiment
                </p>
                <div className="w-full mt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-success">Positive</span>
                    <span className="text-xs">70%</span>
                  </div>
                  <Progress size="sm" value={70} color="success" />

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-warning">Neutral</span>
                    <span className="text-xs">20%</span>
                  </div>
                  <Progress size="sm" value={20} color="warning" />

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-danger">Negative</span>
                    <span className="text-xs">10%</span>
                  </div>
                  <Progress size="sm" value={10} color="danger" />
                </div>
              </div>
            </Card>
          </div>
        </ChartCard>
      </motion.div>
    </>
  );
};

export default CustomersOverviewTab;