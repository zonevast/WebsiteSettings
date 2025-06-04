// templatesInstalled.js
"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Divider,
  Chip,
  Tooltip,
  Select,
  SelectItem,
  Input,
} from "@nextui-org/react";
import {
  FileText,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  Sliders,
  Search,
  Download,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { motion } from "framer-motion";

// Mock Installed Templates Data (replace with your actual data fetching)
const mockInstalledTemplates = [
  {
    id: 1,
    name: "Modern Agency",
    description:
      "A sleek and modern website template for creative agencies. Features a clean design, responsive layout, and easy customization.",
    imageUrl: "/images/template-1.jpg", // Replace with actual image paths
    tags: ["agency", "creative", "modern"],
    status: "active", // "active", "inactive", "updating", "error"
  },
  {
    id: 2,
    name: "E-commerce Storefront",
    description:
      "A fully functional e-commerce template with product listings, shopping cart, and checkout functionality.",
    imageUrl: "/images/template-2.jpg",
    tags: ["ecommerce", "store", "online"],
    status: "inactive",
  },
  {
    id: 3,
    name: "Personal Portfolio",
    description:
      "A clean and elegant portfolio template to showcase your work. Includes sections for projects, skills, and contact information.",
    imageUrl: "/images/template-3.jpg",
    tags: ["portfolio", "personal", "creative"],
    status: "active",
  },
  {
    id: 4,
    name: "Blog Template",
    description:
      "A clean and functional blog template to share your thoughts and ideas. Includes post listings, categories, and a comments section.",
    imageUrl: "/images/template-4.jpg",
    tags: ["blog", "news", "content"],
    status: "updating",
  },
  {
    id: 5,
    name: "Restaurant Website",
    description:
      "A visually appealing website for restaurants. Includes menu display, online ordering, and contact information.",
    imageUrl: "/images/template-5.jpg",
    tags: ["restaurant", "food", "menu"],
    status: "error",
  },
  // Add more mock templates as needed
];

const TemplatesInstalled = () => {
  const t = useTranslations("TemplatesInstalled");
  const [installedTemplates, setInstalledTemplates] = useState(
    mockInstalledTemplates
  ); // Local state for installed templates
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // "all", "active", "inactive", "updating", "error"
  const [sortOption, setSortOption] = useState("name"); // Default sort by name
  const [showPreview, setShowPreview] = useState(false); // Preview state
  const [selectedTemplate, setSelectedTemplate] = useState(null); // Currently selected template for preview
  const [isLoading, setIsLoading] = useState(false); // Loading state for actions

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (value) => {
    setFilterStatus(value);
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const filteredTemplates = React.useMemo(() => {
    let results = [...installedTemplates]; // Use a copy

    // Search Filter
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      results = results.filter(
        (template) =>
          template.name.toLowerCase().includes(searchTermLower) ||
          template.description.toLowerCase().includes(searchTermLower)
      );
    }

    // Status Filter
    if (filterStatus !== "all") {
      results = results.filter((template) => template.status === filterStatus);
    }

    // Sorting
    if (sortOption === "name") {
      results.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "dateInstalled") {
      // In a real app, you'd need a 'dateInstalled' property in your data
      results.sort((a, b) => 0); // Placeholder: sort by date
    }

    return results;
  }, [searchTerm, filterStatus, sortOption, installedTemplates]);

  const togglePreview = (template) => {
    setSelectedTemplate(template);
    setShowPreview(!showPreview);
  };

  const handleActivate = async (templateId) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate 1 second loading
      const updatedTemplates = installedTemplates.map((template) => {
        if (template.id === templateId) {
          return { ...template, status: "active" };
        }
        return template;
      });
      setInstalledTemplates(updatedTemplates);
      alert(t("templateActivatedSuccess"));
    } catch (error) {
      console.error("Error activating template:", error);
      alert(t("templateActivateError"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeactivate = async (templateId) => {
      setIsLoading(true);
      try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const updatedTemplates = installedTemplates.map((template) => {
              if (template.id === templateId) {
                  return { ...template, status: 'inactive' };
              }
              return template;
          });
          setInstalledTemplates(updatedTemplates);
          alert(t("templateDeactivatedSuccess"));
      } catch (error) {
          console.error("Error deactivating template:", error);
          alert(t("templateDeactivateError"));
      } finally {
          setIsLoading(false);
      }
  };

  const handleUninstall = async (templateId) => {
    if (!confirm(t("uninstallConfirmation"))) {
      return; // User cancelled the action
    }
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const updatedTemplates = installedTemplates.filter(
        (template) => template.id !== templateId
      );
      setInstalledTemplates(updatedTemplates);
      alert(t("templateUninstallSuccess"));
    } catch (error) {
      console.error("Error uninstalling template:", error);
      alert(t("templateUninstallError"));
    } finally {
      setIsLoading(false);
    }
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
              <p className="text-md">{t("manageTemplates")}</p>
              <p className="text-small text-default-500">
                {t("manageTemplatesDescription")}
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
                  label={t("filterByStatus")}
                  placeholder={t("filterByStatusPlaceholder")}
                  value={filterStatus}
                  onChange={handleStatusFilterChange}
                  className="md:w-1/3"
                >
                  <SelectItem key="all" value="all">
                    {t("allStatuses")}
                  </SelectItem>
                  <SelectItem key="active" value="active">
                    {t("active")}
                  </SelectItem>
                  <SelectItem key="inactive" value="inactive">
                    {t("inactive")}
                  </SelectItem>
                  <SelectItem key="updating" value="updating">
                    {t("updating")}
                  </SelectItem>
                  <SelectItem key="error" value="error">
                    {t("error")}
                  </SelectItem>
                </Select>

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
                  <SelectItem key="dateInstalled" value="dateInstalled">
                    {t("sortByDateInstalled")}
                  </SelectItem>
                </Select>
              </div>

              {/* Template List */}
              <div className="space-y-3">
                {filteredTemplates.map((template) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="p-3 flex flex-col md:flex-row items-center gap-4">
                      <img
                        src={template.imageUrl}
                        alt={template.name}
                        className="w-full md:w-40 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1 space-y-2">
                        <h4 className="text-md font-semibold">{template.name}</h4>
                        <p className="text-sm text-default-500 line-clamp-2">
                          {template.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {template.tags.map((tag) => (
                            <Chip
                              key={`${template.id}-${tag}`}
                              size="sm"
                              variant="light"
                            >
                              {tag}
                            </Chip>
                          ))}
                        </div>
                        {template.status === "error" && (
                          <Chip color="danger" variant="shadow">
                            {t("error")}
                          </Chip>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        {/* Status-based actions and visual indicators */}
                        {template.status === "active" ? (
                          <Button
                            color="default"
                            size="sm"
                            isLoading={isLoading}
                            onPress={() => handleDeactivate(template.id)}
                          >
                            <XCircle size={18} className="mr-1" />
                            {t("deactivate")}
                          </Button>
                        ) : template.status === "inactive" ? (
                          <Button
                            color="primary"
                            size="sm"
                            isLoading={isLoading}
                            onPress={() => handleActivate(template.id)}
                          >
                            <CheckCircle2 size={18} className="mr-1" />
                            {t("activate")}
                          </Button>
                        ) : template.status === "updating" ? (
                          <Chip color="warning" variant="shadow">
                            {t("updating")}
                          </Chip>
                        ) : template.status === "error" ? (
                          <Chip color="danger" variant="shadow">
                            {t("error")}
                          </Chip>
                        ) : null}
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
                            color="danger"
                            size="sm"
                            isLoading={isLoading}
                            startContent={<Trash2 size={18} />}
                            onPress={() => handleUninstall(template.id)}
                          >
                            {t("uninstall")}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}

                {filteredTemplates.length === 0 && (
                  <p className="text-gray-500">{t("noTemplatesFound")}</p>
                )}
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
              <h3 className="text-xl font-semibold">
                {selectedTemplate?.name}
              </h3>
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
              <p className="text-sm text-default-500 mb-4">
                {selectedTemplate?.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedTemplate?.tags.map((tag) => (
                  <Chip key={tag} size="sm" variant="light">
                    {tag}
                  </Chip>
                ))}
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TemplatesInstalled;