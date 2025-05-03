// components/exportData/ScheduleExportModal.jsx
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
  Input,
  Switch,
  Select,
  SelectItem,
  Checkbox,
} from "@nextui-org/react";
import {
  formatOptions,
  frequencyOptions,
  reportData,
} from "@/app/(pages)/export-data/data";

export const ScheduleExportModal = ({ isOpen, onClose }) => {
  const handleScheduleSave = () => {
    // Simulate saving schedule
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Schedule Export
            </ModalHeader>
            <ModalBody>
              <div className="space-y-6">
                <Select label="Report" placeholder="Select a report">
                  {reportData.map((report) => (
                    <SelectItem key={report.id} value={report.id}>
                      {report.name}
                    </SelectItem>
                  ))}
                </Select>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Frequency"
                    placeholder="Select frequency"
                    defaultSelectedKeys={["monthly"]}
                  >
                    {frequencyOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </Select>

                  <Select
                    label="Format"
                    placeholder="Select format"
                    defaultSelectedKeys={["xlsx"]}
                  >
                    {formatOptions.map((format) => (
                      <SelectItem key={format.value} value={format.value}>
                        {format.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Schedule Details</p>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Select
                        label="Day of Week"
                        placeholder="Select day"
                        defaultSelectedKeys={["monday"]}
                      >
                        <SelectItem key="monday" value="monday">
                          Monday
                        </SelectItem>
                        <SelectItem key="tuesday" value="tuesday">
                          Tuesday
                        </SelectItem>
                        <SelectItem key="wednesday" value="wednesday">
                          Wednesday
                        </SelectItem>
                        <SelectItem key="thursday" value="thursday">
                          Thursday
                        </SelectItem>
                        <SelectItem key="friday" value="friday">
                          Friday
                        </SelectItem>
                        <SelectItem key="saturday" value="saturday">
                          Saturday
                        </SelectItem>
                        <SelectItem key="sunday" value="sunday">
                          Sunday
                        </SelectItem>
                      </Select>

                      <Select
                        label="Day of Month"
                        placeholder="Select day"
                        defaultSelectedKeys={["1"]}
                      >
                        {Array.from({ length: 31 }, (_, i) => (
                          <SelectItem key={String(i + 1)} value={String(i + 1)}>
                            {i + 1}
                          </SelectItem>
                        ))}
                      </Select>

                      <Input
                        type="time"
                        label="Time"
                        placeholder="Select time"
                        defaultValue="09:00"
                      />
                    </div>

                    <Input
                      label="Start Date"
                      type="date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                    />

                    <div className="flex items-center gap-2">
                      <Checkbox defaultSelected>Set end date</Checkbox>
                      <Input
                        type="date"
                        className="max-w-xs"
                        defaultValue={
                          new Date(
                            new Date().setMonth(new Date().getMonth() + 3)
                          )
                            .toISOString()
                            .split("T")[0]
                        }
                      />
                    </div>
                  </div>
                </div>

                <Divider />

                <div>
                  <p className="text-sm font-medium mb-2">Delivery Options</p>
                  <div className="space-y-4">
                    <Input
                      label="Recipients"
                      placeholder="Email addresses (comma separated)"
                    />

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Save to Account</p>
                        <p className="text-sm text-gray-500">
                          Save exports to your account storage
                        </p>
                      </div>
                      <Switch defaultSelected />
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Attach to Email</p>
                        <p className="text-sm text-gray-500">
                          Attach export file to notification emails
                        </p>
                      </div>
                      <Switch defaultSelected />
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleScheduleSave}>
                Save Schedule
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
