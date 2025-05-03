
import {
  LayoutDashboard,
  Settings as LucideSettings,
  FileText,
  Globe,
  Info,
  Layout,
  Palette,
  Navigation,
  Layers,
  Home,
  Phone,
  Users,
  ShoppingCart,
  CreditCard,
  Truck,
  MessageSquare,
  Search,
  Sliders,
  Languages,
  Shield,
  Database,
} from "lucide-react";
import { useTranslations } from "next-intl";

const useMenuItems = () => {
  const t = useTranslations("Sidebar.menus");

  return {
    mainMenuItems: [
      {
        href: "/home",
        label: t("mainMenuItems.dashboard.label") || "Dashboard",
        icon: LayoutDashboard,
        description:
          t("mainMenuItems.dashboard.description") ||
          "Website overview and statistics",
      },
    ],

    layoutItems: [
      {
        href: "/layout-header",
        label: t("layoutItems.header.label"),
        icon: Navigation,
        description:
          t("layoutItems.header.description"),
      },
      {
        href: "/layout-footer",
        label: t("layoutItems.footer.label"),
        icon: Globe,
        description:
          t("layoutItems.footer.description"),
      },
      {
        href: "/layout-theme",
        label: t("layoutItems.theme.label"),
        icon: Palette,
        description:
          t("layoutItems.theme.description"),
      },
    ],

    contentItems: [
      {
        href: "/pages/home",
        label: t("contentItems.homePage.label") || "Home Page",
        icon: Home,
        description:
          t("contentItems.homePage.description") ||
          "Edit home page content",
      },
      {
        href: "/pages/about",
        label: t("contentItems.aboutPage.label") || "About Page",
        icon: Info,
        description:
          t("contentItems.aboutPage.description") ||
          "Edit about page content",
      },
      {
        href: "/pages/contact",
        label: t("contentItems.contactPage.label") || "Contact Page",
        icon: Phone,
        description:
          t("contentItems.contactPage.description") ||
          "Edit contact page content",
      },
    ],

    templateItems: [
      {
        href: "/templates-store",
        label: t("templateItems.templateStore.label") || "Template Store",
        icon: Layers,
        description:
          t("templateItems.templateStore.description") ||
          "Browse website templates",
      },
      {
        href: "/templates-installed",
        label:
          t("templateItems.installedTemplates.label") ||
          "Installed Templates",
        icon: FileText,
        description:
          t("templateItems.installedTemplates.description") ||
          "Manage installed templates",
      },
      {
        href: "/templates-customize",
        label:
          t("templateItems.customizeTemplate.label") ||
          "Customize Template",
        icon: Sliders,
        description:
          t("templateItems.customizeTemplate.description") ||
          "Modify current template",
      },
    ],

    ecommerceItems: [
      {
        href: "/ecommerce-checkout",
        label: t("ecommerceItems.checkout.label") || "Checkout",
        icon: CreditCard,
        description:
          t("ecommerceItems.checkout.description") ||
          "Configure checkout process",
      },
      {
        href: "/ecommerce-shipping",
        label: t("ecommerceItems.shipping.label") || "Shipping",
        icon: Truck,
        description:
          t("ecommerceItems.shipping.description") ||
          "Manage shipping options",
      },
      {
        href: "/ecommerce-cart",
        label: t("ecommerceItems.cart.label") || "Shopping Cart",
        icon: ShoppingCart,
        description:
          t("ecommerceItems.cart.description") ||
          "Configure shopping cart",
      },
      {
        href: "/ecommerce-comments",
        label: t("blogItems.comments.label") || "Comments",
        icon: MessageSquare,
        description:
          t("blogItems.comments.description") ||
          "Moderate blog comments",
      },
    ],



    generalItems: [
      {
        href: "/settings",
        label:
          t("generalItems.generalSettings.label") ||
          "General Settings",
        icon: LucideSettings,
        description:
          t("generalItems.generalSettings.description") ||
          "Basic website configuration",
      },
      // {
      //   href: "/settings-seo",
      //   label: t("generalItems.seo.label") || "SEO Settings",
      //   icon: Search,
      //   description:
      //     t("generalItems.seo.description") ||
      //     "Search engine optimization",
      // },
      // {
      //   href: "/settings-users",
      //   label: t("generalItems.users.label") || "User Management",
      //   icon: Users,
      //   description:
      //     t("generalItems.users.description") ||
      //     "Manage website administrators",
      // },
      {
        href: "/languages",
        label:
          t("generalItems.languages.label") ||
          "Languages",
        icon: Languages,
        description:
          t("generalItems.languages.description") ||
          "Configure site translations",
      },
      // {
      //   href: "/settings-security",
      //   label:
      //     t("generalItems.security.label") ||
      //     "Security",
      //   icon: Shield,
      //   description:
      //     t("generalItems.security.description") ||
      //     "Website security settings",
      // },
      {
        href: "/backup",
        label:
          t("generalItems.backup.label") ||
          "Backup & Restore",
        icon: Database,
        description:
          t("generalItems.backup.description") ||
          "Manage website backups",
      },
    ],
  };
};

export default useMenuItems;


