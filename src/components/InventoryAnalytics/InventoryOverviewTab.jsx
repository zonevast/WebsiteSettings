"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Badge,
  Button,
  Tooltip,
  Card,
  Progress,
  Chip,
  Avatar,
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Treemap,
} from "recharts";
import InsightCard from "@/components/analytics/InsightCard";
import { ChartCard } from "@/components/analytics/ChartCard";
import {
  categoryInventoryData,
  COLORS,
  inventoryStatusData,
  inventoryTrendData,
  topProductsData,
  warehousePerformanceData,
} from "@/app/(pages)/inventory-analytics/data"; // Ensure correct path
import {
  LineChart as LineChartIcon,
  BarChart2,
  PieChart as PieChartIcon,
  Clock,
  Zap,
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Search,
  Package,
  FileText,
  Printer,
  Share2,
  Bookmark,
  Filter,
} from "lucide-react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react"; // Import Table components
import { itemVariants } from "@/components/animations"; // Import animation variants

const InventoryOverviewTab = ({
  selectedChart,
  setSelectedChart,
  isLoading,
  kpiCards,
}) => {
  const renderInventoryTrendChart = () => {
    switch (selectedChart) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={inventoryTrendData}>
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
                dataKey="stockLevel"
                name="Stock Level"
                fill="#8884d8"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="reorderRate"
                name="Reorder Rate"
                fill="#82ca9d"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );
      case "area":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={inventoryTrendData}>
              <defs>
                <linearGradient
                  id="colorStockLevel"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient
                  id="colorReorderRate"
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
                dataKey="stockLevel"
                name="Stock Level"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorStockLevel)"
              />
              <Area
                type="monotone"
                dataKey="reorderRate"
                name="Reorder Rate"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorReorderRate)"
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      default:
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={inventoryTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" domain={[0, 20]} />
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
                dataKey="stockLevel"
                name="Stock Level"
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
                yAxisId="right"
                type="monotone"
                dataKey="reorderRate"
                name="Reorder Rate (%)"
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
                dataKey="stockouts"
                name="Stockouts"
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <ChartCard
            title="Inventory Trends"
            subtitle="Stock levels and reorder rates over time"
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
                  <Badge color="success" variant="flat">
                    <Zap size={14} className="mr-1" />
                    5.2% growth
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
            {renderInventoryTrendChart()}
          </ChartCard>
        </motion.div>

        {/* Inventory Status */}
        <motion.div variants={itemVariants}>
          <ChartCard
            title="Inventory Status"
            subtitle="Current stock status across all products"
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
                  <AlertTriangle size={14} className="mr-1" />
                  5% of products out of stock
                </Badge>
                <Button
                  size="sm"
                  variant="light"
                  color="primary"
                  endContent={<ArrowRight size={14} />}
                >
                  Stock Details
                </Button>
              </div>
            }
          >
            <div className="flex flex-col md:flex-row gap-4">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={inventoryStatusData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                    labelLine={false}
                  >
                    {inventoryStatusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          index === 0
                            ? "#00C49F"
                            : index === 1
                            ? "#FFBB28"
                            : index === 2
                            ? "#FF8042"
                            : "#0088FE"
                        }
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
        {/* Warehouse Performance */}
        <motion.div variants={itemVariants}>
          <ChartCard
            title="Warehouse Performance"
            subtitle="Comparison of key metrics across warehouses"
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
                  East warehouse has highest turnover
                </Badge>
                <Button
                  size="sm"
                  variant="flat"
                  color="primary"
                  startContent={<Filter size={14} />}
                >
                  Filter Warehouses
                </Button>
              </div>
            }
          >
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart outerRadius={90} data={warehousePerformanceData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="warehouse" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Turnover Rate"
                  dataKey="turnoverRate"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
                <Radar
                  name="Utilization Rate"
                  dataKey="utilizationRate"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.6}
                />
                <Radar
                  name="Picking Accuracy"
                  dataKey="pickingAccuracy"
                  stroke="#ffc658"
                  fill="#ffc658"
                  fillOpacity={0.6}
                />
                <Legend />
                <RechartsTooltip />
              </RadarChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div variants={itemVariants}>
          <ChartCard
            title="Inventory by Category"
            subtitle="Distribution of inventory across product categories"
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
                <Badge color="secondary" variant="flat">
                  <Package size={14} className="mr-1" />
                  Electronics is largest category
                </Badge>
                <Button
                  size="sm"
                  variant="light"
                  color="primary"
                  endContent={<ArrowRight size={14} />}
                >
                  Category Details
                </Button>
              </div>
            }
          >
            <ResponsiveContainer width="100%" height={300}>
              <Treemap
                data={categoryInventoryData}
                dataKey="stockValue"
                aspectRatio={4 / 3}
                stroke="#fff"
                fill="#8884d8"
                content={({ x, y, width, height, index, payload }) => {
                  return (
                    <g>
                      <rect
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        style={{
                          fill: COLORS[index % COLORS.length],
                          stroke: "#fff",
                          strokeWidth: 2,
                          strokeOpacity: 1,
                        }}
                      />
                      {width > 30 && height > 30 && (
                        <text
                          x={x + width / 2}
                          y={y + height / 2}
                          textAnchor="middle"
                          fill="#fff"
                          fontSize={12}
                        >
                          {payload?.name}
                        </text>
                      )}
                    </g>
                  );
                }}
              >
                <RechartsTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2 border rounded shadow">
                          <p className="font-medium">
                            {payload[0].payload.name}
                          </p>
                          <p>
                            Stock Value: $
                            {payload[0].payload.stockValue.toLocaleString()}
                          </p>
                          <p>Percentage: {payload[0].payload.value}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </Treemap>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>
      </div>

      {/* Top Products Table */}
      <motion.div variants={itemVariants}>
        <ChartCard
          title="Top Products by Inventory Turnover"
          subtitle="Products with highest turnover rates and stock levels"
          actionButton={
            <Button
              size="sm"
              variant="flat"
              color="primary"
              startContent={<Search size={16} />}
            >
              Search Products
            </Button>
          }
          footer={
            <div className="flex justify-between items-center">
              <Badge color="success" variant="flat">
                <Zap size={14} className="mr-1" />
                Fitness Tracker has highest turnover
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
          <Table
            aria-label="Top Products Table"
            selectionMode="none"
            classNames={{
              base: "max-h-[400px]",
              table: "min-h-[400px]",
            }}
          >
            <TableHeader>
              <TableColumn>PRODUCT</TableColumn>
              <TableColumn>SKU</TableColumn>
              <TableColumn>STOCK</TableColumn>
              <TableColumn>DEMAND</TableColumn>
              <TableColumn>TURNOVER</TableColumn>
              <TableColumn>DAYS OF SUPPLY</TableColumn>
              <TableColumn>STATUS</TableColumn>
            </TableHeader>
            <TableBody>
              {topProductsData.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar
                        radius="sm"
                        size="sm"
                        src={`https://placehold.co/200x200/4338CA/white?text=${product.name.charAt(
                          0
                        )}`}
                      />
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.demand}</TableCell>
                  <TableCell>
                    <Chip
                      color={
                        product.turnover > 20
                          ? "success"
                          : product.turnover > 10
                          ? "primary"
                          : "default"
                      }
                      variant="flat"
                    >
                      {product.turnover}x
                    </Chip>
                  </TableCell>
                  <TableCell>{product.daysOfSupply} days</TableCell>
                  <TableCell>
                    <Chip
                      color={
                        product.stock > product.demand * 1.5
                          ? "success"
                          : product.stock < product.demand
                          ? "danger"
                          : "warning"
                      }
                      variant="dot"
                    >
                      {product.stock > product.demand * 1.5
                        ? "Well Stocked"
                        : product.stock < product.demand
                        ? "Low Stock"
                        : "Adequate"}
                    </Chip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ChartCard>
      </motion.div>

      {/* Inventory Aging Analysis */}
      <motion.div variants={itemVariants}>
        <ChartCard
          title="Inventory Aging Analysis"
          subtitle="Distribution of inventory by age and category"
          actionButton={
            <Button
              size="sm"
              variant="flat"
              color="primary"
              startContent={<Clock size={16} />}
            >
              Aging Settings
            </Button>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-4">
              <div className="flex flex-col items-center">
                <h4 className="text-lg font-semibold mb-2">Age Distribution</h4>
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
                  <div className="absolute text-3xl font-bold">75%</div>
                </div>
                <p className="text-sm text-default-500 mt-2">Fresh Inventory</p>
                <div className="flex mt-4 w-full">
                  <div className="flex-1 text-center">
                    <p className="text-xs text-default-500">0-30 days</p>
                    <p className="font-semibold">75%</p>
                  </div>
                  <div className="flex-1 text-center">
                    <p className="text-xs text-default-500">31-60 days</p>
                    <p className="font-semibold">15%</p>
                  </div>
                  <div className="flex-1 text-center">
                    <p className="text-xs text-default-500">60+ days</p>
                    <p className="font-semibold">10%</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex flex-col items-center">
                <h4 className="text-lg font-semibold mb-2">
                  Slow-Moving Items
                </h4>
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
                      strokeDashoffset="198"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute text-3xl font-bold">30%</div>
                </div>
                <p className="text-sm text-default-500 mt-2">
                  Of Total Inventory
                </p>
                <div className="w-full mt-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs">Electronics</span>
                    <span className="text-xs">12%</span>
                  </div>
                  <Progress
                    size="sm"
                    value={12}
                    color="warning"
                    className="mb-2"
                  />

                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs">Clothing</span>
                    <span className="text-xs">8%</span>
                  </div>
                  <Progress
                    size="sm"
                    value={8}
                    color="warning"
                    className="mb-2"
                  />

                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs">Home Goods</span>
                    <span className="text-xs">10%</span>
                  </div>
                  <Progress size="sm" value={10} color="warning" />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex flex-col items-center">
                <h4 className="text-lg font-semibold mb-2">
                  Obsolete Inventory
                </h4>
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
                      stroke="#FF8042"
                      strokeWidth="10"
                      strokeDasharray="283"
                      strokeDashoffset="254"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute text-3xl font-bold">5%</div>
                </div>
                <p className="text-sm text-default-500 mt-2">
                  Value: $72,500
                </p>
                <div className="w-full mt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs">No movement (180+ days)</span>
                    <span className="text-xs">3%</span>
                  </div>
                  <Progress size="sm" value={3} color="danger" />

                  <div className="flex justify-between items-center">
                    <span className="text-xs">Discontinued items</span>
                    <span className="text-xs">1.5%</span>
                  </div>
                  <Progress size="sm" value={1.5} color="danger" />

                  <div className="flex justify-between items-center">
                    <span className="text-xs">Damaged inventory</span>
                    <span className="text-xs">0.5%</span>
                  </div>
                  <Progress size="sm" value={0.5} color="danger" />
                </div>
              </div>
            </Card>
          </div>
        </ChartCard>
      </motion.div>
    </>
  );
};

export default InventoryOverviewTab;