"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { 
  Input, 
  Switch, 
  Select, 
  SelectItem,
  Slider,
  Card,
  CardBody,
  RadioGroup,
  Radio
} from "@nextui-org/react";
import { Layout, Columns, AlignLeft, AlignCenter, AlignRight } from "lucide-react";

const LayoutSettings = ({ settings, updateSettings }) => {
  const t = useTranslations("FooterSettings.layoutSettings");
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">{t("footerLayout")}</h3>
          <Card className="mb-6">
            <CardBody className="space-y-4">
              <Select 
                label={t("footerType")} 
                value={settings.footerType}
                onChange={(e) => updateSettings({ footerType: e.target.value })}
              >
                <SelectItem key="simple" value="simple">{t("simple")}</SelectItem>
                <SelectItem key="multiColumn" value="multiColumn">{t("multiColumn")}</SelectItem>
                <SelectItem key="complex" value="complex">{t("complex")}</SelectItem>
              </Select>
              
              {settings.footerType === "multiColumn" && (
                <Select 
                  label={t("columnCount")} 
                  value={settings.columnCount}
                  onChange={(e) => updateSettings({ columnCount: e.target.value })}
                >
                  <SelectItem key="2" value="2">2 {t("columns")}</SelectItem>
                  <SelectItem key="3" value="3">3 {t("columns")}</SelectItem>
                  <SelectItem key="4" value="4">4 {t("columns")}</SelectItem>
                  <SelectItem key="5" value="5">5 {t("columns")}</SelectItem>
                </Select>
              )}
              
              <RadioGroup 
                label={t("footerWidth")}
                orientation="horizontal"
                value={settings.footerWidth}
                onValueChange={(value) => updateSettings({ footerWidth: value })}
              >
                <Radio value="full">{t("fullWidth")}</Radio>
                <Radio value="contained">{t("contained")}</Radio>
              </RadioGroup>
              
              <div className="flex justify-between items-center">
                <span>{t("stickToBottom")}</span>
                <Switch 
                  isSelected={settings.stickToBottom} 
                  onValueChange={(value) => updateSettings({ stickToBottom: value })}
                />
              </div>
            </CardBody>
          </Card>
          
          <h3 className="text-lg font-semibold mb-4">{t("spacing")}</h3>
          <Card>
            <CardBody className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm">{t("topPadding")}</p>
                  <p className="text-sm">{settings.topPadding}px</p>
                </div>
                <Slider
                  size="sm"
                  step={4}
                  minValue={0}
                  maxValue={120}
                  value={settings.topPadding}
                  onChange={(value) => updateSettings({ topPadding: value })}
                  className="max-w-md"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm">{t("bottomPadding")}</p>
                  <p className="text-sm">{settings.bottomPadding}px</p>
                </div>
                <Slider
                  size="sm"
                  step={4}
                  minValue={0}
                  maxValue={120}
                  value={settings.bottomPadding}
                  onChange={(value) => updateSettings({ bottomPadding: value })}
                  className="max-w-md"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm">{t("columnSpacing")}</p>
                  <p className="text-sm">{settings.columnSpacing}px</p>
                </div>
                <Slider
                  size="sm"
                  step={4}
                  minValue={8}
                  maxValue={80}
                  value={settings.columnSpacing}
                  onChange={(value) => updateSettings({ columnSpacing: value })}
                  className="max-w-md"
                />
              </div>
            </CardBody>
          </Card>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">{t("appearance")}</h3>
          <Card className="mb-6">
            <CardBody className="space-y-4">
              <div>
                <p className="text-sm mb-2">{t("backgroundColor")}</p>
                <Input
                  type="color"
                  value={settings.backgroundColor}
                  onChange={(e) => updateSettings({ backgroundColor: e.target.value })}
                  className="w-full"
                />
              </div>
              
              <div>
                <p className="text-sm mb-2">{t("textColor")}</p>
                <Input
                  type="color"
                  value={settings.textColor}
                  onChange={(e) => updateSettings({ textColor: e.target.value })}
                  className="w-full"
                />
              </div>
              
              <Select 
                label={t("borderStyle")} 
                value={settings.borderStyle}
                onChange={(e) => updateSettings({ borderStyle: e.target.value })}
              >
                <SelectItem key="none" value="none">{t("none")}</SelectItem>
                <SelectItem key="top" value="top">{t("top")}</SelectItem>
                <SelectItem key="all" value="all">{t("all")}</SelectItem>
              </Select>
              
              {settings.borderStyle !== "none" && (
                <>
                  <div>
                    <p className="text-sm mb-2">{t("borderColor")}</p>
                    <Input
                      type="color"
                      value={settings.borderColor}
                      onChange={(e) => updateSettings({ borderColor: e.target.value })}
                      className="w-full"
                    />
                  </div>
                  
                  <Select 
                    label={t("borderWidth")} 
                    value={settings.borderWidth}
                    onChange={(e) => updateSettings({ borderWidth: e.target.value })}
                  >
                    <SelectItem key="1" value="1">1px</SelectItem>
                    <SelectItem key="2" value="2">2px</SelectItem>
                    <SelectItem key="3" value="3">3px</SelectItem>
                    <SelectItem key="4" value="4">4px</SelectItem>
                  </Select>
                </>
              )}
            </CardBody>
          </Card>
          
          <h3 className="text-lg font-semibold mb-4">{t("responsiveSettings")}</h3>
          <Card>
            <CardBody className="space-y-4">
              <div className="flex justify-between items-center">
                <span>{t("stackOnMobile")}</span>
                <Switch 
                  isSelected={settings.stackOnMobile} 
                  onValueChange={(value) => updateSettings({ stackOnMobile: value })}
                />
              </div>
              
              <Select 
                label={t("mobileAlignment")} 
                value={settings.mobileAlignment}
                onChange={(e) => updateSettings({ mobileAlignment: e.target.value })}
              >
                <SelectItem key="left" value="left">
                  <div className="flex items-center gap-2">
                    <AlignLeft size={16} />
                    <span>{t("left")}</span>
                  </div>
                </SelectItem>
                <SelectItem key="center" value="center">
                  <div className="flex items-center gap-2">
                    <AlignCenter size={16} />
                    <span>{t("center")}</span>
                  </div>
                </SelectItem>
                <SelectItem key="right" value="right">
                  <div className="flex items-center gap-2">
                    <AlignRight size={16} />
                    <span>{t("right")}</span>
                  </div>
                </SelectItem>
              </Select>
              
              <div className="flex justify-between items-center">
                <span>{t("hideOnMobile")}</span>
                <Switch 
                  isSelected={settings.hideOnMobile} 
                  onValueChange={(value) => updateSettings({ hideOnMobile: value })}
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LayoutSettings;