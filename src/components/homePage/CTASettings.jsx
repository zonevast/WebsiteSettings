"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { 
  Input, 
  Textarea, 
  Card, 
  CardBody, 
  Select,
  SelectItem,
  Tabs,
  Tab,
  Switch
} from "@nextui-org/react";
import { 
  Type, 
  Layout, 
  Sliders,
  Image as ImageIcon
} from "lucide-react";
import ColorPicker from "./ColorPicker";
import ImageUploader from "./ImageUploader";

const CTASettings = ({ settings, updateSettings }) => {
  const t = useTranslations("HomePage.ctaSection");
  
  const handleChange = (key, value) => {
    updateSettings({
      ...settings,
      [key]: value
    });
  };
  
  const handleButtonChange = (key, value) => {
    handleChange("button", {
      ...settings.button,
      [key]: value
    });
  };
  
  return (
    <div className="space-y-6">
      <Tabs aria-label="CTA Settings">
        <Tab 
          key="content" 
          title={
            <div className="flex items-center gap-2">
              <Type size={18} />
              <span>{t("content")}</span>
            </div>
          }
        >
          <Card className="mt-4">
            <CardBody className="space-y-4">
              <Input
                label={t("title")}
                value={settings.title}
                onChange={(e) => handleChange("title", e.target.value)}
                fullWidth
              />
              
              <Textarea
                label={t("description")}
                value={settings.description}
                onChange={(e) => handleChange("description", e.target.value)}
                fullWidth
                minRows={2}
              />
              
              <div className="space-y-3">
                <p className="text-sm font-medium">{t("button")}</p>
                <Input
                  label={t("buttonText")}
                  value={settings.button.text}
                  onChange={(e) => handleButtonChange("text", e.target.value)}
                  size="sm"
                />
                
                <Input
                  label={t("buttonUrl")}
                  value={settings.button.url}
                  onChange={(e) => handleButtonChange("url", e.target.value)}
                  size="sm"
                />
                
                <div className="grid grid-cols-2 gap-2">
                  <Select
                    label={t("buttonVariant")}
                    value={settings.button.variant}
                    onChange={(e) => handleButtonChange("variant", e.target.value)}
                    size="sm"
                  >
                    <SelectItem key="solid" value="solid">{t("solid")}</SelectItem>
                    <SelectItem key="flat" value="flat">{t("flat")}</SelectItem>
                    <SelectItem key="bordered" value="bordered">{t("bordered")}</SelectItem>
                    <SelectItem key="light" value="light">{t("light")}</SelectItem>
                    <SelectItem key="ghost" value="ghost">{t("ghost")}</SelectItem>
                  </Select>
                  
                  <Select
                    label={t("buttonColor")}
                    value={settings.button.color}
                    onChange={(e) => handleButtonChange("color", e.target.value)}
                    size="sm"
                  >
                    <SelectItem key="primary" value="primary">{t("primary")}</SelectItem>
                    <SelectItem key="secondary" value="secondary">{t("secondary")}</SelectItem>
                    <SelectItem key="success" value="success">{t("success")}</SelectItem>
                    <SelectItem key="warning" value="warning">{t("warning")}</SelectItem>
                    <SelectItem key="danger" value="danger">{t("danger")}</SelectItem>
                    <SelectItem key="default" value="default">{t("default")}</SelectItem>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <Select
                    label={t("buttonSize")}
                    value={settings.button.size}
                    onChange={(e) => handleButtonChange("size", e.target.value)}
                    size="sm"
                  >
                    <SelectItem key="sm" value="sm">{t("small")}</SelectItem>
                    <SelectItem key="md" value="md">{t("medium")}</SelectItem>
                    <SelectItem key="lg" value="lg">{t("large")}</SelectItem>
                  </Select>
                  
                  <Input
                    label={t("buttonIcon")}
                    value={settings.button.icon}
                    onChange={(e) => handleButtonChange("icon", e.target.value)}
                    size="sm"
                    placeholder={t("iconName")}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">{t("openInNewTab")}</span>
                  <Switch
                    checked={settings.button.openInNewTab}
                    onChange={(e) => handleButtonChange("openInNewTab", e.target.checked)}
                    size="sm"
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>
        
        <Tab 
          key="media" 
          title={
            <div className="flex items-center gap-2">
              <ImageIcon size={18} />
              <span>{t("media")}</span>
            </div>
          }
        >
          <Card className="mt-4">
            <CardBody className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">{t("backgroundImage")}</p>
                <ImageUploader
                  value={settings.backgroundImage}
                  onChange={(url) => handleChange("backgroundImage", url)}
                  label={t("uploadBackgroundImage")}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">{t("showOverlay")}</span>
                <Switch
                  checked={settings.overlay.show}
                  onChange={(e) => handleChange("overlay", {
                    ...settings.overlay,
                    show: e.target.checked
                  })}
                  size="sm"
                />
              </div>
              
              {settings.overlay.show && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">{t("overlayColor")}</p>
                  <ColorPicker
                    value={settings.overlay.color}
                    onChange={(color) => handleChange("overlay", {
                      ...settings.overlay,
                      color
                    })}
                  />
                  
                  <div className="space-y-1">
                    <p className="text-sm">{t("overlayOpacity")}: {settings.overlay.opacity}</p>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={settings.overlay.opacity}
                      onChange={(e) => handleChange("overlay", {
                        ...settings.overlay,
                        opacity: parseFloat(e.target.value)
                      })}
                      className="w-full"
                    />
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        </Tab>
        
        <Tab 
          key="layout" 
          title={
            <div className="flex items-center gap-2">
              <Layout size={18} />
              <span>{t("layout")}</span>
            </div>
          }
        >
          <Card className="mt-4">
            <CardBody className="space-y-4">
              <Select
                label={t("layout")}
                value={settings.layout}
                onChange={(e) => handleChange("layout", e.target.value)}
              >
                <SelectItem key="centered" value="centered">{t("centered")}</SelectItem>
                <SelectItem key="split" value="split">{t("split")}</SelectItem>
                <SelectItem key="banner" value="banner">{t("banner")}</SelectItem>
                <SelectItem key="fullWidth" value="fullWidth">{t("fullWidth")}</SelectItem>
              </Select>
              
              <div className="space-y-1">
                <p className="text-sm">{t("height")}: {settings.height}px</p>
                <input
                  type="range"
                  min="100"
                  max="600"
                  step="10"
                  value={settings.height}
                  onChange={(e) => handleChange("height", parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-1">
                <p className="text-sm">{t("paddingTop")}: {settings.padding.top}px</p>
                <input
                  type="range"
                  min="0"
                  max="200"
                  step="4"
                  value={settings.padding.top}
                  onChange={(e) => handleChange("padding", {
                    ...settings.padding,
                    top: parseInt(e.target.value)
                  })}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-1">
                <p className="text-sm">{t("paddingBottom")}: {settings.padding.bottom}px</p>
                <input
                  type="range"
                  min="0"
                  max="200"
                  step="4"
                  value={settings.padding.bottom}
                  onChange={(e) => handleChange("padding", {
                    ...settings.padding,
                    bottom: parseInt(e.target.value)
                  })}
                  className="w-full"
                />
              </div>
              
              <Select
                label={t("contentAlignment")}
                value={settings.contentAlignment}
                onChange={(e) => handleChange("contentAlignment", e.target.value)}
              >
                <SelectItem key="left" value="left">{t("left")}</SelectItem>
                <SelectItem key="center" value="center">{t("center")}</SelectItem>
                <SelectItem key="right" value="right">{t("right")}</SelectItem>
              </Select>
            </CardBody>
          </Card>
        </Tab>
        
        <Tab 
          key="style" 
          title={
            <div className="flex items-center gap-2">
              <Sliders size={18} />
              <span>{t("style")}</span>
            </div>
          }
        >
          <Card className="mt-4">
            <CardBody className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">{t("backgroundColor")}</p>
                <ColorPicker
                  value={settings.backgroundColor}
                  onChange={(color) => handleChange("backgroundColor", color)}
                />
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">{t("textColor")}</p>
                <ColorPicker
                  value={settings.textColor}
                  onChange={(color) => handleChange("textColor", color)}
                />
              </div>
              
              <Select
                label={t("style")}
                value={settings.style}
                onChange={(e) => handleChange("style", e.target.value)}
              >
                <SelectItem key="simple" value="simple">{t("simple")}</SelectItem>
                <SelectItem key="bordered" value="bordered">{t("bordered")}</SelectItem>
                <SelectItem key="shadowed" value="shadowed">{t("shadowed")}</SelectItem>
                <SelectItem key="gradient" value="gradient">{t("gradient")}</SelectItem>
              </Select>
              
              {settings.style === "gradient" && (
                <>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{t("gradientStartColor")}</p>
                    <ColorPicker
                      value={settings.gradientStartColor}
                      onChange={(color) => handleChange("gradientStartColor", color)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{t("gradientEndColor")}</p>
                    <ColorPicker
                      value={settings.gradientEndColor}
                      onChange={(color) => handleChange("gradientEndColor", color)}
                    />
                  </div>
                  
                  <Select
                    label={t("gradientDirection")}
                    value={settings.gradientDirection}
                    onChange={(e) => handleChange("gradientDirection", e.target.value)}
                  >
                    <SelectItem key="to-right" value="to-right">{t("toRight")}</SelectItem>
                    <SelectItem key="to-left" value="to-left">{t("toLeft")}</SelectItem>
                    <SelectItem key="to-bottom" value="to-bottom">{t("toBottom")}</SelectItem>
                    <SelectItem key="to-top" value="to-top">{t("toTop")}</SelectItem>
                    <SelectItem key="to-bottom-right" value="to-bottom-right">{t("toBottomRight")}</SelectItem>
                    <SelectItem key="to-bottom-left" value="to-bottom-left">{t("toBottomLeft")}</SelectItem>
                    <SelectItem key="to-top-right" value="to-top-right">{t("toTopRight")}</SelectItem>
                    <SelectItem key="to-top-left" value="to-top-left">{t("toTopLeft")}</SelectItem>
                  </Select>
                </>
              )}
              
              <div className="flex items-center justify-between">
                <span className="text-sm">{t("enableAnimation")}</span>
                <Switch
                  checked={settings.animation.enabled}
                  onChange={(e) => handleChange("animation", {
                    ...settings.animation,
                    enabled: e.target.checked
                  })}
                  size="sm"
                />
              </div>
              
              {settings.animation.enabled && (
                <Select
                  label={t("animationType")}
                  value={settings.animation.type}
                  onChange={(e) => handleChange("animation", {
                    ...settings.animation,
                    type: e.target.value
                  })}
                >
                  <SelectItem key="fade" value="fade">{t("fade")}</SelectItem>
                  <SelectItem key="slideUp" value="slideUp">{t("slideUp")}</SelectItem>
                  <SelectItem key="slideDown" value="slideDown">{t("slideDown")}</SelectItem>
                  <SelectItem key="zoom" value="zoom">{t("zoom")}</SelectItem>
                </Select>
              )}
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default CTASettings;