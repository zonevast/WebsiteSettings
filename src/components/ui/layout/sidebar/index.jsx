"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ChevronLeft, Globe } from "lucide-react"; // Changed Package to Globe
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import { useTranslations } from "next-intl";
import { useSettings } from "@/hooks/settings/useSettings";
import useMenuItems from "./menuConfigs";

export default function Sidebar() {
  const pathname = usePathname();
  const { settings, updateAppearance } = useSettings();
  const t = useTranslations("Sidebar");

  // Derive expanded state from settings (collapsed: true means not expanded)
  const isExpanded = !settings.appearance?.sidebarCollapsed;
  const isRTL = settings.language === "ar";

  const menuItems = useMenuItems();

  const {
    mainMenuItems,
    layoutItems,
    contentItems,
    templateItems,
    ecommerceItems,
    settingsItems,
  } = menuItems;

  // Toggle the sidebar collapse state in the store
  const toggleSidebar = () => {
    updateAppearance({
      sidebarCollapsed: !settings.appearance?.sidebarCollapsed,
    });
  };

  // Check if the menu item is active
  // If item.childrenUrl is true, check if the current path starts with the item's href.
  const isMenuItemActive = (item) => {
    const normalize = (str) => (str.endsWith("/") ? str.slice(0, -1) : str);
    const normalizedPath = normalize(pathname).toString();
    const normalizedHref = normalize(item.href).toString();
    if (item.childrenUrl) {
      return normalizedPath.indexOf(normalizedHref) > -1;
    } else {
      return normalizedPath === normalizedHref;
    }
  };

  const renderMenuSection = (items, sectionTitleKey) => (
    <div className="space-y-2">
      {isExpanded && (
        <div className="px-4 py-2">
          <span className="text-xs font-semibold text-default-500 uppercase tracking-wider">
            {t(sectionTitleKey)}
          </span>
        </div>
      )}
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = isMenuItemActive(item);

        const menuItem = (
          <div
            className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 group hover:shadow-md ${
              isActive
                ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                : "hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10"
            } ${!isExpanded ? "justify-center px-3" : "justify-start px-4"}`}
          >
            <Icon
              className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                isActive ? "text-white" : "text-default-600"
              }`}
            />
            <AnimatePresence mode="wait">
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRTL ? 10 : -10 }}
                  className="flex flex-col min-w-0"
                >
                  <span className="font-medium truncate">{item.label}</span>
                  <span
                    className={`text-xs truncate ${
                      isActive ? "text-white/90" : "text-default-500"
                    }`}
                  >
                    {item.description}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

        return (
          <Link key={item.href} href={item.href}>
            {!isExpanded ? (
              <Tooltip
                content={
                  <div className="px-1 py-2">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-default-400 mt-1">
                      {item.description}
                    </div>
                  </div>
                }
                placement={isRTL ? "left" : "right"}
                delay={300}
                closeDelay={0}
                className="bg-content2 text-foreground border border-divider shadow-lg"
              >
                {menuItem}
              </Tooltip>
            ) : (
              menuItem
            )}
          </Link>
        );
      })}
    </div>
  );

  return (
    <motion.div
      initial={false}
      animate={{ width: isExpanded ? 280 : 88 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed ${
        isRTL ? "right-0 border-l" : "left-0 border-r"
      } top-0 h-screen bg-background dark:bg-content1 backdrop-blur-lg border-divider dark:border-content2 z-[999] flex flex-col overflow-hidden shadow-lg dark:shadow-xl`}
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        [isRTL ? "right" : "left"]: 0,
      }}
    >
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-4 flex-shrink-0 bg-background/50 dark:bg-content1/80">
        <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-xl flex-shrink-0">
          <Globe className="text-white w-6 h-6" />
        </div>
        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRTL ? 10 : -10 }}
              className="flex items-center overflow-hidden"
            >
              <span className="font-bold text-xl whitespace-nowrap">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {t("websiteSettings")}
                </span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toggle Button */}
      <Tooltip
        content={isExpanded ? t("collapseSidebar") : t("expandSidebar")}
        placement={isRTL ? "left" : "right"}
        delay={500}
      >
        <Button
          isIconOnly
          variant="flat"
          className={`absolute ${
            isRTL ? "-left-3" : "-right-3"
          } top-8 z-[1000] bg-background/60 dark:bg-content1/80 backdrop-blur-lg border border-divider dark:border-content2 shadow-lg hover:bg-primary/10 dark:hover:bg-primary/20`}
          onClick={toggleSidebar}
          style={{
            [isRTL ? "left" : "right"]: "-0.75rem",
          }}
        >
          <motion.div
            animate={{
              rotate: isExpanded ? (isRTL ? 0 : 180) : isRTL ? 180 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {isRTL ? (
              <ChevronLeft className="h-4 w-4 text-foreground dark:text-current" />
            ) : (
              <ChevronRight className="h-4 w-4 text-foreground dark:text-current" />
            )}
          </motion.div>
        </Button>
      </Tooltip>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-4 space-y-6 custom-scrollbar dark:scrollbar-thumb-primary/30">
        {renderMenuSection(mainMenuItems, "sections.mainMenu")}
        {renderMenuSection(layoutItems, "sections.layout")}
        {renderMenuSection(contentItems, "sections.content")}
        {renderMenuSection(templateItems, "sections.templates")}
        {/* {renderMenuSection(ecommerceItems, "sections.ecommerce")} */}
        {renderMenuSection(settingsItems, "sections.generalItems")}
      </div>
    </motion.div>
  );
}
