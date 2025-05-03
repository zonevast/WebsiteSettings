// InsightCard.jsx

import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { itemVariants } from "@/components/animations";
import { useSettings } from "@/hooks/settings/useSettings";

function InsightCard({
  icon: Icon,
  title,
  value,
  change,
  isTrendingUp,
  className,
}) {
  const {
    settings: { language },
  } = useSettings(); // Use the hook
  const isArabic = language === "ar";

  return (
    <motion.div variants={itemVariants}>
      <Card
        className={`border-none bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 ${className}`}
      >
        <CardBody className="py-5">
          <div className="flex justify-between items-start">
            <div className={isArabic ? "text-right" : "text-left"}>
              <p
                className={`text-sm text-default-500 flex items-center ${
                  isArabic ? "text-right" : "text-left"
                }`}
              >
                <Icon size={14} className="mr-1" />
                {title}
              </p>
              <h3
                className={`text-2xl font-bold mt-1 ${
                  isArabic ? "text-right" : "text-left"
                }`}
              >
                {value}
              </h3>
              <div className="mt-1 text-success flex items-center">
                {isTrendingUp ? (
                  <TrendingUp size={16} className="mr-1" />
                ) : (
                  <TrendingDown size={16} className="mr-1" />
                )}
                <span>{change}</span>
              </div>
            </div>
            <div className="bg-primary/10 p-2 rounded-lg">
              <Icon size={24} className="text-primary" />
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}

export default InsightCard;
