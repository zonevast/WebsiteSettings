
// Sample data
export const salesData = [
  { month: "Jan", sales: 4000, orders: 240, products: 120, profit: 1200 },
  { month: "Feb", sales: 3000, orders: 198, products: 98, profit: 900 },
  { month: "Mar", sales: 2000, orders: 200, products: 87, profit: 600 },
  { month: "Apr", sales: 2780, orders: 308, products: 140, profit: 850 },
  { month: "May", sales: 1890, orders: 280, products: 120, profit: 570 },
  { month: "Jun", sales: 2390, orders: 320, products: 167, profit: 720 },
  { month: "Jul", sales: 3490, orders: 350, products: 190, profit: 1050 },
  { month: "Aug", sales: 4000, orders: 380, products: 210, profit: 1200 },
];

export const topProducts = [
  {
    name: "iPhone 14 Pro",
    value: 400,
    percentage: 20,
    growth: 15,
    stock: 120,
    price: 999,
  },
  {
    name: "Samsung S23",
    value: 300,
    percentage: 15,
    growth: 8,
    stock: 85,
    price: 899,
  },
  {
    name: "MacBook Pro",
    value: 300,
    percentage: 15,
    growth: 12,
    stock: 50,
    price: 1999,
  },
  {
    name: "AirPods Pro",
    value: 200,
    percentage: 10,
    growth: 20,
    stock: 200,
    price: 249,
  },
  {
    name: "iPad Air",
    value: 100,
    percentage: 5,
    growth: -3,
    stock: 75,
    price: 599,
  },
];

export const categoryPerformance = [
  { name: "Electronics", value: 400, growth: 12 },
  { name: "Clothing", value: 300, growth: 8 },
  { name: "Books", value: 300, growth: 5 },
  { name: "Home", value: 200, growth: 15 },
  { name: "Beauty", value: 150, growth: 20 },
  { name: "Sports", value: 100, growth: -2 },
];

export const productPerformanceData = [
  { subject: "Sales", A: 120, B: 110, fullMark: 150 },
  { subject: "Engagement", A: 98, B: 130, fullMark: 150 },
  { subject: "Retention", A: 86, B: 130, fullMark: 150 },
  { subject: "Growth", A: 99, B: 100, fullMark: 150 },
  { subject: "Satisfaction", A: 85, B: 90, fullMark: 150 },
  { subject: "Profit", A: 65, B: 85, fullMark: 150 },
];

export const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#e91e63",
];

export const kpiData = {
  totalSales: { value: "$24,780", change: "12.5", trend: "up" },
  totalOrders: { value: "1,546", change: "8.2", trend: "up" },
  productsSold: { value: "732", change: "3.1", trend: "down" },
  growthRate: { value: "15.2%", change: "5.7", trend: "up" },
};