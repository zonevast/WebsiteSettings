// components/exportData/ScheduledExportsTab.jsx
import React, { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {
  Calendar,
  Edit,
  MoreVertical,
  Pause,
  Download,
  Trash,
  Plus,
} from "lucide-react";
import { FormatIcon, StatusBadge } from "../ExportHistoryTab/ExportIcons";
import { scheduledExportsData } from "@/app/(pages)/export-data/data";

export const ScheduledExportsTab = ({ onScheduleClick }) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Paginate scheduled exports
  const paginatedSchedules = scheduledExportsData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Scheduled Exports</h2>
        <Button
          color="primary"
          startContent={<Plus size={16} />}
          onClick={onScheduleClick}
        >
          New Schedule
        </Button>
      </div>

      {/* Scheduled Exports Table */}
      <Card>
        <CardBody className="p-0">
          <Table
            aria-label="Scheduled Exports"
            bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="primary"
                  page={page}
                  total={Math.ceil(scheduledExportsData.length / rowsPerPage)}
                  onChange={(page) => setPage(page)}
                />
              </div>
            }
            classNames={{
              wrapper: "min-h-[222px]",
            }}
          >
            <TableHeader>
              <TableColumn>REPORT NAME</TableColumn>
              <TableColumn>FREQUENCY</TableColumn>
              <TableColumn>NEXT EXPORT</TableColumn>
              <TableColumn>FORMAT</TableColumn>
              <TableColumn>RECIPIENTS</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody
              emptyContent="No scheduled exports found"
              items={paginatedSchedules}
            >
              {(schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell>
                    <div className="font-medium">{schedule.reportName}</div>
                  </TableCell>
                  <TableCell>
                    <Chip variant="flat" color="primary" size="sm">
                      <Calendar size={14} className="mr-1" />
                      {schedule.frequency}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>
                        {new Date(schedule.nextExport).toLocaleDateString()}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(schedule.nextExport).toLocaleTimeString()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FormatIcon format={schedule.format} />
                      <span className="uppercase">{schedule.format}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {schedule.recipients.map((recipient, index) => (
                        <Chip key={index} size="sm" variant="flat">
                          {recipient}
                        </Chip>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={schedule.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        color="primary"
                        variant="flat"
                        startContent={<Edit size={14} />}
                      >
                        Edit
                      </Button>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button isIconOnly size="sm" variant="light">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Schedule actions">
                          <DropdownItem startContent={<Pause size={14} />}>
                            Pause
                          </DropdownItem>
                          <DropdownItem startContent={<Download size={14} />}>
                            Run Now
                          </DropdownItem>
                          <DropdownItem
                            startContent={<Trash size={14} />}
                            className="text-danger"
                          >
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};