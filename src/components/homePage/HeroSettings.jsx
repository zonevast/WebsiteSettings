"use client";
import React from "react";
import { useTranslations } from "next-intl";
import {
  Input,
  Textarea,
  Switch,
  Card,
  CardBody,
  Button,
  Divider,
  Select,
  SelectItem,
  Tabs,
  Tab,
} from "@nextui-org/react";
import {
  Upload,
  Trash2,
  Plus,
  Move,
  Edit,
  Image as ImageIcon,
  Type,
  Layout,
  Sliders,
} from "lucide-react";
import ImageUploader from "./ImageUploader";
import ColorPicker from "./ColorPicker";

const HeroSettings = ({ settings, updateSettings }) => {
  const t = useTranslations("HomePage.heroSection");

  const handleChange = (key, value) => {
    updateSettings({
      ...settings,
      [key]: value,
    });
  };

  const handleButtonChange = (index, key, value) => {
    const updatedButtons = [...settings.buttons];
    updatedButtons[index] = {
      ...updatedButtons[index],
      [key]: value,
    };

    handleChange("buttons", updatedButtons);
  };

  const addButton = () => {
    const newButton = {
      text: t("newButton"),
      url: "#",
      variant: "solid",
      color: "primary",
      size: "md",
      icon: "",
      openInNewTab: false,
    };

    handleChange("buttons", [...settings.buttons, newButton]);
  };

  const removeButton = (index) => {
    const updatedButtons = settings.buttons.filter((_, i) => i !== index);
    handleChange("buttons", updatedButtons);
  };

  return (
    <div className="space-y-6">
      <Tabs aria-label="Hero Settings">
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
                label={t("subtitle")}
                value={settings.subtitle}
                onChange={(e) => handleChange("subtitle", e.target.value)}
                fullWidth
                minRows={2}
              />

              <div className="space-y-2">
                <p className="text-sm font-medium">{t("buttons")}</p>
                {settings.buttons.map((button, index) => (
                  <Card key={index} className="p-3">
                    <CardBody className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h5 className="text-sm font-medium">
                          {t("button")} {index + 1}
                        </h5>
                        <Button
                          isIconOnly
                          size="sm"
                          color="danger"
                          variant="light"
                          onPress={() => removeButton(index)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>

                      <Input
                        label={t("buttonText")}
                        value={button.text}
                        onChange={(e) =>
                          handleButtonChange(index, "text", e.target.value)
                        }
                        size="sm"
                      />

                      <Input
                        label={t("buttonUrl")}
                        value={button.url}
                        onChange={(e) =>
                          handleButtonChange(index, "url", e.target.value)
                        }
                        size="sm"
                      />

                      <div className="grid grid-cols-2 gap-2">
                        <Select
                          label={t("buttonVariant")}
                          value={button.variant}
                          onChange={(e) =>
                            handleButtonChange(index, "variant", e.target.value)
                          }
                          size="sm"
                        >
                          <SelectItem key="solid" value="solid">
                            {t("solid")}
                          </SelectItem>
                          <SelectItem key="flat" value="flat">
                            {t("flat")}
                          </SelectItem>
                          <SelectItem key="bordered" value="bordered">
                            {t("bordered")}
                          </SelectItem>
                          <SelectItem key="light" value="light">
                            {t("light")}
                          </SelectItem>
                          <SelectItem key="ghost" value="ghost">
                            {t("ghost")}
                          </SelectItem>
                        </Select>

                        <Select
                          label={t("buttonColor")}
                          value={button.color}
                          onChange={(e) =>
                            handleButtonChange(index, "color", e.target.value)
                          }
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
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Select
                          label={t("buttonSize")}
                          value={button.size}
                          onChange={(e) =>
                            handleButtonChange(index, "size", e.target.value)
                          }
                          size="sm"
                        >
                          <SelectItem key="sm" value="sm">
                            {t("small")}
                          </SelectItem>
                          <SelectItem key="md" value="md">
                            {t("medium")}
                          </SelectItem>
                          <SelectItem key="lg" value="lg">
                            {t("large")}
                          </SelectItem>
                        </Select>

                        <Input
                          label={t("buttonIcon")}
                          value={button.icon}
                          onChange={(e) =>
                            handleButtonChange(index, "icon", e.target.value)
                          }
                          size="sm"
                          placeholder={t("iconName")}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm">{t("openInNewTab")}</span>
                        <Switch
                          checked={button.openInNewTab}
                          onChange={(e) =>
                            handleButtonChange(
                              index,
                              "openInNewTab",
                              e.target.checked
                            )
                          }
                          size="sm"
                        />
                      </div>
                    </CardBody>
                  </Card>
                ))}

                <Button
                  color="primary"
                  variant="flat"
                  startContent={<Plus size={16} />}
                  onPress={addButton}
                  size="sm"
                  className="mt-2"
                >
                  {t("addButton")}
                </Button>
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

              <div className="space-y-2">
                <p className="text-sm font-medium">{t("foregroundImage")}</p>
                <ImageUploader
                  value={settings.foregroundImage}
                  onChange={(url) => handleChange("foregroundImage", url)}
                  label={t("uploadForegroundImage")}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">{t("showOverlay")}</span>
                <Switch
                  checked={settings.overlay.show}
                  onChange={(e) =>
                    handleChange("overlay", {
                      ...settings.overlay,
                      show: e.target.checked,
                    })
                  }
                  size="sm"
                />
              </div>

              {settings.overlay.show && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">{t("overlayColor")}</p>
                  <ColorPicker
                    value={settings.overlay.color}
                    onChange={(color) =>
                      handleChange("overlay", {
                        ...settings.overlay,
                        color,
                      })
                    }
                  />

                  <div className="space-y-1">
                    <p className="text-sm">
                      {t("overlayOpacity")}: {settings.overlay.opacity}
                    </p>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={settings.overlay.opacity}
                      onChange={(e) =>
                        handleChange("overlay", {
                          ...settings.overlay,
                          opacity: parseFloat(e.target.value),
                        })
                      }
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
                label={t("heroStyle")}
                value={settings.style}
                onChange={(e) => handleChange("style", e.target.value)}
              >
                <SelectItem key="centered" value="centered">
                  {t("centered")}
                </SelectItem>
                <SelectItem key="split" value="split">
                  {t("split")}
                </SelectItem>
                <SelectItem key="fullWidth" value="fullWidth">
                  {t("fullWidth")}
                </SelectItem>
                <SelectItem key="minimal" value="minimal">
                  {t("minimal")}
                </SelectItem>
                <SelectItem key="video" value="video">
                  {t("videoBackground")}
                </SelectItem>
              </Select>

              <div className="space-y-1">
                <p className="text-sm">
                  {t("height")}: {settings.height}px
                </p>
                <input
                  type="range"
                  min="300"
                  max="1000"
                  step="10"
                  value={settings.height}
                  onChange={(e) =>
                    handleChange("height", parseInt(e.target.value))
                  }
                  className="w-full"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">{t("fullScreen")}</span>
                <Switch
                  checked={settings.fullScreen}
                  onChange={(e) => handleChange("fullScreen", e.target.checked)}
                  size="sm"
                />
              </div>

              <Select
                label={t("contentAlignment")}
                value={settings.contentAlignment}
                onChange={(e) =>
                  handleChange("contentAlignment", e.target.value)
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

              {settings.style === "split" && (
                <Select
                  label={t("contentPosition")}
                  value={settings.contentPosition}
                  onChange={(e) =>
                    handleChange("contentPosition", e.target.value)
                  }
                >
                  <SelectItem key="left" value="left">
                    {t("left")}
                  </SelectItem>
                  <SelectItem key="right" value="right">
                    {t("right")}
                  </SelectItem>
                </Select>
              )}

              <div className="space-y-1">
                <p className="text-sm">
                  {t("paddingTop")}: {settings.padding.top}px
                </p>
                <input
                  type="range"
                  min="0"
                  max="200"
                  step="4"
                  value={settings.padding.top}
                  onChange={(e) =>
                    handleChange("padding", {
                      ...settings.padding,
                      top: parseInt(e.target.value),
                    })
                  }
                  className="w-full"
                />
              </div>

              <div className="space-y-1">
                <p className="text-sm">
                  {t("paddingBottom")}: {settings.padding.bottom}px
                </p>
                <input
                  type="range"
                  min="0"
                  max="200"
                  step="4"
                  value={settings.padding.bottom}
                  onChange={(e) =>
                    handleChange("padding", {
                      ...settings.padding,
                      bottom: parseInt(e.target.value),
                    })
                  }
                  className="w-full"
                />
              </div>
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

              <div className="flex items-center justify-between">
                <span className="text-sm">{t("enableAnimation")}</span>
                <Switch
                  checked={settings.animation.enabled}
                  onChange={(e) =>
                    handleChange("animation", {
                      ...settings.animation,
                      enabled: e.target.checked,
                    })
                  }
                  size="sm"
                />
              </div>

              {settings.animation.enabled && (
                <Select
                  label={t("animationType")}
                  value={settings.animation.type}
                  onChange={(e) =>
                    handleChange("animation", {
                      ...settings.animation,
                      type: e.target.value,
                    })
                  }
                >
                  <SelectItem key="fade" value="fade">
                    {t("fade")}
                  </SelectItem>
                  <SelectItem key="slideUp" value="slideUp">
                    {t("slideUp")}
                  </SelectItem>
                  <SelectItem key="slideDown" value="slideDown">
                    {t("slideDown")}
                  </SelectItem>
                  <SelectItem key="slideLeft" value="slideLeft">
                    {t("slideLeft")}
                  </SelectItem>
                  <SelectItem key="slideRight" value="slideRight">
                    {t("slideRight")}
                  </SelectItem>
                  <SelectItem key="zoom" value="zoom">
                    {t("zoom")}
                  </SelectItem>
                </Select>
              )}

              {settings.style === "video" && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">{t("videoUrl")}</p>
                  <Input
                    value={settings.videoUrl}
                    onChange={(e) => handleChange("videoUrl", e.target.value)}
                    placeholder="https://example.com/video.mp4"
                    fullWidth
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">{t("videoMuted")}</span>
                    <Switch
                      checked={settings.videoMuted}
                      onChange={(e) =>
                        handleChange("videoMuted", e.target.checked)
                      }
                      size="sm"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">{t("videoLoop")}</span>
                    <Switch
                      checked={settings.videoLoop}
                      onChange={(e) =>
                        handleChange("videoLoop", e.target.checked)
                      }
                      size="sm"
                    />
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default HeroSettings;
