// templatesCustomize.js
"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Divider,
  Select,
  SelectItem,
  Input,
  Textarea,
  Chip,
  Tabs,
  Tab,
} from "@nextui-org/react";
import {
  Sliders,
  ImageIcon,
  Palette,
  Check,
  Save,
  RotateCcw,
} from "lucide-react";
import ImageUploader from "@/components/homePage/ImageUploader";
import ColorPicker from "@/components/homePage/ColorPicker";

// Mock Data (replace with your template data fetching and state management)
const mockTemplateData = {
  name: "Modern Agency",
  description:
    "A sleek and modern website template for creative agencies. Features a clean design, responsive layout, and easy customization.",
  imageUrl: "/images/template-1.jpg", // Replace
  tags: ["agency", "creative", "modern"],
  settings: {
    // Example Structure - Adapt this to match your template's settings structure
    hero: {
      title: "Welcome to Our Agency",
      subtitle: "We create amazing things.",
      backgroundImage: "/images/hero-background.jpg", // Replace
      backgroundColor: "#f0f0f0",
      textColor: "#333333",
      contentAlignment: "center", // "left", "center", "right"
      buttons: [
        { text: "Get Started", color: "primary", variant: "flat" },
        { text: "Learn More", color: "secondary", variant: "light" },
      ],
    },
    navigation: {
      backgroundColor: "#ffffff",
      textColor: "#333333",
      logoUrl: "/images/logo.png", // Replace
    },
    // ... other sections (features, etc.)
  },
};

