// InstalledTemplateCard.js
"use client";
import React from "react";
import { Card, Button, Chip, Tooltip, CardBody } from "@nextui-org/react";
import { Trash2, Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { itemVariants } from "@/components/animations";
import Image from "next/image";

// InstalledTemplateCard Component
const InstalledTemplateCard = ({
  template,
  t,
  isLoading,
  handleDeactivate,
  handleActivate,
  handleUninstall,
  togglePreview,
  showPreview,
  selectedTemplate,
}) => {
  return (
    <motion.div key={template.id} variants={itemVariants} className="w-full">
      <Card
        className="w-full overflow-hidden hover:shadow-lg transition-shadow duration-300"
        isPressable
        onPress={() => togglePreview(template)}
      >
        <CardBody className="p-0">
          <div className="flex flex-col md:flex-row w-full">
            <div className="relative md:w-48 h-32 md:h-auto overflow-hidden">
              <div className="relative w-full h-full">
                <img
                  src={template.imageUrl || "https://placehold.co/600x400"}
                  alt={template.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                <span className="text-white text-xs font-medium p-2">
                  {t("clickToPreview")}
                </span>
              </div>
            </div>

            {/* Content section - takes remaining width */}
            <div className="flex-1 p-4 flex flex-col justify-between w-full">
              <div className="space-y-2 w-full">
                {/* Status badge */}
                <div className="flex justify-between items-start w-full">
                  <h4 className="text-md font-semibold line-clamp-1">
                    {template.name}
                  </h4>
                  {template.status === "active" && (
                    <Chip
                      size="sm"
                      color="success"
                      variant="flat"
                      className="ml-2"
                    >
                      {t("active")}
                    </Chip>
                  )}
                  {template.status === "inactive" && (
                    <Chip
                      size="sm"
                      color="default"
                      variant="flat"
                      className="ml-2"
                    >
                      {t("inactive")}
                    </Chip>
                  )}
                  {template.status === "updating" && (
                    <Chip
                      size="sm"
                      color="warning"
                      variant="flat"
                      className="ml-2"
                    >
                      {t("updating")}
                    </Chip>
                  )}
                  {template.status === "error" && (
                    <Chip
                      size="sm"
                      color="danger"
                      variant="flat"
                      className="ml-2"
                    >
                      {t("error")}
                    </Chip>
                  )}
                </div>

                <p className="text-sm text-default-500 line-clamp-2">
                  {template.description}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {template.tags.map((tag) => (
                    <Chip
                      key={`${template.id}-${tag}`}
                      size="sm"
                      variant="flat"
                      className="bg-default-100"
                    >
                      {tag}
                    </Chip>
                  ))}
                </div>
              </div>

              {/* Actions section */}
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-default-100 w-full">
                <div>
                  {template.status === "active" ? (
                    <Button
                      color="default"
                      size="sm"
                      isLoading={isLoading}
                      onPress={(e) => {
                        e.stopPropagation();
                        handleDeactivate(template.id);
                      }}
                      className="min-w-0"
                    >
                      <XCircle size={16} className="mr-1" />
                      {t("deactivate")}
                    </Button>
                  ) : template.status === "inactive" ? (
                    <Button
                      color="primary"
                      size="sm"
                      isLoading={isLoading}
                      onPress={(e) => {
                        e.stopPropagation();
                        handleActivate(template.id);
                      }}
                      className="min-w-0"
                    >
                      <CheckCircle2 size={16} className="mr-1" />
                      {t("activate")}
                    </Button>
                  ) : null}
                </div>

                <div className="flex gap-2">
                  <Tooltip
                    content={
                      showPreview && selectedTemplate?.id === template.id
                        ? t("hidePreview")
                        : t("showPreview")
                    }
                  >
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onPress={(e) => {
                        e.stopPropagation();
                        togglePreview(template);
                      }}
                      aria-label={t("preview")}
                    >
                      {showPreview && selectedTemplate?.id === template.id ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </Button>
                  </Tooltip>

                  <Tooltip content={t("uninstallTemplate")}>
                    <Button
                      isIconOnly
                      color="danger"
                      size="sm"
                      isLoading={isLoading}
                      onPress={(e) => {
                        e.stopPropagation();
                        handleUninstall(template.id);
                      }}
                      aria-label={t("uninstall")}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default InstalledTemplateCard;
