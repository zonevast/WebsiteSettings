"use client";
import React from "react";
import { Card } from "@nextui-org/react";

const OperationsStatsCard = ({ stat }) => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{stat.title}</p>
          <p className="text-2xl font-bold">{stat.value}</p>
        </div>
        <div className={`p-3 rounded-full bg-${stat.color}-100`}>
          <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
        </div>
      </div>
    </Card>
  );
};

export default OperationsStatsCard;
