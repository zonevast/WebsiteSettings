// AbilitiesPanel.jsx
import React from "react";
import { Card, CardBody, useDisclosure } from "@nextui-org/react";
import { Table as TableIcon, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSettings } from "@/hooks/settings/useSettings";
import TableBuilderModal from "./TableBuilderModal";

export const AbilitiesPanel = ({ onAddTable }) => {
  const t = useTranslations("ReportBuilderPage.AbilitiesPanel"); // Changed translation key
  const {
    settings: { language },
  } = useSettings();
  const isArabic = language === "ar";

  const {
    isOpen: isTableBuilderOpen,
    onOpen: onTableBuilderOpen,
    onOpenChange: onTableBuilderOpenChange,
  } = useDisclosure();

  const handleAddTable = (tableConfig) => {
    onAddTable(tableConfig);
  };

  // Dummy data for recent templates
  const recentTemplates = [
    { id: 1, title: t("salesSummary"), columns: 4, rows: 5 },
    { id: 2, title: t("inventoryStatus"), columns: 5, rows: 6 },
  ];

  const handleAddTableTemplate = (template) => {
    // Convert template to tableConfig format expected by handleAddTable
    const tableConfig = {
      title: template.title,
      columns: template.columns,
      rows: template.rows,
      // Add other necessary properties
    };
    handleAddTable(tableConfig);
  };

  return (
    <>
      <Card>
        <CardBody className="p-4 space-y-6">
          {/* Report Elements Section */}
          <div>
            <h2
              className={`font-semibold text-lg mb-3 ${
                isArabic ? "text-right" : "text-left"
              }`}
            >
              {t("reportElements")}
            </h2>

            {/* Templates Section */}
            <div className="grid grid-cols-4 gap-3 mb-3">
              <Card
                isPressable
                className="hover:bg-default-100 transition-colors border-dashed border-2 border-default-200"
                onPress={onTableBuilderOpen}
              >
                <CardBody className="p-3">
                  <div className="flex flex-col items-center text-center gap-2">
                    <Plus className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-medium text-sm">{t("customTable")}</p>
                      <p className="text-xs text-default-500">
                        {t("createNew")}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {recentTemplates.map((template) => (
                <Card
                  key={template.id}
                  isPressable
                  className="hover:bg-default-100 transition-colors"
                  onPress={() => handleAddTableTemplate(template)}
                >
                  <CardBody className="p-3">
                    <div className="flex flex-col items-center text-center gap-2">
                      <TableIcon className="w-6 h-6 text-primary" />
                      <div>
                        <p className="font-medium text-sm">{template.title}</p>
                        <p className="text-xs text-default-500">
                          {template.columns} × {template.rows}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>

      <TableBuilderModal
        isOpen={isTableBuilderOpen}
        onOpenChange={onTableBuilderOpenChange}
        onAddTable={handleAddTable}
      />
    </>
  );
};
