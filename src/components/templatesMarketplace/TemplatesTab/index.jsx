// components/templatesMarketplace/TemplatesTab.jsx
"use client";
import React, { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Input,
  Chip,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Badge,
  Pagination,
  Switch,
  useDisclosure,
} from "@nextui-org/react";
import {
  Search,
  Filter,
  ChevronDown,
  Star,
  Crown,
  Package,
  Users,
  Layers,
  Grid,
  List,
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { TemplateCard } from "@/components/templatesMarketplace/TemplatesTab/TemplateCard";
import { TemplatePreviewModal } from "@/components/templatesMarketplace/TemplatePreviewModal";
import { templateData } from "@/app/(pages)/templates-marketplace/data";
import { TemplatesFilterBar } from "./TemplatesFilterBar";

export const TemplatesTab = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [page, setPage] = useState(1);
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [installedTemplates, setInstalledTemplates] = useState([]);
  const [isInstalling, setIsInstalling] = useState(false);

  const itemsPerPage = 8;

  // Filter templates based on active category, search query, and premium filter
  const filteredTemplates = templateData.filter((template) => {
    const matchesCategory =
      activeCategory === "all" || template.category === activeCategory;
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesPremium = !showPremiumOnly || template.premium;

    return matchesCategory && matchesSearch && matchesPremium;
  });

  // Sort templates
  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    switch (sortBy) {
      case "featured":
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      case "newest":
        return new Date(b.lastUpdated) - new Date(a.lastUpdated);
      case "popular":
        return b.downloads - a.downloads;
      case "rating":
        return b.rating - a.rating;
      case "priceAsc":
        return a.price - b.price;
      case "priceDesc":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  // Paginate templates
  const paginatedTemplates = sortedTemplates.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(sortedTemplates.length / itemsPerPage);

  const handlePreview = (template) => {
    setSelectedTemplate(template);
    onOpen();
  };

  const handleInstall = (template) => {
    setIsInstalling(true);

    // Simulate installation process
    setTimeout(() => {
      setIsInstalling(false);
      setInstalledTemplates([...installedTemplates, template.id]);
      onClose();
    }, 2000);
  };

  const isTemplateInstalled = (templateId) => {
    return installedTemplates.includes(templateId);
  };

  return (
    <>
      {/* Filters and Search */}
      <TemplatesFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        showPremiumOnly={showPremiumOnly}
        setShowPremiumOnly={setShowPremiumOnly}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />



      {/* Templates Grid/List */}
      {paginatedTemplates.length > 0 ? (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              : "space-y-4"
          }
        >
          {paginatedTemplates.map((template) =>
            viewMode === "grid" ? (
              <TemplateCard
                key={template.id}
                template={template}
                onPreview={handlePreview}
              />
            ) : (
              <Card key={template.id} className="w-full">
                <CardBody className="flex flex-row p-4 gap-4">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={template.thumbnail}
                      alt={template.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Chip
                        size="sm"
                        color={
                          template.category === "product"
                            ? "primary"
                            : template.category === "inventory"
                            ? "success"
                            : template.category === "customers"
                            ? "secondary"
                            : "warning"
                        }
                        variant="flat"
                      >
                        {template.category.charAt(0).toUpperCase() +
                          template.category.slice(1)}
                      </Chip>
                      {template.premium && (
                        <Badge color="warning" variant="flat">
                          <Crown size={12} className="mr-1" />
                          Premium
                        </Badge>
                      )}
                      <div className="flex items-center ml-auto">
                        <Star className="text-warning fill-warning" size={14} />
                        <span className="text-sm ml-1">{template.rating}</span>
                        <span className="text-xs text-gray-500 ml-1">
                          ({template.reviews})
                        </span>
                      </div>
                    </div>
                    <h3 className="font-bold">{template.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {template.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center">
                        <Avatar
                          src={template.authorAvatar}
                          size="sm"
                          className="mr-2"
                        />
                        <span className="text-xs">By {template.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {template.price > 0 ? (
                          <Chip color="primary" variant="flat">
                            ${template.price}
                          </Chip>
                        ) : (
                          <Chip color="success" variant="flat">
                            Free
                          </Chip>
                        )}
                        <Button
                          size="sm"
                          variant="flat"
                          color="primary"
                          onClick={() => handlePreview(template)}
                        >
                          Preview
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            )
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <AlertTriangle size={48} className="text-warning mb-4" />
          <h3 className="text-xl font-bold">No templates found</h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your filters or search query
          </p>
          <Button
            color="primary"
            variant="flat"
            onClick={() => {
              setActiveCategory("all");
              setSearchQuery("");
              setShowPremiumOnly(false);
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination
            total={totalPages}
            initialPage={1}
            page={page}
            onChange={setPage}
            color="primary"
            showControls
          />
        </div>
      )}

      {/* Template Preview Modal */}
      {selectedTemplate && (
        <TemplatePreviewModal
          isOpen={isOpen}
          onClose={onClose}
          template={selectedTemplate}
          onInstall={handleInstall}
          isInstalling={isInstalling}
          isInstalled={isTemplateInstalled(selectedTemplate.id)}
        />
      )}
    </>
  );
};
