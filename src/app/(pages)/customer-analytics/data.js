
// Sample data
export const customerTrendData = [
    { month: "Jan", newCustomers: 120, activeCustomers: 450, churnRate: 2.1 },
    { month: "Feb", newCustomers: 140, activeCustomers: 480, churnRate: 1.8 },
    { month: "Mar", newCustomers: 160, activeCustomers: 520, churnRate: 1.9 },
    { month: "Apr", newCustomers: 180, activeCustomers: 550, churnRate: 2.0 },
    { month: "May", newCustomers: 210, activeCustomers: 600, churnRate: 1.7 },
    { month: "Jun", newCustomers: 250, activeCustomers: 650, churnRate: 1.5 },
    { month: "Jul", newCustomers: 280, activeCustomers: 700, churnRate: 1.4 },
    { month: "Aug", newCustomers: 310, activeCustomers: 750, churnRate: 1.3 },
];

export const customerSegments = [
    { name: "Loyal Customers", value: 40, growth: 5 },
    { name: "Regular Buyers", value: 30, growth: 3 },
    { name: "Occasional Shoppers", value: 15, growth: -2 },
    { name: "New Customers", value: 10, growth: 8 },
    { name: "At-Risk Customers", value: 5, growth: -5 },
];

export const customerLifetimeValue = [
    { segment: "Premium", clv: 2500, retention: 85, count: 120 },
    { segment: "Standard", clv: 1200, retention: 70, count: 350 },
    { segment: "Basic", clv: 500, retention: 50, count: 580 },
];

export const geographicData = [
    { region: "North America", customers: 1200, revenue: 450000, growth: 8 },
    { region: "Europe", customers: 950, revenue: 380000, growth: 5 },
    { region: "Asia", customers: 850, revenue: 320000, growth: 12 },
    { region: "Australia", customers: 320, revenue: 150000, growth: 3 },
    { region: "South America", customers: 280, revenue: 120000, growth: 7 },
    { region: "Africa", customers: 150, revenue: 60000, growth: 15 },
];

export const purchaseFrequencyData = [
    { name: "Weekly", value: 15 },
    { name: "Bi-Weekly", value: 25 },
    { name: "Monthly", value: 35 },
    { name: "Quarterly", value: 20 },
    { name: "Yearly", value: 5 },
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
    totalCustomers: { value: "12,845", change: "8.5", trend: "up" },
    activeCustomers: { value: "9,320", change: "5.2", trend: "up" },
    customerLifetimeValue: { value: "$1,250", change: "12.1", trend: "up" },
    churnRate: { value: "1.8%", change: "0.3", trend: "down" },
};
