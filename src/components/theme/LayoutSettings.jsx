"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { 
  Input, 
  Select, 
  SelectItem,
  Card, 
  CardBody,
  Slider,
  Tooltip,
  Button,
  Switch,
  Tabs,
  Tab,
  RadioGroup,
  Radio
} from "@nextui-org/react";
import { 
  Layout, 
  Maximize,
  Minimize,
  LayoutGrid,
  Box,
  Layers,
  CornerDownRight,
  Info,
  Smartphone,
  Tablet,
  Monitor
} from "lucide-react";

const LayoutSettings = ({ settings, updateSettings }) => {
  const t = useTranslations("ThemeSettingsPage.layoutSettings");
  
  const handleContainerWidthChange = (value, breakpoint) => {
    updateSettings({
      layout: {
        ...settings.layout,
        containerWidth: {
          ...settings.layout.containerWidth,
          [breakpoint]: value
        }
      }
    });
  };
  
  const handleSpacingUnitChange = (value) => {
    updateSettings({
      layout: {
        ...settings.layout,
        spacingUnit: value
      }
    });
  };
  
  const handleBorderRadiusChange = (value) => {
    updateSettings({
      layout: {
        ...settings.layout,
        borderRadius: value
      }
    });
  };
  
  const handleLayoutTypeChange = (value) => {
    updateSettings({
      layout: {
        ...settings.layout,
        layoutType: value
      }
    });
  };
  
  const handleSidebarWidthChange = (value) => {
    updateSettings({
      layout: {
        ...settings.layout,
        sidebarWidth: value
      }
    });
  };
  
  const handleGapChange = (value, type) => {
    updateSettings({
      layout: {
        ...settings.layout,
        gap: {
          ...settings.layout.gap,
          [type]: value
        }
      }
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Container Settings */}
        <Card>
          <CardBody className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{t("containerSettings")}</h3>
              <Tooltip content={t("containerSettingsInfo")}>
                <Button isIconOnly size="sm" variant="light">
                  <Info size={16} />
                </Button>
              </Tooltip>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Monitor size={18} />
                  <p className="text-sm font-medium">{t("desktopWidth")}</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p className="text-xs">{t("maxWidth")}</p>
                  <p className="text-xs">{settings.layout.containerWidth.desktop}px</p>
                </div>
                <Slider
                  size="sm"
                  step={10}
                  minValue={800}
                  maxValue={1920}
                  value={settings.layout.containerWidth.desktop}
                  onChange={(value) => handleContainerWidthChange(value, 'desktop')}
                  className="max-w-md"
                />
                <div className="mt-1 text-default-500 text-xs">
                  {t("desktopWidthDescription")}
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Tablet size={18} />
                  <p className="text-sm font-medium">{t("tabletWidth")}</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p className="text-xs">{t("maxWidth")}</p>
                  <p className="text-xs">{settings.layout.containerWidth.tablet}px</p>
                </div>
                <Slider
                  size="sm"
                  step={10}
                  minValue={600}
                  maxValue={1024}
                  value={settings.layout.containerWidth.tablet}
                  onChange={(value) => handleContainerWidthChange(value, 'tablet')}
                  className="max-w-md"
                />
                <div className="mt-1 text-default-500 text-xs">
                  {t("tabletWidthDescription")}
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Smartphone size={18} />
                  <p className="text-sm font-medium">{t("mobileWidth")}</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p className="text-xs">{t("maxWidth")}</p>
                  <p className="text-xs">{settings.layout.containerWidth.mobile}px</p>
                </div>
                <Slider
                  size="sm"
                  step={10}
                  minValue={300}
                  maxValue={600}
                  value={settings.layout.containerWidth.mobile}
                  onChange={(value) => handleContainerWidthChange(value, 'mobile')}
                  className="max-w-md"
                />
                <div className="mt-1 text-default-500 text-xs">
                  {t("mobileWidthDescription")}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
        
        {/* Layout Type */}
        <Card>
          <CardBody className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{t("layoutType")}</h3>
              <Tooltip content={t("layoutTypeInfo")}>
                <Button isIconOnly size="sm" variant="light">
                  <Info size={16} />
                </Button>
              </Tooltip>
            </div>
            
            <RadioGroup
              value={settings.layout.layoutType}
              onValueChange={handleLayoutTypeChange}
            >
              <Radio 
                value="fluid" 
                description={t("fluidLayoutDescription")}
              >
                <div className="flex items-center gap-2">
                  <Maximize size={18} />
                  <span>{t("fluidLayout")}</span>
                </div>
              </Radio>
              <Radio 
                value="boxed" 
                description={t("boxedLayoutDescription")}
              >
                <div className="flex items-center gap-2">
                  <Minimize size={18} />
                  <span>{t("boxedLayout")}</span>
                </div>
              </Radio>
              <Radio 
                value="contained" 
                description={t("containedLayoutDescription")}
              >
                <div className="flex items-center gap-2">
                  <Box size={18} />
                  <span>{t("containedLayout")}</span>
                </div>
              </Radio>
            </RadioGroup>
            
            {settings.layout.layoutType === "boxed" && (
              <div className="pt-4">
                <div className="flex justify-between mb-2">
                  <p className="text-sm">{t("boxedMaxWidth")}</p>
                  <p className="text-sm">{settings.layout.boxedMaxWidth}px</p>
                </div>
                <Slider
                  size="sm"
                  step={20}
                  minValue={1000}
                  maxValue={1600}
                  value={settings.layout.boxedMaxWidth}
                  onChange={(value) => updateSettings({
                    layout: {
                      ...settings.layout,
                      boxedMaxWidth: value
                    }
                  })}
                  className="max-w-md"
                />
              </div>
            )}
            
            <div className="pt-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{t("sidebarLayout")}</p>
                  <p className="text-sm text-default-500">{t("sidebarLayoutDescription")}</p>
                </div>
                <Switch 
                  isSelected={settings.layout.sidebarEnabled} 
                  onValueChange={(value) => updateSettings({
                    layout: {
                      ...settings.layout,
                      sidebarEnabled: value
                    }
                  })}
                />
              </div>
            </div>
            
            {settings.layout.sidebarEnabled && (
              <div className="pt-2">
                <div className="flex justify-between mb-2">
                  <p className="text-sm">{t("sidebarWidth")}</p>
                  <p className="text-sm">{settings.layout.sidebarWidth}px</p>
                </div>
                <Slider
                  size="sm"
                  step={10}
                  minValue={200}
                  maxValue={400}
                  value={settings.layout.sidebarWidth}
                  onChange={handleSidebarWidthChange}
                  className="max-w-md"
                />
                
                <div className="pt-4">
                  <Select 
                    label={t("sidebarPosition")} 
                    value={settings.layout.sidebarPosition}
                    onChange={(e) => updateSettings({
                      layout: {
                        ...settings.layout,
                        sidebarPosition: e.target.value
                      }
                    })}
                  >
                    <SelectItem key="left" value="left">{t("left")}</SelectItem>
                    <SelectItem key="right" value="right">{t("right")}</SelectItem>
                  </Select>
                </div>
                
                <div className="pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{t("collapsibleSidebar")}</p>
                      <p className="text-sm text-default-500">{t("collapsibleSidebarDescription")}</p>
                    </div>
                    <Switch 
                      isSelected={settings.layout.sidebarCollapsible} 
                      onValueChange={(value) => updateSettings({
                        layout: {
                          ...settings.layout,
                          sidebarCollapsible: value
                        }
                      })}
                    />
                  </div>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
      
      {/* Spacing & Sizing */}
      <Card>
        <CardBody className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{t("spacingAndSizing")}</h3>
            <Tooltip content={t("spacingAndSizingInfo")}>
              <Button isIconOnly size="sm" variant="light">
                <Info size={16} />
              </Button>
            </Tooltip>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm">{t("spacingUnit")}</p>
                  <p className="text-sm">{settings.layout.spacingUnit}px</p>
                </div>
                <Slider
                  size="sm"
                  step={1}
                  minValue={4}
                  maxValue={12}
                  value={settings.layout.spacingUnit}
                  onChange={handleSpacingUnitChange}
                  className="max-w-md"
                />
                <div className="mt-1 text-default-500 text-xs">
                  {t("spacingUnitDescription")}
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm">{t("borderRadius")}</p>
                  <p className="text-sm">{settings.layout.borderRadius}px</p>
                </div>
                <Slider
                  size="sm"
                  step={1}
                  minValue={0}
                  maxValue={24}
                  value={settings.layout.borderRadius}
                  onChange={handleBorderRadiusChange}
                  className="max-w-md"
                />
                <div className="mt-1 text-default-500 text-xs">
                  {t("borderRadiusDescription")}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm">{t("contentPadding")}</p>
                  <p className="text-sm">{settings.layout.contentPadding}</p>
                </div>
                <Slider
                  size="sm"
                  step={1}
                  minValue={1}
                  maxValue={8}
                  value={settings.layout.contentPadding}
                  onChange={(value) => updateSettings({
                    layout: {
                      ...settings.layout,
                      contentPadding: value
                    }
                  })}
                  className="max-w-md"
                />
                <div className="mt-1 text-default-500 text-xs">
                  {t("contentPaddingDescription")}
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm">{t("sectionSpacing")}</p>
                  <p className="text-sm">{settings.layout.sectionSpacing}</p>
                </div>
                <Slider
                  size="sm"
                  step={1}
                  minValue={1}
                  maxValue={12}
                  value={settings.layout.sectionSpacing}
                  onChange={(value) => updateSettings({
                    layout: {
                      ...settings.layout,
                      sectionSpacing: value
                    }
                  })}
                  className="max-w-md"
                />
                <div className="mt-1 text-default-500 text-xs">
                  {t("sectionSpacingDescription")}
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <h4 className="text-md font-medium mb-4">{t("gridGap")}</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm">{t("horizontalGap")}</p>
                  <p className="text-sm">{settings.layout.gap.x}</p>
                </div>
                <Slider
                  size="sm"
                  step={1}
                  minValue={1}
                  maxValue={12}
                  value={settings.layout.gap.x}
                  onChange={(value) => handleGapChange(value, 'x')}
                  className="max-w-md"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm">{t("verticalGap")}</p>
                  <p className="text-sm">{settings.layout.gap.y}</p>
                </div>
                <Slider
                  size="sm"
                  step={1}
                  minValue={1}
                  maxValue={12}
                  value={settings.layout.gap.y}
                  onChange={(value) => handleGapChange(value, 'y')}
                  className="max-w-md"
                />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      
      {/* Component Styling */}
      <Card>
        <CardBody className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{t("componentStyling")}</h3>
            <Tooltip content={t("componentStylingInfo")}>
              <Button isIconOnly size="sm" variant="light">
                <Info size={16} />
              </Button>
            </Tooltip>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Select 
                label={t("cardStyle")} 
                value={settings.layout.componentStyles.card}
                onChange={(e) => updateSettings({
                  layout: {
                    ...settings.layout,
                    componentStyles: {
                      ...settings.layout.componentStyles,
                      card: e.target.value
                    }
                  }
                })}
              >
                <SelectItem key="flat" value="flat">{t("flat")}</SelectItem>
                <SelectItem key="bordered" value="bordered">{t("bordered")}</SelectItem>
                <SelectItem key="shadow" value="shadow">{t("shadow")}</SelectItem>
                <SelectItem key="elevated" value="elevated">{t("elevated")}</SelectItem>
              </Select>
              
              <Select 
                label={t("buttonStyle")} 
                value={settings.layout.componentStyles.button}
                onChange={(e) => updateSettings({
                  layout: {
                    ...settings.layout,
                    componentStyles: {
                      ...settings.layout.componentStyles,
                      button: e.target.value
                    }
                  }
                })}
              >
                <SelectItem key="solid" value="solid">{t("solid")}</SelectItem>
                <SelectItem key="flat" value="flat">{t("flat")}</SelectItem>
                <SelectItem key="bordered" value="bordered">{t("bordered")}</SelectItem>
                <SelectItem key="ghost" value="ghost">{t("ghost")}</SelectItem>
                <SelectItem key="light" value="light">{t("light")}</SelectItem>
              </Select>
              
              <Select 
                label={t("inputStyle")} 
                value={settings.layout.componentStyles.input}
                onChange={(e) => updateSettings({
                  layout: {
                    ...settings.layout,
                    componentStyles: {
                      ...settings.layout.componentStyles,
                      input: e.target.value
                    }
                  }
                })}
              >
                <SelectItem key="flat" value="flat">{t("flat")}</SelectItem>
                <SelectItem key="bordered" value="bordered">{t("bordered")}</SelectItem>
                <SelectItem key="underlined" value="underlined">{t("underlined")}</SelectItem>
                <SelectItem key="filled" value="filled">{t("filled")}</SelectItem>
              </Select>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{t("enableShadows")}</p>
                  <p className="text-sm text-default-500">{t("enableShadowsDescription")}</p>
                </div>
                <Switch 
                  isSelected={settings.layout.enableShadows} 
                  onValueChange={(value) => updateSettings({
                    layout: {
                      ...settings.layout,
                      enableShadows: value
                    }
                  })}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{t("enableRounded")}</p>
                  <p className="text-sm text-default-500">{t("enableRoundedDescription")}</p>
                </div>
                <Switch 
                  isSelected={settings.layout.enableRounded} 
                  onValueChange={(value) => updateSettings({
                    layout: {
                      ...settings.layout,
                      enableRounded: value
                    }
                  })}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{t("enableAnimations")}</p>
                  <p className="text-sm text-default-500">{t("enableAnimationsDescription")}</p>
                </div>
                <Switch 
                  isSelected={settings.layout.enableAnimations} 
                  onValueChange={(value) => updateSettings({
                    layout: {
                      ...settings.layout,
                      enableAnimations: value
                    }
                  })}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{t("reducedMotion")}</p>
                  <p className="text-sm text-default-500">{t("reducedMotionDescription")}</p>
                </div>
                <Switch 
                  isSelected={settings.layout.reducedMotion} 
                  onValueChange={(value) => updateSettings({
                    layout: {
                      ...settings.layout,
                      reducedMotion: value
                    }
                  })}
                  isDisabled={!settings.layout.enableAnimations}
                />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      
      {/* Layout Preview */}
      <Card>
        <CardBody>
          <h3 className="text-lg font-semibold mb-4">{t("layoutPreview")}</h3>
          
          <div 
            className="border border-divider rounded-lg overflow-hidden"
            style={{
              borderRadius: settings.layout.enableRounded ? `${settings.layout.borderRadius}px` : '0',
              boxShadow: settings.layout.enableShadows ? 'var(--nextui-shadow-md)' : 'none'
            }}
          >
            <div 
              className="bg-primary text-primary-foreground p-3"
              style={{
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-foreground opacity-80"></div>
                <div className="font-bold">Header</div>
              </div>
              <div className="flex gap-2">
                <div className="w-20 h-6 rounded-full bg-primary-foreground opacity-50"></div>
                <div className="w-20 h-6 rounded-full bg-primary-foreground opacity-50"></div>
                <div className="w-20 h-6 rounded-full bg-primary-foreground opacity-50"></div>
              </div>
            </div>
            
            <div className="flex" style={{ minHeight: '300px' }}>
              {settings.layout.sidebarEnabled && settings.layout.sidebarPosition === 'left' && (
                <div 
                  className="bg-content2 p-3"
                  style={{ width: `${settings.layout.sidebarWidth}px` }}
                >
                  <div className="space-y-2">
                    <div className="w-full h-8 rounded bg-content3"></div>
                    <div className="w-full h-8 rounded bg-content3"></div>
                    <div className="w-full h-8 rounded bg-content3"></div>
                    <div className="w-full h-8 rounded bg-content3"></div>
                    <div className="w-full h-8 rounded bg-content3"></div>
                  </div>
                </div>
              )}
              
              <div 
                className="bg-content1 p-6 flex-grow"
                style={{ 
                  padding: `${settings.layout.contentPadding * settings.layout.spacingUnit}px`,
                }}
              >
                <div 
                  className="space-y-4"
                  style={{ 
                    gap: `${settings.layout.gap.y * settings.layout.spacingUnit}px`,
                  }}
                >
                  <div className="w-full h-12 rounded bg-content2"></div>
                  
                  <div 
                    className="grid grid-cols-3"
                    style={{ 
                      gap: `${settings.layout.gap.x * settings.layout.spacingUnit}px`,
                    }}
                  >
                    <div 
                      className="bg-content2 p-3 rounded"
                      style={{
                        borderRadius: settings.layout.enableRounded ? `${settings.layout.borderRadius}px` : '0',
                        boxShadow: settings.layout.enableShadows && settings.layout.componentStyles.card === 'shadow' ? 'var(--nextui-shadow-md)' : 'none',
                        border: settings.layout.componentStyles.card === 'bordered' ? '1px solid var(--nextui-border)' : 'none'
                      }}
                    >
                      <div className="w-full h-24 rounded bg-content3 mb-2"></div>
                      <div className="w-3/4 h-4 rounded bg-content3 mb-2"></div>
                      <div className="w-full h-12 rounded bg-content3"></div>
                    </div>
                    <div 
                      className="bg-content2 p-3 rounded"
                      style={{
                        borderRadius: settings.layout.enableRounded ? `${settings.layout.borderRadius}px` : '0',
                        boxShadow: settings.layout.enableShadows && settings.layout.componentStyles.card === 'shadow' ? 'var(--nextui-shadow-md)' : 'none',
                        border: settings.layout.componentStyles.card === 'bordered' ? '1px solid var(--nextui-border)' : 'none'
                      }}
                    >
                      <div className="w-full h-24 rounded bg-content3 mb-2"></div>
                      <div className="w-3/4 h-4 rounded bg-content3 mb-2"></div>
                      <div className="w-full h-12 rounded bg-content3"></div>
                    </div>
                    <div 
                      className="bg-content2 p-3 rounded"
                      style={{
                        borderRadius: settings.layout.enableRounded ? `${settings.layout.borderRadius}px` : '0',
                        boxShadow: settings.layout.enableShadows && settings.layout.componentStyles.card === 'shadow' ? 'var(--nextui-shadow-md)' : 'none',
                        border: settings.layout.componentStyles.card === 'bordered' ? '1px solid var(--nextui-border)' : 'none'
                      }}
                    >
                      <div className="w-full h-24 rounded bg-content3 mb-2"></div>
                      <div className="w-3/4 h-4 rounded bg-content3 mb-2"></div>
                      <div className="w-full h-12 rounded bg-content3"></div>
                    </div>
                  </div>
                  
                  <div className="w-full h-32 rounded bg-content2"></div>
                </div>
              </div>
              
              {settings.layout.sidebarEnabled && settings.layout.sidebarPosition === 'right' && (
                <div 
                  className="bg-content2 p-3"
                  style={{ width: `${settings.layout.sidebarWidth}px` }}
                >
                  <div className="space-y-2">
                    <div className="w-full h-8 rounded bg-content3"></div>
                    <div className="w-full h-8 rounded bg-content3"></div>
                    <div className="w-full h-8 rounded bg-content3"></div>
                    <div className="w-full h-8 rounded bg-content3"></div>
                    <div className="w-full h-8 rounded bg-content3"></div>
                  </div>
                </div>
              )}
            </div>
            
            <div 
              className="bg-content2 p-3"
              style={{
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div className="w-32 h-6 rounded bg-content3"></div>
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-content3"></div>
                <div className="w-6 h-6 rounded-full bg-content3"></div>
                <div className="w-6 h-6 rounded-full bg-content3"></div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default LayoutSettings;