"use client";
import React from "react";
import {
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Switch,
  Chip,
} from "@nextui-org/react";
import {
  Search,
  Filter,
  ChevronDown,
  Package,
  Layers,
  Users,
  ShoppingBag,
  TrendingUp,
  Grid,
  List,
} from "lucide-react";

export const TemplatesFilterBar = ({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  sortBy,
  setSortBy,
  showPremiumOnly,
  setShowPremiumOnly,
  viewMode,
  setViewMode,
}) => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 mb-3">
        <div className="flex-1">
          <Input
            placeholder="Search templates..."
            startContent={<Search size={16} />}
            variant="bordered"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="flat"
                startContent={<Filter size={16} />}
                endContent={<ChevronDown size={16} />}
              >
                Category
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Category filter"
              onAction={(key) => setActiveCategory(key)}
              selectedKeys={[activeCategory]}
              selectionMode="single"
            >
              <DropdownItem key="all">All Categories</DropdownItem>
              <DropdownItem
                key="product"
                startContent={<Package size={16} className="text-primary" />}
              >
                Product
              </DropdownItem>
              <DropdownItem
                key="inventory"
                startContent={<Layers size={16} className="text-success" />}
              >
                Inventory
              </DropdownItem>
              <DropdownItem
                key="customers"
                startContent={<Users size={16} className="text-secondary" />}
              >
                Customers
              </DropdownItem>
              <DropdownItem
                key="order"
                startContent={
                  <ShoppingBag size={16} className="text-warning" />
                }
              >
                Orders
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="flat"
                startContent={<TrendingUp size={16} />}
                endContent={<ChevronDown size={16} />}
              >
                Sort By
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Sort options"
              onAction={(key) => setSortBy(key)}
              selectedKeys={[sortBy]}
              selectionMode="single"
            >
              <DropdownItem key="featured">Featured</DropdownItem>
              <DropdownItem key="newest">Newest</DropdownItem>
              <DropdownItem key="popular">Most Popular</DropdownItem>
              <DropdownItem key="rating">Highest Rated</DropdownItem>
              <DropdownItem key="priceAsc">Price: Low to High</DropdownItem>
              <DropdownItem key="priceDesc">Price: High to Low</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <div className="flex items-center gap-2">
            <Switch
              size="sm"
              color="primary"
              isSelected={showPremiumOnly}
              onValueChange={setShowPremiumOnly}
            />
            <span className="text-sm">Premium Only</span>
          </div>

          <div className="flex border rounded-lg overflow-hidden">
            <Button
              isIconOnly
              variant={viewMode === "grid" ? "solid" : "flat"}
              color={viewMode === "grid" ? "primary" : "default"}
              onClick={() => setViewMode("grid")}
            >
              <Grid size={16} />
            </Button>
            <Button
              isIconOnly
              variant={viewMode === "list" ? "solid" : "flat"}
              color={viewMode === "list" ? "primary" : "default"}
              onClick={() => setViewMode("list")}
            >
              <List size={16} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
