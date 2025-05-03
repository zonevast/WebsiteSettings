// ExportSettings.jsx (or .tsx)

"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Select,
  SelectItem,
  Divider,
  Switch,
  RadioGroup,
  Radio,
  Checkbox,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import {
  Edit,
  Lock,
  ExternalLink,
  Zap,
  Bell,
  FileSpreadsheet,
  FileJson,
  Settings,
  File,
} from "lucide-react";
import { SectionHeader } from "@/components/settings/SectionHeader";
import { useTranslations } from "next-intl";

const ExportSettings = () => {
  const t = useTranslations("SettingsPage");

  const formatOptions = [
    {
      value: "xlsx",
      label: t("formats.excel"),
      icon: <FileSpreadsheet size={16} />,
      description: t("formats.excelDescription"),
    },
    {
      value: "csv",
      label: t("formats.csv"),
      icon: <File size={16} />,
      description: t("formats.csvDescription"),
    },
    {
      value: "pdf",
      label: t("formats.pdf"),
      icon: <File size={16} />,
      description: t("formats.pdfDescription"),
    },
    {
      value: "json",
      label: t("formats.json"),
      icon: <FileJson size={16} />,
      description: t("formats.jsonDescription"),
    },
  ];

  return (
    <section>
      <SectionHeader icon={Settings} title={t("exportSettings.title")} />
      <div className="space-y-6">
        <Card>
          <CardBody className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-md font-medium mb-3">
                  {t("exportSettings.formatPreferences")}
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">
                        {t("exportSettings.defaultExportFormat")}
                      </p>
                      <p className="text-sm text-gray-500">
                        {t("exportSettings.defaultExportFormatDescription")}
                      </p>
                    </div>
                    <Select
                      label="Format"
                      className="max-w-xs"
                      defaultSelectedKeys={["xlsx"]}
                    >
                      {formatOptions.map((format) => (
                        <SelectItem
                          key={format.value}
                          value={format.value}
                          startContent={format.icon}
                        >
                          {format.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">
                        {t("exportSettings.includeVisualizations")}
                      </p>
                      <p className="text-sm text-gray-500">
                        {t("exportSettings.includeVisualizationsDescription")}
                      </p>
                    </div>
                    <Switch defaultSelected />
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">
                        {t("exportSettings.includeRawData")}
                      </p>
                      <p className="text-sm text-gray-500">
                        {t("exportSettings.includeRawDataDescription")}
                      </p>
                    </div>
                    <Switch defaultSelected />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-md font-medium mb-3">
                  {t("exportSettings.deliveryOptions")}
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">
                        {t("exportSettings.emailExports")}
                      </p>
                      <p className="text-sm text-gray-500">
                        {t("exportSettings.emailExportsDescription")}
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">
                        {t("exportSettings.defaultRecipients")}
                      </p>
                      <p className="text-sm text-gray-500">
                        {t("exportSettings.defaultRecipientsDescription")}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="flat"
                      color="primary"
                      startContent={<Edit size={14} />}
                    >
                      {t("exportSettings.edit")}
                    </Button>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">
                        {t("exportSettings.saveToCloud")}
                      </p>
                      <p className="text-sm text-gray-500">
                        {t("exportSettings.saveToCloudDescription")}
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </div>

            <Divider />
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">
              {t("exportSettings.exportQuotasLimits")}
            </h2>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium">
                    {t("exportSettings.monthlyExportQuota")}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">42</span> / 100 exports
                  </p>
                </div>
                {/* Replace Progress with a dummy element to avoid external dependencies */}
                <div style={{ height: "8px", backgroundColor: "#ddd" }}>
                  <div
                    style={{
                      height: "100%",
                      width: "42%",
                      backgroundColor: "var(--nextui-colors-primary)",
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium">
                    {t("exportSettings.storageUsage")}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">1.2 GB</span> / 5 GB
                  </p>
                </div>
                {/* Replace Progress with a dummy element to avoid external dependencies */}
                <div style={{ height: "8px", backgroundColor: "#ddd" }}>
                  <div
                    style={{
                      height: "100%",
                      width: "24%",
                      backgroundColor: "var(--nextui-colors-success)",
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium">
                    {t("exportSettings.scheduledExports")}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">4</span> / 10{" "}
                    {t("exportSettings.activeSchedules")}
                  </p>
                </div>
                {/* Replace Progress with a dummy element to avoid external dependencies */}
                <div style={{ height: "8px", backgroundColor: "#ddd" }}>
                  <div
                    style={{
                      height: "100%",
                      width: "40%",
                      backgroundColor: "var(--nextui-colors-warning)",
                    }}
                  />
                </div>
              </div>

              <Divider />

              <div className="flex justify-between">
                <div>
                  <p className="font-medium">
                    {t("exportSettings.currentPlan")}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t("exportSettings.businessPlan")}
                  </p>
                </div>
                <Button
                  color="primary"
                  variant="flat"
                  endContent={<ExternalLink size={14} />}
                >
                  {t("exportSettings.upgradePlan")}
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
};

export default ExportSettings;
