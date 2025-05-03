export const calculateGrowth = (values) => {
    if (values && values.length > 1) {
        const lastMonth = values[values.length - 2];
        const currentMonth = values[values.length - 1];

        if (lastMonth === 0) {
            return "+100%"; // If the last month's value is zero, return a high growth
        }

        const growth = ((currentMonth - lastMonth) / lastMonth) * 100;
        return `${growth.toFixed(1)}%`; // Format growth to one decimal place
    }
    return "0%"; // Return 0% if there is no previous data
};