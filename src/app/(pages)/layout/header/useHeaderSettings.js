// hooks/settings/useHeaderSettings.js
"use client";
import { useState, useEffect } from "react";

export const useHeaderSettings = () => {
  // Default header settings (dummy data)
  const defaultSettings = {
    // Logo settings
    logoUrl: "https://placehold.co/200x80/6366F1/white?text=Logo",
    showLogo: true,
    logoSize: "medium",
    logoPosition: "left",

    // Site title settings
    siteTitle: "My E-commerce Store",
    showTitle: true,
    titleFont: "default",
    titleSize: "medium",
    titleColor: "#000000",

    // Favicon
    faviconUrl: "https://placehold.co/32x32/6366F1/white?text=F",

    // Navigation settings
    navigationItems: [
      { id: "1", label: "Home", url: "/", isExternal: false, isVisible: true },
      { id: "2", label: "Products", url: "/products", isExternal: false, isVisible: true },
      { id: "3", label: "About", url: "/about", isExternal: false, isVisible: true },
      { id: "4", label: "Blog", url: "/blog", isExternal: false, isVisible: true },
      { id: "5", label: "Contact", url: "/contact", isExternal: false, isVisible: true },
      { id: "6", label: "Documentation", url: "https://docs.example.com", isExternal: true, isVisible: true }
    ],
    menuStyle: "horizontal",
    stickyHeader: true,
    transparentHeader: false,
    showSearchIcon: true,
    mobileMenuType: "drawer",
    collapseOnScroll: true,
    hamburgerIconSize: 24,

    // Style settings - Desktop
    backgroundColor: "#ffffff",
    textColor: "#333333",
    headerHeight: 80,
    headerPadding: 20,
    borderStyle: "bottom",
    borderWidth: "1",
    borderColor: "#e5e7eb",
    shadowStyle: "small",
    isTransparent: false,
    useGradient: false,
    gradientStart: "#6366F1",
    gradientEnd: "#8B5CF6",
    useGlassmorphism: false,
    blurIntensity: 10,

    // Style settings - Mobile
    mobileBackgroundColor: "#ffffff",
    mobileTextColor: "#333333",
    mobileHeaderHeight: 60,
    mobileHeaderPadding: 16,
    mobileBorderStyle: "bottom",
    mobileBorderWidth: "1",
    mobileBorderColor: "#e5e7eb",
    mobileShadowStyle: "small",
    mobileIsTransparent: false,
    mobileUseGradient: false,
    mobileGradientStart: "#6366F1",
    mobileGradientEnd: "#8B5CF6",
    mobileUseGlassmorphism: false,
    mobileBlurIntensity: 10
  };

  const [headerSettings, setHeaderSettings] = useState(defaultSettings);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setHeaderSettings(defaultSettings);
      setIsLoading(false);
    };

    loadSettings();
  }, []);

  const updateHeaderSettings = (newSettings) => {
    setHeaderSettings(prevSettings => ({
      ...prevSettings,
      ...newSettings
    }));
  };

  const resetToDefaults = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setHeaderSettings(defaultSettings);
    setIsLoading(false);
  };

  const saveSettings = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return {
    headerSettings,
    updateHeaderSettings,
    resetToDefaults,
    saveSettings,
    isLoading
  };
};

export default useHeaderSettings;
