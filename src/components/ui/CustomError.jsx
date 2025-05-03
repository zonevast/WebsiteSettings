"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@nextui-org/react"; // Import useTheme
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useTheme } from "next-themes";

function CustomError({ messages, href, classNames = "h-screen" }) {
  const t = useTranslations("Error");
  const params = useParams();
  const isRTL = params.locale === "ar";
  const { theme } = useTheme();

  const isDark = theme == "dark" ? true : false;

  const ArrowIcon = isRTL ? ArrowRight : ArrowLeft;

  // Define colors based on theme
  const titleColor = isDark ? "text-white" : "text-gray-700"; // Title color
  const descriptionColor = isDark ? "text-gray-300" : "text-gray-500"; // Description color
  const buttonTextColor = isDark ? "text-white" : ""; // Button text color (default)

  return (
    <div className={`flex flex-col items-center justify-center ${classNames}`}>
      <AlertCircle className="h-24 w-24 text-red-400 mb-4" />
      <h2 className={`text-2xl font-semibold mb-2 ${titleColor}`}>
        {messages.defaultMessage}
      </h2>
      <p className={`mb-6 ${descriptionColor}`}>{messages.description}</p>
      <Button asChild variant="outline" className={buttonTextColor}>
        <Link href={href} className="inline-flex items-center">
          <ArrowIcon size={20} className={isRTL ? "ml-2" : "mr-2"} />
          {messages.back}
        </Link>
      </Button>
    </div>
  );
}

export default CustomError;
