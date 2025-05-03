// Function to calculate the percentage change between two values
const calculatePercentageChange = (oldValue, newValue) => {
  if (oldValue === 0) {
    return newValue === 0 ? 0 : 100; // If oldValue is 0 and newValue is not 0, it's a 100% increase
  }
  return ((newValue - oldValue) / oldValue) * 100;
};

// Function to group dates by week and calculate percentage changes in sales
export const calculateWeeklySalesPercentageIncrease = (data={}) => {
  const { created_at, values } = data;

  // Function to convert a date string to a week number
  const getWeekNumber = (dateStr) => {
    const date = new Date(dateStr);
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + 1) / 7); // Returns the week number of the year
  };

  // Grouping values by week
  const weeklyData = [];

  created_at?.forEach((date, index) => {
    const weekNumber = getWeekNumber(date);
    if (!weeklyData[weekNumber]) {
      weeklyData[weekNumber] = { total: 0, count: 0 };
    }
    weeklyData[weekNumber].total += values[index];
    weeklyData[weekNumber].count += 1;
  });

  // Now calculate the average sales per week
  const weeklyAverages = Object.keys(weeklyData).map((weekNumber) => ({
    weekNumber,
    averageSales: weeklyData[weekNumber].total / weeklyData[weekNumber].count,
  }));

  // Calculate the percentage increase between each week
  const percentageChanges = [];
  for (let i = 1; i < weeklyAverages.length; i++) {
    const oldValue = weeklyAverages[i - 1].averageSales;
    const newValue = weeklyAverages[i].averageSales;
    const percentageChange = calculatePercentageChange(oldValue, newValue);
    percentageChanges.push({
      weekRange: `Week ${weeklyAverages[i - 1].weekNumber} to Week ${
        weeklyAverages[i].weekNumber
      }`,
      percentageChange: percentageChange.toFixed(2), // rounding to 2 decimal places
    });
  }

  return percentageChanges;
};