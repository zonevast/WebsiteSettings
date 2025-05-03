import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { EmptyState, LoadingState } from "../states";
import { ProductItem } from "./ProductItem";

const SearchResults = ({
  results = [],
  isSearching,
  searchQuery,
  translations,
  onResultClick,
  onEnterPress,
}) => {
  const variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  useEffect(() => {
    if (!isSearching && searchQuery) {
      const firstPage = results.pages?.[0];
      const firstProduct = results.products?.data?.[0];
      const firstResult = firstPage || firstProduct;
      onEnterPress?.(firstResult);
    }
  }, [results, isSearching, searchQuery]);

  if (!searchQuery) return null;

  const hasResults = results?.data?.length > 0;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full"
    >
      <div className="w-full">
        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
          {isSearching ? (
            <LoadingState message={translations.searching} />
          ) : !hasResults ? (
            <EmptyState message={translations.noItemsFound} />
          ) : (
            <div className="divide-y divide-default-200/50">
              <div className="p-2">
                <h3 className="text-sm font-medium text-default-600 px-2">
                  {translations.products}
                </h3>
                <div className="divide-y divide-default-200/50">
                  {results?.data?.map((product) => (
                    <ProductItem
                      key={product.id}
                      product={product}
                      onResultClick={onResultClick}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SearchResults;
