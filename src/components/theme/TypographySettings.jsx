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
  Divider
} from "@nextui-org/react";
import { 
  Type, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify,
  Info,
  RefreshCw,
  Plus,
  Trash2
} from "lucide-react";

const TypographySettings = ({ settings, updateSettings }) => {
  const t = useTranslations("ThemeSettings.typographySettings");
  
  const handleFontFamilyChange = (e, type) => {
    updateSettings({
      typography: {
        ...settings.typography,
        [type]: e.target.value
      }
    });
  };
  
  const handleFontSizeChange = (value, type) => {
    updateSettings({
      typography: {
        ...settings.typography,
        fontSizes: {
          ...settings.typography.fontSizes,
          [type]: value
        }
      }
    });
  };
  
  const handleLineHeightChange = (value) => {
    updateSettings({
      typography: {
        ...settings.typography,
        lineHeight: value
      }
    });
  };
  
  const handleLetterSpacingChange = (value) => {
    updateSettings({
      typography: {
        ...settings.typography,
        letterSpacing: value
      }
    });
  };
  
  const handleFontWeightChange = (e, type) => {
    updateSettings({
      typography: {
        ...settings.typography,
        fontWeights: {
          ...settings.typography.fontWeights,
          [type]: e.target.value
        }
      }
    });
  };
  
  const handleTextAlignmentChange = (value) => {
    updateSettings({
      typography: {
        ...settings.typography,
        textAlignment: value
      }
    });
  };
  
  const handleCustomFontToggle = (isSelected) => {
    updateSettings({
      typography: {
        ...settings.typography,
        useCustomFonts: isSelected
      }
    });
  };
  
  const handleCustomFontUrlChange = (e, index) => {
    const updatedFonts = [...settings.typography.customFonts];
    updatedFonts[index] = {
      ...updatedFonts[index],
      url: e.target.value
    };
    
    updateSettings({
      typography: {
        ...settings.typography,
        customFonts: updatedFonts
      }
    });
  };
  
  const handleCustomFontNameChange = (e, index) => {
    const updatedFonts = [...settings.typography.customFonts];
    updatedFonts[index] = {
      ...updatedFonts[index],
      name: e.target.value
    };
    
    updateSettings({
      typography: {
        ...settings.typography,
        customFonts: updatedFonts
      }
    });
  };
  
  const addCustomFont = () => {
    updateSettings({
      typography: {
        ...settings.typography,
        customFonts: [
          ...settings.typography.customFonts,
          { name: "", url: "", weight: "400", style: "normal" }
        ]
      }
    });
  };
  
  const removeCustomFont = (index) => {
    const updatedFonts = [...settings.typography.customFonts];
    updatedFonts.splice(index, 1);
    
    updateSettings({
      typography: {
        ...settings.typography,
        customFonts: updatedFonts
      }
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Font Families */}
        <Card>
          <CardBody className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{t("fontFamilies")}</h3>
              <Tooltip content={t("fontFamiliesInfo")}>
                <Button isIconOnly size="sm" variant="light">
                  <Info size={16} />
                </Button>
              </Tooltip>
            </div>
            
            <div className="space-y-4">
              <Select 
                label={t("headingFont")} 
                value={settings.typography.headingFont}
                onChange={(e) => handleFontFamilyChange(e, 'headingFont')}
              >
                <SelectItem key="system-ui" value="system-ui">System UI</SelectItem>
                <SelectItem key="sans-serif" value="sans-serif">Sans Serif</SelectItem>
                <SelectItem key="serif" value="serif">Serif</SelectItem>
                <SelectItem key="monospace" value="monospace">Monospace</SelectItem>
                <SelectItem key="inter" value="'Inter', sans-serif">Inter</SelectItem>
                <SelectItem key="roboto" value="'Roboto', sans-serif">Roboto</SelectItem>
                <SelectItem key="open-sans" value="'Open Sans', sans-serif">Open Sans</SelectItem>
                <SelectItem key="lato" value="'Lato', sans-serif">Lato</SelectItem>
                <SelectItem key="montserrat" value="'Montserrat', sans-serif">Montserrat</SelectItem>
                <SelectItem key="poppins" value="'Poppins', sans-serif">Poppins</SelectItem>
                <SelectItem key="playfair" value="'Playfair Display', serif">Playfair Display</SelectItem>
                <SelectItem key="merriweather" value="'Merriweather', serif">Merriweather</SelectItem>
              </Select>
              
              <Select 
                label={t("bodyFont")} 
                value={settings.typography.bodyFont}
                onChange={(e) => handleFontFamilyChange(e, 'bodyFont')}
              >
                <SelectItem key="system-ui" value="system-ui">System UI</SelectItem>
                <SelectItem key="sans-serif" value="sans-serif">Sans Serif</SelectItem>
                <SelectItem key="serif" value="serif">Serif</SelectItem>
                <SelectItem key="monospace" value="monospace">Monospace</SelectItem>
                <SelectItem key="inter" value="'Inter', sans-serif">Inter</SelectItem>
                <SelectItem key="roboto" value="'Roboto', sans-serif">Roboto</SelectItem>
                <SelectItem key="open-sans" value="'Open Sans', sans-serif">Open Sans</SelectItem>
                <SelectItem key="lato" value="'Lato', sans-serif">Lato</SelectItem>
                <SelectItem key="montserrat" value="'Montserrat', sans-serif">Montserrat</SelectItem>
                <SelectItem key="poppins" value="'Poppins', sans-serif">Poppins</SelectItem>
                <SelectItem key="source-sans" value="'Source Sans Pro', sans-serif">Source Sans Pro</SelectItem>
                <SelectItem key="nunito" value="'Nunito', sans-serif">Nunito</SelectItem>
              </Select>
              
              <Select 
                label={t("monoFont")} 
                value={settings.typography.monoFont}
                onChange={(e) => handleFontFamilyChange(e, 'monoFont')}
              >
                <SelectItem key="monospace" value="monospace">Monospace</SelectItem>
                <SelectItem key="fira-code" value="'Fira Code', monospace">Fira Code</SelectItem>
                <SelectItem key="source-code-pro" value="'Source Code Pro', monospace">Source Code Pro</SelectItem>
                <SelectItem key="roboto-mono" value="'Roboto Mono', monospace">Roboto Mono</SelectItem>
                <SelectItem key="jetbrains-mono" value="'JetBrains Mono', monospace">JetBrains Mono</SelectItem>
                <SelectItem key="ubuntu-mono" value="'Ubuntu Mono', monospace">Ubuntu Mono</SelectItem>
              </Select>
            </div>
            
            <div className="pt-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-md font-medium">{t("fontWeights")}</h4>
              </div>
              
              <div className="space-y-4">
                <Select 
                  label={t("headingWeight")} 
                  value={settings.typography.fontWeights.heading}
                  onChange={(e) => handleFontWeightChange(e, 'heading')}
                >
                  <SelectItem key="300" value="300">Light (300)</SelectItem>
                  <SelectItem key="400" value="400">Regular (400)</SelectItem>
                  <SelectItem key="500" value="500">Medium (500)</SelectItem>
                  <SelectItem key="600" value="600">Semibold (600)</SelectItem>
                  <SelectItem key="700" value="700">Bold (700)</SelectItem>
                  <SelectItem key="800" value="800">Extrabold (800)</SelectItem>
                </Select>
                
                <Select 
                  label={t("bodyWeight")} 
                  value={settings.typography.fontWeights.body}
                  onChange={(e) => handleFontWeightChange(e, 'body')}
                >
                  <SelectItem key="300" value="300">Light (300)</SelectItem>
                  <SelectItem key="400" value="400">Regular (400)</SelectItem>
                  <SelectItem key="500" value="500">Medium (500)</SelectItem>
                  <SelectItem key="600" value="600">Semibold (600)</SelectItem>
                  <SelectItem key="700" value="700">Bold (700)</SelectItem>
                </Select>
              </div>
            </div>
          </CardBody>
        </Card>
        
        {/* Font Sizes */}
        <Card>
          <CardBody className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{t("fontSizes")}</h3>
              <Tooltip content={t("fontSizesInfo")}>
                <Button isIconOnly size="sm" variant="light">
                  <Info size={16} />
                </Button>
              </Tooltip>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm">{t("baseSize")}</p>
                  <p className="text-sm">{settings.typography.fontSizes.base}px</p>
                </div>
                <Slider
                  size="sm"
                  step={1}
                  minValue={12}
                  maxValue={20}
                  value={settings.typography.fontSizes.base}
                  onChange={(value) => handleFontSizeChange(value, 'base')}
                  className="max-w-md"
                />
                <div className="mt-1 text-default-500 text-xs">
                  {t("baseSizeDescription")}
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm">{t("scaleRatio")}</p>
                  <p className="text-sm">{settings.typography.fontSizes.scaleRatio}x</p>
                </div>
                <Slider
                  size="sm"
                  step={0.05}
                  minValue={1.1}
                  maxValue={1.5}
                  value={settings.typography.fontSizes.scaleRatio}
                  onChange={(value) => handleFontSizeChange(value, 'scaleRatio')}
                  className="max-w-md"
                />
                <div className="mt-1 text-default-500 text-xs">
                  {t("scaleRatioDescription")}
                </div>
              </div>
              
              <Divider />
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">{t("headingSizes")}</p>
                  <Button 
                    size="sm" 
                    variant="flat" 
                    color="primary"
                    startContent={<RefreshCw size={14} />}
                    onPress={() => {
                      const base = settings.typography.fontSizes.base;
                      const ratio = settings.typography.fontSizes.scaleRatio;
                      updateSettings({
                        typography: {
                          ...settings.typography,
                          fontSizes: {
                            ...settings.typography.fontSizes,
                            h1: Math.round(base * Math.pow(ratio, 5)),
                            h2: Math.round(base * Math.pow(ratio, 4)),
                            h3: Math.round(base * Math.pow(ratio, 3)),
                            h4: Math.round(base * Math.pow(ratio, 2)),
                            h5: Math.round(base * Math.pow(ratio, 1)),
                            h6: Math.round(base)
                          }
                        }
                      });
                    }}
                  >
                    {t("recalculate")}
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="text-xs">H1</p>
                      <p className="text-xs">{settings.typography.fontSizes.h1}px</p>
                    </div>
                    <Slider
                      size="sm"
                      step={1}
                      minValue={24}
                      maxValue={72}
                      value={settings.typography.fontSizes.h1}
                      onChange={(value) => handleFontSizeChange(value, 'h1')}
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="text-xs">H2</p>
                      <p className="text-xs">{settings.typography.fontSizes.h2}px</p>
                    </div>
                    <Slider
                      size="sm"
                      step={1}
                      minValue={20}
                      maxValue={60}
                      value={settings.typography.fontSizes.h2}
                      onChange={(value) => handleFontSizeChange(value, 'h2')}
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="text-xs">H3</p>
                      <p className="text-xs">{settings.typography.fontSizes.h3}px</p>
                    </div>
                    <Slider
                      size="sm"
                      step={1}
                      minValue={18}
                      maxValue={48}
                      value={settings.typography.fontSizes.h3}
                      onChange={(value) => handleFontSizeChange(value, 'h3')}
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="text-xs">H4</p>
                      <p className="text-xs">{settings.typography.fontSizes.h4}px</p>
                    </div>
                    <Slider
                      size="sm"
                      step={1}
                      minValue={16}
                      maxValue={36}
                      value={settings.typography.fontSizes.h4}
                      onChange={(value) => handleFontSizeChange(value, 'h4')}
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="text-xs">H5</p>
                      <p className="text-xs">{settings.typography.fontSizes.h5}px</p>
                    </div>
                    <Slider
                      size="sm"
                      step={1}
                      minValue={14}
                      maxValue={24}
                      value={settings.typography.fontSizes.h5}
                      onChange={(value) => handleFontSizeChange(value, 'h5')}
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="text-xs">H6</p>
                      <p className="text-xs">{settings.typography.fontSizes.h6}px</p>
                    </div>
                    <Slider
                      size="sm"
                      step={1}
                      minValue={12}
                      maxValue={20}
                      value={settings.typography.fontSizes.h6}
                      onChange={(value) => handleFontSizeChange(value, 'h6')}
                    />
                  </div>
                </div>
              </div>
              
              <Divider />
              
              <div className="space-y-4">
                <p className="text-sm font-medium">{t("otherSizes")}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="text-xs">{t("small")}</p>
                      <p className="text-xs">{settings.typography.fontSizes.small}px</p>
                    </div>
                    <Slider
                      size="sm"
                      step={1}
                      minValue={10}
                      maxValue={14}
                      value={settings.typography.fontSizes.small}
                      onChange={(value) => handleFontSizeChange(value, 'small')}
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="text-xs">{t("large")}</p>
                      <p className="text-xs">{settings.typography.fontSizes.large}px</p>
                    </div>
                    <Slider
                      size="sm"
                      step={1}
                      minValue={16}
                      maxValue={24}
                      value={settings.typography.fontSizes.large}
                      onChange={(value) => handleFontSizeChange(value, 'large')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      
      {/* Text Styling */}
      <Card>
        <CardBody className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{t("textStyling")}</h3>
            <Tooltip content={t("textStylingInfo")}>
              <Button isIconOnly size="sm" variant="light">
                <Info size={16} />
              </Button>
            </Tooltip>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm">{t("lineHeight")}</p>
                  <p className="text-sm">{settings.typography.lineHeight}</p>
                </div>
                <Slider
                  size="sm"
                  step={0.05}
                  minValue={1}
                  maxValue={2}
                  value={settings.typography.lineHeight}
                  onChange={handleLineHeightChange}
                  className="max-w-md"
                />
                <div className="mt-1 text-default-500 text-xs">
                  {t("lineHeightDescription")}
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm">{t("letterSpacing")}</p>
                  <p className="text-sm">{settings.typography.letterSpacing}em</p>
                </div>
                <Slider
                  size="sm"
                  step={0.01}
                  minValue={-0.05}
                  maxValue={0.1}
                  value={settings.typography.letterSpacing}
                  onChange={handleLetterSpacingChange}
                  className="max-w-md"
                />
                <div className="mt-1 text-default-500 text-xs">
                  {t("letterSpacingDescription")}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm mb-2">{t("textAlignment")}</p>
                <div className="flex gap-2">
                  <Button
                    isIconOnly
                    variant={settings.typography.textAlignment === 'left' ? 'solid' : 'flat'}
                    color={settings.typography.textAlignment === 'left' ? 'primary' : 'default'}
                    onPress={() => handleTextAlignmentChange('left')}
                  >
                    <AlignLeft size={18} />
                  </Button>
                  <Button
                    isIconOnly
                    variant={settings.typography.textAlignment === 'center' ? 'solid' : 'flat'}
                    color={settings.typography.textAlignment === 'center' ? 'primary' : 'default'}
                    onPress={() => handleTextAlignmentChange('center')}
                  >
                    <AlignCenter size={18} />
                  </Button>
                  <Button
                    isIconOnly
                    variant={settings.typography.textAlignment === 'right' ? 'solid' : 'flat'}
                    color={settings.typography.textAlignment === 'right' ? 'primary' : 'default'}
                    onPress={() => handleTextAlignmentChange('right')}
                  >
                    <AlignRight size={18} />
                  </Button>
                  <Button
                    isIconOnly
                    variant={settings.typography.textAlignment === 'justify' ? 'solid' : 'flat'}
                    color={settings.typography.textAlignment === 'justify' ? 'primary' : 'default'}
                    onPress={() => handleTextAlignmentChange('justify')}
                  >
                    <AlignJustify size={18} />
                  </Button>
                </div>
                <div className="mt-1 text-default-500 text-xs">
                  {t("textAlignmentDescription")}
                </div>
              </div>
              
              <div className="pt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">{t("paragraphSpacing")}</p>
                    <p className="text-xs text-default-500">{t("paragraphSpacingDescription")}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm">{settings.typography.paragraphSpacing}em</p>
                    <Slider
                      size="sm"
                      step={0.1}
                      minValue={0.5}
                      maxValue={2}
                      value={settings.typography.paragraphSpacing}
                      onChange={(value) => updateSettings({
                        typography: {
                          ...settings.typography,
                          paragraphSpacing: value
                        }
                      })}
                      className="w-24"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      
      {/* Custom Fonts */}
      <Card>
        <CardBody className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{t("customFonts")}</h3>
            <Switch
              isSelected={settings.typography.useCustomFonts}
              onValueChange={handleCustomFontToggle}
            />
          </div>
          
          <div className="text-sm text-default-500">
            {t("customFontsDescription")}
          </div>
          
          {settings.typography.useCustomFonts && (
            <div className="space-y-4">
              {settings.typography.customFonts.map((font, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <div className="flex-grow space-y-3">
                    <Input
                      label={t("fontName")}
                      placeholder="e.g., 'My Custom Font'"
                      value={font.name}
                      onChange={(e) => handleCustomFontNameChange(e, index)}
                    />
                    <Input
                      label={t("fontUrl")}
                      placeholder="https://fonts.googleapis.com/css2?family=..."
                      value={font.url}
                      onChange={(e) => handleCustomFontUrlChange(e, index)}
                    />
                  </div>
                  <Button
                    isIconOnly
                    color="danger"
                    variant="light"
                    onPress={() => removeCustomFont(index)}
                    className="mt-8"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              ))}
              
              <Button
                color="primary"
                variant="flat"
                startContent={<Plus size={18} />}
                onPress={addCustomFont}
              >
                {t("addCustomFont")}
              </Button>
              
              <div className="bg-default-100 p-3 rounded-lg text-sm">
                <p className="font-medium mb-2">{t("customFontsTip")}</p>
                <p>{t("customFontsTipDescription")}</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>{t("customFontsTip1")}</li>
                  <li>{t("customFontsTip2")}</li>
                  <li>{t("customFontsTip3")}</li>
                </ul>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
      
      {/* Typography Preview */}
      <Card>
        <CardBody>
          <h3 className="text-lg font-semibold mb-4">{t("typographyPreview")}</h3>
          
          <div 
            className="p-6 border border-divider rounded-lg"
            style={{
              fontFamily: settings.typography.bodyFont,
              lineHeight: settings.typography.lineHeight,
              letterSpacing: `${settings.typography.letterSpacing}em`,
              textAlign: settings.typography.textAlignment
            }}
          >
            <div 
              style={{
                fontSize: `${settings.typography.fontSizes.h1}px`,
                fontFamily: settings.typography.headingFont,
                fontWeight: settings.typography.fontWeights.heading,
                marginBottom: '0.5em'
              }}
            >
              {t("previewHeading1")}
            </div>
            
            <div 
              style={{
                fontSize: `${settings.typography.fontSizes.h2}px`,
                fontFamily: settings.typography.headingFont,
                fontWeight: settings.typography.fontWeights.heading,
                marginBottom: '0.5em'
              }}
            >
              {t("previewHeading2")}
            </div>
            
            <div 
              style={{
                fontSize: `${settings.typography.fontSizes.h3}px`,
                fontFamily: settings.typography.headingFont,
                fontWeight: settings.typography.fontWeights.heading,
                marginBottom: '0.5em'
              }}
            >
              {t("previewHeading3")}
            </div>
            
            <div 
              style={{
                fontSize: `${settings.typography.fontSizes.base}px`,
                fontWeight: settings.typography.fontWeights.body,
                marginBottom: `${settings.typography.paragraphSpacing}em`
              }}
            >
              {t("previewParagraph1")}
            </div>
            
            <div 
              style={{
                fontSize: `${settings.typography.fontSizes.base}px`,
                fontWeight: settings.typography.fontWeights.body,
                marginBottom: `${settings.typography.paragraphSpacing}em`
              }}
            >
              {t("previewParagraph2")}
            </div>
            
            <div className="flex gap-4 items-center">
              <div 
                style={{
                  fontSize: `${settings.typography.fontSizes.small}px`,
                }}
              >
                {t("previewSmallText")}
              </div>
              
              <div 
                style={{
                  fontSize: `${settings.typography.fontSizes.base}px`,
                }}
              >
                {t("previewNormalText")}
              </div>
              
              <div 
                style={{
                  fontSize: `${settings.typography.fontSizes.large}px`,
                }}
              >
                {t("previewLargeText")}
              </div>
            </div>
            
            <div 
              style={{
                fontFamily: settings.typography.monoFont,
                fontSize: `${settings.typography.fontSizes.base}px`,
                backgroundColor: 'var(--nextui-default-100)',
                padding: '1em',
                borderRadius: '0.5em',
                marginTop: '1em'
              }}
            >
              {t("previewCodeBlock")}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TypographySettings;