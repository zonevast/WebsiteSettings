"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardBody, Select, SelectItem, Input } from "@nextui-org/react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/components/animations";
import { mockInstalledTemplates } from "./data";
import InstalledTemplateCard from "@/components/TemplatesInstalled/InstalledTemplateCard";

const TemplatesInstalled = () => {
  const t = useTranslations("TemplatesInstalledPage");
  const [installedTemplates, setInstalledTemplates] = useState(
    mockInstalledTemplates
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOption, setSortOption] = useState("name");
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
    let results = [...installedTemplates];

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
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const updatedTemplates = installedTemplates.map((template) => {
        if (template.id === templateId) {
          return { ...template, status: "inactive" };
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
      return;
    }
    setIsLoading(true);
    try {
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
            {t("manageTemplatesDescription")}
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
                  <InstalledTemplateCard
                    key={template.id}
                    template={template}
                    t={t}
                    isLoading={isLoading}
                    handleDeactivate={handleDeactivate}
                    handleActivate={handleActivate}
                    handleUninstall={handleUninstall}
                    togglePreview={togglePreview}
                    showPreview={showPreview}
                    selectedTemplate={selectedTemplate}
                  />
                ))}

                {filteredTemplates.length === 0 && (
                  <p className="text-gray-500">{t("noTemplatesFound")}</p>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default TemplatesInstalled;
