"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Tabs, Tab } from "@nextui-org/react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/components/animations";
import {
  Save,
  Eye,
  Undo,
  Layout,
  Columns,
  Link as LinkIcon,
  Copyright,
  
} from "lucide-react";
import FooterPreview from "@/components/footer/FooterPreview";
import LayoutSettings from "@/components/footer/LayoutSettings";
import ContentSettings from "@/components/footer/ContentSettings";
import SocialSettings from "@/components/footer/SocialSettings";
import { useFooterSettings } from "./useFooterSettings";

const FooterSettingsPage = () => {
  const t = useTranslations("FooterSettings");
  const {
    footerSettings,
    updateFooterSettings,
    resetToDefaults,
    saveSettings,
    isLoading,
  } = useFooterSettings();
  const [activeTab, setActiveTab] = useState("layout");
  const [previewMode, setPreviewMode] = useState(false);

  const handleSaveSettings = async () => {
    await saveSettings();
  };

  const handleResetDefaults = async () => {
    await resetToDefaults();
  };

  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6 p-6"
    >
      {/* Header Section */}
      <motion.div
        variants={itemVariants}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t("headerTitle")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t("headerDescription")}
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            color="default"
            startContent={<Undo size={18} />}
            variant="flat"
            onPress={handleResetDefaults}
            isLoading={isLoading}
          >
            {t("resetDefaults")}
          </Button>
          <Button
            color="secondary"
            startContent={<Eye size={18} />}
            variant="flat"
            onPress={togglePreviewMode}
          >
            {previewMode ? t("exitPreview") : t("preview")}
          </Button>
          <Button
            color="primary"
            startContent={<Save size={18} />}
            variant="solid"
            onPress={handleSaveSettings}
            isLoading={isLoading}
          >
            {t("saveChanges")}
          </Button>
        </div>
      </motion.div>

      {/* Preview Section */}
      {previewMode && (
        <motion.div
          variants={itemVariants}
          className="w-full border border-divider rounded-xl overflow-hidden shadow-md"
        >
          <FooterPreview settings={footerSettings} />
        </motion.div>
      )}

      {/* Settings Tabs */}
      <motion.div variants={itemVariants}>
        <Tabs
          aria-label="Footer Settings Tabs"
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
            key="layout"
            title={
              <div className="flex items-center gap-2">
                <Layout size={18} />
                <span>{t("tabs.layout")}</span>
              </div>
            }
          />
          <Tab
            key="content"
            title={
              <div className="flex items-center gap-2">
                <Columns size={18} />
                <span>{t("tabs.content")}</span>
              </div>
            }
          />
          <Tab
            key="social"
            title={
              <div className="flex items-center gap-2">
                <Social size={18} />
                <span>{t("tabs.social")}</span>
              </div>
            }
          />
        </Tabs>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        variants={itemVariants}
        className="bg-content1 p-6 rounded-xl shadow-sm"
      >
        {activeTab === "layout" && (
          <LayoutSettings
            settings={footerSettings}
            updateSettings={updateFooterSettings}
          />
        )}
        {activeTab === "content" && (
          <ContentSettings
            settings={footerSettings}
            updateSettings={updateFooterSettings}
          />
        )}
        {activeTab === "social" && (
          <SocialSettings
            settings={footerSettings}
            updateSettings={updateFooterSettings}
          />
        )}
      </motion.div>

      {/* Additional Components */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="bg-content1 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-4">{t("footerTemplates")}</h3>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((template) => (
              <div
                key={template}
                className="border border-divider rounded-lg p-3 cursor-pointer hover:border-primary transition-colors"
              >
                <div className="bg-default-100 h-24 rounded-lg mb-2"></div>
                <p className="text-sm font-medium">
                  {t("templateName", { id: template })}
                </p>
                <p className="text-xs text-default-500">
                  {t("templateDescription", { id: template })}
                </p>
              </div>
            ))}
          </div>
          <Button
            className="w-full mt-4"
            color="primary"
            variant="flat"
            endContent={<LinkIcon size={16} />}
          >
            {t("browseMoreTemplates")}
          </Button>
        </div>

        <div className="bg-content1 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-4">{t("legalSettings")}</h3>
          <div className="space-y-4">
            <div className="border border-divider rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Copyright size={18} className="text-default-500" />
                <h4 className="text-md font-medium">
                  {t("copyrightSettings")}
                </h4>
              </div>
              <p className="text-sm text-default-600 mb-3">
                {t("copyrightDescription")}
              </p>
              <Button size="sm" color="primary" variant="flat">
                {t("configureCopyright")}
              </Button>
            </div>

            <div className="border border-divider rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <LinkIcon size={18} className="text-default-500" />
                <h4 className="text-md font-medium">{t("legalLinks")}</h4>
              </div>
              <p className="text-sm text-default-600 mb-3">
                {t("legalLinksDescription")}
              </p>
              <Button size="sm" color="primary" variant="flat">
                {t("manageLegalLinks")}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FooterSettingsPage;
