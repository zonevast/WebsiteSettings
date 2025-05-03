"use client";
import {
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { AlertTriangle, Info, AlertOctagon } from "lucide-react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export const ConfirmationModal = ({
  isOpen,
  onClose,
  title,
  description,
  onConfirm,
  type = "warning", // 'warning', 'danger', 'info'
  confirmText = "Confirm",
  cancelText = "Cancel",
  checkboxLabel = "I understand and confirm this action",
  requireCheckbox = true,
}) => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const isRtlLang = useParams().locale == "ar";

  // Reset checkbox state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsConfirmed(false);
    }
  }, [isOpen]);

  const handleConfirm = () => {
    if (!requireCheckbox || isConfirmed) {
      onConfirm();
      onClose();
    }
  };

  const getModalStyles = () => {
    switch (type) {
      case "danger":
        return {
          icon: <AlertOctagon className="w-12 h-12 text-danger" />,
          headerClass: "text-danger",
          confirmButton: "danger",
        };
      case "warning":
        return {
          icon: <AlertTriangle className="w-12 h-12 text-warning" />,
          headerClass: "text-warning",
          confirmButton: "warning",
        };
      case "info":
        return {
          icon: <Info className="w-12 h-12 text-primary" />,
          headerClass: "text-primary",
          confirmButton: "primary",
        };
      default:
        return {
          icon: <AlertTriangle className="w-12 h-12 text-warning" />,
          headerClass: "text-warning",
          confirmButton: "warning",
        };
    }
  };

  const styles = getModalStyles();

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 items-center text-center">
              <div className="mb-2">{styles.icon}</div>
              <h2 className={`text-xl font-bold ${styles.headerClass}`}>
                {title}
              </h2>
            </ModalHeader>
            <ModalBody>
              <div className="text-center mb-4">
                <p className="text-gray-600 dark:text-gray-400">
                  {description}
                </p>
              </div>
              {requireCheckbox && (
                <div className="flex justify-center">
                  <Checkbox
                    isSelected={isConfirmed}
                    onValueChange={setIsConfirmed}
                    size="sm"
                    classNames={{
                      label: "text-sm text-gray-600 dark:text-gray-400",
                    }}
                  >
                    {checkboxLabel}
                  </Checkbox>
                </div>
              )}
            </ModalBody>
            <ModalFooter
              className={`flex justify-center gap-2 ${
                isRtlLang ? "flex-row-reverse" : ""
              }`}
            >
              <Button
                variant="bordered"
                onPress={onClose}
                className="min-w-[100px]"
              >
                {cancelText}
              </Button>
              <Button
                color={styles.confirmButton}
                onPress={handleConfirm}
                isDisabled={requireCheckbox && !isConfirmed}
                className={`min-w-[100px] ${
                  type === "danger"
                    ? "bg-danger-500 text-white shadow-lg shadow-danger-500/30"
                    : ""
                }`}
              >
                {confirmText}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
