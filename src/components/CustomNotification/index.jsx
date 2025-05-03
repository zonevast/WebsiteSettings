"use client";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
  Chip,
} from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle ,
  Info ,
  CheckCircle ,
  AlertTriangle,
} from "lucide-react";

import { Send, Flag, X } from "lucide-react";
import { isRtlLang } from "rtl-detect";
import { useTranslations } from "next-intl";

const iconColor = {
  info: "#0099FF",
  success: "#17C964",
  error: "#F31260",
  warning: "#F5A524",
};

const iconMap = {
  info: <AlertCircle className="w-5 h-5" />,
  success: <Info className="w-5 h-5" />,
  error: <CheckCircle className="w-5 h-5" />,
  warning: <AlertTriangle className="w-5 h-5" />,
};

const CustomNotification = ({
  message,
  type = "info",
  duration = 20000,
  clearTimeoutFn,
  onClose,
  id,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportText, setReportText] = useState("");
  const t = useTranslations("ReportModal");

  const handleReport = async () => {
    try {
      // Add your report submission logic here
      console.log("Report submitted:", {
        notificationId: id,
        type,
        message,
        reportText,
      });
      setIsReportModalOpen(false);
      // Show success message
    } catch (error) {
      console.error("Error submitting report:", error);
      // Show error message
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  const handleCardClick = (e) => {
    // Prevent modal from opening when clicking buttons
    if (!e.target.closest("button") && !e.target.closest('[role="button"]')) {
      setIsReportModalOpen(true);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <Card
            className={`w-full shadow-lg backdrop-blur-sm cursor-pointer group ${
              type === "error" ? "animate-shake" : ""
            }`}
            style={{
              borderLeft: `4px solid ${iconColor[type]}`,
            }}
            onMouseEnter={() => {
              setIsHovered(true);
              clearTimeoutFn();
            }}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleCardClick}
          >
            <CardBody className="p-4">
              <div className="flex items-start gap-3">
                <div
                  className="p-2 rounded-full"
                  style={{ backgroundColor: `${iconColor[type]}20` }}
                >
                  {iconMap[type]}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <Chip
                      size="sm"
                      variant="flat"
                      color={type}
                      className="capitalize"
                    >
                      {type}
                    </Chip>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsReportModalOpen(true);
                        }}
                      >
                        <Flag className="w-4 h-4" />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClose();
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <p
                    className={`mt-1 text-sm text-default-600 ${
                      isRtlLang ? "text-right" : "text-left"
                    } ${isExpanded ? "" : "line-clamp-2"}`}
                  >
                    {message}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </AnimatePresence>
      <Modal
        isOpen={isReportModalOpen}
        onOpenChange={(open) => {
          setIsReportModalOpen(open);
          if (!open) setReportText("");
        }}
        size="md"
        classNames={{
          backdrop: "backdrop-blur-sm backdrop-brightness-50",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-xl font-bold">{t("header")}</h2>
                <Chip
                  size="sm"
                  color={type}
                  variant="flat"
                  className="capitalize"
                >
                  {t("type", { type })}
                </Chip>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-default-100">
                    <p className="text-sm text-default-600">
                      {t("originalMessageLabel")}
                    </p>
                    <p className="mt-1 text-sm font-medium">{message}</p>
                  </div>
                  <Textarea
                    label={t("descriptionLabel")}
                    placeholder={t("descriptionPlaceholder")}
                    value={reportText}
                    onChange={(e) => setReportText(e.target.value)}
                    minRows={3}
                    variant="bordered"
                    classNames={{
                      label: "text-default-600",
                      input: "resize-none",
                    }}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  className="font-medium"
                >
                  {t("cancel")}
                </Button>
                <Button
                  color="primary"
                  endContent={<Send className="w-4 h-4" />}
                  onPress={handleReport}
                  className="font-medium bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                  isDisabled={!reportText.trim()}
                >
                  {t("sendReport")}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomNotification;
