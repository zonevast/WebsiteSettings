"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Select,
  SelectItem,
  Chip,
  Divider,
} from "@nextui-org/react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/components/animations"; 
import { mockTemplates } from "./data";
import TemplateCard from "@/components/TemplatesStore/TemplateCard";

const TemplateStore = () => {
  const t = useTranslations("TemplateStore");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTags, setFilterTags] = useState([]);
  const [sortOption, setSortOption] = useState("name");
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTagFilterChange = (tag) => {
    setFilterTags(
      (prevTags) =>
        prevTags.includes(tag)
          ? prevTags.filter((t) => t !== tag)
          : [...prevTags, tag]
    );
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const filteredTemplates = React.useMemo(() => {
    let results = [...mockTemplates];

    // Search Filter
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      results = results.filter(
        (template) =>
          template.name.toLowerCase().includes(searchTermLower) ||
          template.description.toLowerCase().includes(searchTermLower)
      );
    }

    // Tag Filter
    if (filterTags.length > 0) {
      results = results.filter((template) =>
        filterTags.every((tag) => template.tags.includes(tag))
      );
    }

    // Sorting
    if (sortOption === "name") {
      results.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "priceAsc") {
      results.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceDesc") {
      results.sort((a, b) => b.price - a.price);
    }

    return results;
  }, [searchTerm, filterTags, sortOption]);

  const togglePreview = (template) => {
    setSelectedTemplate(template);
    setShowPreview(!showPreview);
  };

  const handleDownload = (template) => {
    // In a real application, you would initiate the download process here
    alert(`Downloading template: ${template.name}`);
  };

  const previewVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full max-w-full space-y-6 p-6"
    >
      {/* Header Section */}
      <motion.div
        variants={itemVariants}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t("title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t("browseTemplatesDescription")}
          </p>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div variants={itemVariants} className="flex flex-col gap-4">
        <Card className="w-full">
          <CardBody>
            <div className="space-y-4">
              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  type="search"
                  label={t("searchTemplates")}
                  placeholder={t("searchPlaceholder")}
                  startContent={<Search size={18} />}
                  value={searchTerm}
                  onClear={() => setSearchTerm("")}
                  onChange={handleSearchChange}
                  className="md:w-1/3"
                />

                <Select
                  label={t("sortBy")}
                  placeholder={t("sortByPlaceholder")}
                  value={sortOption}
                  onChange={handleSortChange}
                  className="md:w-1/3"
                >
                  <SelectItem key="name" value="name">
                    {t("sortByName")}
                  </SelectItem>
                  <SelectItem key="priceAsc" value="priceAsc">
                    {t("sortByPriceAsc")}
                  </SelectItem>
                  <SelectItem key="priceDesc" value="priceDesc">
                    {t("sortByPriceDesc")}
                  </SelectItem>
                </Select>
              </div>

              {/* Tag Filters */}
              <div>
                <p className="text-sm font-medium">{t("filterByTags")}</p>
                <div className="flex flex-wrap gap-2">
                  {Array.from(
                    new Set(mockTemplates.flatMap((template) => template.tags))
                  ).map((tag) => (
                    <Chip
                      key={tag}
                      variant={filterTags.includes(tag) ? "shadow" : "light"}
                      onClick={() => handleTagFilterChange(tag)}
                    >
                      {tag}
                    </Chip>
                  ))}
                </div>
              </div>

              {/* Template Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTemplates.map((template) => (
                  <TemplateCard
                    template={template}
                    showPreview={showPreview}
                    togglePreview={togglePreview}
                    handleDownload={handleDownload}
                    itemVariants={itemVariants}
                    selectedTemplate={selectedTemplate} // Pass selectedTemplate to TemplateCard
                  />
                ))}
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>

    </motion.div>
  );
};

export default TemplateStore;