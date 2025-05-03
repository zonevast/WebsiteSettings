"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { 
  Input, 
  Switch, 
  Card, 
  CardBody,
  Button,
  Tabs,
  Tab,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Accordion,
  AccordionItem
} from "@nextui-org/react";
import { 
  Sun, 
  Moon, 
  Copy, 
  Check, 
  Droplet, 
  Palette, 
  Plus,
  Trash2,
  RefreshCw,
  Info
} from "lucide-react";
import { HexColorPicker } from "react-colorful";

const ColorSettings = ({ settings, updateSettings }) => {
  const t = useTranslations("ThemeSettings.colorSettings");
  const [activeColorMode, setActiveColorMode] = useState("light");
  const [pickerColor, setPickerColor] = useState("#000000");
  const [pickerTarget, setPickerTarget] = useState(null);
  const [copiedColor, setCopiedColor] = useState(null);
  
  const handleColorChange = (color, target) => {
    if (activeColorMode === "light") {
      updateSettings({
        lightMode: {
          ...settings.lightMode,
          [target]: color
        }
      });
    } else {
      updateSettings({
        darkMode: {
          ...settings.darkMode,
          [target]: color
        }
      });
    }
  };
  
  const handleInputColorChange = (e, target) => {
    handleColorChange(e.target.value, target);
  };
  
  const openColorPicker = (color, target) => {
    setPickerColor(color);
    setPickerTarget(target);
  };
  
  const handlePickerChange = (color) => {
    setPickerColor(color);
    handleColorChange(color, pickerTarget);
  };
  
  const copyColorToClipboard = (color) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };
  
  const generateShades = (baseColor, target) => {
    // Convert hex to RGB
    const hex = baseColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Generate 9 shades (50-900)
    const shades = {};
    const intensities = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    
    intensities.forEach((intensity, index) => {
      const factor = index / (intensities.length - 1);
      const targetR = Math.round(r * (1 - factor * 0.8));
      const targetG = Math.round(g * (1 - factor * 0.8));
      const targetB = Math.round(b * (1 - factor * 0.8));
      
      const hexColor = '#' + 
        targetR.toString(16).padStart(2, '0') + 
        targetG.toString(16).padStart(2, '0') + 
        targetB.toString(16).padStart(2, '0');
      
      shades[intensity] = hexColor;
    });
    
    if (activeColorMode === "light") {
      updateSettings({
        lightMode: {
          ...settings.lightMode,
          [`${target}Shades`]: shades
        }
      });
    } else {
      updateSettings({
        darkMode: {
          ...settings.darkMode,
          [`${target}Shades`]: shades
        }
      });
    }
  };
  
  const currentModeSettings = activeColorMode === "light" ? settings.lightMode : settings.darkMode;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-center mb-6">
        <Tabs
          aria-label="Color Mode"
          selectedKey={activeColorMode}
          onSelectionChange={setActiveColorMode}
          color="primary"
          variant="bordered"
          radius="full"
          classNames={{
            base: "w-full max-w-xs",
            tabList: "gap-0",
          }}
        >
          <Tab
            key="light"
            title={
              <div className="flex items-center gap-2 px-2">
                <Sun size={18} />
                <span>{t("lightMode")}</span>
              </div>
            }
          />
          <Tab
            key="dark"
            title={
              <div className="flex items-center gap-2 px-2">
                <Moon size={18} />
                <span>{t("darkMode")}</span>
              </div>
            }
          />
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Primary Colors */}
        <Card>
          <CardBody className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{t("primaryColors")}</h3>
              <Tooltip content={t("primaryColorsInfo")}>
                <Button isIconOnly size="sm" variant="light">
                  <Info size={16} />
                </Button>
              </Tooltip>
            </div>
            
            <div className="space-y-4">
              {/* Primary Color */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">{t("primaryColor")}</label>
                  <div className="flex items-center gap-1">
                    <Tooltip content={t("generateShades")}>
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="light"
                        onPress={() => generateShades(currentModeSettings.primaryColor, 'primary')}
                      >
                        <Droplet size={16} />
                      </Button>
                    </Tooltip>
                    <Tooltip content={copiedColor === currentModeSettings.primaryColor ? t("copied") : t("copyColor")}>
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="light"
                        onPress={() => copyColorToClipboard(currentModeSettings.primaryColor)}
                      >
                        {copiedColor === currentModeSettings.primaryColor ? <Check size={16} /> : <Copy size={16} />}
                      </Button>
                    </Tooltip>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Popover placement="bottom">
                    <PopoverTrigger>
                      <Button 
                        className="min-w-[40px] h-[40px] p-0"
                        style={{ backgroundColor: currentModeSettings.primaryColor }}
                      />
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="p-2">
                        <HexColorPicker 
                          color={pickerTarget === 'primaryColor' ? pickerColor : currentModeSettings.primaryColor} 
                          onChange={(color) => handlePickerChange(color)}
                          onMouseDown={() => openColorPicker(currentModeSettings.primaryColor, 'primaryColor')}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Input
                    type="text"
                    value={currentModeSettings.primaryColor}
                    onChange={(e) => handleInputColorChange(e, 'primaryColor')}
                    className="flex-grow"
                  />
                </div>
              </div>
              
              {/* Secondary Color */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">{t("secondaryColor")}</label>
                  <div className="flex items-center gap-1">
                    <Tooltip content={t("generateShades")}>
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="light"
                        onPress={() => generateShades(currentModeSettings.secondaryColor, 'secondary')}
                      >
                        <Droplet size={16} />
                      </Button>
                    </Tooltip>
                    <Tooltip content={copiedColor === currentModeSettings.secondaryColor ? t("copied") : t("copyColor")}>
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="light"
                        onPress={() => copyColorToClipboard(currentModeSettings.secondaryColor)}
                      >
                        {copiedColor === currentModeSettings.secondaryColor ? <Check size={16} /> : <Copy size={16} />}
                      </Button>
                    </Tooltip>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Popover placement="bottom">
                    <PopoverTrigger>
                      <Button 
                        className="min-w-[40px] h-[40px] p-0"
                        style={{ backgroundColor: currentModeSettings.secondaryColor }}
                      />
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="p-2">
                        <HexColorPicker 
                          color={pickerTarget === 'secondaryColor' ? pickerColor : currentModeSettings.secondaryColor} 
                          onChange={(color) => handlePickerChange(color)}
                          onMouseDown={() => openColorPicker(currentModeSettings.secondaryColor, 'secondaryColor')}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Input
                    type="text"
                    value={currentModeSettings.secondaryColor}
                    onChange={(e) => handleInputColorChange(e, 'secondaryColor')}
                    className="flex-grow"
                  />
                </div>
              </div>
              
              {/* Accent Color */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">{t("accentColor")}</label>
                  <div className="flex items-center gap-1">
                    <Tooltip content={t("generateShades")}>
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="light"
                        onPress={() => generateShades(currentModeSettings.accentColor, 'accent')}
                      >
                        <Droplet size={16} />
                      </Button>
                    </Tooltip>
                    <Tooltip content={copiedColor === currentModeSettings.accentColor ? t("copied") : t("copyColor")}>
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="light"
                        onPress={() => copyColorToClipboard(currentModeSettings.accentColor)}
                      >
                        {copiedColor === currentModeSettings.accentColor ? <Check size={16} /> : <Copy size={16} />}
                      </Button>
                    </Tooltip>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Popover placement="bottom">
                    <PopoverTrigger>
                      <Button 
                        className="min-w-[40px] h-[40px] p-0"
                        style={{ backgroundColor: currentModeSettings.accentColor }}
                      />
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="p-2">
                        <HexColorPicker 
                          color={pickerTarget === 'accentColor' ? pickerColor : currentModeSettings.accentColor} 
                          onChange={(color) => handlePickerChange(color)}
                          onMouseDown={() => openColorPicker(currentModeSettings.accentColor, 'accentColor')}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Input
                    type="text"
                    value={currentModeSettings.accentColor}
                    onChange={(e) => handleInputColorChange(e, 'accentColor')}
                    className="flex-grow"
                  />
                </div>
              </div>
            </div>
            
            {/* Color Shades */}
            <Accordion>
              <AccordionItem
                key="primary-shades"
                aria-label="Primary Color Shades"
                title={t("primaryShades")}
                startContent={<Palette size={18} />}
              >
                <div className="grid grid-cols-5 gap-2">
                  {currentModeSettings.primaryShades && Object.entries(currentModeSettings.primaryShades).map(([shade, color]) => (
                    <div key={shade} className="flex flex-col items-center">
                      <div 
                        className="w-10 h-10 rounded-md mb-1"
                        style={{ backgroundColor: color }}
                      ></div>
                      <span className="text-xs">{shade}</span>
                    </div>
                  ))}
                </div>
              </AccordionItem>
              
              <AccordionItem
                key="secondary-shades"
                aria-label="Secondary Color Shades"
                title={t("secondaryShades")}
                startContent={<Palette size={18} />}
              >
                <div className="grid grid-cols-5 gap-2">
                  {currentModeSettings.secondaryShades && Object.entries(currentModeSettings.secondaryShades).map(([shade, color]) => (
                    <div key={shade} className="flex flex-col items-center">
                      <div 
                        className="w-10 h-10 rounded-md mb-1"
                        style={{ backgroundColor: color }}
                      ></div>
                      <span className="text-xs">{shade}</span>
                    </div>
                  ))}
                </div>
              </AccordionItem>
              
              <AccordionItem
                key="accent-shades"
                aria-label="Accent Color Shades"
                title={t("accentShades")}
                startContent={<Palette size={18} />}
              >
                <div className="grid grid-cols-5 gap-2">
                  {currentModeSettings.accentShades && Object.entries(currentModeSettings.accentShades).map(([shade, color]) => (
                    <div key={shade} className="flex flex-col items-center">
                      <div 
                        className="w-10 h-10 rounded-md mb-1"
                        style={{ backgroundColor: color }}
                      ></div>
                      <span className="text-xs">{shade}</span>
                    </div>
                  ))}
                </div>
              </AccordionItem>
            </Accordion>
          </CardBody>
        </Card>
        
        {/* Background & Text Colors */}
        <Card>
          <CardBody className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{t("backgroundTextColors")}</h3>
              <Tooltip content={t("backgroundTextColorsInfo")}>
                <Button isIconOnly size="sm" variant="light">
                  <Info size={16} />
                </Button>
              </Tooltip>
            </div>
            
            <div className="space-y-4">
              {/* Background Color */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">{t("backgroundColor")}</label>
                  <Tooltip content={copiedColor === currentModeSettings.backgroundColor ? t("copied") : t("copyColor")}>
                    <Button 
                      isIconOnly 
                      size="sm" 
                      variant="light"
                      onPress={() => copyColorToClipboard(currentModeSettings.backgroundColor)}
                    >
                      {copiedColor === currentModeSettings.backgroundColor ? <Check size={16} /> : <Copy size={16} />}
                    </Button>
                  </Tooltip>
                </div>
                <div className="flex gap-2">
                  <Popover placement="bottom">
                    <PopoverTrigger>
                      <Button 
                        className="min-w-[40px] h-[40px] p-0"
                        style={{ backgroundColor: currentModeSettings.backgroundColor }}
                      />
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="p-2">
                        <HexColorPicker 
                          color={pickerTarget === 'backgroundColor' ? pickerColor : currentModeSettings.backgroundColor} 
                          onChange={(color) => handlePickerChange(color)}
                          onMouseDown={() => openColorPicker(currentModeSettings.backgroundColor, 'backgroundColor')}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Input
                    type="text"
                    value={currentModeSettings.backgroundColor}
                    onChange={(e) => handleInputColorChange(e, 'backgroundColor')}
                    className="flex-grow"
                  />
                </div>
              </div>
              
              {/* Surface Color */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">{t("surfaceColor")}</label>
                  <Tooltip content={copiedColor === currentModeSettings.surfaceColor ? t("copied") : t("copyColor")}>
                    <Button 
                      isIconOnly 
                      size="sm" 
                      variant="light"
                      onPress={() => copyColorToClipboard(currentModeSettings.surfaceColor)}
                    >
                      {copiedColor === currentModeSettings.surfaceColor ? <Check size={16} /> : <Copy size={16} />}
                    </Button>
                  </Tooltip>
                </div>
                <div className="flex gap-2">
                  <Popover placement="bottom">
                    <PopoverTrigger>
                      <Button 
                        className="min-w-[40px] h-[40px] p-0"
                        style={{ backgroundColor: currentModeSettings.surfaceColor }}
                      />
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="p-2">
                        <HexColorPicker 
                          color={pickerTarget === 'surfaceColor' ? pickerColor : currentModeSettings.surfaceColor} 
                          onChange={(color) => handlePickerChange(color)}
                          onMouseDown={() => openColorPicker(currentModeSettings.surfaceColor, 'surfaceColor')}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Input
                    type="text"
                    value={currentModeSettings.surfaceColor}
                    onChange={(e) => handleInputColorChange(e, 'surfaceColor')}
                    className="flex-grow"
                  />
                </div>
              </div>
              
              {/* Text Color */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">{t("textColor")}</label>
                  <Tooltip content={copiedColor === currentModeSettings.textColor ? t("copied") : t("copyColor")}>
                    <Button 
                      isIconOnly 
                      size="sm" 
                      variant="light"
                      onPress={() => copyColorToClipboard(currentModeSettings.textColor)}
                    >
                      {copiedColor === currentModeSettings.textColor ? <Check size={16} /> : <Copy size={16} />}
                    </Button>
                  </Tooltip>
                </div>
                <div className="flex gap-2">
                  <Popover placement="bottom">
                    <PopoverTrigger>
                      <Button 
                        className="min-w-[40px] h-[40px] p-0"
                        style={{ backgroundColor: currentModeSettings.textColor }}
                      />
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="p-2">
                        <HexColorPicker 
                          color={pickerTarget === 'textColor' ? pickerColor : currentModeSettings.textColor} 
                          onChange={(color) => handlePickerChange(color)}
                          onMouseDown={() => openColorPicker(currentModeSettings.textColor, 'textColor')}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Input
                    type="text"
                    value={currentModeSettings.textColor}
                    onChange={(e) => handleInputColorChange(e, 'textColor')}
                    className="flex-grow"
                  />
                </div>
              </div>
              
              {/* Secondary Text Color */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">{t("secondaryTextColor")}</label>
                  <Tooltip content={copiedColor === currentModeSettings.secondaryTextColor ? t("copied") : t("copyColor")}>
                    <Button 
                      isIconOnly 
                      size="sm" 
                      variant="light"
                      onPress={() => copyColorToClipboard(currentModeSettings.secondaryTextColor)}
                    >
                      {copiedColor === currentModeSettings.secondaryTextColor ? <Check size={16} /> : <Copy size={16} />}
                    </Button>
                  </Tooltip>
                </div>
                <div className="flex gap-2">
                  <Popover placement="bottom">
                    <PopoverTrigger>
                      <Button 
                        className="min-w-[40px] h-[40px] p-0"
                        style={{ backgroundColor: currentModeSettings.secondaryTextColor }}
                      />
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="p-2">
                        <HexColorPicker 
                          color={pickerTarget === 'secondaryTextColor' ? pickerColor : currentModeSettings.secondaryTextColor} 
                          onChange={(color) => handlePickerChange(color)}
                          onMouseDown={() => openColorPicker(currentModeSettings.secondaryTextColor, 'secondaryTextColor')}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Input
                    type="text"
                    value={currentModeSettings.secondaryTextColor}
                    onChange={(e) => handleInputColorChange(e, 'secondaryTextColor')}
                    className="flex-grow"
                  />
                </div>
              </div>
            </div>
            
            {/* UI Element Colors */}
            <div className="pt-4">
              <h4 className="text-md font-medium mb-3">{t("uiElementColors")}</h4>
              
              <div className="space-y-4">
                {/* Border Color */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">{t("borderColor")}</label>
                    <Tooltip content={copiedColor === currentModeSettings.borderColor ? t("copied") : t("copyColor")}>
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="light"
                        onPress={() => copyColorToClipboard(currentModeSettings.borderColor)}
                      >
                        {copiedColor === currentModeSettings.borderColor ? <Check size={16} /> : <Copy size={16} />}
                      </Button>
                    </Tooltip>
                  </div>
                  <div className="flex gap-2">
                    <Popover placement="bottom">
                      <PopoverTrigger>
                        <Button 
                          className="min-w-[40px] h-[40px] p-0"
                          style={{ backgroundColor: currentModeSettings.borderColor }}
                        />
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="p-2">
                          <HexColorPicker 
                            color={pickerTarget === 'borderColor' ? pickerColor : currentModeSettings.borderColor} 
                            onChange={(color) => handlePickerChange(color)}
                            onMouseDown={() => openColorPicker(currentModeSettings.borderColor, 'borderColor')}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Input
                      type="text"
                      value={currentModeSettings.borderColor}
                      onChange={(e) => handleInputColorChange(e, 'borderColor')}
                      className="flex-grow"
                    />
                  </div>
                </div>
                
                {/* Divider Color */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">{t("dividerColor")}</label>
                    <Tooltip content={copiedColor === currentModeSettings.dividerColor ? t("copied") : t("copyColor")}>
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="light"
                        onPress={() => copyColorToClipboard(currentModeSettings.dividerColor)}
                      >
                        {copiedColor === currentModeSettings.dividerColor ? <Check size={16} /> : <Copy size={16} />}
                      </Button>
                    </Tooltip>
                  </div>
                  <div className="flex gap-2">
                    <Popover placement="bottom">
                      <PopoverTrigger>
                        <Button 
                          className="min-w-[40px] h-[40px] p-0"
                          style={{ backgroundColor: currentModeSettings.dividerColor }}
                        />
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="p-2">
                          <HexColorPicker 
                            color={pickerTarget === 'dividerColor' ? pickerColor : currentModeSettings.dividerColor} 
                            onChange={(color) => handlePickerChange(color)}
                            onMouseDown={() => openColorPicker(currentModeSettings.dividerColor, 'dividerColor')}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Input
                      type="text"
                      value={currentModeSettings.dividerColor}
                      onChange={(e) => handleInputColorChange(e, 'dividerColor')}
                      className="flex-grow"
                    />
                  </div>
                </div>
                
                {/* Focus Ring Color */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">{t("focusRingColor")}</label>
                    <Tooltip content={copiedColor === currentModeSettings.focusRingColor ? t("copied") : t("copyColor")}>
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="light"
                        onPress={() => copyColorToClipboard(currentModeSettings.focusRingColor)}
                      >
                        {copiedColor === currentModeSettings.focusRingColor ? <Check size={16} /> : <Copy size={16} />}
                      </Button>
                    </Tooltip>
                  </div>
                  <div className="flex gap-2">
                    <Popover placement="bottom">
                      <PopoverTrigger>
                        <Button 
                          className="min-w-[40px] h-[40px] p-0"
                          style={{ backgroundColor: currentModeSettings.focusRingColor }}
                        />
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="p-2">
                          <HexColorPicker 
                            color={pickerTarget === 'focusRingColor' ? pickerColor : currentModeSettings.focusRingColor} 
                            onChange={(color) => handlePickerChange(color)}
                            onMouseDown={() => openColorPicker(currentModeSettings.focusRingColor, 'focusRingColor')}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Input
                      type="text"
                      value={currentModeSettings.focusRingColor}
                      onChange={(e) => handleInputColorChange(e, 'focusRingColor')}
                      className="flex-grow"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      
      {/* Status Colors */}
      <Card>
        <CardBody className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{t("statusColors")}</h3>
            <Tooltip content={t("statusColorsInfo")}>
              <Button isIconOnly size="sm" variant="light">
                <Info size={16} />
              </Button>
            </Tooltip>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Success Color */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">{t("successColor")}</label>
                <Tooltip content={copiedColor === currentModeSettings.successColor ? t("copied") : t("copyColor")}>
                  <Button 
                    isIconOnly 
                    size="sm" 
                    variant="light"
                    onPress={() => copyColorToClipboard(currentModeSettings.successColor)}
                  >
                    {copiedColor === currentModeSettings.successColor ? <Check size={16} /> : <Copy size={16} />}
                  </Button>
                </Tooltip>
              </div>
              <div className="flex gap-2">
                <Popover placement="bottom">
                  <PopoverTrigger>
                    <Button 
                      className="min-w-[40px] h-[40px] p-0"
                      style={{ backgroundColor: currentModeSettings.successColor }}
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="p-2">
                      <HexColorPicker 
                        color={pickerTarget === 'successColor' ? pickerColor : currentModeSettings.successColor} 
                        onChange={(color) => handlePickerChange(color)}
                        onMouseDown={() => openColorPicker(currentModeSettings.successColor, 'successColor')}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
                <Input
                  type="text"
                  value={currentModeSettings.successColor}
                  onChange={(e) => handleInputColorChange(e, 'successColor')}
                  className="flex-grow"
                />
              </div>
            </div>
            
            {/* Warning Color */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">{t("warningColor")}</label>
                <Tooltip content={copiedColor === currentModeSettings.warningColor ? t("copied") : t("copyColor")}>
                  <Button 
                    isIconOnly 
                    size="sm" 
                    variant="light"
                    onPress={() => copyColorToClipboard(currentModeSettings.warningColor)}
                  >
                    {copiedColor === currentModeSettings.warningColor ? <Check size={16} /> : <Copy size={16} />}
                  </Button>
                </Tooltip>
              </div>
              <div className="flex gap-2">
                <Popover placement="bottom">
                  <PopoverTrigger>
                    <Button 
                      className="min-w-[40px] h-[40px] p-0"
                      style={{ backgroundColor: currentModeSettings.warningColor }}
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="p-2">
                      <HexColorPicker 
                        color={pickerTarget === 'warningColor' ? pickerColor : currentModeSettings.warningColor} 
                        onChange={(color) => handlePickerChange(color)}
                        onMouseDown={() => openColorPicker(currentModeSettings.warningColor, 'warningColor')}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
                <Input
                  type="text"
                  value={currentModeSettings.warningColor}
                  onChange={(e) => handleInputColorChange(e, 'warningColor')}
                  className="flex-grow"
                />
              </div>
            </div>
            
            {/* Error Color */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">{t("errorColor")}</label>
                <Tooltip content={copiedColor === currentModeSettings.errorColor ? t("copied") : t("copyColor")}>
                  <Button 
                    isIconOnly 
                    size="sm" 
                    variant="light"
                    onPress={() => copyColorToClipboard(currentModeSettings.errorColor)}
                  >
                    {copiedColor === currentModeSettings.errorColor ? <Check size={16} /> : <Copy size={16} />}
                  </Button>
                </Tooltip>
              </div>
              <div className="flex gap-2">
                <Popover placement="bottom">
                  <PopoverTrigger>
                    <Button 
                      className="min-w-[40px] h-[40px] p-0"
                      style={{ backgroundColor: currentModeSettings.errorColor }}
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="p-2">
                      <HexColorPicker 
                        color={pickerTarget === 'errorColor' ? pickerColor : currentModeSettings.errorColor} 
                        onChange={(color) => handlePickerChange(color)}
                        onMouseDown={() => openColorPicker(currentModeSettings.errorColor, 'errorColor')}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
                <Input
                  type="text"
                  value={currentModeSettings.errorColor}
                  onChange={(e) => handleInputColorChange(e, 'errorColor')}
                  className="flex-grow"
                />
              </div>
            </div>
            
            {/* Info Color */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">{t("infoColor")}</label>
                <Tooltip content={copiedColor === currentModeSettings.infoColor ? t("copied") : t("copyColor")}>
                  <Button 
                    isIconOnly 
                    size="sm" 
                    variant="light"
                    onPress={() => copyColorToClipboard(currentModeSettings.infoColor)}
                  >
                    {copiedColor === currentModeSettings.infoColor ? <Check size={16} /> : <Copy size={16} />}
                  </Button>
                </Tooltip>
              </div>
              <div className="flex gap-2">
                <Popover placement="bottom">
                  <PopoverTrigger>
                    <Button 
                      className="min-w-[40px] h-[40px] p-0"
                      style={{ backgroundColor: currentModeSettings.infoColor }}
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="p-2">
                      <HexColorPicker 
                        color={pickerTarget === 'infoColor' ? pickerColor : currentModeSettings.infoColor} 
                        onChange={(color) => handlePickerChange(color)}
                        onMouseDown={() => openColorPicker(currentModeSettings.infoColor, 'infoColor')}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
                <Input
                  type="text"
                  value={currentModeSettings.infoColor}
                  onChange={(e) => handleInputColorChange(e, 'infoColor')}
                  className="flex-grow"
                />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      
      {/* Theme Mode Settings */}
      <Card>
        <CardBody className="space-y-4">
          <h3 className="text-lg font-semibold">{t("themeModeSettings")}</h3>
          
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{t("enableDarkMode")}</p>
                <p className="text-sm text-default-500">{t("enableDarkModeDescription")}</p>
              </div>
              <Switch 
                isSelected={settings.enableDarkMode} 
                onValueChange={(value) => updateSettings({ enableDarkMode: value })}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{t("respectSystemPreference")}</p>
                <p className="text-sm text-default-500">{t("respectSystemPreferenceDescription")}</p>
              </div>
              <Switch 
                isSelected={settings.respectSystemPreference} 
                onValueChange={(value) => updateSettings({ respectSystemPreference: value })}
                isDisabled={!settings.enableDarkMode}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{t("defaultToDarkMode")}</p>
                <p className="text-sm text-default-500">{t("defaultToDarkModeDescription")}</p>
              </div>
              <Switch 
                isSelected={settings.defaultToDarkMode} 
                onValueChange={(value) => updateSettings({ defaultToDarkMode: value })}
                isDisabled={!settings.enableDarkMode || settings.respectSystemPreference}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{t("allowUserToggle")}</p>
                <p className="text-sm text-default-500">{t("allowUserToggleDescription")}</p>
              </div>
              <Switch 
                isSelected={settings.allowUserToggle} 
                onValueChange={(value) => updateSettings({ allowUserToggle: value })}
                isDisabled={!settings.enableDarkMode}
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ColorSettings;