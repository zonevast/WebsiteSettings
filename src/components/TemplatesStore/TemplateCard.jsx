// TemplateCard.js
import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Divider,
  Chip,
} from "@nextui-org/react";
import { Download, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const TemplateCard = ({ template, showPreview, togglePreview, handleDownload, itemVariants }) => {
    const t = useTranslations("TemplateStore"); // Assuming TemplateStore is the namespace

  return (
    <motion.div
      key={template.id}
      variants={itemVariants} // Apply itemVariants
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
              <Chip
                key={`${template.id}-${tag}`}
                size="sm"
                variant="light"
              >
                {tag}
              </Chip>
            ))}
          </div>
        </CardBody>
        <Divider />
        <CardBody className="pt-3 flex justify-between items-center">
          <div>
            {template.price === 0 ? (
              <Chip color="success" variant="flat">
                {t("free")}
              </Chip>
            ) : (
              <Chip color="primary" variant="flat">
                {`$${template.price}`}
              </Chip>
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
              {showPreview &&
              template.id === (selectedTemplate ? selectedTemplate.id : null) // Compare template ID with selectedTemplate
                ? (
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
  );
};

export default TemplateCard;