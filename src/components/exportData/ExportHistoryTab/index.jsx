// components/exportData/ExportHistoryTab.jsx
import React, { useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Chip,
} from "@nextui-org/react";
import {
  Search,
  Calendar,
  FileText,
  CheckCircle,
  RefreshCw,
  AlertTriangle,
  MoreVertical,
  Download,
  Repeat,
  Share2,
  Mail,
  Trash,
  ChevronDown,
} from "lucide-react";
import { FormatIcon, StatusBadge } from "./ExportIcons";
import { exportHistoryData } from "@/app/(pages)/export-data/data";

export const ExportHistoryTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Paginate history
  const paginatedHistory = exportHistoryData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="space-y-4">
      {/* Filters */}

      {/* Export Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <Card>
          <CardBody className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Exports</p>
                <p className="text-2xl font-bold">{exportHistoryData.length}</p>
              </div>
              <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-800/50">
                <Download size={20} className="text-primary" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">This Month</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="p-3 rounded-full bg-success-100 dark:bg-success-800/50">
                <Calendar size={20} className="text-success" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Most Popular Format</p>
                <p className="text-2xl font-bold">XLSX</p>
              </div>
              <div className="p-3 rounded-full bg-warning-100 dark:bg-warning-800/50">
                <FileText size={20} className="text-warning" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Success Rate</p>
                <p className="text-2xl font-bold">98%</p>
              </div>
              <div className="p-3 rounded-full bg-secondary-100 dark:bg-secondary-800/50">
                <CheckCircle size={20} className="text-secondary" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search export history..."
          startContent={<Search size={16} />}
          className="w-full md:w-1/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex gap-2 flex-wrap">
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="flat"
                startContent={<Calendar size={16} />}
                endContent={<ChevronDown size={16} />}
              >
                Time Range
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Time range filter">
              <DropdownItem key="today">Today</DropdownItem>
              <DropdownItem key="yesterday">Yesterday</DropdownItem>
              <DropdownItem key="last_7_days">Last 7 days</DropdownItem>
              <DropdownItem key="last_30_days">Last 30 days</DropdownItem>
              <DropdownItem key="this_month">This month</DropdownItem>
              <DropdownItem key="last_month">Last month</DropdownItem>
              <DropdownItem key="custom">Custom range...</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="flat"
                startContent={<FileText size={16} />}
                endContent={<ChevronDown size={16} />}
              >
                Format
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Format filter">
              <DropdownItem key="all">All Formats</DropdownItem>
              <DropdownItem key="xlsx">Excel (XLSX)</DropdownItem>
              <DropdownItem key="pdf">PDF</DropdownItem>
              <DropdownItem key="csv">CSV</DropdownItem>
              <DropdownItem key="json">JSON</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="flat"
                startContent={<CheckCircle size={16} />}
                endContent={<ChevronDown size={16} />}
              >
                Status
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Status filter">
              <DropdownItem key="all">All Statuses</DropdownItem>
              <DropdownItem key="completed">Completed</DropdownItem>
              <DropdownItem key="in_progress">In Progress</DropdownItem>
              <DropdownItem key="failed">Failed</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      {/* History Table */}
      <Card>
        <CardBody className="p-0">
          <Table
            aria-label="Export History"
            bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="primary"
                  page={page}
                  total={Math.ceil(exportHistoryData.length / rowsPerPage)}
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
              <TableColumn>EXPORTED AT</TableColumn>
              <TableColumn>FORMAT</TableColumn>
              <TableColumn>SIZE</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>EXPORTED BY</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody
              emptyContent="No export history found"
              items={paginatedHistory}
            >
              {(history) => (
                <TableRow key={history.id}>
                  <TableCell>
                    <div className="font-medium">{history.reportName}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>
                        {new Date(history.exportedAt).toLocaleDateString()}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(history.exportedAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FormatIcon format={history.format} />
                      <span className="uppercase">{history.format}</span>
                    </div>
                  </TableCell>
                  <TableCell>{history.size}</TableCell>
                  <TableCell>
                    <StatusBadge status={history.status} />
                  </TableCell>
                  <TableCell>{history.exportedBy}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {history.status === "completed" && (
                        <Button
                          size="sm"
                          color="primary"
                          variant="flat"
                          startContent={<Download size={14} />}
                        >
                          Download
                        </Button>
                      )}
                      {history.status === "failed" && (
                        <Button
                          size="sm"
                          color="primary"
                          variant="flat"
                          startContent={<Repeat size={14} />}
                        >
                          Retry
                        </Button>
                      )}
                      <Dropdown>
                        <DropdownTrigger>
                          <Button isIconOnly size="sm" variant="light">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="History actions">
                          <DropdownItem startContent={<Share2 size={14} />}>
                            Share
                          </DropdownItem>
                          <DropdownItem startContent={<Mail size={14} />}>
                            Email
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
