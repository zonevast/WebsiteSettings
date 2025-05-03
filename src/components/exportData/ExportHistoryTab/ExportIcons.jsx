// components/exportData/ExportIcons.jsx
import React from "react";
import {
  FileSpreadsheet,
  File,
  FileJson,
  FileText,
  Package,
  Layers,
  Users,
  ShoppingBag,
  CheckCircle,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import { Chip } from "@nextui-org/react";

// Format Icon Component
export const FormatIcon = ({ format, size = 16 }) => {
  switch (format.toLowerCase()) {
    case "xlsx":
      return <FileSpreadsheet size={size} className="text-emerald-600" />;
    case "pdf":
      return <File size={size} className="text-red-600" />;
    case "csv":
      return <File size={size} className="text-blue-600" />;
    case "json":
      return <FileJson size={size} className="text-amber-600" />;
    default:
      return <FileText size={size} className="text-gray-600" />;
  }
};

// Category Icon Component
export const CategoryIcon = ({ category, size = 16 }) => {
  switch (category.toLowerCase()) {
    case "product":
      return <Package size={size} className="text-primary" />;
    case "inventory":
      return <Layers size={size} className="text-success" />;
    case "customers":
      return <Users size={size} className="text-secondary" />;
    case "order":
      return <ShoppingBag size={size} className="text-warning" />;
    default:
      return <FileText size={size} className="text-gray-600" />;
  }
};

// Status Badge Component
export const StatusBadge = ({ status }) => {
  switch (status) {
    case "completed":
      return (
        <Chip
          color="success"
          variant="flat"
          size="sm"
          startContent={<CheckCircle size={12} />}
        >
          Completed
        </Chip>
      );
    case "in_progress":
      return (
        <Chip
          color="primary"
          variant="flat"
          size="sm"
          startContent={<RefreshCw size={12} className="animate-spin" />}
        >
          In Progress
        </Chip>
      );
    case "failed":
      return (
        <Chip
          color="danger"
          variant="flat"
          size="sm"
          startContent={<AlertTriangle size={12} />}
        >
          Failed
        </Chip>
      );
    case "active":
      return (
        <Chip color="success" variant="flat" size="sm">
          Active
        </Chip>
      );
    case "paused":
      return (
        <Chip color="warning" variant="flat" size="sm">
          Paused
        </Chip>
      );
    default:
      return (
        <Chip color="default" variant="flat" size="sm">
          {status}
        </Chip>
      );
  }
};