// components/StatsCard.jsx
import React from "react";
import { Card, CardBody, Chip } from "@nextui-org/react";

const StatsCard = ({ title, value, icon, change, changeLabel, color }) => {
  return (
    <Card>
      <CardBody className="p-4">
        <div className="flex justify-between items-start">
          <div className="p-2 bg-default-100 rounded-lg">{icon}</div>
          <Chip color={color} variant="flat" size="sm">
            {change}
          </Chip>
        </div>
        <div className="mt-3">
          <p className="text-default-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          <p className="text-xs text-default-400 mt-1">{changeLabel}</p>
        </div>
      </CardBody>
    </Card>
  );
};

export default StatsCard;

