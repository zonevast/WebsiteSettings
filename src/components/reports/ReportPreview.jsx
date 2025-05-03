import React from "react";
import { Card, CardBody } from "@nextui-org/react";

export function ReportPreview({ data }) {
  return (
    <Card>
      <CardBody className="p-8">
        {/* Header */}
        <div className="mb-8">
          {data.headerLogo && (
            <img
              src={data.headerLogo}
              alt="Report Header"
              className="h-20 object-contain mb-4"
            />
          )}
          <h1 className="text-2xl font-bold">{data.title}</h1>
          <h2 className="text-xl text-default-600">{data.subtitle}</h2>
          <div className="text-sm text-default-400 mt-2">
            {formatDate(new Date(), data.dateFormat)}
          </div>
        </div>

        {/* Content */}
        <div className="mb-8">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-left">Product</th>
                <th className="py-2 px-4 text-left">SKU</th>
                <th className="py-2 px-4 text-left">Price</th>
                <th className="py-2 px-4 text-left">Stock</th>
              </tr>
            </thead>
            <tbody>
              {data.selectedProducts.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="py-2 px-4">{product.title}</td>
                  <td className="py-2 px-4">
                    {product.specification?.[0]?.sku}
                  </td>
                  <td className="py-2 px-4">
                    ${product.specification?.[0]?.selling_price}
                  </td>
                  <td className="py-2 px-4">{product.in_stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t">
          <div className="text-sm text-default-600">{data.footerText}</div>
          {data.pageNumberPosition !== "none" && (
            <div
              className={`text-sm text-default-400 ${
                data.pageNumberPosition === "bottom" ? "mt-4" : "mb-4"
              }`}
            >
              Page 1
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}

export function formatDate(date, format) {
  const options = {
    year: "numeric",
    month: format === "long" ? "long" : "numeric",
    day: "numeric",
    ...(format === "long" && {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}
