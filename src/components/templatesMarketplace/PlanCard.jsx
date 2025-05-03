"use client";
import React from "react";
import { Card, CardBody, CardFooter, Button, Divider } from "@nextui-org/react";
import { CheckCircle } from "lucide-react";

export const PlanCard = ({ plan }) => {
  return (
    <Card
      className={`h-full ${plan.recommended ? "border-2 border-primary" : ""}`}
    >
      {plan.recommended && (
        <div className="bg-primary text-white text-center py-1 text-sm font-medium">
          Recommended
        </div>
      )}
      <CardBody className="p-5">
        <h3 className="text-xl font-bold">{plan.name}</h3>
        <div className="my-4">
          <span className="text-3xl font-bold">
            {plan.price === 0 ? "Free" : `$${plan.price}`}
          </span>
          {plan.price > 0 && (
            <span className="text-sm text-gray-500">/month</span>
          )}
        </div>

        <Divider className="my-4" />

        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle
                size={18}
                className="text-success mr-2 flex-shrink-0 mt-0.5"
              />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardBody>
      <CardFooter>
        <Button
          color={plan.recommended ? "primary" : "default"}
          variant={plan.recommended ? "solid" : "bordered"}
          className="w-full"
        >
          {plan.price === 0 ? "Sign Up Free" : "Subscribe Now"}
        </Button>
      </CardFooter>
    </Card>
  );
};
