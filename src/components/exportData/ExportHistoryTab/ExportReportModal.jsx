// components/exportData/ExportReportModal.jsx
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
  RadioGroup,
  Radio,
  Input,
  Switch,
  Select,
  SelectItem,
  Textarea,
  Progress,
} from "@nextui-org/react";
import { FormatIcon } from "./ExportIcons";
import { frequencyOptions } from "@/app/(pages)/export-data/data";

export const ExportReportModal = ({ isOpen, onClose, report }) => {
  const [exportInProgress, setExportInProgress] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [selectedExportFormat, setSelectedExportFormat] = useState(
    report?.formats[0] || "xlsx"
  );
  const [selectedDateRange, setSelectedDateRange] = useState("all_time");
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeRawData, setIncludeRawData] = useState(true);
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [scheduleFrequency, setScheduleFrequency] = useState("monthly");
  const [scheduleRecipients, setScheduleRecipients] = useState("");
  const [exportNote, setExportNote] = useState("");

  // Handle export action
  const handleExport = () => {
    setExportInProgress(true);
    setExportProgress(0);

    // Simulate export progress
    const interval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setExportInProgress(false);
          onClose();
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  if (!report) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Export {report.name}
            </ModalHeader>
            <ModalBody>
              {exportInProgress ? (
                <div className="py-8 flex flex-col items-center justify-center">
                  <Progress
                    size="lg"
                    value={exportProgress}
                    color="primary"
                    showValueLabel={true}
                    className="max-w-md"
                  />
                  <p className="mt-4 text-center">
                    Preparing your export. This may take a moment...
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-medium mb-2">Export Format</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {report.formats.map((format) => (
                        <Button
                          key={format}
                          variant={
                            selectedExportFormat === format ? "solid" : "flat"
                          }
                          color={
                            selectedExportFormat === format
                              ? "primary"
                              : "default"
                          }
                          className="flex-col h-auto py-3"
                          onClick={() => setSelectedExportFormat(format)}
                        >
                          <FormatIcon format={format} size={24} />
                          <span className="mt-2 uppercase">{format}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Divider />

                  <div>
                    <p className="text-sm font-medium mb-2">Date Range</p>
                    <RadioGroup
                      value={selectedDateRange}
                      onValueChange={setSelectedDateRange}
                    >
                      <Radio value="last_30_days">Last 30 days</Radio>
                      <Radio value="last_90_days">Last 90 days</Radio>
                      <Radio value="year_to_date">Year to date</Radio>
                      <Radio value="all_time">All time</Radio>
                      <Radio value="custom">Custom range</Radio>
                    </RadioGroup>

                    {selectedDateRange === "custom" && (
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <Input
                          type="date"
                          label="Start Date"
                          placeholder="Start date"
                        />
                        <Input
                          type="date"
                          label="End Date"
                          placeholder="End date"
                        />
                      </div>
                    )}
                  </div>

                  <Divider />

                  <div>
                    <p className="text-sm font-medium mb-2">Export Options</p>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">
                            Include Charts & Visualizations
                          </p>
                          <p className="text-sm text-gray-500">
                            Export will include all charts and graphs
                          </p>
                        </div>
                        <Switch
                          isSelected={includeCharts}
                          onValueChange={setIncludeCharts}
                        />
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Include Raw Data</p>
                          <p className="text-sm text-gray-500">
                            Export will include raw data tables
                          </p>
                        </div>
                        <Switch
                          isSelected={includeRawData}
                          onValueChange={setIncludeRawData}
                        />
                      </div>
                    </div>
                  </div>

                  <Divider />

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <p className="font-medium">Schedule this Export</p>
                        <p className="text-sm text-gray-500">
                          Set up recurring exports
                        </p>
                      </div>
                      <Switch
                        isSelected={scheduleEnabled}
                        onValueChange={setScheduleEnabled}
                      />
                    </div>

                    {scheduleEnabled && (
                      <div className="space-y-3 pl-2">
                        <Select
                          label="Frequency"
                          placeholder="Select frequency"
                          selectedKeys={[scheduleFrequency]}
                          onChange={(e) => setScheduleFrequency(e.target.value)}
                        >
                          {frequencyOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </Select>

                        <Input
                          label="Recipients"
                          placeholder="Email addresses (comma separated)"
                          value={scheduleRecipients}
                          onChange={(e) => setScheduleRecipients(e.target.value)}
                          description="Leave empty to only save to your account"
                        />
                      </div>
                    )}
                  </div>

                  <Divider />

                  <div>
                    <p className="text-sm font-medium mb-2">
                      Export Note (Optional)
                    </p>
                    <Textarea
                      placeholder="Add a note to this export..."
                      value={exportNote}
                      onChange={(e) => setExportNote(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onClose}>
                Cancel
              </Button>
              {!exportInProgress && (
                <Button color="primary" onPress={handleExport}>
                  Export Now
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};