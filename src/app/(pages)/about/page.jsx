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
  Progress,
} from "@nextui-org/react";
import {
  BarChart,
  LineChart,
  Gauge,
  Users,
  Map,
  Bot,
  BrainCircuit,
  ArrowUpDown,
  Lightbulb,
  Cpu,
  Coins,
  PieChart,
  Sparkles,
  Download,
  Shield,
  Star,
  Bug,
  FileText,
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
    number: "2.1.0",
    codename: "InsightEngine",
    releaseDate: "2025-03-15",
  };

  const features = [
    {
      icon: <BarChart className="w-5 h-5" />,
      title: t("features.productAnalytics.title"),
      description: t("features.productAnalytics.description"),
    },
    {
      icon: <LineChart className="w-5 h-5" />,
      title: t("features.salesAnalytics.title"),
      description: t("features.salesAnalytics.description"),
    },
    {
      icon: <Gauge className="w-5 h-5" />,
      title: t("features.inventoryAnalytics.title"),
      description: t("features.inventoryAnalytics.description"),
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: t("features.customerAnalytics.title"),
      description: t("features.customerAnalytics.description"),
    },
    {
      icon: <BrainCircuit className="w-5 h-5" />,
      title: t("features.predictiveAnalytics.title"),
      description: t("features.predictiveAnalytics.description"),
    },
    {
      icon: <PieChart className="w-5 h-5" />,
      title: t("features.reportBuilder.title"),
      description: t("features.reportBuilder.description"),
    },
  ];

  const changelog = [
    {
      type: "feature",
      title: t("changelog.geographicAnalysis"),
      description: t("changelog.geographicAnalysisDesc"),
      icon: <Map className="w-4 h-4 text-primary" />,
      date: "2025-03-15",
    },
    {
      type: "improvement",
      title: t("changelog.aiAssistant"),
      description: t("changelog.aiAssistantDesc"),
      icon: <Bot className="w-4 h-4 text-success" />,
      date: "2025-02-20",
    },
    {
      type: "feature",
      title: t("changelog.inventoryValuation"),
      description: t("changelog.inventoryValuationDesc"),
      icon: <Coins className="w-4 h-4 text-primary" />,
      date: "2025-01-30",
    },
    {
      type: "improvement",
      title: t("changelog.reportBuilder"),
      description: t("changelog.reportBuilderDesc"),
      icon: <Sparkles className="w-4 h-4 text-success" />,
      date: "2025-01-15",
    },
    {
      type: "bugfix",
      title: t("changelog.forecastingBugfix"),
      description: t("changelog.forecastingBugfixDesc"),
      icon: <Bug className="w-4 h-4 text-danger" />,
      date: "2025-01-05",
    },
  ];

  const statistics = [
    { label: "Reports Generated", value: "50,000+" },
    { label: "Active Users", value: "2,500+" },
    { label: "Data Points Analyzed", value: "1B+" },
    { label: "Prediction Accuracy", value: "94.7%" },
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
          Report360 {currentVersion.number}
        </h1>
        <div className="flex justify-center gap-3 flex-wrap">
          <Chip
            variant="flat"
            color="primary"
            startContent={<Star className="w-4 h-4" />}
          >
            {currentVersion.codename}
          </Chip>
          <Chip variant="flat">{currentVersion.releaseDate}</Chip>
          <Chip
            variant="flat"
            color="success"
            startContent={<Shield className="w-4 h-4" />}
          >
            Enterprise Ready
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

      {/* Analytics & AI Insights Section */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h2 className="text-2xl font-semibold text-center">
          {t("keyCapabilities")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border border-default-200">
            <CardBody className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BarChart className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">
                  {t("analyticsCapabilities")}
                </h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <BarChart className="w-4 h-4 text-primary" />
                  <span>{t("productAnalyticsCapability")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <LineChart className="w-4 h-4 text-primary" />
                  <span>{t("salesAnalyticsCapability")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-primary" />
                  <span>{t("inventoryAnalyticsCapability")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span>{t("customerAnalyticsCapability")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Map className="w-4 h-4 text-primary" />
                  <span>{t("geographicAnalysisCapability")}</span>
                </li>
              </ul>
            </CardBody>
          </Card>

          <Card className="border border-default-200">
            <CardBody className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BrainCircuit className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">
                  {t("aiInsightsCapabilities")}
                </h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-primary" />
                  <span>{t("aiAssistantCapability")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-primary" />
                  <span>{t("predictiveAnalyticsCapability")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 text-primary" />
                  <span>{t("trendAnalysisCapability")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-primary" />
                  <span>{t("recommendationEngineCapability")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-primary" />
                  <span>{t("businessIntelligenceCapability")}</span>
                </li>
              </ul>
            </CardBody>
          </Card>
        </div>
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
            startContent={<FileText className="w-4 h-4" />}
          >
            {t("viewDocumentation")}
          </Button>
          <Button
            as={Link}
            href="/export-data"
            color="primary"
            startContent={<Download className="w-4 h-4" />}
          >
            {t("exportReports")}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutPage;
