import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import ReportTable from "@/components/reports/Builder/ReportTable";

import { useTranslations } from "next-intl"; // Import useTranslations

export const ReportContent = ({
  reportData,
  onEditTable,
  onDeleteTable
}) => {
  const t = useTranslations("ReportBuilderPage.ReportContent"); // Use translation hook

  // Sort report elements by type to ensure header is first and footer is last
  const sortedElements = React.useMemo(() => {
    const elements = [];

    // Add header if exists
    const header = reportData.textBlocks?.find(
      (block) => block.type === "header"
    );
    if (header) elements.push(header);

    // Add content blocks
    const contentBlocks =
      reportData.textBlocks?.filter((block) => block.type === "content") || [];
    elements.push(...contentBlocks);

    // Add tables
    if (reportData.tables) {
      elements.push(...reportData.tables);
    }

    // Add footer if exists
    const footer = reportData.textBlocks?.find(
      (block) => block.type === "footer"
    );
    if (footer) elements.push(footer);

    return elements;
  }, [reportData.textBlocks, reportData.tables]);

  return (
    <Card>
      <CardBody className="p-6">
        <div className="space-y-4">
          {/* Render all report elements in order */}
          {sortedElements.length > 0 ? (
            sortedElements.map((element) => {
              if (element.dataSource) {
                // It's a table
                return (
                  <ReportTable
                    key={element.id}
                    tableConfig={element}
                    onEdit={onEditTable}
                    onDelete={onDeleteTable}
                  />
                );
              }
            })
          ) : (
            <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500 text-center">
                {t("noElementsMessage")}
              </p>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
