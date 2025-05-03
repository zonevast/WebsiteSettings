// components/reports/UsedTemplatesTab.jsx
import React, { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Chip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {
  MoreVertical,
  Download,
  Eye,
  Share2,
  Calendar,
} from "lucide-react";
import { CategoryIcon, FormatIcon } from "@/components/exportData/ExportHistoryTab/ExportIcons";

export const UsedTemplatesTab = ({ 
  templates, 
  favoriteReports, 
  toggleFavorite, 
  handleReportSelect,
  onScheduleModalOpen 
}) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Paginate templates
  const paginatedTemplates = templates.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Card>
      <CardBody className="p-0">
        <Table
          aria-label="Used Templates"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={Math.ceil(templates.length / rowsPerPage)}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
          classNames={{
            wrapper: "min-h-[222px]",
          }}
        >
          <TableHeader>
            <TableColumn>TEMPLATE NAME</TableColumn>
            <TableColumn>CATEGORY</TableColumn>
            <TableColumn>AVAILABLE FORMATS</TableColumn>
            <TableColumn>LAST EXPORTED</TableColumn>
            <TableColumn>SIZE</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody
            emptyContent="No used templates found"
            items={paginatedTemplates}
          >
            {(template) => (
              <TableRow key={template.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onClick={() => toggleFavorite(template.id)}
                    >
                      {favoriteReports.includes(template.id) ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 text-warning"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                          />
                        </svg>
                      )}
                    </Button>
                    <div>
                      <p className="font-medium">{template.name}</p>
                      {template.scheduleEnabled && (
                        <div className="flex items-center mt-1">
                          <Chip size="sm" variant="flat" color="primary">
                            <Calendar size={12} className="mr-1" />
                            {template.frequency}
                          </Chip>
                        </div>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Chip
                    variant="flat"
                    color={
                      template.category === "product"
                        ? "primary"
                        : template.category === "inventory"
                        ? "success"
                        : template.category === "customers"
                        ? "secondary"
                        : "warning"
                    }
                  >
                    <CategoryIcon category={template.category} className="mr-1" />
                    {template.category.charAt(0).toUpperCase() +
                      template.category.slice(1)}
                  </Chip>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {template.formats.map((format) => (
                      <Chip key={format} size="sm" variant="flat">
                        <FormatIcon format={format} className="mr-1" />
                        {format.toUpperCase()}
                      </Chip>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1 text-gray-500" />
                    {new Date(template.lastExported).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell>{template.size}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      color="primary"
                      variant="flat"
                      startContent={<Download size={14} />}
                      onClick={() => handleReportSelect(template)}
                    >
                      Export
                    </Button>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button isIconOnly size="sm" variant="light">
                          <MoreVertical size={14} />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Template actions">
                        <DropdownItem
                          startContent={<Calendar size={14} />}
                          onClick={onScheduleModalOpen}
                        >
                          Schedule Export
                        </DropdownItem>
                        <DropdownItem startContent={<Eye size={14} />}>
                          Preview Template
                        </DropdownItem>
                        <DropdownItem startContent={<Share2 size={14} />}>
                          Share Template
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
  );
};