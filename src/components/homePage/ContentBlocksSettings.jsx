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
  Tab,
  Switch
} from "@nextui-org/react";
import { 
  Plus, 
  Trash2, 
  MoveUp, 
  MoveDown, 
  Type, 
  Layout, 
  Sliders,
  Layers,
  Image as ImageIcon
} from "lucide-react";
import ColorPicker from "./ColorPicker";
import ImageUploader from "./ImageUploader";

const ContentBlocksSettings = ({ settings, updateSettings }) => {
  const t = useTranslations("HomePage.contentBlocks");
  
  const handleChange = (key, value) => {
    updateSettings({
      ...settings,
      [key]: value
    });
  };
  
  const handleBlockChange = (index, key, value) => {
    const updatedBlocks = [...settings.blocks];
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      [key]: value
    };
    
    handleChange("blocks", updatedBlocks);
  };
  
  const addBlock = () => {
    const newBlock = {
      title: t("newBlockTitle"),
      content: t("newBlockContent"),
      image: "",
      imagePosition: "right",
      backgroundColor: "#ffffff",
      textColor: "#000000",
      buttonText: t("learnMore"),
      buttonUrl: "#",
      buttonVariant: "solid",
      buttonColor: "primary"
    };
    
    handleChange("blocks", [...settings.blocks, newBlock]);
  };
  
  const removeBlock = (index) => {
    const updatedBlocks = settings.blocks.filter((_, i) => i !== index);
    handleChange("blocks", updatedBlocks);
  };
  
  const moveBlock = (index, direction) => {
    const updatedBlocks = [...settings.blocks];
    const newIndex = index + direction;
    
    if (newIndex < 0 || newIndex >= updatedBlocks.length) return;
    
    const temp = updatedBlocks[index];
    updatedBlocks[index] = updatedBlocks[newIndex];
    updatedBlocks[newIndex] = temp;
    
    handleChange("blocks", updatedBlocks);
  };
  
  return (
    <div className="space-y-6">
      <Tabs aria-label="Content Blocks Settings">
        <Tab 
          key="blocks" 
          title={
            <div className="flex items-center gap-2">
              <Layers size={18} />
              <span>{t("blocks")}</span>
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
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">{t("contentBlocks")}</p>
                  <Button
                    color="primary"
                    variant="flat"
                    startContent={<Plus size={16} />}
                    onPress={addBlock}
                    size="sm"
                  >
                    {t("addBlock")}
                  </Button>
                </div>
                
                {settings.blocks.map((block, index) => (
                  <Card key={index} className="p-3">
                    <CardBody className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h5 className="text-sm font-medium">{t("block")} {index + 1}</h5>
                        <div className="flex gap-1">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            onPress={() => moveBlock(index, -1)}
                            isDisabled={index === 0}
                          >
                            <MoveUp size={16} />
                          </Button>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            onPress={() => moveBlock(index, 1)}
                            isDisabled={index === settings.blocks.length - 1}
                          >
                            <MoveDown size={16} />
                          </Button>
                          <Button
                            isIconOnly
                            size="sm"
                            color="danger"
                            variant="light"
                            onPress={() => removeBlock(index)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                      
                      <Tabs aria-label="Block Settings">
                        <Tab key="content" title={t("content")}>
                          <div className="space-y-3 mt-3">
                            <Input
                              label={t("blockTitle")}
                              value={block.title}
                              onChange={(e) => handleBlockChange(index, "title", e.target.value)}
                              size="sm"
                            />
                            
                            <Textarea
                              label={t("blockContent")}
                              value={block.content}
                              onChange={(e) => handleBlockChange(index, "content", e.target.value)}
                              size="sm"
                              minRows={3}
                            />
                            
                            <Input
                              label={t("buttonText")}
                              value={block.buttonText}
                              onChange={(e) => handleBlockChange(index, "buttonText", e.target.value)}
                              size="sm"
                            />
                            
                            <Input
                              label={t("buttonUrl")}
                              value={block.buttonUrl}
                              onChange={(e) => handleBlockChange(index, "buttonUrl", e.target.value)}
                              size="sm"
                            />
                            
                            <div className="grid grid-cols-2 gap-2">
                              <Select
                                label={t("buttonVariant")}
                                value={block.buttonVariant}
                                onChange={(e) => handleBlockChange(index, "buttonVariant", e.target.value)}
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
                                value={block.buttonColor}
                                onChange={(e) => handleBlockChange(index, "buttonColor", e.target.value)}
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
                          </div>
                        </Tab>
                        
                        <Tab key="media" title={t("media")}>
                          <div className="space-y-3 mt-3">
                            <div className="space-y-2">
                              <p className="text-sm">{t("blockImage")}</p>
                              <ImageUploader
                                value={block.image}
                                onChange={(url) => handleBlockChange(index, "image", url)}
                                label={t("uploadImage")}
                              />
                            </div>
                            
                            <Select
                              label={t("imagePosition")}
                              value={block.imagePosition}
                              onChange={(e) => handleBlockChange(index, "imagePosition", e.target.value)}
                              size="sm"
                            >
                              <SelectItem key="left" value="left">{t("left")}</SelectItem>
                              <SelectItem key="right" value="right">{t("right")}</SelectItem>
                              <SelectItem key="top" value="top">{t("top")}</SelectItem>
                              <SelectItem key="bottom" value="bottom">{t("bottom")}</SelectItem>
                              <SelectItem key="background" value="background">{t("background")}</SelectItem>
                            </Select>
                          </div>
                        </Tab>
                        
                        <Tab key="style" title={t("style")}>
                          <div className="space-y-3 mt-3">
                            <div className="space-y-2">
                              <p className="text-sm">{t("backgroundColor")}</p>
                              <ColorPicker
                                value={block.backgroundColor}
                                onChange={(color) => handleBlockChange(index, "backgroundColor", color)}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <p className="text-sm">{t("textColor")}</p>
                              <ColorPicker
                                value={block.textColor}
                                onChange={(color) => handleBlockChange(index, "textColor", color)}
                              />
                            </div>
                          </div>
                        </Tab>
                      </Tabs>
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
                <SelectItem key="stacked" value="stacked">{t("stacked")}</SelectItem>
                <SelectItem key="alternating" value="alternating">{t("alternating")}</SelectItem>
                <SelectItem key="zigzag" value="zigzag">{t("zigzag")}</SelectItem>
              </Select>
              
              <div className="space-y-1">
                <p className="text-sm">{t("spacing")}: {settings.spacing}px</p>
                <input
                  type="range"
                  min="0"
                  max="200"
                  step="8"
                  value={settings.spacing}
                  onChange={(e) => handleChange("spacing", parseInt(e.target.value))}
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
              
              <div className="flex items-center justify-between">
                <span className="text-sm">{t("fullWidth")}</span>
                <Switch
                  checked={settings.fullWidth}
                  onChange={(e) => handleChange("fullWidth", e.target.checked)}
                  size="sm"
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
                <p className="text-sm font-medium">{t("sectionBackgroundColor")}</p>
                <ColorPicker
                  value={settings.backgroundColor}
                  onChange={(color) => handleChange("backgroundColor", color)}
                />
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">{t("sectionTitleColor")}</p>
                <ColorPicker
                  value={settings.titleColor}
                  onChange={(color) => handleChange("titleColor", color)}
                />
              </div>
              
              <Select
                label={t("titleAlignment")}
                value={settings.titleAlignment}
                onChange={(e) => handleChange("titleAlignment", e.target.value)}
              >
                <SelectItem key="left" value="left">{t("left")}</SelectItem>
                <SelectItem key="center" value="center">{t("center")}</SelectItem>
                <SelectItem key="right" value="right">{t("right")}</SelectItem>
              </Select>
              
              <Select
                label={t("blockStyle")}
                value={settings.blockStyle}
                onChange={(e) => handleChange("blockStyle", e.target.value)}
              >
                <SelectItem key="simple" value="simple">{t("simple")}</SelectItem>
                <SelectItem key="bordered" value="bordered">{t("bordered")}</SelectItem>
                <SelectItem key="shadowed" value="shadowed">{t("shadowed")}</SelectItem>
                <SelectItem key="rounded" value="rounded">{t("rounded")}</SelectItem>
              </Select>
              
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
                  <SelectItem key="slideIn" value="slideIn">{t("slideIn")}</SelectItem>
                </Select>
              )}
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default ContentBlocksSettings;