const TemplatesCustomize = () => {
  const t = useTranslations("TemplatesCustomize");
  const [templateData, setTemplateData] = useState(mockTemplateData);
  const [activeTab, setActiveTab] = useState("general"); // General, Hero, Navigation, etc.
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const handleChange = (section, key, value) => {
    setTemplateData({
      ...templateData,
      settings: {
        ...templateData.settings,
        [section]: {
          ...templateData.settings[section],
          [key]: value,
        },
      },
    });
  };

  const handleGeneralChange = (key, value) => {
    setTemplateData({
      ...templateData,
      [key]: value,
    });
  };

  const handleResetToDefaults = () => {
    // In a real app, fetch default settings from an API
    // or hardcode them as a constant here.
    const defaultSettings = {
      // Your default template settings
      hero: {
        title: "Welcome to Our Agency",
        subtitle: "We create amazing things.",
        backgroundImage: "/images/hero-background.jpg",
        backgroundColor: "#f0f0f0",
        textColor: "#333333",
        contentAlignment: "center",
        buttons: [
          { text: "Get Started", color: "primary", variant: "flat" },
          { text: "Learn More", color: "secondary", variant: "light" },
        ],
      },
      navigation: {
        backgroundColor: "#ffffff",
        textColor: "#333333",
        logoUrl: "/images/logo.png",
      },
    };
    setTemplateData({
      ...templateData,
      settings: {
        ...defaultSettings,
      },
    });
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // In a real app, save the settings to your backend (API call)
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate saving
      alert(t("settingsSavedSuccess")); // Replace with a notification library
    } catch (error) {
      console.error("Error saving settings:", error);
      alert(t("settingsSaveError")); // Display error message
    } finally {
      setIsSaving(false);
    }
  };

  const generalTabContent = () => (
    <CardBody className="space-y-4">
      <Input
        label={t("templateName")}
        value={templateData.name}
        onChange={(e) => handleGeneralChange("name", e.target.value)}
        fullWidth
      />
      <Textarea
        label={t("templateDescription")}
        value={templateData.description}
        onChange={(e) => handleGeneralChange("description", e.target.value)}
        fullWidth
        minRows={2}
      />
      <div className="space-y-2">
        <p className="text-sm font-medium">{t("templateImage")}</p>
        <ImageUploader
          value={templateData.imageUrl}
          onChange={(url) => handleGeneralChange("imageUrl", url)}
          label={t("uploadImage")}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {templateData.tags.map((tag) => (
          <Chip key={tag} size="sm" variant="light">
            {tag}
          </Chip>
        ))}
      </div>
    </CardBody>
  );

  const heroTabContent = () => (
    <CardBody className="space-y-4">
      <Input
        label={t("heroTitle")}
        value={templateData.settings.hero.title}
        onChange={(e) => handleChange("hero", "title", e.target.value)}
        fullWidth
      />
      <Textarea
        label={t("heroSubtitle")}
        value={templateData.settings.hero.subtitle}
        onChange={(e) => handleChange("hero", "subtitle", e.target.value)}
        fullWidth
        minRows={2}
      />
      <div className="space-y-2">
        <p className="text-sm font-medium">{t("heroBackgroundImage")}</p>
        <ImageUploader
          value={templateData.settings.hero.backgroundImage}
          onChange={(url) => handleChange("hero", "backgroundImage", url)}
          label={t("uploadImage")}
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">{t("heroBackgroundColor")}</p>
        <ColorPicker
          value={templateData.settings.hero.backgroundColor}
          onChange={(color) => handleChange("hero", "backgroundColor", color)}
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">{t("heroTextColor")}</p>
        <ColorPicker
          value={templateData.settings.hero.textColor}
          onChange={(color) => handleChange("hero", "textColor", color)}
        />
      </div>

      <Select
        label={t("heroContentAlignment")}
        value={templateData.settings.hero.contentAlignment}
        onChange={(e) =>
          handleChange("hero", "contentAlignment", e.target.value)
        }
      >
        <SelectItem key="left" value="left">
          {t("left")}
        </SelectItem>
        <SelectItem key="center" value="center">
          {t("center")}
        </SelectItem>
        <SelectItem key="right" value="right">
          {t("right")}
        </SelectItem>
      </Select>

      {/*  Button Controls (Adapt for your button setup) */}
      <div>
        <p className="text-sm font-medium">{t("heroButtons")}</p>
        {templateData.settings.hero.buttons.map((button, index) => (
          <Card key={`button-${index}`} className="p-3 mb-2">
            <CardBody className="space-y-2">
              <Input
                label={`${t("button")} ${index + 1} ${t("text")}`}
                value={button.text}
                onChange={(e) => {
                  const newButtons = [...templateData.settings.hero.buttons];
                  newButtons[index].text = e.target.value;
                  handleChange("hero", "buttons", newButtons);
                }}
                size="sm"
              />
              <Select
                label={`${t("button")} ${index + 1} ${t("color")}`}
                value={button.color}
                onChange={(e) => {
                  const newButtons = [...templateData.settings.hero.buttons];
                  newButtons[index].color = e.target.value;
                  handleChange("hero", "buttons", newButtons);
                }}
                size="sm"
              >
                <SelectItem key="primary" value="primary">
                  {t("primary")}
                </SelectItem>
                <SelectItem key="secondary" value="secondary">
                  {t("secondary")}
                </SelectItem>
                <SelectItem key="success" value="success">
                  {t("success")}
                </SelectItem>
                <SelectItem key="warning" value="warning">
                  {t("warning")}
                </SelectItem>
                <SelectItem key="danger" value="danger">
                  {t("danger")}
                </SelectItem>
                <SelectItem key="default" value="default">
                  {t("default")}
                </SelectItem>
              </Select>
              <Select
                label={`${t("button")} ${index + 1} ${t("variant")}`}
                value={button.variant}
                onChange={(e) => {
                  const newButtons = [...templateData.settings.hero.buttons];
                  newButtons[index].variant = e.target.value;
                  handleChange("hero", "buttons", newButtons);
                }}
                size="sm"
              >
                <SelectItem key="flat" value="flat">
                  {t("flat")}
                </SelectItem>
                <SelectItem key="bordered" value="bordered">
                  {t("bordered")}
                </SelectItem>
                <SelectItem key="light" value="light">
                  {t("light")}
                </SelectItem>
                <SelectItem key="shadow" value="shadow">
                  {t("shadow")}
                </SelectItem>
                <SelectItem key="ghost" value="ghost">
                  {t("ghost")}
                </SelectItem>
              </Select>
            </CardBody>
          </Card>
        ))}
      </div>
    </CardBody>
  );

  const navigationTabContent = () => (
    <CardBody className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium">{t("navigationBackgroundColor")}</p>
        <ColorPicker
          value={templateData.settings.navigation.backgroundColor}
          onChange={(color) =>
            handleChange("navigation", "backgroundColor", color)
          }
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">{t("navigationTextColor")}</p>
        <ColorPicker
          value={templateData.settings.navigation.textColor}
          onChange={(color) => handleChange("navigation", "textColor", color)}
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">{t("logo")}</p>
        <ImageUploader
          value={templateData.settings.navigation.logoUrl}
          onChange={(url) => handleChange("navigation", "logoUrl", url)}
          label={t("uploadLogo")}
        />
      </div>
    </CardBody>
  );

  return (
    <div className="w-full max-w-full">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">{t("customizeTemplate")}</h3>
          <div className="flex gap-2">
            <Button
              color="default"
              variant="flat"
              startContent={<RotateCcw size={18} />}
              onPress={handleResetToDefaults}
              isLoading={isLoading}
            >
              {t("resetToDefaults")}
            </Button>
            <Button
              color="primary"
              startContent={<Save size={18} />}
              onPress={handleSaveSettings}
              isLoading={isSaving}
            >
              {t("saveChanges")}
            </Button>
          </div>
        </div>

        <Card className="w-full">
          <CardHeader className="flex gap-2">
            <div className="flex flex-col">
              <p className="text-md">{t("templateSettings")}</p>
              <p className="text-small text-default-500">
                {t("customizeTemplateDescription")}
              </p>
            </div>
          </CardHeader>

          <Divider />

          <CardBody>
            <Tabs
              aria-label="Template Sections"
              selectedKey={activeTab}
              onSelectionChange={handleTabChange}
              className="mb-4"
            >
              <Tab
                key="general"
                title={
                  <div className="flex items-center gap-2">
                    <Sliders size={18} />
                    <span>{t("generalSettings")}</span>
                  </div>
                }
              >
                {generalTabContent()}
              </Tab>
              <Tab
                key="hero"
                title={
                  <div className="flex items-center gap-2">
                    <ImageIcon size={18} />
                    <span>{t("heroSection")}</span>
                  </div>
                }
              >
                {heroTabContent()}
              </Tab>
              <Tab
                key="navigation"
                title={
                  <div className="flex items-center gap-2">
                    <Sliders size={18} />
                    <span>{t("navigationSettings")}</span>
                  </div>
                }
              >
                {navigationTabContent()}
              </Tab>
              {/* Add tabs for other sections (Features, Content Blocks, etc.) */}
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default TemplatesCustomize;
