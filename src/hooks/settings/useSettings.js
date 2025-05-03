import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSettingsStore } from "@/stores/useSettingsStore";

export const useSettings = () => {
  const router = useRouter();

  // Get settings and update functions from Zustand store
  const settings = useSettingsStore((state) => ({
    language: state.language,
    timezone: state.timezone,
    dateFormat: state.dateFormat,
    currency: state.currency,
    appearance: state.appearance,
    productSettings: state.productSettings,
  }));

  const updateSetting = useSettingsStore((state) => state.updateSetting);
  const updateAppearance = useSettingsStore((state) => state.updateAppearance);
  const updateProductSetting = useSettingsStore((state) => state.updateProductSetting);
  const resetSettings = useSettingsStore((state) => state.resetSettings);

  const handleLanguageChange = (value) => {
    updateSetting("language", value);
    router.refresh();
  };

  // Apply theme settings to document
  useEffect(() => {
    if (settings.appearance) {
      const { density, colorScheme, sidebarCollapsed } = settings.appearance;

      if (density) {
        document.documentElement.setAttribute("data-density", density);
      }
      if (colorScheme) {
        document.documentElement.setAttribute("data-color-scheme", colorScheme);
      }
      if (typeof sidebarCollapsed === "boolean") {
        localStorage.setItem("sidebarCollapsed", sidebarCollapsed.toString());
      }
    }
  }, [settings.appearance]);

  return {
    settings,
    updateSetting,
    updateAppearance,
    updateProductSetting,
    resetSettings,
    handleLanguageChange,
  };
};

export default useSettings;
