import React from "react";
import {
  Select,
  SelectItem,
  Input,
  Card,
  CardBody,
  Button,
  Divider,
} from "@nextui-org/react";
import { Plus, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { mapFilterToApiParam } from "../ReportTable/useDataSource";
import useSettings from "@/hooks/settings/useSettings";

const FiltersStep = ({
  dataSources,
  selectedSource,
  filters,
  onUpdateFilters,
}) => {
  const t = useTranslations("ReportBuilderPage.TableBuilderModal.FiltersStep");

  const {
    settings: { language },
  } = useSettings();
  const isArabic = language === "ar";

  const dataSource = selectedSource
    ? dataSources.find((s) => s.id === selectedSource)
    : null;

  if (!dataSource) return <div>{t("noDataSourceSelected")}</div>;

  const addNewFilter = () => {
    onUpdateFilters([
      ...filters,
      { field: dataSource.fields[0].id, operator: "equals", value: "" },
    ]);
  };

  const removeFilter = (index) => {
    const newFilters = [...filters];
    newFilters.splice(index, 1);
    onUpdateFilters(newFilters);
  };

  const updateFilter = (index, key, value) => {
    const newFilters = [...filters];
    newFilters[index][key] = value;
    onUpdateFilters(newFilters);
  };

  // Generate API endpoint preview based on selected data source
  const endpointPrefix =
    selectedSource === "orders"
      ? "orders/?"
      : selectedSource === "products"
      ? "products/?"
      : "";

  const apiQuery = filters
    .map((filter) => {
      const field = dataSource.fields.find((f) => f.id === filter.field);
      if (!field) return null;

      // Map the filter to the actual API parameter
      const apiParam = mapFilterToApiParam(
        field.id,
        filter.operator,
        selectedSource
      );
      if (!apiParam) return null;

      return `${apiParam}=${encodeURIComponent(filter.value)}&`;
    })
    .filter(Boolean)
    .join("");

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">{t("configureFilters")}</h3>
        <p className="text-sm text-gray-500 mb-4">{t("filtersDescription")}</p>
      </div>

      <Card>
        <CardBody className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">{t("activeFilters")}</h4>
            <Button
              size="sm"
              color="primary"
              variant="flat"
              startContent={<Plus size={16} />}
              onPress={addNewFilter}
            >
              {t("addFilter")}
            </Button>
          </div>

          {filters.length === 0 && (
            <div className="text-center py-6 text-gray-500">
              {t("noFiltersAdded")}
            </div>
          )}

          {filters.map((filter, index) => {
            const field = dataSource.fields.find((f) => f.id === filter.field);
            return (
              <div key={index} className="mb-4">
                {index > 0 && <Divider className="my-3" />}
                <div className="flex gap-2 items-center">
                  <div className="flex-1">
                    <Select
                      size="sm"
                      label={t("field")}
                      selectedKeys={[filter.field]}
                      onChange={(e) =>
                        updateFilter(index, "field", e.target.value)
                      }
                    >
                      {dataSource.fields.map((field) => (
                        <SelectItem key={field.id} value={field.id}>
                          {field.name}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className="flex-1">
                    <Select
                      size="sm"
                      label={t("operator")}
                      selectedKeys={[filter.operator]}
                      onChange={(e) =>
                        updateFilter(index, "operator", e.target.value)
                      }
                    >
                      <SelectItem key="equals" value="equals">
                        {t("equals")}
                      </SelectItem>
                      <SelectItem key="contains" value="contains">
                        {t("contains")}
                      </SelectItem>
                      <SelectItem key="greaterThan" value="greaterThan">
                        {t("greaterThan")}
                      </SelectItem>
                      <SelectItem key="lessThan" value="lessThan">
                        {t("lessThan")}
                      </SelectItem>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <Input
                      size="sm"
                      label={t("value")}
                      placeholder={t("enterValue")}
                      value={filter.value}
                      onChange={(e) =>
                        updateFilter(index, "value", e.target.value)
                      }
                    />
                  </div>
                  <Button
                    isIconOnly
                    size="sm"
                    color="danger"
                    variant="light"
                    onPress={() => removeFilter(index)}
                    className="mt-5"
                  >
                    <X size={16} />
                  </Button>
                </div>
              </div>
            );
          })}
        </CardBody>
      </Card>

      {(selectedSource === "orders" || selectedSource === "products") && (
        <Card className="mt-4">
          <CardBody className="p-4">
            <h4 className={`font-medium mb-3 ${isArabic ? "text-right" : ""}`}>
              {t("apiEndpointPreview")}
            </h4>
            <div className="bg-gray-100 p-3 rounded-md font-mono text-sm overflow-x-auto">
              <code>{endpointPrefix + apiQuery}</code>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default FiltersStep;
