"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Card,
  CardBody,
  Chip,
  Divider,
  Link,
  Button,
  ScrollShadow,
} from "@nextui-org/react";
import {
  Globe,
  Database,
  Palette,
  Layers,
  Users,
  Search,
  Shield,
  ArrowUpDown,
  Sparkles,
} from "lucide-react";
import { containerVariants, itemVariants } from "@/components/animations";
import FeatureCard from "@/components/about/FeatureCard";
import useSettings from "@/hooks/settings/useSettings";

const AboutPage = () => {
  const t = useTranslations("AboutPage");

  const {
    settings: { language },
  } = useSettings(); // Use the hook

  const isArabic = language === "ar";

  const currentVersion = {
    number: "1.0.0",
    codename: "SiteMaster",
    releaseDate: "2025-03-15",
  };

  const features = [
    {
      icon: <Globe className="w-5 h-5" />,
      title: t("features.languageSupport.title"),
      description: t("features.languageSupport.description"),
    },
    {
      icon: <Database className="w-5 h-5" />,
      title: t("features.backupRestore.title"),
      description: t("features.backupRestore.description"),
    },
    {
      icon: <Palette className="w-5 h-5" />,
      title: t("features.themeCustomization.title"),
      description: t("features.themeCustomization.description"),
    },
    {
      icon: <Layers className="w-5 h-5" />,
      title: t("features.templateManagement.title"),
      description: t("features.templateManagement.description"),
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: t("features.userSecurityManagement.title"),
      description: t("features.userSecurityManagement.description"),
    },
    {
      icon: <Search className="w-5 h-5" />,
      title: t("features.seoOptimization.title"),
      description: t("features.seoOptimization.description"),
    },
  ];

  const changelog = [
    {
      type: "improvement",
      title: t("changelog.performanceImprovements"),
      description: t("changelog.performanceImprovementsDesc"),
      icon: <ArrowUpDown className="w-4 h-4 text-primary" />,
      date: "2025-05-20",
    },
    {
      type: "feature",
      title: t("changelog.seoSettingsAdded"),
      description: t("changelog.seoSettingsAddedDesc"),
      icon: <Search className="w-4 h-4 text-success" />,
      date: "2025-05-01",
    },
    {
      type: "feature",
      title: t("changelog.securityModule"),
      description: t("changelog.securityModuleDesc"),
      icon: <Shield className="w-4 h-4 text-primary" />,
      date: "2025-04-30",
    },
    {
      type: "feature",
      title: t("changelog.themeEditor"),
      description: t("changelog.themeEditorDesc"),
      icon: <Palette className="w-4 h-4 text-success" />,
      date: "2025-04-10",
    },
    {
      type: "feature",
      title: t("changelog.initialRelease"),
      description: t("changelog.initialReleaseDesc"),
      icon: <Sparkles className="w-4 h-4 text-primary" />,
      date: "2025-03-15",
    },
  ];

  const statistics = [
    { label: t("statistics.sitesManaged.label"), value: "1,200+" },
    { label: t("statistics.languagesSupported.label"), value: "25" },
    { label: t("statistics.backupsCreated.label"), value: "10,000+" },
    { label: t("statistics.activeAdmins.label"), value: "500+" },
  ];

  return (
    <motion.div
      className="space-y-8 p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {t("title")} {currentVersion.number}
        </h1>
        <div className="flex justify-center gap-3 flex-wrap">
          <Chip
            variant="flat"
            color="primary"
            startContent={<Sparkles className="w-4 h-4" />}
          >
            {currentVersion.codename}
          </Chip>
          <Chip variant="flat">{currentVersion.releaseDate}</Chip>
          <Chip
            variant="flat"
            color="success"
            startContent={<Shield className="w-4 h-4" />}
          >
            {t("enterpriseReady")}
          </Chip>
        </div>
        <p className="text-default-600 max-w-2xl mx-auto">{t("description")}</p>
      </motion.div>

      {/* Statistics Section */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {statistics.map((stat, index) => (
          <Card key={index} className="border border-default-200">
            <CardBody className="text-center">
              <h3 className="text-2xl font-bold text-primary">{stat.value}</h3>
              <p className="text-small text-default-600">{stat.label}</p>
            </CardBody>
          </Card>
        ))}
      </motion.div>

      {/* Version Features */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} />
        ))}
      </motion.div>

      <Divider className="my-8" />
      {/* Changelog Section */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">{t("changelogTitle")}</h2>
          <Button
            as={Link}
            href="/changelog"
            variant="flat"
            color="primary"
            size="sm"
          >
            {t("viewFullChangelog")}
          </Button>
        </div>

        <Card>
          <CardBody>
            <ScrollShadow className="max-h-[400px]">
              <div className="space-y-6">
                {changelog.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 relative pb-6 last:pb-0"
                  >
                    <div className="p-2 bg-default-100 rounded-full">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{item.title}</h4>
                        <Chip size="sm" variant="flat">
                          {item.date}
                        </Chip>
                      </div>
                      <p
                        className={`text-small text-default-600 ${
                          isArabic ? "text-right" : ""
                        } `}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollShadow>
          </CardBody>
        </Card>
      </motion.div>

      {/* Support Section */}
      <motion.div variants={itemVariants} className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">{t("needHelp")}</h2>
        <p className="text-default-600 max-w-xl mx-auto">
          {t("supportDescription")}
        </p>
        <div className="flex justify-center gap-4">
          <Button
            as={Link}
            href="/documentation"
            variant="flat"
            color="primary"
          >
            {t("viewDocumentation")}
          </Button>
          <Button as={Link} href="/export-settings" color="primary">
            {t("exportSettings")}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutPage;
