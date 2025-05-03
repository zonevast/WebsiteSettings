// components/templatesMarketplace/CollectionsTab.jsx
"use client";
import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Package, Layers, Users, ShoppingBag } from "lucide-react";
import { CollectionCard } from "@/components/templatesMarketplace/CollectionsTab/CollectionCard";
import {
  templateData,
  featuredCollections,
} from "@/app/(pages)/templates-marketplace/data";

export const CollectionsTab = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredCollections.map((collection) => (
          <CollectionCard
            key={collection.id}
            collection={collection}
            templates={templateData}
          />
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Popular Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-primary-100 dark:bg-primary-900/20 hover:bg-primary-200 dark:hover:bg-primary-800/30 transition-colors cursor-pointer">
            <CardBody className="flex flex-col items-center justify-center py-8">
              <Package size={48} className="text-primary mb-4" />
              <h3 className="text-xl font-bold">Product Analytics</h3>
              <p className="text-sm text-center mt-2">
                {templateData.filter((t) => t.category === "product").length}{" "}
                templates
              </p>
            </CardBody>
          </Card>

          <Card className="bg-success-100 dark:bg-success-900/20 hover:bg-success-200 dark:hover:bg-success-800/30 transition-colors cursor-pointer">
            <CardBody className="flex flex-col items-center justify-center py-8">
              <Layers size={48} className="text-success mb-4" />
              <h3 className="text-xl font-bold">Inventory Management</h3>
              <p className="text-sm text-center mt-2">
                {templateData.filter((t) => t.category === "inventory").length}{" "}
                templates
              </p>
            </CardBody>
          </Card>

          <Card className="bg-secondary-100 dark:bg-secondary-900/20 hover:bg-secondary-200 dark:hover:bg-secondary-800/30 transition-colors cursor-pointer">
            <CardBody className="flex flex-col items-center justify-center py-8">
              <Users size={48} className="text-secondary mb-4" />
              <h3 className="text-xl font-bold">Customer Insights</h3>
              <p className="text-sm text-center mt-2">
                {templateData.filter((t) => t.category === "customers").length}{" "}
                templates
              </p>
            </CardBody>
          </Card>

          <Card className="bg-warning-100 dark:bg-warning-900/20 hover:bg-warning-200 dark:hover:bg-warning-800/30 transition-colors cursor-pointer">
            <CardBody className="flex flex-col items-center justify-center py-8">
              <ShoppingBag size={48} className="text-warning mb-4" />
              <h3 className="text-xl font-bold">Order Analytics</h3>
              <p className="text-sm text-center mt-2">
                {templateData.filter((t) => t.category === "order").length}{" "}
                templates
              </p>
            </CardBody>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Industry Solutions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="overflow-hidden">
            <CardHeader className="absolute z-10 bottom-0 flex-col items-start bg-black/40 backdrop-blur-sm border-t border-white/20">
              <h4 className="text-white font-bold text-xl">
                Retail & E-commerce
              </h4>
              <p className="text-white/80 text-sm">
                Optimize your online and offline sales
              </p>
            </CardHeader>
            <img
              alt="Retail & E-commerce"
              className="w-full h-48 object-cover"
              src="https://placehold.co/600x400/6366F1/white?text=Retail"
            />
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="absolute z-10 bottom-0 flex-col items-start bg-black/40 backdrop-blur-sm border-t border-white/20">
              <h4 className="text-white font-bold text-xl">Manufacturing</h4>
              <p className="text-white/80 text-sm">
                Streamline production and inventory
              </p>
            </CardHeader>
            <img
              alt="Manufacturing"
              className="w-full h-48 object-cover"
              src="https://placehold.co/600x400/10B981/white?text=Manufacturing"
            />
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="absolute z-10 bottom-0 flex-col items-start bg-black/40 backdrop-blur-sm border-t border-white/20">
              <h4 className="text-white font-bold text-xl">
                Wholesale Distribution
              </h4>
              <p className="text-white/80 text-sm">
                Manage your supply chain effectively
              </p>
            </CardHeader>
            <img
              alt="Wholesale Distribution"
              className="w-full h-48 object-cover"
              src="https://placehold.co/600x400/F59E0B/white?text=Distribution"
            />
          </Card>
        </div>
      </div>
    </div>
  );
};
