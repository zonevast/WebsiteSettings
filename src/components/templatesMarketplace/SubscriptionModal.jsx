"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import { CheckCircle, ArrowRight } from "lucide-react";

// PlanCard component (your provided one)
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

// Subscription Modal Component
export const SubscriptionModal = ({ isOpen, onClose, subscriptionPlans }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">
              Subscription Plans
              <p className="text-sm text-gray-500">
                Choose the Right Plan for Your Business
              </p>
            </ModalHeader>

            <ModalBody>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {subscriptionPlans.map((plan) => (
                  <PlanCard key={plan.id} plan={plan} />
                ))}
              </div>

              <div className="mt-4 p-4 bg-default-50 rounded-lg text-center">
                <h3 className="font-bold mb-2">Need a custom solution?</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Contact our sales team for custom enterprise solutions
                  tailored to your specific needs.
                </p>
                <Button
                  color="primary"
                  variant="flat"
                  endContent={<ArrowRight size={16} />}
                >
                  Contact Sales
                </Button>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
