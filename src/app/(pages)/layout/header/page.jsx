"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Tabs, Tab } from "@nextui-org/react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/components/animations";
import { Save, Eye, Undo, Navigation, Image, Type, Link as LinkIcon } from "lucide-react";
import HeaderPreview from "@/components/header/HeaderPreview";
import LogoSettings from "@/components/header/LogoSettings";
import NavigationSettings from "@/components/header/NavigationSettings";
import StyleSettings from "@/components/header/StyleSettings";
import useHeaderSettings from "./useHeaderSettings";

const HeaderSettingsPage = () => {
  const t = useTranslations("HeaderSettingsPage");
  const { headerSettings, updateHeaderSettings, resetToDefaults, saveSettings } = useHeaderSettings();
  const [activeTab, setActiveTab] = useState("logo");
  const [previewMode, setPreviewMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveSettings = async () => {
    try {
      setIsLoading(true);
      await saveSettings();
      // Show success notification
    } catch (error) {
      console.error("Error saving header settings:", error);
      // Show error notification
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetDefaults = async () => {
    try {
      setIsLoading(true);
      await resetToDefaults();
      // Show success notification
    } catch (error) {
      console.error("Error resetting header settings:", error);
      // Show error notification
    } finally {
      setIsLoading(false);
    }
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
          <HeaderPreview settings={headerSettings} />
        </motion.div>
      )}

      {/* Settings Tabs */}
      <motion.div variants={itemVariants}>
        <Tabs
          aria-label="Header Settings Tabs"
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
            key="logo"
            title={
              <div className="flex items-center gap-2">
                <Image size={18} />
                <span>{t("tabs.logo")}</span>
              </div>
            }
          />
          <Tab
            key="navigation"
            title={
              <div className="flex items-center gap-2">
                <Navigation size={18} />
                <span>{t("tabs.navigation")}</span>
              </div>
            }
          />
          <Tab
            key="style"
            title={
              <div className="flex items-center gap-2">
                <Type size={18} />
                <span>{t("tabs.style")}</span>
              </div>
            }
          />
        </Tabs>
      </motion.div>

      {/* Tab Content */}
      <motion.div variants={itemVariants} className="bg-content1 p-6 rounded-xl shadow-sm">
        {activeTab === "logo" && (
          <LogoSettings 
            settings={headerSettings} 
            updateSettings={updateHeaderSettings} 
          />
        )}
        {activeTab === "navigation" && (
          <NavigationSettings 
            settings={headerSettings} 
            updateSettings={updateHeaderSettings} 
          />
        )}
        {activeTab === "style" && (
          <StyleSettings 
            settings={headerSettings} 
            updateSettings={updateHeaderSettings} 
          />
        )}
      </motion.div>

      {/* Additional Components */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-content1 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-4">{t("devicePreview")}</h3>
          <div className="flex flex-col gap-4">
            <div className="border border-divider rounded-lg p-4">
              <h4 className="text-md font-medium mb-2">{t("desktopView")}</h4>
              <div className="bg-default-100 h-24 rounded-lg flex items-center justify-center">
                {t("desktopPreviewPlaceholder")}
              </div>
            </div>
            <div className="border border-divider rounded-lg p-4">
              <h4 className="text-md font-medium mb-2">{t("mobileView")}</h4>
              <div className="bg-default-100 h-24 rounded-lg flex items-center justify-center">
                {t("mobilePreviewPlaceholder")}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-content1 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-4">{t("templates")}</h3>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((template) => (
              <div 
                key={template} 
                className="border border-divider rounded-lg p-3 cursor-pointer hover:border-primary transition-colors"
              >
                <div className="bg-default-100 h-16 rounded-lg mb-2"></div>
                <p className="text-sm font-medium">{t("templateName", { id: template })}</p>
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
      </motion.div>
    </motion.div>
  );
};

export default HeaderSettingsPage;