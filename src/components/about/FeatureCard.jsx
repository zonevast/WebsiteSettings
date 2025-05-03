"use client";
import React from "react";
import { Card, CardBody, Chip, Progress } from "@nextui-org/react";
import { useSettings } from "@/hooks/settings/useSettings";

const FeatureCard = ({ feature }) => {
  const {
    settings: { language },
  } = useSettings(); // Use the hook

  const isArabic = language === "ar";

  return (
    <Card className={`border border-default-200`}>
      <CardBody className="space-y-3">
        <div className={`flex justify-between items-start`}>
          <div className="p-2 bg-primary/10 w-fit rounded-lg">
            {feature.icon}
          </div>
        </div>
        <h3 className={`text-lg font-semibold ${isArabic ? "text-right" : ""}`}>
          {feature.title}
        </h3>
        <p
          className={`text-default-600 text-sm ${isArabic ? "text-right" : ""}`}
        >
          {feature.description}
        </p>
      </CardBody>
    </Card>
  );
};

export default FeatureCard;
