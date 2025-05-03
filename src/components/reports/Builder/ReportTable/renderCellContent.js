import React from "react";
import { Chip, Image } from "@nextui-org/react";
import { formatCurrency, formatDate, getStatusColor } from "./useDataSource"; // Import helper functions

export function renderCellContent(row, columnId, dataSource) {
  if (!row) return <span>-</span>;

  // Data source specific formatting
  switch (dataSource) {
    case "products":
      if (columnId === "in_stock") {
        // Determine stock status based on in_stock boolean or total_quantity
        const isAvailable = row.in_stock === true || (row.total_quantity && row.total_quantity > 0);
        return (
          <Chip size="sm" variant="flat" color={isAvailable ? "success" : "danger"}>
            {isAvailable ? "In Stock" : "Out of Stock"}
          </Chip>
        );
      }

      if (columnId === "specification.0.selling_price") {
        return <span>{formatCurrency(row.specification?.[0]?.selling_price || 0)}</span>;
      }

      if (columnId === "specification.0.main_attachment.path") {
        return row.specification?.[0]?.main_attachment?.path ? (
          <Image
            src={row.specification[0].main_attachment.path}
            alt="Product Image"
            width={50}
            height={50}
          />
        ) : (
          <span>-</span>
        );
      }

      if (columnId === "specification.0.profit_percent") {
        const profit = row.specification?.[0]?.profit_percent;
        return <span>{profit ? `${profit}%` : "-"}</span>;
      }

      if (columnId === "created_at") {
        return <span>{row.created_at ? formatDate(row.created_at) : "-"}</span>;
      }

      if (columnId === "tags") {
        const tags = Array.isArray(row.tags) ? row.tags.join(", ") : (row.tags || "-");
        return <span>{tags}</span>;
      }

      // For other product fields (id, title, content, category, brand, schema, visibility_status, total_quantity, reorder)
      return <span>{row[columnId] || "-"}</span>;

    case "orders":
      if (columnId === "total_amount") {
        return <span>{formatCurrency(row[columnId])}</span>;
      }

      if (columnId === "products" && Array.isArray(row.order_products)) {
        return (
          <div className="flex flex-col gap-1">
            {row.order_products.map((item, index) => (
              <div key={index} className="text-xs">
                {item.product?.title || "Unknown Product"} ({item.quantity}x)
              </div>
            ))}
          </div>
        );
      }

      if (columnId === "status") {
        return (
          <Chip size="sm" variant="flat" color={getStatusColor(row[columnId])}>
            {row[columnId]}
          </Chip>
        );
      }

      if (columnId === "customer_name") {
        if (row.customer) {
          return <span>{row.customer.name || row.customer.email || "-"}</span>;
        }
        return <span>{row.customer_name || "-"}</span>;
      }
      break;
  }

  // Handle nested properties for any data source
  if (columnId.includes(".")) {
    const parts = columnId.split(".");
    let value = row;
    for (const part of parts) {
      value = value?.[part];
      if (value === undefined) return <span>-</span>;
    }

    // Format currency values if needed
    if (parts.includes("selling_price") || parts.includes("price")) {
      return <span>{formatCurrency(value)}</span>;
    }
    return <span>{value}</span>;
  }

  // Handle dates for all data sources
  if ((columnId === "created_at" || columnId === "updated_at") && row[columnId]) {
    return <span>{formatDate(row[columnId])}</span>;
  }

  return <span>{row[columnId] || "-"}</span>;
}