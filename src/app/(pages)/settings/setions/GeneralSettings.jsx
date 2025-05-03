import React from "react";
import { useTranslations } from "next-intl";
import { Card, CardBody, Select, SelectItem } from "@nextui-org/react";
import { Settings } from "lucide-react";
import { SectionHeader } from "@/components/settings/SectionHeader";
import { useSettings } from "@/hooks/settings/useSettings";
import { useRouter } from "next/navigation";

export const GeneralSettings = () => {
  const t = useTranslations("SettingsPage");
  const { settings, updateSetting } = useSettings();
  const router = useRouter();

  // State for each select component
  const [language, setLanguage] = React.useState(settings.language);
  const [timezone, setTimezone] = React.useState(settings.timezone);
  const [dateFormat, setDateFormat] = React.useState(settings.dateFormat);
  const [currency, setCurrency] = React.useState(settings.currency);

  // Handler for language change
  const handleLanguageChange = (e) => {
    const newValue = e.target.value;
    setLanguage(newValue);
    updateSetting("language", newValue);
    router.refresh();
  };

  // Handler for timezone change
  const handleTimezoneChange = (e) => {
    const newValue = e.target.value;
    setTimezone(newValue);
    updateSetting("timezone", newValue);
  };

  // Handler for date format change
  const handleDateFormatChange = (e) => {
    const newValue = e.target.value;
    setDateFormat(newValue);
    updateSetting("dateFormat", newValue);
  };

  // Handler for currency change
  const handleCurrencyChange = (e) => {
    const newValue = e.target.value;
    setCurrency(newValue);
    updateSetting("currency", newValue);
  };

  return (
    <section>
      <SectionHeader icon={Settings} title={t("tabs.general")} />
      <Card>
        <CardBody className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              labelPlacement="outside-left"
              label={t("general.defaultLanguage")}
              selectedKeys={[language]} // Ensure this is an array of strings
              onChange={handleLanguageChange}
            >
              <SelectItem key="en">English</SelectItem>
              <SelectItem key="ar">العربية</SelectItem>
            </Select>

            <Select
              labelPlacement="outside-left"
              label={t("general.timezone")}
              selectedKeys={[timezone]} // Ensure this is an array of strings
              onChange={handleTimezoneChange}
            >
              <SelectItem key="UTC">UTC</SelectItem>
              <SelectItem key="EST">Eastern Time</SelectItem>
              <SelectItem key="GMT">GMT</SelectItem>
              <SelectItem key="PST">Pacific Time</SelectItem>
            </Select>

            <Select
              labelPlacement="outside-left"
              label={t("general.dateFormat")}
              selectedKeys={[dateFormat]} // Ensure this is an array of strings
              onChange={handleDateFormatChange}
            >
              <SelectItem key="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
              <SelectItem key="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
              <SelectItem key="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
            </Select>

            <Select
              labelPlacement="outside-left"
              label={t("general.defaultCurrency")}
              selectedKeys={[currency]} // Ensure this is an array of strings
              onChange={handleCurrencyChange}
            >
              <SelectItem key="USD">USD ($)</SelectItem>
              <SelectItem key="EUR">EUR (€)</SelectItem>
              <SelectItem key="GBP">GBP (£)</SelectItem>
            </Select>
          </div>
        </CardBody>
      </Card>
    </section>
  );
};
