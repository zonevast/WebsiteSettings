// data.js

export const kpiData = {
    totalRevenue: {
      value: "$247,892",
      change: 12.5,
      trend: "up",
    },
    totalOrders: {
      value: "1,284",
      change: 8.3,
      trend: "up",
    },
    averageOrderValue: {
      value: "$193.06",
      change: 3.7,
      trend: "up",
    },
    returnRate: {
      value: "4.2%",
      change: -1.5,
      trend: "down",
    },
  };
  
  export const revenueData = [
    { name: "Jan", revenue: 42000, orders: 210 },
    { name: "Feb", revenue: 38000, orders: 190 },
    { name: "Mar", revenue: 45000, orders: 225 },
    { name: "Apr", revenue: 40000, orders: 200 },
    { name: "May", revenue: 43000, orders: 215 },
    { name: "Jun", revenue: 48000, orders: 240 },
    { name: "Jul", revenue: 52000, orders: 260 },
    { name: "Aug", revenue: 49000, orders: 245 },
    { name: "Sep", revenue: 55000, orders: 275 },
    { name: "Oct", revenue: 58000, orders: 290 },
    { name: "Nov", revenue: 62000, orders: 310 },
    { name: "Dec", revenue: 68000, orders: 340 },
  ];
  
  export const categoryData = [
    { name: "ICs", value: 45 },
    { name: "Displays", value: 20 },
    { name: "Batteries", value: 15 },
    { name: "Cables", value: 10 },
    { name: "Other", value: 10 },
  ];
  
  export const channelData = [
    { name: "Website", value: 65 },
    { name: "Mobile App", value: 25 },
    { name: "Marketplace", value: 10 },
  ];
  
  export const geographicalData = [
    { country: "USA", orders: 450, revenue: 87500 },
    { country: "UK", orders: 290, revenue: 56000 },
    { country: "Germany", orders: 210, revenue: 41000 },
    { country: "France", orders: 180, revenue: 35000 },
    { country: "Canada", orders: 154, revenue: 30000 },
  ];
  
  export const customerSegmentData = [
    { name: "New", value: 30 },
    { name: "Returning", value: 45 },
    { name: "Loyal", value: 25 },
  ];
  
  export const customerLifetimeData = [
    { value: 0, customers: 0 },
    { value: 500, customers: 120 },
    { value: 1000, customers: 80 },
    { value: 1500, customers: 60 },
    { value: 2000, customers: 40 },
    { value: 2500, customers: 30 },
    { value: 3000, customers: 25 },
    { value: 3500, customers: 20 },
    { value: 4000, customers: 15 },
    { value: 4500, customers: 10 },
    { value: 5000, customers: 8 },
    { value: 5500, customers: 5 },
    { value: 6000, customers: 3 },
    { value: 6500, customers: 2 },
    { value: 7000, customers: 1 },
  ];
  
  export const topProductsData = [
    {
      id: 1,
      name: "iPhone14-NFC 210V3MU",
      sales: 87,
      revenue: 696000,
      growth: 12.4,
    },
    {
      id: 2,
      name: "TPS65657B0 IC-Display",
      sales: 65,
      revenue: 455000,
      growth: 8.7,
    },
    {
      id: 3,
      name: "UCCMAD GGNU042339 PMI IC",
      sales: 58,
      revenue: 406000,
      growth: 5.2,
    },
    {
      id: 4,
      name: "BC59355A2 IC-Wireless",
      sales: 42,
      revenue: 252000,
      growth: -2.1,
    },
    {
      id: 5,
      name: "Charging IC 343S00394",
      sales: 38,
      revenue: 228000,
      growth: 3.8,
    },
  ];
  
  export const retentionData = [
    { month: "Jan", retention: 78 },
    { month: "Feb", retention: 75 },
    { month: "Mar", retention: 79 },
    { month: "Apr", retention: 82 },
    { month: "May", retention: 80 },
    { month: "Jun", retention: 83 },
    { month: "Jul", retention: 85 },
    { month: "Aug", retention: 84 },
    { month: "Sep", retention: 86 },
    { month: "Oct", retention: 88 },
    { month: "Nov", retention: 87 },
    { month: "Dec", retention: 89 },
  ];
  
  export const fulfillmentData = [
    { name: "Processing", value: 15 },
    { name: "Shipped", value: 25 },
    { name: "Delivered", value: 60 },
  ];