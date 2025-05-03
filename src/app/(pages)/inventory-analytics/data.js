
// Sample data
export const inventoryTrendData = [
  { month: "Jan", stockLevel: 1200, reorderRate: 15, stockouts: 3 },
  { month: "Feb", stockLevel: 1350, reorderRate: 12, stockouts: 2 },
  { month: "Mar", stockLevel: 1100, reorderRate: 18, stockouts: 5 },
  { month: "Apr", stockLevel: 1400, reorderRate: 14, stockouts: 1 },
  { month: "May", stockLevel: 1250, reorderRate: 16, stockouts: 2 },
  { month: "Jun", stockLevel: 1500, reorderRate: 13, stockouts: 0 },
  { month: "Jul", stockLevel: 1600, reorderRate: 11, stockouts: 1 },
  { month: "Aug", stockLevel: 1450, reorderRate: 14, stockouts: 2 },
];

export const inventoryStatusData = [
  { name: "In Stock", value: 65 },
  { name: "Low Stock", value: 20 },
  { name: "Out of Stock", value: 5 },
  { name: "On Order", value: 10 },
];

export const warehousePerformanceData = [
  {
    warehouse: "North",
    turnoverRate: 12,
    utilizationRate: 85,
    pickingAccuracy: 98,
  },
  {
    warehouse: "South",
    turnoverRate: 10,
    utilizationRate: 78,
    pickingAccuracy: 96,
  },
  {
    warehouse: "East",
    turnoverRate: 15,
    utilizationRate: 92,
    pickingAccuracy: 99,
  },
  {
    warehouse: "West",
    turnoverRate: 8,
    utilizationRate: 70,
    pickingAccuracy: 95,
  },
  {
    warehouse: "Central",
    turnoverRate: 14,
    utilizationRate: 88,
    pickingAccuracy: 97,
  },
];

export const categoryInventoryData = [
  { name: "Electronics", value: 35, stockValue: 125000 },
  { name: "Clothing", value: 25, stockValue: 85000 },
  { name: "Home Goods", value: 15, stockValue: 65000 },
  { name: "Sports", value: 10, stockValue: 45000 },
  { name: "Beauty", value: 8, stockValue: 35000 },
  { name: "Books", value: 7, stockValue: 25000 },
];

export const topProductsData = [
  {
    id: 1,
    name: "Wireless Headphones",
    sku: "EL-WH-001",
    stock: 145,
    demand: 95,
    turnover: 18,
    daysOfSupply: 12,
  },
  {
    id: 2,
    name: "Smart Watch",
    sku: "EL-SW-002",
    stock: 78,
    demand: 85,
    turnover: 22,
    daysOfSupply: 8,
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    sku: "EL-BS-003",
    stock: 210,
    demand: 65,
    turnover: 9,
    daysOfSupply: 25,
  },
  {
    id: 4,
    name: "Laptop Backpack",
    sku: "BG-LB-001",
    stock: 95,
    demand: 45,
    turnover: 12,
    daysOfSupply: 18,
  },
  {
    id: 5,
    name: "Fitness Tracker",
    sku: "EL-FT-004",
    stock: 65,
    demand: 75,
    turnover: 25,
    daysOfSupply: 7,
  },
];

export const forecastAccuracyData = [
  { month: "Jan", actual: 1200, forecast: 1250, accuracy: 96 },
  { month: "Feb", actual: 1350, forecast: 1300, accuracy: 96.3 },
  { month: "Mar", actual: 1100, forecast: 1200, accuracy: 91.7 },
  { month: "Apr", actual: 1400, forecast: 1350, accuracy: 96.4 },
  { month: "May", actual: 1250, forecast: 1300, accuracy: 96.2 },
  { month: "Jun", actual: 1500, forecast: 1450, accuracy: 96.7 },
];

export const supplyChainMetricsData = [
  { metric: "Lead Time", value: 85 },
  { metric: "Order Accuracy", value: 95 },
  { metric: "Perfect Order Rate", value: 88 },
  { metric: "Inventory Accuracy", value: 97 },
  { metric: "Carrying Cost", value: 75 },
];

export const kpiData = {
  totalInventoryValue: { value: "$1.45M", change: "5.2", trend: "up" },
  inventoryTurnover: { value: "12.5", change: "8.3", trend: "up" },
  stockoutRate: { value: "1.8%", change: "0.5", trend: "down" },
  daysOfSupply: { value: "24", change: "2", trend: "up" },
};

export const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#e91e63",
];
