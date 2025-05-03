const currencyCode = "IQD";
// export const formatterCurrency = new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: currencyCode,
//     minimumFractionDigits: 0,
// });
export const formatCurrency = (amount) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 0,
  });

  // Format the amount
  // Append the currency code
  // return `${formattedAmount} ${currencyCode}`;
  return formatter.format(amount);
};

export function transformKey(key) {
  return key
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replaceAll(" ", "")
    .replaceAll("-", "")
    .replaceAll("NumberOf", "")
    .replace(/^./, (char) => char.toLowerCase());
}
