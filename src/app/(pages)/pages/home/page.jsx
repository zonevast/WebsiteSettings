"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Tabs, 
  Tab, 
  Button, 
  Divider,
  Tooltip,
  Chip
} from "@nextui-org/react";
import { 
  Save, 
  RotateCcw, 
  Eye, 
  EyeOff, 
  Layout, 
  Type, 
  Image as ImageIcon, 
  Grid, 
  Layers
} from "lucide-react";
import { useHomeSettings } from "./useHomeSettings";
import HeroSettings from "@/components/homePage/HeroSettings";
import FeaturesSettings from "@/components/homePage/FeaturesSettings";
import ContentBlocksSettings from "@/components/homePage/ContentBlocksSettings";
import TestimonialsSettings from "@/components/homePage/TestimonialsSettings";
import CTASettings from "@/components/homePage/CTASettings";
import HomePreview from "@/components/homePage/HomePreview";

const HomePage = () => {
  const t = useTranslations("HomePage");
  const { 
    homeSettings, 
    updateHomeSettings, 
    resetToDefaults, 
    saveSettings, 
    isLoading 
  } = useHomeSettings();
  
  const [activeTab, setActiveTab] = useState("hero");
  const [showPreview, setShowPreview] = useState(false);
  const [previewDevice, setPreviewDevice] = useState("desktop");
  
  const handleTabChange = (key) => {
    setActiveTab(key);
  };
  
  const togglePreview = () => {
    setShowPreview(!showPreview);
  };
  
  return (
    <div className="w-full max-w-full">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">{t("title")}</h3>
          <div className="flex gap-2">
            <Button
              color="primary"
              variant="flat"
              startContent={showPreview ? <EyeOff size={18} /> : <Eye size={18} />}
              onPress={togglePreview}
            >
              {showPreview ? t("hidePreview") : t("showPreview")}
            </Button>
            <Button
              color="default"
              variant="flat"
              startContent={<RotateCcw size={18} />}
              onPress={resetToDefaults}
              isLoading={isLoading}
            >
              {t("resetToDefaults")}
            </Button>
            <Button
              color="primary"
              startContent={<Save size={18} />}
              onPress={saveSettings}
              isLoading={isLoading}
            >
              {t("saveChanges")}
            </Button>
          </div>
        </div>
        
        <Card className="w-full">
          <CardHeader className="flex gap-2">
            <div className="flex flex-col">
              <p className="text-md">{t("homePageSettings")}</p>
              <p className="text-small text-default-500">{t("homePageDescription")}</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className={`flex ${showPreview ? "flex-col md:flex-row gap-4" : "flex-col"}`}>
              <div className={showPreview ? "w-full md:w-1/2" : "w-full"}>
                <Tabs 
                  aria-label="Home Page Sections" 
                  selectedKey={activeTab}
                  onSelectionChange={handleTabChange}
                  className="mb-4"
                >
                  <Tab 
                    key="hero" 
                    title={
                      <div className="flex items-center gap-2">
                        <Layout size={18} />
                        <span>{t("heroSection")}</span>
                      </div>
                    }
                  />
                  <Tab 
                    key="features" 
                    title={
                      <div className="flex items-center gap-2">
                        <Grid size={18} />
                        <span>{t("featuresSectionTab")}</span>
                      </div>
                    }
                  />
                  <Tab 
                    key="contentBlocks" 
                    title={
                      <div className="flex items-center gap-2">
                        <Layers size={18} />
                        <span>{t("contentBlocksTab")}</span>
                      </div>
                    }
                  />
                  <Tab 
                    key="testimonials" 
                    title={
                      <div className="flex items-center gap-2">
                        <Type size={18} />
                        <span>{t("testimonials")}</span>
                      </div>
                    }
                  />
                  <Tab 
                    key="cta" 
                    title={
                      <div className="flex items-center gap-2">
                        <ImageIcon size={18} />
                        <span>{t("ctaSection")}</span>
                      </div>
                    }
                  />
                </Tabs>
                
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === "hero" && (
                    <HeroSettings 
                      settings={homeSettings.hero} 
                      updateSettings={(heroSettings) => 
                        updateHomeSettings({ hero: heroSettings })
                      } 
                    />
                  )}
                  
                  {activeTab === "features" && (
                    <FeaturesSettings 
                      settings={homeSettings.features} 
                      updateSettings={(featuresSettings) => 
                        updateHomeSettings({ features: featuresSettings })
                      } 
                    />
                  )}
                  
                  {activeTab === "contentBlocks" && (
                    <ContentBlocksSettings 
                      settings={homeSettings.contentBlocks} 
                      updateSettings={(contentBlocksSettings) => 
                        updateHomeSettings({ contentBlocks: contentBlocksSettings })
                      } 
                    />
                  )}
                  
                  {activeTab === "testimonials" && (
                    <TestimonialsSettings 
                      settings={homeSettings.testimonials} 
                      updateSettings={(testimonialsSettings) => 
                        updateHomeSettings({ testimonials: testimonialsSettings })
                      } 
                    />
                  )}
                  
                  {activeTab === "cta" && (
                    <CTASettings 
                      settings={homeSettings.cta} 
                      updateSettings={(ctaSettings) => 
                        updateHomeSettings({ cta: ctaSettings })
                      } 
                    />
                  )}
                </motion.div>
              </div>
              
              {showPreview && (
                <div className="w-full md:w-1/2">
                  <Card className="sticky top-4">
                    <CardHeader className="flex justify-between items-center">
                      <h4 className="text-md font-medium">{t("preview")}</h4>
                      <div className="flex gap-2">
                        <Tooltip content={t("desktopView")}>
                          <Button
                            isIconOnly
                            size="sm"
                            variant={previewDevice === "desktop" ? "solid" : "flat"}
                            color={previewDevice === "desktop" ? "primary" : "default"}
                            onPress={() => setPreviewDevice("desktop")}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                              <line x1="8" y1="21" x2="16" y2="21"></line>
                              <line x1="12" y1="17" x2="12" y2="21"></line>
                            </svg>
                          </Button>
                        </Tooltip>
                        <Tooltip content={t("tabletView")}>
                          <Button
                            isIconOnly
                            size="sm"
                            variant={previewDevice === "tablet" ? "solid" : "flat"}
                            color={previewDevice === "tablet" ? "primary" : "default"}
                            onPress={() => setPreviewDevice("tablet")}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                              <line x1="12" y1="18" x2="12.01" y2="18"></line>
                            </svg>
                          </Button>
                        </Tooltip>
                        <Tooltip content={t("mobileView")}>
                          <Button
                            isIconOnly
                            size="sm"
                            variant={previewDevice === "mobile" ? "solid" : "flat"}
                            color={previewDevice === "mobile" ? "primary" : "default"}
                            onPress={() => setPreviewDevice("mobile")}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                              <line x1="12" y1="18" x2="12.01" y2="18"></line>
                            </svg>
                          </Button>
                        </Tooltip>
                      </div>
                    </CardHeader>
                    <Divider />
                    <CardBody className="overflow-auto max-h-[800px]">
                      <HomePreview settings={homeSettings} device={previewDevice} />
                    </CardBody>
                  </Card>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;