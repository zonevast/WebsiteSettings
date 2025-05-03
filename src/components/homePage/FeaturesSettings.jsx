"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { 
  Input, 
  Textarea, 
  Card, 
  CardBody, 
  Button, 
  Select,
  SelectItem,
  Tabs,
  Tab
} from "@nextui-org/react";
import { 
  Plus, 
  Trash2, 
  MoveUp, 
  MoveDown, 
  Type, 
  Layout, 
  Sliders,
  Grid
} from "lucide-react";
import ColorPicker from "./ColorPicker";
import ImageUploader from "./ImageUploader";

const FeaturesSettings = ({ settings, updateSettings }) => {
  const t = useTranslations("HomePage.featuresSection");
  
  const handleChange = (key, value) => {
    updateSettings({
      ...settings,
      [key]: value
    });
  };
  
  const handleFeatureChange = (index, key, value) => {
    const updatedFeatures = [...settings.items];
    updatedFeatures[index] = {
      ...updatedFeatures[index],
      [key]: value
    };
    
    handleChange("items", updatedFeatures);
  };
  
  const addFeature = () => {
    const newFeature = {
      title: t("newFeatureTitle"),
      description: t("newFeatureDescription"),
      icon: "Star",
      image: "",
      link: "",
      linkText: ""
    };
    
    handleChange("items", [...settings.items, newFeature]);
  };
  
  const removeFeature = (index) => {
    const updatedFeatures = settings.items.filter((_, i) => i !== index);
    handleChange("items", updatedFeatures);
  };
  
  const moveFeature = (index, direction) => {
    const updatedFeatures = [...settings.items];
    const newIndex = index + direction;
    
    if (newIndex < 0 || newIndex >= updatedFeatures.length) return;
    
    const temp = updatedFeatures[index];
    updatedFeatures[index] = updatedFeatures[newIndex];
    updatedFeatures[newIndex] = temp;
    
    handleChange("items", updatedFeatures);
  };
  
  return (
    <div className="space-y-6">
      <Tabs aria-label="Features Settings">
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
                label={t("sectionTitle")}
                value={settings.title}
                onChange={(e) => handleChange("title", e.target.value)}
                fullWidth
              />
              
              <Textarea
                label={t("sectionDescription")}
                value={settings.description}
                onChange={(e) => handleChange("description", e.target.value)}
                fullWidth
                minRows={2}
              />
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">{t("features")}</p>
                  <Button
                    color="primary"
                    variant="flat"
                    startContent={<Plus size={16} />}
                    onPress={addFeature}
                    size="sm"
                  >
                    {t("addFeature")}
                  </Button>
                </div>
                
                {settings.items.map((feature, index) => (
                  <Card key={index} className="p-3">
                    <CardBody className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h5 className="text-sm font-medium">{t("feature")} {index + 1}</h5>
                        <div className="flex gap-1">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            onPress={() => moveFeature(index, -1)}
                            isDisabled={index === 0}
                          >
                            <MoveUp size={16} />
                          </Button>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            onPress={() => moveFeature(index, 1)}
                            isDisabled={index === settings.items.length - 1}
                          >
                            <MoveDown size={16} />
                          </Button>
                          <Button
                            isIconOnly
                            size="sm"
                            color="danger"
                            variant="light"
                            onPress={() => removeFeature(index)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                      
                      <Input
                        label={t("featureTitle")}
                        value={feature.title}
                        onChange={(e) => handleFeatureChange(index, "title", e.target.value)}
                        size="sm"
                      />
                      
                      <Textarea
                        label={t("featureDescription")}
                        value={feature.description}
                        onChange={(e) => handleFeatureChange(index, "description", e.target.value)}
                        size="sm"
                        minRows={2}
                      />
                      
                      <Input
                        label={t("featureIcon")}
                        value={feature.icon}
                        onChange={(e) => handleFeatureChange(index, "icon", e.target.value)}
                        size="sm"
                        placeholder={t("iconName")}
                      />
                      
                      <div className="space-y-2">
                        <p className="text-sm">{t("featureImage")}</p>
                        <ImageUploader
                          value={feature.image}
                          onChange={(url) => handleFeatureChange(index, "image", url)}
                          label={t("uploadImage")}
                        />
                      </div>
                      
                      <Input
                        label={t("featureLink")}
                        value={feature.link}
                        onChange={(e) => handleFeatureChange(index, "link", e.target.value)}
                        size="sm"
                        placeholder="https://example.com"
                      />
                      
                      <Input
                        label={t("featureLinkText")}
                        value={feature.linkText}
                        onChange={(e) => handleFeatureChange(index, "linkText", e.target.value)}
                        size="sm"
                        placeholder={t("learnMore")}
                      />
                    </CardBody>
                  </Card>
                ))}
              </div>
            </CardBody>
          </Card>
        </Tab>
        
        <Tab 
          key="layout" 
          title={
            <div className="flex items-center gap-2">
              <Grid size={18} />
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
                <SelectItem key="grid" value="grid">{t("grid")}</SelectItem>
                <SelectItem key="list" value="list">{t("list")}</SelectItem>
                <SelectItem key="cards" value="cards">{t("cards")}</SelectItem>
                <SelectItem key="alternating" value="alternating">{t("alternating")}</SelectItem>
              </Select>
              
              <Select
                label={t("columns")}
                value={settings.columns.toString()}
                onChange={(e) => handleChange("columns", parseInt(e.target.value))}
              >
                <SelectItem key="1" value="1">1</SelectItem>
                <SelectItem key="2" value="2">2</SelectItem>
                <SelectItem key="3" value="3">3</SelectItem>
                <SelectItem key="4" value="4">4</SelectItem>
              </Select>
              
              <div className="space-y-1">
                <p className="text-sm">{t("gap")}: {settings.gap}px</p>
                <input
                  type="range"
                  min="0"
                  max="64"
                  step="4"
                  value={settings.gap}
                  onChange={(e) => handleChange("gap", parseInt(e.target.value))}
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
                label={t("iconStyle")}
                value={settings.iconStyle}
                onChange={(e) => handleChange("iconStyle", e.target.value)}
              >
                <SelectItem key="outlined" value="outlined">{t("outlined")}</SelectItem>
                <SelectItem key="filled" value="filled">{t("filled")}</SelectItem>
                <SelectItem key="duotone" value="duotone">{t("duotone")}</SelectItem>
                <SelectItem key="none" value="none">{t("none")}</SelectItem>
              </Select>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">{t("iconColor")}</p>
                <ColorPicker
                  value={settings.iconColor}
                  onChange={(color) => handleChange("iconColor", color)}
                />
              </div>
              
              <Select
                label={t("featureStyle")}
                value={settings.featureStyle}
                onChange={(e) => handleChange("featureStyle", e.target.value)}
              >
                <SelectItem key="simple" value="simple">{t("simple")}</SelectItem>
                <SelectItem key="bordered" value="bordered">{t("bordered")}</SelectItem>
                <SelectItem key="shadowed" value="shadowed">{t("shadowed")}</SelectItem>
                <SelectItem key="elevated" value="elevated">{t("elevated")}</SelectItem>
              </Select>
              
              <Select
                label={t("titleAlignment")}
                value={settings.titleAlignment}
                onChange={(e) => handleChange("titleAlignment", e.target.value)}
              >
                <SelectItem key="left" value="left">{t("left")}</SelectItem>
                <SelectItem key="center" value="center">{t("center")}</SelectItem>
                <SelectItem key="right" value="right">{t("right")}</SelectItem>
              </Select>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default FeaturesSettings;