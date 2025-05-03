// TableBuilderModal.jsx
"use client";
import React from "react";
import {
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Modal,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useTableBuilderModal } from "./useTableBuilderModal";
import DataSourceStep from "./DataSourceStep";
import FiltersStep from "./FiltersStep";

const TableBuilderModal = ({ isOpen, onOpenChange, onAddTable }) => {
  const t = useTranslations("ReportBuilderPage.TableBuilderModal");

  const {
    currentStep,
    handleNext,
    handleBack,
    selectedSource,
    setSelectedSource,
    filters,
    setFilters,
    handleCreateTable,
    steps,
    dataSources,
  } = useTableBuilderModal();

  return (
    <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <div className="flex flex-col w-full">
                <span className="text-xl">{t("createTableHeader")}</span>
                <span className="text-sm text-gray-500">
                  {t("createTableDescription")}
                </span>
                <div className="w-full mt-4">
                  <div className="flex items-center justify-center">
                    {steps.map((step, index) => (
                      <React.Fragment key={index}>
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              index <= currentStep
                                ? "bg-primary text-white"
                                : "bg-gray-200 text-gray-600"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <div className="text-xs mt-2 text-center">
                            <div className="font-semibold">{step.title}</div>
                            <div className="text-gray-500 text-center max-w-[120px]">
                              {step.description}
                            </div>
                          </div>
                        </div>
                        {index < steps.length - 1 && (
                          <div
                            className={`h-1 w-24 mx-4 ${
                              index < currentStep ? "bg-primary" : "bg-gray-200"
                            }`}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="min-h-[400px]">
                {currentStep === 0 && (
                  <DataSourceStep
                    dataSources={dataSources}
                    selectedSource={selectedSource}
                    onSelectSource={setSelectedSource}
                  />
                )}
                {currentStep === 1 && (
                  <FiltersStep
                    dataSources={dataSources}
                    selectedSource={selectedSource}
                    filters={filters}
                    onUpdateFilters={setFilters}
                  />
                )}
                {/* Add other steps here as you create them */}
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="flex w-full justify-between">
                <Button
                  color="danger"
                  variant="light"
                  onPress={currentStep === 0 ? onClose : handleBack}
                >
                  {currentStep === 0 ? t("cancel") : t("back")}
                </Button>
                <div className="flex gap-2">
                  {currentStep < steps.length - 1 ? (
                    <Button
                      color="primary"
                      onPress={handleNext}
                      isDisabled={!selectedSource}
                    >
                      {t("next")}
                    </Button>
                  ) : (
                    <Button
                      color="primary"
                      onPress={() => {
                        const tableConfig = handleCreateTable();
                        onAddTable(tableConfig);
                        onClose();
                      }}
                    >
                      {t("createTable")}
                    </Button>
                  )}
                </div>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default TableBuilderModal;
