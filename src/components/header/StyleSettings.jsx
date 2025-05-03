"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { 
  Input, 
  Slider, 
  Select, 
  SelectItem,
  Switch,
  Card,
  CardBody,
  Tabs,
  Tab
} from "@nextui-org/react";
import { Palette, Monitor, Smartphone } from "lucide-react";

const StyleSettings = ({ settings, updateSettings }) => {
  const t = useTranslations("HeaderSettingsPage.styleSettings");
  
  return (
    <div className="space-y-6">
      <Tabs aria-label="Device view" color="primary" variant="bordered">
        <Tab
          key="desktop"
          title={
            <div className="flex items-center gap-2">
              <Monitor size={18} />
              <span>{t("desktop")}</span>
            </div>
          }
        >
          <div className="pt-4">
            <StyleSettingsContent 
              settings={settings}
              updateSettings={updateSettings}
              t={t}
              device="desktop"
            />
          </div>
        </Tab>
        <Tab
          key="mobile"
          title={
            <div className="flex items-center gap-2">
              <Smartphone size={18} />
              <span>{t("mobile")}</span>
            </div>
          }
        >
          <div className="pt-4">
            <StyleSettingsContent 
              settings={settings}
              updateSettings={updateSettings}
              t={t}
              device="mobile"
            />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

const StyleSettingsContent = ({ settings, updateSettings, t, device }) => {
  const prefix = device === "mobile" ? "mobile" : "";
  const getSettingKey = (key) => prefix ? `${prefix}${key.charAt(0).toUpperCase() + key.slice(1)}` : key;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">{t("colors")}</h3>
        <Card className="mb-6">
          <CardBody className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{t("useTransparency")}</p>
                <p className="text-sm text-default-500">{t("transparencyDesc")}</p>
              </div>
              <Switch 
                isSelected={settings[getSettingKey("isTransparent")]} 
                onValueChange={(value) => {
                  const key = getSettingKey("isTransparent");
                  updateSettings({ [key]: value });
                }}
              />
            </div>
            
            {!settings[getSettingKey("isTransparent")] && (
              <>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{t("useGradient")}</p>
                    <p className="text-sm text-default-500">{t("gradientDesc")}</p>
                  </div>
                  <Switch 
                    isSelected={settings[getSettingKey("useGradient")]} 
                    onValueChange={(value) => {
                      const key = getSettingKey("useGradient");
                      updateSettings({ [key]: value });
                    }}
                  />
                </div>
                
                {settings[getSettingKey("useGradient")] ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm mb-2">{t("gradientStart")}</p>
                      <Input
                        type="color"
                        value={settings[getSettingKey("gradientStart")]}
                        onChange={(e) => {
                          const key = getSettingKey("gradientStart");
                          updateSettings({ [key]: e.target.value });
                        }}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <p className="text-sm mb-2">{t("gradientEnd")}</p>
                      <Input
                        type="color"
                        value={settings[getSettingKey("gradientEnd")]}
                        onChange={(e) => {
                          const key = getSettingKey("gradientEnd");
                          updateSettings({ [key]: e.target.value });
                        }}
                        className="w-full"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm mb-2">{t("backgroundColor")}</p>
                    <Input
                      type="color"
                      value={settings[getSettingKey("backgroundColor")]}
                      onChange={(e) => {
                        const key = getSettingKey("backgroundColor");
                        updateSettings({ [key]: e.target.value });
                      }}
                      className="w-full"
                    />
                  </div>
                )}
              </>
            )}
            
            <div>
              <p className="text-sm mb-2">{t("textColor")}</p>
              <Input
                type="color"
                value={settings[getSettingKey("textColor")]}
                onChange={(e) => {
                  const key = getSettingKey("textColor");
                  updateSettings({ [key]: e.target.value });
                }}
                className="w-full"
              />
            </div>
          </CardBody>
        </Card>
        
        <h3 className="text-lg font-semibold mb-4">{t("dimensions")}</h3>
        <Card>
          <CardBody className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <p className="text-sm">{t("headerHeight")}</p>
                <p className="text-sm">{settings[getSettingKey("headerHeight")]}px</p>
              </div>
              <Slider
                size="sm"
                step={1}
                minValue={40}
                maxValue={120}
                value={settings[getSettingKey("headerHeight")]}
                onChange={(value) => {
                  const key = getSettingKey("headerHeight");
                  updateSettings({ [key]: value });
                }}
                className="max-w-md"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <p className="text-sm">{t("headerPadding")}</p>
                <p className="text-sm">{settings[getSettingKey("headerPadding")]}px</p>
              </div>
              <Slider
                size="sm"
                step={1}
                minValue={0}
                maxValue={40}
                value={settings[getSettingKey("headerPadding")]}
                onChange={(value) => {
                  const key = getSettingKey("headerPadding");
                  updateSettings({ [key]: value });
                }}
                className="max-w-md"
              />
            </div>
          </CardBody>
        </Card>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">{t("borders")}</h3>
        <Card className="mb-6">
          <CardBody className="space-y-4">
            <Select 
              label={t("borderStyle")} 
              value={settings[getSettingKey("borderStyle")]}
              onChange={(e) => {
                const key = getSettingKey("borderStyle");
                updateSettings({ [key]: e.target.value });
              }}
            >
              <SelectItem key="none" value="none">{t("none")}</SelectItem>
              <SelectItem key="bottom" value="bottom">{t("bottom")}</SelectItem>
              <SelectItem key="top" value="top">{t("top")}</SelectItem>
              <SelectItem key="all" value="all">{t("all")}</SelectItem>
            </Select>
            
            {settings[getSettingKey("borderStyle")] !== "none" && (
              <>
                <Select 
                  label={t("borderWidth")} 
                  value={settings[getSettingKey("borderWidth")]}
                  onChange={(e) => {
                    const key = getSettingKey("borderWidth");
                    updateSettings({ [key]: e.target.value });
                  }}
                >
                  <SelectItem key="1" value="1">{t("thin")}</SelectItem>
                  <SelectItem key="2" value="2">{t("medium")}</SelectItem>
                  <SelectItem key="3" value="3">{t("thick")}</SelectItem>
                </Select>
                
                <div>
                  <p className="text-sm mb-2">{t("borderColor")}</p>
                  <Input
                    type="color"
                    value={settings[getSettingKey("borderColor")]}
                    onChange={(e) => {
                      const key = getSettingKey("borderColor");
                      updateSettings({ [key]: e.target.value });
                    }}
                    className="w-full"
                  />
                </div>
              </>
            )}
          </CardBody>
        </Card>
        
        <h3 className="text-lg font-semibold mb-4">{t("effects")}</h3>
        <Card>
          <CardBody className="space-y-4">
            <Select 
              label={t("shadowStyle")} 
              value={settings[getSettingKey("shadowStyle")]}
              onChange={(e) => {
                const key = getSettingKey("shadowStyle");
                updateSettings({ [key]: e.target.value });
              }}
            >
              <SelectItem key="none" value="none">{t("none")}</SelectItem>
              <SelectItem key="small" value="small">{t("small")}</SelectItem>
              <SelectItem key="medium" value="medium">{t("medium")}</SelectItem>
              <SelectItem key="large" value="large">{t("large")}</SelectItem>
            </Select>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{t("glassmorphism")}</p>
                <p className="text-sm text-default-500">{t("glassmorphismDesc")}</p>
              </div>
              <Switch 
                isSelected={settings[getSettingKey("useGlassmorphism")]} 
                onValueChange={(value) => {
                  const key = getSettingKey("useGlassmorphism");
                  updateSettings({ [key]: value });
                }}
              />
            </div>
            
            {settings[getSettingKey("useGlassmorphism")] && (
              <div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm">{t("blurIntensity")}</p>
                  <p className="text-sm">{settings[getSettingKey("blurIntensity")]}px</p>
                </div>
                <Slider
                  size="sm"
                  step={1}
                  minValue={1}
                  maxValue={20}
                  value={settings[getSettingKey("blurIntensity")]}
                  onChange={(value) => {
                    const key = getSettingKey("blurIntensity");
                    updateSettings({ [key]: value });
                  }}
                  className="max-w-md"
                />
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default StyleSettings;