// templateStore.js
"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Card,
  CardBody,
  CardHeader,
  Tabs,
  Tab,
  Button,
  Divider,
  Tooltip,
  Chip,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import {
  Search,
  Layers,
  Sliders,
  FileText,
  Tag,
  Download,
  Eye,
  EyeOff,
} from "lucide-react";
import { motion } from "framer-motion"; // Import motion

// Mock template data (replace with your actual data fetching)
const mockTemplates = [
  {
    id: 1,
    name: "Modern Agency",
    description:
      "A sleek and modern website template for creative agencies. Features a clean design, responsive layout, and easy customization.",
    imageUrl: "/images/template-1.jpg", // Replace with actual image paths
    tags: ["agency", "creative", "modern"],
    price: 0, // Free
  },
  {
    id: 2,
    name: "E-commerce Storefront",
    description:
      "A fully functional e-commerce template with product listings, shopping cart, and checkout functionality.",
    imageUrl: "/images/template-2.jpg",
    tags: ["ecommerce", "store", "online"],
    price: 49,
  },
  {
    id: 3,
    name: "Personal Portfolio",
    description:
      "A clean and elegant portfolio template to showcase your work. Includes sections for projects, skills, and contact information.",
    imageUrl: "/images/template-3.jpg",
    tags: ["portfolio", "personal", "creative"],
    price: 19,
  },
  {
      id: 4,
      name: "Blog Template",
      description: "A clean and functional blog template to share your thoughts and ideas. Includes post listings, categories, and a comments section.",
      imageUrl: "/images/template-4.jpg",
      tags: ["blog", "news", "content"],
      price: 9,
  },
  {
      id: 5,
      name: "Restaurant Website",
      description: "A visually appealing website for restaurants. Includes menu display, online ordering, and contact information.",
      imageUrl: "/images/template-5.jpg",
      tags: ["restaurant", "food", "menu"],
      price: 29,
  },
  {
      id: 6,
      name: "Landing Page",
      description: "A high-converting landing page template designed to capture leads. Includes a clear call-to-action and concise content.",
      imageUrl: "/images/template-6.jpg",
      tags: ["landing page", "lead generation", "marketing"],
      price: 0, // Free
  },
  // Add more mock templates as needed
];

const TemplateStore = () => {
  const t = useTranslations("TemplateStore");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTags, setFilterTags] = useState([]); // Array to store selected tags
  const [sortOption, setSortOption] = useState("name"); // Default sort by name
  const [showPreview, setShowPreview] = useState(false); // Preview state
  const [selectedTemplate, setSelectedTemplate] = useState(null); // Currently selected template for preview

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTagFilterChange = (tag) => {
    setFilterTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag) // Remove if already selected
        : [...prevTags, tag] // Add if not selected
    );
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const filteredTemplates = React.useMemo(() => {
    let results = [...mockTemplates]; // Use a copy to avoid mutating the original

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
      alert(`Downloading template: ${template.name}`); // Replace with actual download logic
  };

  const previewVariants = {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
      exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  return (
    <div className="w-full max-w-full">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">{t("title")}</h3>
        </div>

        <Card className="w-full">
          <CardHeader className="flex gap-2">
            <div className="flex flex-col">
              <p className="text-md">{t("browseTemplates")}</p>
              <p className="text-small text-default-500">
                {t("browseTemplatesDescription")}
              </p>
            </div>
          </CardHeader>

          <Divider />

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
                    <SelectItem key="name" value="name">{t("sortByName")}</SelectItem>
                    <SelectItem key="priceAsc" value="priceAsc">{t("sortByPriceAsc")}</SelectItem>
                    <SelectItem key="priceDesc" value="priceDesc">{t("sortByPriceDesc")}</SelectItem>
                </Select>
              </div>

              {/* Tag Filters */}
              <div>
                <p className="text-sm font-medium">{t("filterByTags")}</p>
                <div className="flex flex-wrap gap-2">
                  {/* Dynamically generate tags based on your data */}
                  {Array.from(
                    new Set(mockTemplates.flatMap((template) => template.tags))
                  ).map((tag) => (
                    <Chip
                      key={tag}
                      variant={
                        filterTags.includes(tag) ? "shadow" : "light"
                      }
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
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: (template.id - 1) * 0.1 }} // Staggered animation
                  >
                    <Card className="hover:shadow-lg transition-shadow duration-200">
                      <CardHeader className="pb-0">
                        <img
                          src={template.imageUrl}
                          alt={template.name}
                          className="w-full h-40 object-cover rounded-t-lg"
                        />
                      </CardHeader>
                      <CardBody className="pt-2 pb-3">
                        <h4 className="text-md font-semibold">{template.name}</h4>
                        <p className="text-sm text-default-500 line-clamp-2">
                          {template.description}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {template.tags.map((tag) => (
                            <Chip key={`${template.id}-${tag}`} size="sm" variant="light">{tag}</Chip>
                          ))}
                        </div>
                      </CardBody>
                      <Divider />
                      <CardBody className="pt-3 flex justify-between items-center">
                        <div>
                          {template.price === 0 ? (
                            <Chip color="success" variant="flat">{t("free")}</Chip>
                          ) : (
                            <Chip color="primary" variant="flat">{`$${template.price}`}</Chip>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            onPress={() => togglePreview(template)}
                            aria-label={t("preview")}
                          >
                            {showPreview && selectedTemplate?.id === template.id ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </Button>
                          <Button
                            color="primary"
                            size="sm"
                            startContent={<Download size={18} />}
                            onPress={() => handleDownload(template)}
                          >
                            {t("download")}
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Template Preview Modal */}
      <motion.div
        className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
          showPreview ? "" : "hidden"
        }`}
        variants={previewVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div className="bg-white rounded-lg p-6 max-w-4xl w-full overflow-auto">
          <Card>
              <CardHeader className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">{selectedTemplate?.name}</h3>
                  <Button
                      isIconOnly
                      variant="light"
                      aria-label={t("closePreview")}
                      onClick={togglePreview}
                  >
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                      >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                  </Button>
              </CardHeader>
              <Divider />
              <CardBody>
                  {/*  Template Preview Content (replace with actual template preview) */}
                  <img
                      src={selectedTemplate?.imageUrl}
                      alt={selectedTemplate?.name}
                      className="w-full rounded-lg mb-4"
                  />
                  <p className="text-sm text-default-500 mb-4">{selectedTemplate?.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                      {selectedTemplate?.tags.map((tag) => (
                          <Chip key={tag} size="sm" variant="light">{tag}</Chip>
                      ))}
                  </div>
                  <div className="flex justify-between items-center">
                      {selectedTemplate?.price === 0 ? (
                          <Chip color="success" variant="flat">{t("free")}</Chip>
                      ) : (
                          <Chip color="primary" variant="flat">{`$${selectedTemplate?.price}`}</Chip>
                      )}
                      <Button color="primary" startContent={<Download size={18} />} onPress={() => handleDownload(selectedTemplate)}>{t("download")}</Button>
                  </div>
              </CardBody>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TemplateStore;