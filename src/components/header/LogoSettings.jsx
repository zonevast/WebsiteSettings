"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { 
  Input, 
  Switch, 
  Button, 
  Card, 
  CardBody,
  Divider,
  Select,
  SelectItem
} from "@nextui-org/react";
import { Upload, Trash2, RefreshCw } from "lucide-react";

const LogoSettings = ({ settings, updateSettings }) => {
  const t = useTranslations("HeaderSettingsPage.logoSettings");
  const [logoFile, setLogoFile] = useState(null);
  
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      // In a real implementation, you would upload the file to your server
      // and then update the settings with the new logo URL
      const logoUrl = URL.createObjectURL(file);
      updateSettings({ logoUrl });
    }
  };
  
  const handleTextChange = (e) => {
    updateSettings({ siteTitle: e.target.value });
  };
  
  const handleToggleLogoVisibility = (isSelected) => {
    updateSettings({ showLogo: isSelected });
  };
  
  const handleToggleTitleVisibility = (isSelected) => {
    updateSettings({ showTitle: isSelected });
  };
  
  const handleLogoSizeChange = (e) => {
    updateSettings({ logoSize: e.target.value });
  };
  
  const handleLogoPositionChange = (position) => {
    updateSettings({ logoPosition: position });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">{t("logoUpload")}</h3>
          <Card className="mb-4">
            <CardBody className="flex items-center justify-center p-8">
              {settings.logoUrl ? (
                <div className="relative group">
                  <img 
                    src={settings.logoUrl} 
                    alt="Site Logo" 
                    className="max-h-24 object-contain"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded">
                    <Button isIconOnly size="sm" variant="flat" color="default">
                      <RefreshCw size={16} />
                    </Button>
                    <Button isIconOnly size="sm" variant="flat" color="danger">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-default-500 mb-2">{t("noLogoUploaded")}</p>
                  <Button 
                    color="primary" 
                    variant="flat" 
                    startContent={<Upload size={16} />}
                    as="label"
                  >
                    {t("uploadLogo")}
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleLogoUpload}
                    />
                  </Button>
                </div>
              )}
            </CardBody>
          </Card>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>{t("showLogo")}</span>
              <Switch 
                isSelected={settings.showLogo} 
                onValueChange={handleToggleLogoVisibility}
              />
            </div>
            
            <Select 
              label={t("logoSize")} 
              value={settings.logoSize}
              onChange={handleLogoSizeChange}
            >
              <SelectItem key="small" value="small">{t("small")}</SelectItem>
              <SelectItem key="medium" value="medium">{t("medium")}</SelectItem>
              <SelectItem key="large" value="large">{t("large")}</SelectItem>
            </Select>
            
            <Select 
              label={t("logoPosition")} 
              value={settings.logoPosition}
              onChange={(e) => handleLogoPositionChange(e.target.value)}
            >
              <SelectItem key="left" value="left">{t("left")}</SelectItem>
              <SelectItem key="center" value="center">{t("center")}</SelectItem>
              <SelectItem key="right" value="right">{t("right")}</SelectItem>
            </Select>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">{t("siteTitle")}</h3>
          <div className="space-y-4">
            <Input
              label={t("titleText")}
              value={settings.siteTitle}
              onChange={handleTextChange}
              placeholder={t("enterSiteTitle")}
            />
            
            <div className="flex justify-between items-center">
              <span>{t("showTitle")}</span>
              <Switch 
                isSelected={settings.showTitle} 
                onValueChange={handleToggleTitleVisibility}
              />
            </div>
            
            <Select 
              label={t("titleFont")} 
              value={settings.titleFont}
              onChange={(e) => updateSettings({ titleFont: e.target.value })}
            >
              <SelectItem key="default" value="default">{t("default")}</SelectItem>
              <SelectItem key="serif" value="serif">{t("serif")}</SelectItem>
              <SelectItem key="sans-serif" value="sans-serif">{t("sansSerif")}</SelectItem>
              <SelectItem key="monospace" value="monospace">{t("monospace")}</SelectItem>
            </Select>
            
            <Select 
              label={t("titleSize")} 
              value={settings.titleSize}
              onChange={(e) => updateSettings({ titleSize: e.target.value })}
            >
              <SelectItem key="small" value="small">{t("small")}</SelectItem>
              <SelectItem key="medium" value="medium">{t("medium")}</SelectItem>
              <SelectItem key="large" value="large">{t("large")}</SelectItem>
            </Select>
            
            <Input
              type="color"
              label={t("titleColor")}
              value={settings.titleColor}
              onChange={(e) => updateSettings({ titleColor: e.target.value })}
              className="max-w-xs"
            />
          </div>
        </div>
      </div>
      
      <Divider />
      
      <div>
        <h3 className="text-lg font-semibold mb-4">{t("favicon")}</h3>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 border border-dashed border-default-300 rounded-lg flex items-center justify-center">
            {settings.faviconUrl ? (
              <img src={settings.faviconUrl} alt="Favicon" className="w-8 h-8" />
            ) : (
              <Upload size={20} className="text-default-400" />
            )}
          </div>
          <div>
            <Button 
              color="primary" 
              variant="flat" 
              size="sm" 
              startContent={<Upload size={14} />}
              as="label"
              className="mb-2"
            >
              {t("uploadFavicon")}
              <input type="file" className="hidden" accept="image/*" />
            </Button>
            <p className="text-xs text-default-500">{t("faviconRequirements")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoSettings;