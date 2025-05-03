// pages/settings/sections/AppearanceSettings.jsx
import React from "react";
import { useTranslations } from "next-intl";
import { Card, CardBody, Select, SelectItem, Switch } from "@nextui-org/react";
import { Palette, Sun, Moon, Monitor, Layers } from "lucide-react";
import { SectionHeader } from "@/components/settings/SectionHeader";
import { useTheme } from "next-themes"; // Import next-themes hook
import useSettings from "@/hooks/settings/useSettings";

export const AppearanceSettings = () => {
  const t = useTranslations("SettingsPage");

  const { settings, updateAppearance } = useSettings();
  const { theme, setTheme } = useTheme(); // Use next-themes hook

  const { language, appearance } = settings;
  const isArabic = language === "ar";

  // Handle theme change
  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    updateAppearance({ theme: newTheme });
  };

  // Handle density change
  const handleDensityChange = (e) => {
    updateAppearance({ density: e.target.value });
  };

  // Handle sidebar collapsed state
  const handleSidebarCollapsedChange = (isSelected) => {
    updateAppearance({ sidebarCollapsed: isSelected });
  };

  // Handle color scheme change
  const handleColorSchemeChange = (scheme) => {
    updateAppearance({ colorScheme: scheme });
  };

  return (
    <section>
      <SectionHeader icon={Palette} title={t("tabs.appearance")} />
      <Card>
        <CardBody
          className={`px-6 py-4 ${isArabic ? "text-right" : "text-left"}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              labelPlacement="outside-left"
              label={t("appearance.theme")}
              className={isArabic ? "ml-auto" : ""}
              selectedKeys={[appearance?.theme || "system"]}
              onChange={handleThemeChange}
              startContent={<ThemeIcon theme={appearance?.theme || "system"} />}
            >
              <SelectItem
                key="light"
                value="light"
                startContent={<Sun size={16} className="text-warning" />}
              >
                {t("appearance.themes.light")}
              </SelectItem>
              <SelectItem
                key="dark"
                value="dark"
                startContent={<Moon size={16} className="text-primary" />}
              >
                {t("appearance.themes.dark")}
              </SelectItem>
              <SelectItem
                key="system"
                value="system"
                startContent={
                  <Monitor size={16} className="text-default-500" />
                }
              >
                {t("appearance.themes.system")}
              </SelectItem>
            </Select>

            <Select
              labelPlacement="outside-left"
              label={t("appearance.density")}
              className={isArabic ? "ml-auto" : ""}
              selectedKeys={[appearance?.density || "comfortable"]}
              onChange={handleDensityChange}
              startContent={<Layers size={16} className="text-default-500" />}
            >
              <SelectItem key="comfortable" value="comfortable">
                {t("appearance.densities.comfortable")}
              </SelectItem>
              <SelectItem key="compact" value="compact">
                {t("appearance.densities.compact")}
              </SelectItem>
              <SelectItem key="spacious" value="spacious">
                {t("appearance.densities.spacious")}
              </SelectItem>
            </Select>

            <div
              className={`flex items-center`}
            >
              <Switch
                isSelected={appearance?.sidebarCollapsed}
                onValueChange={handleSidebarCollapsedChange}
              >
                {t("appearance.sidebarCollapsed")}
              </Switch>
            </div>

            {/* Color scheme selection */}
            <div
              className={`flex flex-col gap-2`}
            >
              <span className="text-sm">{t("appearance.colorScheme")}</span>
              <div className="flex gap-2">
                {["default", "blue", "green", "purple", "amber"].map(
                  (color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full transition-all ${
                        appearance?.colorScheme === color
                          ? "ring-2 ring-offset-2 ring-primary"
                          : "hover:scale-110"
                      }`}
                      style={{
                        backgroundColor: getColorHex(color),
                      }}
                      onClick={() => handleColorSchemeChange(color)}
                      aria-label={t(`appearance.colorSchemes.${color}`)}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </section>
  );
};

// Helper component for theme icon
const ThemeIcon = ({ theme }) => {
  switch (theme) {
    case "light":
      return <Sun size={16} className="text-warning" />;
    case "dark":
      return <Moon size={16} className="text-primary" />;
    default:
      return <Monitor size={16} className="text-default-500" />;
  }
};

// Helper function to get color hex values
const getColorHex = (color) => {
  const colorMap = {
    default: "#7C3AED", // primary purple
    blue: "#3B82F6",
    green: "#10B981",
    purple: "#8B5CF6",
    amber: "#F59E0B",
  };

  return colorMap[color] || colorMap.default;
};
