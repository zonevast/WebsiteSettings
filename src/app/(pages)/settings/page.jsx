"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { GeneralSettings } from "./setions/GeneralSettings";
import { AppearanceSettings } from "./setions/AppearanceSettings";
import { containerVariants, itemVariants } from "@/components/animations";

function SettingsPage() {
  const t = useTranslations("SettingsPage");

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6 p-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t("title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">{t("description")}</p>
        </div>
      </motion.div>

      {/* Settings Sections */}
      <div className="space-y-8">
        <motion.div variants={itemVariants}>
          <GeneralSettings />
        </motion.div>

        <motion.div variants={itemVariants}>
          <AppearanceSettings />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default SettingsPage;
