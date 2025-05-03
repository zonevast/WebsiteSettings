// ./src/components/ui/layout/sidebar/menuConfigs.js

import {
    LayoutDashboard,
    TrendingUp,
    Settings as LucideSettings,
    FileText,
    AlertCircle,
    Globe,
    PieChart,
    Trash2,
    Info,
    BarChart,
    LineChart,
    Cpu,
    BrainCircuit,
    Bot,
    Gauge,
    Sparkles,
    Lightbulb,
    ArrowUpDown,
    Users,
    Download,
    Timer,
    Package,
    Tag,
    DollarSign,
    Award,
    ShoppingBag,
    Repeat,
    Coins,
    Database,
    Truck,
    Activity,
    Boxes,
    Map,
  } from "lucide-react";
  import { useTranslations } from "next-intl";
  
  const useMenuItems = () => {
    const t = useTranslations("Sidebar.menus");
  
    return {
      mainMenuItems: [
        {
          href: "/home",
          label: t("mainMenuItems.dashboard.label"),
          icon: LayoutDashboard,
          description: t("mainMenuItems.dashboard.description"),
        },
      ],
  
      analyticsItems: [
        {
          href: "/product-analytics",
          label: t("analyticsItems.productAnalytics.label"),
          icon: BarChart,
          description: t("analyticsItems.productAnalytics.description"),
        },
        {
          href: "/sales-analytics",
          label: t("analyticsItems.salesAnalytics.label"),
          icon: LineChart,
          description: t("analyticsItems.salesAnalytics.description"),
        },
        {
          href: "/inventory-analytics",
          label: t("analyticsItems.inventoryAnalytics.label"),
          icon: Gauge,
          description: t("analyticsItems.inventoryAnalytics.description"),
        },
        {
          href: "/customer-analytics",
          label: t("analyticsItems.customerAnalytics.label"),
          icon: Users,
          description: t("analyticsItems.customerAnalytics.description"),
        },
        {
          href: "/geographic-analysis",
          label: t("analyticsItems.geographicAnalysis.label"),
          icon: Map,
          description: t("analyticsItems.geographicAnalysis.description"),
        },
      ],
  
      aiInsightsMenu1: [
        {
          href: "/ai-assistant",
          label: t("aiInsightsMenu1.aiAssistant.label"),
          icon: Bot,
          description: t("aiInsightsMenu1.aiAssistant.description"),
        },
        {
          href: "/predictive-analytics",
          label: t("aiInsightsMenu1.predictiveAnalytics.label"),
          icon: BrainCircuit,
          description: t("aiInsightsMenu1.predictiveAnalytics.description"),
        },
        {
          href: "/trend-analysis",
          label: t("aiInsightsMenu1.trendAnalysis.label"),
          icon: ArrowUpDown,
          description: t("aiInsightsMenu1.trendAnalysis.description"),
        },
      ],
  
      aiInsightsMenu2: [
        {
          href: "/recommendation-engine",
          label: t("aiInsightsMenu2.recommendationEngine.label"),
          icon: Lightbulb,
          description: t("aiInsightsMenu2.recommendationEngine.description"),
        },
        {
          href: "/business-intelligence",
          label: t("aiInsightsMenu2.businessIntelligence.label"),
          icon: Cpu,
          description: t("aiInsightsMenu2.businessIntelligence.description"),
        },
      ],
  
      productItems: [
        {
          href: "/product-catalog",
          label: t("productItems.productCatalog.label"),
          icon: Package,
          description: t("productItems.productCatalog.description"),
        },
        {
          href: "/product-categories",
          label: t("productItems.productCategories.label"),
          icon: Tag,
          description: t("productItems.productCategories.description"),
        },
        {
          href: "/pricing-management",
          label: t("productItems.pricingManagement.label"),
          icon: DollarSign,
          description: t("productItems.pricingManagement.description"),
        },
        {
          href: "/product-performance",
          label: t("productItems.productPerformance.label"),
          icon: Award,
          description: t("productItems.productPerformance.description"),
        },
        {
          href: "/product-bundles",
          label: t("productItems.productBundles.label"),
          icon: ShoppingBag,
          description: t("productItems.productBundles.description"),
        },
      ],
  
      inventoryItems: [
        {
          href: "/stock-management",
          label: t("inventoryItems.stockManagement.label"),
          icon: Boxes,
          description: t("inventoryItems.stockManagement.description"),
        },
        {
          href: "/inventory-tracking",
          label: t("inventoryItems.inventoryTracking.label"),
          icon: Activity,
          description: t("inventoryItems.inventoryTracking.description"),
        },
        {
          href: "/supply-chain",
          label: t("inventoryItems.supplyChain.label"),
          icon: Truck,
          description: t("inventoryItems.supplyChain.description"),
        },
        {
          href: "/reorder-management",
          label: t("inventoryItems.reorderManagement.label"),
          icon: Repeat,
          description: t("inventoryItems.reorderManagement.description"),
        },
        {
          href: "/inventory-valuation",
          label: t("inventoryItems.inventoryValuation.label"),
          icon: Coins,
          description: t("inventoryItems.inventoryValuation.description"),
        },
      ],
  
      exportItems: [
        {
          href: "/my-reports",
          label: t("exportItems.reports.label"),
          icon: PieChart,
          description: t("exportItems.reports.description"),
        },
        {
          href: "/report-builder",
          label: t("exportItems.reportBuilder.label"),
          icon: Sparkles,
          description: t("exportItems.reportBuilder.description"),
        },
        {
          href: "/templates-marketplace",
          label: t("exportItems.templates.label"),
          icon: FileText,
          description: t("exportItems.templates.description"),
        },
        {
          href: "/export-data",
          label: t("exportItems.exportData.label"),
          icon: Download,
          description: t("exportItems.exportData.description"),
        },
      ],
  
      forecastingItems: [
        {
          href: "/forecasting",
          label: t("forecastingItems.forecasting.label"),
          icon: TrendingUp,
          description: t("forecastingItems.forecasting.description"),
        },
        {
          href: "/timeline-analysis",
          label: t("forecastingItems.timelineAnalysis.label"),
          icon: Timer,
          description: t("forecastingItems.timelineAnalysis.description"),
        },
      ],
  
      generalItems: [
        {
          href: "/settings",
          label: t("generalItems.settings.label"),
          icon: LucideSettings,
          description: t("generalItems.settings.description"),
        },
        {
          href: "/recycle-bin",
          label: t("generalItems.recycleBin.label"),
          icon: Trash2,
          description: t("generalItems.recycleBin.description"),
        },
        {
          href: "/about",
          label: t("generalItems.about.label"),
          icon: Info,
          description: t("generalItems.about.description"),
        },
      ],
    };
  };
  
  export default useMenuItems;
  