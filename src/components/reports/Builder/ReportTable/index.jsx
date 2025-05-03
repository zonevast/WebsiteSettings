// ReportTable.jsx
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardHeader,
  CardBody,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import { MoreVertical, Edit, Trash, Filter, Download, FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  getColumnsForSource,
  useDataSource,
  mapFilterToApiParam,
} from "./useDataSource";
import { renderCellContent } from "./renderCellContent";
import useSettings from "@/hooks/settings/useSettings";

const ReportTable = ({ tableConfig, onEdit, onDelete }) => {
  const t = useTranslations("ReportBuilderPage.ReportTable");
  const [page, setPage] = useState(1);

  const {
    settings: { language },
  } = useSettings();
  const isArabic = language === "ar";

  // Convert table filters to the format expected by data hooks
  const apiFilters = React.useMemo(() => {
    if (!tableConfig.filters || tableConfig.filters.length === 0) {
      return {};
    }

    // Create a filter object from the array of filters
    return tableConfig.filters.reduce((acc, filter) => {
      const apiParam = mapFilterToApiParam(
        filter.field,
        filter.operator,
        tableConfig.dataSource
      );
      if (apiParam) {
        acc[apiParam] = filter.value;
      }
      return acc;
    }, {});
  }, [tableConfig.dataSource, tableConfig.filters]);

  // Use the appropriate data hook based on the data source
  const {
    data: tableData,
    loading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
  } = useDataSource(tableConfig.dataSource, apiFilters);

  // Update the current page when pagination changes
  useEffect(() => {
    if (currentPage !== page) {
      setCurrentPage(page);
    }
  }, [page, currentPage, setCurrentPage]);

  // Get columns based on the data source and selected columns
  const columns = React.useMemo(() => {
    const allColumns = getColumnsForSource(tableConfig.dataSource);

    // If specific columns are selected, filter the columns
    if (tableConfig.columns && tableConfig.columns.length > 0) {
      return allColumns.filter((col) => tableConfig.columns.includes(col.id));
    }

    return allColumns;
  }, [tableConfig.dataSource, tableConfig.columns]);

  // Function to export table data as CSV
  const exportToCSV = () => {
    if (!tableData || tableData.length === 0) {
      return;
    }

    // Create CSV header row
    const header = columns.map(col => `"${col.name}"`).join(',');
    
    // Create CSV data rows
    const rows = tableData.map(row => {
      return columns.map(column => {
        // Get cell value and handle special cases
        let cellValue = '';
        
        if (column.id.includes('.')) {
          // Handle nested properties
          const parts = column.id.split('.');
          let value = row;
          for (const part of parts) {
            value = value?.[part];
            if (value === undefined) {
              cellValue = '';
              break;
            }
            cellValue = value;
          }
        } else {
          cellValue = row[column.id] || '';
        }
        
        // Format the cell value for CSV
        if (typeof cellValue === 'object') {
          cellValue = JSON.stringify(cellValue);
        }
        
        // Escape quotes and wrap in quotes
        return `"${String(cellValue).replace(/"/g, '""')}"`;
      }).join(',');
    }).join('\n');
    
    // Combine header and rows
    const csv = `${header}\n${rows}`;
    
    // Create a blob and download link
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${tableConfig.name || tableConfig.dataSource}_export.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="w-full mb-6">
      <CardHeader className="flex justify-between items-center px-4 py-3">
        <div>
          <h3 className={`text-md font-medium ${isArabic ? "text-right" : ""}`}>
            {tableConfig.name || `${tableConfig.dataSource} Table`}
          </h3>
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
            <span>
              {t("dataSource")}: {tableConfig.dataSource}
            </span>
            {tableConfig.filters && tableConfig.filters.length > 0 && (
              <Chip
                size="sm"
                variant="flat"
                color="primary"
                startContent={<Filter size={12} />}
              >
                {tableConfig.filters.length} {t("filtersApplied")}
              </Chip>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Tooltip content={t("exportCSV")}>
            <Button 
              isIconOnly 
              size="sm" 
              variant="flat" 
              onPress={exportToCSV}
              isDisabled={loading || !tableData || tableData.length === 0}
            >
              <FileText size={16} />
            </Button>
          </Tooltip>
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <MoreVertical size={16} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem
                key="edit"
                startContent={<Edit size={16} />}
                onPress={() => onEdit(tableConfig.id)}
              >
                {t("edit")}
              </DropdownItem>
              <DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                startContent={<Trash size={16} />}
                onPress={() => onDelete(tableConfig.id)}
              >
                {t("delete")}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="loading-spinner" />
          </div>
        ) : error ? (
          <div className="text-center text-danger py-10">
            {error.message || t("errorLoadingData")}
          </div>
        ) : (
          <>
            <Table
              aria-label={tableConfig.name || `${tableConfig.dataSource} Table`}
              removeWrapper
            >
              <TableHeader>
                {columns.map((column) => (
                  <TableColumn key={column.id}>{column.name}</TableColumn>
                ))}
              </TableHeader>
              <TableBody emptyContent={t("noDataAvailable")}>
                {tableData && tableData.length > 0 ? (
                  tableData.map((row, index) => (
                    <TableRow key={row.id || index}>
                      {columns.map((column) => (
                        <TableCell key={column.id}>
                          {renderCellContent(
                            row,
                            column.id,
                            tableConfig.dataSource
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length}>
                      <div className="text-center py-4 text-gray-500">
                        {t("noDataAvailable")}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {totalPages > 1 && (
              <div className="flex justify-center my-4">
                <Pagination
                  total={totalPages}
                  page={currentPage}
                  onChange={setPage}
                  size="sm"
                />
              </div>
            )}
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default ReportTable;