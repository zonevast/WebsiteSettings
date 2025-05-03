import { useParams } from "next/navigation";

// Function to format price
export const formatPrice = (price) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {locale} = useParams();
  const currency = "IQD";
  const options = {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };

  if (price === undefined || price === null || price === 0) {
    return new Intl.NumberFormat(
      locale === "ar" ? "ar-IQ" : "en-US",
      options
    ).format(0);
  }

  return new Intl.NumberFormat(
    locale === "ar" ? "ar-IQ" : "en-US",
    options
  ).format(price);
};
