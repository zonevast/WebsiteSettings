// DataSourceStep.jsx
import React from "react";
import { Select, SelectItem, Chip, Card, CardBody } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import useSettings from "@/hooks/settings/useSettings";

const DataSourceStep = ({ dataSources, selectedSource, onSelectSource }) => {
  const t = useTranslations(
    "ReportBuilderPage.TableBuilderModal.DataSourceStep"
  );
  const {
    settings: { language },
  } = useSettings();
  const isArabic = language === "ar";

  const selectedDataSource = dataSources.find(
    (source) => source.id === selectedSource
  );

  return (
    <div className="space-y-6">
      <div>
        <h3
          className={`text-lg font-medium mb-2 ${isArabic ? "text-right" : ""}`}
        >
          {t("selectDataSource")}
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          {t("dataSourceDescription")}
        </p>
      </div>

      <Select
        label={t("dataSource")}
        placeholder={t("selectDataSourcePlaceholder")}
        selectedKeys={selectedSource ? [selectedSource] : []}
        onChange={(e) => onSelectSource(e.target.value)}
        className="w-full"
      >
        {dataSources.map((source) => (
          <SelectItem key={source.id} value={source.id}>
            {source.name}
          </SelectItem>
        ))}
      </Select>

      {selectedDataSource && (
        <Card className="mt-4">
          <CardBody className="p-4">
            <h4 className={`font-medium mb-3 ${isArabic ? "text-right" : ""}`}>
              {t("availableFields")}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {selectedDataSource.fields.map((field) => (
                <Chip key={field.id} variant="flat" className="text-sm">
                  {field.name}
                </Chip>
              ))}
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default DataSourceStep;
