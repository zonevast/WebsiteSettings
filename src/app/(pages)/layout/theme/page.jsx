"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Button,
  Tabs,
  Tab,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Switch,
  Slider,
  Chip,
  Tooltip,
  Divider,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/components/animations";
import {
  Save,
  Eye,
  Undo,
  Palette,
  Type,
  Layout,
  Moon,
  Sun,
  Monitor,
  Smartphone,
  Tablet,
  Plus,
  Trash2,
  Copy,
  Check,
  X,
  Droplet,
  Grid,
  Box,
  Layers,
  Sliders,
} from "lucide-react";
import ThemePreview from "@/components/theme/ThemePreview";
import ColorSettings from "@/components/theme/ColorSettings";
import TypographySettings from "@/components/theme/TypographySettings";
import LayoutSettings from "@/components/theme/LayoutSettings";
import { useThemeSettings } from "./useThemeSettings";

const ThemeSettingsPage = () => {
  const t = useTranslations("ThemeSettingsPage");
  const {
    themeSettings,
    updateThemeSettings,
    resetToDefaults,
    saveSettings,
    isLoading,
  } = useThemeSettings();
  const [activeTab, setActiveTab] = useState("colors");
  const [previewMode, setPreviewMode] = useState(false);
  const [previewDevice, setPreviewDevice] = useState("desktop");

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
          <div className="bg-content1 p-3 border-b border-divider flex items-center justify-between">
            <h3 className="text-lg font-semibold">{t("themePreview")}</h3>
            <div className="flex gap-2">
              <Tooltip content={t("desktop")}>
                <Button
                  isIconOnly
                  size="sm"
                  variant={previewDevice === "desktop" ? "solid" : "flat"}
                  color={previewDevice === "desktop" ? "primary" : "default"}
                  onPress={() => setPreviewDevice("desktop")}
                >
                  <Monitor size={16} />
                </Button>
              </Tooltip>
              <Tooltip content={t("tablet")}>
                <Button
                  isIconOnly
                  size="sm"
                  variant={previewDevice === "tablet" ? "solid" : "flat"}
                  color={previewDevice === "tablet" ? "primary" : "default"}
                  onPress={() => setPreviewDevice("tablet")}
                >
                  <Tablet size={16} />
                </Button>
              </Tooltip>
              <Tooltip content={t("mobile")}>
                <Button
                  isIconOnly
                  size="sm"
                  variant={previewDevice === "mobile" ? "solid" : "flat"}
                  color={previewDevice === "mobile" ? "primary" : "default"}
                  onPress={() => setPreviewDevice("mobile")}
                >
                  <Smartphone size={16} />
                </Button>
              </Tooltip>
            </div>
          </div>
          <ThemePreview settings={themeSettings} device={previewDevice} />
        </motion.div>
      )}

      {/* Settings Tabs */}
      <motion.div variants={itemVariants}>
        <Tabs
          aria-label="Theme Settings Tabs"
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
            key="colors"
            title={
              <div className="flex items-center gap-2">
                <Palette size={18} />
                <span>{t("tabs.colors")}</span>
              </div>
            }
          />
          <Tab
            key="typography"
            title={
              <div className="flex items-center gap-2">
                <Type size={18} />
                <span>{t("tabs.typography")}</span>
              </div>
            }
          />
          <Tab
            key="layout"
            title={
              <div className="flex items-center gap-2">
                <Layout size={18} />
                <span>{t("tabs.layout")}</span>
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
        {activeTab === "colors" && (
          <ColorSettings
            settings={themeSettings}
            updateSettings={updateThemeSettings}
          />
        )}
        {activeTab === "typography" && (
          <TypographySettings
            settings={themeSettings}
            updateSettings={updateThemeSettings}
          />
        )}
        {activeTab === "layout" && (
          <LayoutSettings
            settings={themeSettings}
            updateSettings={updateThemeSettings}
          />
        )}
      </motion.div>

      {/* Theme Presets */}
      <motion.div variants={itemVariants}>
        <h3 className="text-xl font-semibold mb-4">{t("themePresets")}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {themeSettings.presets.map((preset) => (
            <Card
              key={preset.id}
              isPressable
              onPress={() => updateThemeSettings({ activePreset: preset.id })}
              className={`border-2 ${
                themeSettings.activePreset === preset.id
                  ? "border-primary"
                  : "border-transparent"
              }`}
            >
              <CardBody className="p-3">
                <div className="flex flex-col items-center">
                  <div className="w-full h-24 rounded-lg mb-2 overflow-hidden">
                    <div
                      className="w-full h-1/2"
                      style={{ backgroundColor: preset.primaryColor }}
                    ></div>
                    <div className="w-full h-1/2 flex">
                      <div
                        className="w-1/3 h-full"
                        style={{ backgroundColor: preset.secondaryColor }}
                      ></div>
                      <div
                        className="w-1/3 h-full"
                        style={{ backgroundColor: preset.backgroundColor }}
                      ></div>
                      <div
                        className="w-1/3 h-full"
                        style={{ backgroundColor: preset.accentColor }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm font-medium">{preset.name}</p>
                  <div className="flex mt-2 gap-1">
                    {preset.tags.map((tag) => (
                      <Chip key={tag} size="sm" variant="flat">
                        {tag}
                      </Chip>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}

          {/* Create Custom Preset */}
          <Card
            isPressable
            onPress={() => updateThemeSettings({ showCreatePreset: true })}
          >
            <CardBody className="p-3 flex flex-col items-center justify-center h-full">
              <div className="w-12 h-12 rounded-full bg-default-100 flex items-center justify-center mb-2">
                <Plus size={24} className="text-default-500" />
              </div>
              <p className="text-sm font-medium">{t("createCustomPreset")}</p>
            </CardBody>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ThemeSettingsPage;
