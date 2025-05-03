import React from "react";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils/formatPrice";

export const ProductItem = ({ product, onResultClick }) => {
  const mainSpecification = product?.specification[0]?.main_attachment;

  return (
    <Link href={`/your-products/${product?.id || ""}`} onClick={onResultClick}>
      <div className="flex items-center gap-4 p-4 transition-all duration-100 cursor-pointer group hover:bg-primary-500/10 hover:scale-[1.02]">
        {/* Product Image */}
        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-default-100 transition-all duration-100 group-hover:shadow-md">
          <Image
            src={mainSpecification?.path || "https://placehold.co/200x100"}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-default-900 mb-1 truncate transition-colors duration-100 group-hover:text-primary-500">
            {product.title}
          </h3>
          <p
            className="text-sm text-default-500 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: product.content }}
          />
        </div>

        {/* Product Price */}
        <div className="text-right">
          <p className="text-lg font-semibold text-primary-600">
            {product.specification[0].selling_price
              ? `${formatPrice(product.specification[0].selling_price)}`
              : "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
};
