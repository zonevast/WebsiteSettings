"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button, Tabs, Tab, useDisclosure } from "@nextui-org/react";
import { Crown, FileText, Layers } from "lucide-react";
import { TemplatesTab } from "@/components/templatesMarketplace/TemplatesTab";
import { CollectionsTab } from "@/components/templatesMarketplace/CollectionsTab";
import { SubscriptionModal } from "@/components/templatesMarketplace/SubscriptionModal";
import { containerVariants, itemVariants } from "@/components/animations";

const ReportTemplatesMarketplace = () => {
  const [activeTab, setActiveTab] = useState("templates");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const subscriptionPlans = [
    {
      id: "free",
      name: "Free",
      price: 0,
      recommended: false,
      features: [
        /* ... */
      ],
    },
    {
      id: "pro",
      name: "Professional",
      price: 29,
      recommended: true,
      features: [
        /* ... */
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 99,
      recommended: false,
      features: [
        /* ... */
      ],
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 p-4 max-w-7xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Report Templates Marketplace
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Discover pre-designed reports and analytics dashboards for your
              business needs
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              color="primary"
              startContent={<Crown size={16} />}
              onPress={onOpen}
            >
              Upgrade to Pro
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants}>
        <Tabs
          aria-label="Marketplace Tabs"
          selectedKey={activeTab}
          onSelectionChange={setActiveTab}
          color="primary"
          variant="underlined"
          classNames={{
            tabList:
              "gap-6 w-full relative rounded-none p-0 border-b border-divider",
            cursor: "w-full bg-primary",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-primary",
          }}
        >
          <Tab
            key="templates"
            title={
              <div className="flex items-center gap-2">
                <FileText size={18} />
                <span>Templates</span>
              </div>
            }
          />
          <Tab
            key="collections"
            title={
              <div className="flex items-center gap-2">
                <Layers size={18} />
                <span>Collections</span>
              </div>
            }
          />
        </Tabs>
      </motion.div>

      {/* Tab Content */}
      <motion.div variants={itemVariants}>
        {activeTab === "templates" ? <TemplatesTab /> : <CollectionsTab />}
      </motion.div>

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={isOpen}
        onClose={onClose}
        subscriptionPlans={subscriptionPlans}
      />
    </motion.div>
  );
};

export default ReportTemplatesMarketplace;
