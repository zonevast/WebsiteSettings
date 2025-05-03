import PropTypes from "prop-types";
import { FileX2, ArrowRight, ArrowLeft } from "lucide-react"; // Icons used
import { useTranslations } from "next-intl"; // i18n translation hook
import { useParams } from "next/navigation"; // Locale detection
import { useTheme } from "next-themes"; // Theme management
import Link from "next/link";
import { Button } from "@nextui-org/react";

function CustomNotFound({
  messages = {},
  href = "/",
  classNames = "h-screen",
}) {
  const t = useTranslations("NotFound");
  const params = useParams();
  const isRTL = params?.locale === "ar"; // RTL detection
  const { theme } = useTheme();

  const isDark = theme === "dark";
  const ArrowIcon = isRTL ? ArrowRight : ArrowLeft;

  // Define colors based on theme
  const titleColor = isDark ? "text-white" : "text-gray-700";
  const descriptionColor = isDark ? "text-gray-300" : "text-gray-500";
  const buttonTextColor = isDark ? "text-white" : "";

  // Fallback messages
  const defaultMessages = {
    defaultMessage: t("defaultMessage") || "Page Not Found",
    description:
      t("description") || "The page you are looking for doesn't exist.",
    back: t("back") || "Go Back",
  };

  const { defaultMessage, description, back } = {
    ...defaultMessages,
    ...messages,
  };

  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${classNames}`}
      aria-label="Page not found"
      role="alert"
    >
      <FileX2 className="h-24 w-24 text-gray-400 mb-4" aria-hidden="true" />
      <h2 className={`text-2xl font-semibold mb-2 ${titleColor}`}>
        {defaultMessage}
      </h2>
      <p className={`mb-6 ${descriptionColor}`}>{description}</p>
      <Button asChild variant="outline" className={buttonTextColor}>
        <Link href={href} className="inline-flex items-center">
          <ArrowIcon
            size={20}
            className={isRTL ? "ml-2" : "mr-2"}
            aria-hidden="true"
          />
          {back}
        </Link>
      </Button>
    </div>
  );
}

export default CustomNotFound;
