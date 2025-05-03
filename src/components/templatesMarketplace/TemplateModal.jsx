
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Chip,
  Avatar,
  Divider,
  Button,
} from "@nextui-org/react";
import {
  Package,
  Layers,
  Users,
  ShoppingBag,
  Star,
  Calendar,
  Download,
  DollarSign,
  Tag,
  BarChart2,
  LineChart,
  PieChart,
  CheckCircle,
  Lock,
} from "lucide-react";
import Image from "next/image";

function CategoryIcon({ category }) {
  switch (category) {
    case "product":
      return <Package size={14} className="mr-1" />;
    case "inventory":
      return <Layers size={14} className="mr-1" />;
    case "customers":
      return <Users size={14} className="mr-1" />;
    case "order":
      return <ShoppingBag size={14} className="mr-1" />;
    default:
      return null;
  }
}

function PreviewImages({ images, title }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      {images.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt={`${title} preview ${index + 1}`}
          width={600}
          height={400}
          className="w-full h-auto rounded-lg"
        />
      ))}
    </div>
  );
}

function TemplateDetails({ selectedTemplate }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-bold mb-2">Description</h3>
        <p className="text-gray-600">{selectedTemplate?.description}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {selectedTemplate?.tags.map((tag, index) => (
          <Chip key={index} variant="flat">
            <Tag size={14} className="mr-1" />
            {tag}
          </Chip>
        ))}
      </div>

      <Divider />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h4 className="font-medium text-sm mb-2">Chart Types</h4>
          <div className="flex flex-wrap gap-1">
            {selectedTemplate?.chartTypes.map((chart, index) => (
              <Chip key={index} size="sm" variant="flat" color="primary">
                {chart === "bar" && <BarChart2 size={12} className="mr-1" />}
                {chart === "line" && <LineChart size={12} className="mr-1" />}
                {chart === "pie" && <PieChart size={12} className="mr-1" />}
                {chart}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-sm mb-2">Compatibility</h4>
          <div className="flex flex-wrap gap-1">
            {selectedTemplate?.compatibility.map((format, index) => (
              <Chip key={index} size="sm" variant="flat">
                {format}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-sm mb-2">Last Updated</h4>
          <p className="text-sm">
            <Calendar size={14} className="inline mr-1" />
            {new Date(selectedTemplate?.lastUpdated).toLocaleDateString()}
          </p>
          <p className="text-sm mt-1">
            <Download size={14} className="inline mr-1" />
            {selectedTemplate?.downloads.toLocaleString()} downloads
          </p>
        </div>
      </div>

      <Divider />

      <div className="flex items-center gap-3">
        <Avatar src={selectedTemplate?.authorAvatar} size="md" />
        <div>
          <p className="font-medium">Created by {selectedTemplate?.author}</p>
          <p className="text-sm text-gray-500">Template Designer</p>
        </div>
      </div>
    </div>
  );
}

export default function TemplateModal({
  isOpen,
  onClose,
  selectedTemplate,
  isInstalling,
  isTemplateInstalled,
  handleInstall,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl" scrollBehavior="inside">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {selectedTemplate?.title}
              <div className="flex items-center gap-2">
                <Chip
                  size="sm"
                  color={
                    selectedTemplate?.category === "product"
                      ? "primary"
                      : selectedTemplate?.category === "inventory"
                      ? "success"
                      : selectedTemplate?.category === "customers"
                      ? "secondary"
                      : "warning"
                  }
                  variant="flat"
                >
                  <CategoryIcon category={selectedTemplate?.category} />
                  {selectedTemplate?.category.charAt(0).toUpperCase() +
                    selectedTemplate?.category.slice(1)}
                </Chip>
                <div className="flex items-center">
                  <Star className="text-warning fill-warning" size={14} />
                  <span className="text-sm ml-1">{selectedTemplate?.rating}</span>
                  <span className="text-xs text-gray-500 ml-1">
                    ({selectedTemplate?.reviews} reviews)
                  </span>
                </div>
              </div>
            </ModalHeader>
            <ModalBody>
              <PreviewImages
                images={selectedTemplate?.previewImages || []}
                title={selectedTemplate?.title}
              />
              <TemplateDetails selectedTemplate={selectedTemplate} />
            </ModalBody>
            <ModalFooter className="flex justify-between">
              <div className="flex items-center">
                {selectedTemplate?.price > 0 ? (
                  <Chip color="primary" size="lg" variant="flat">
                    <DollarSign size={14} className="mr-1" />$
                    {selectedTemplate?.price}
                  </Chip>
                ) : (
                  <Chip color="success" size="lg" variant="flat">
                    Free
                  </Chip>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                {isTemplateInstalled(selectedTemplate?.id) ? (
                  <Button
                    color="success"
                    variant="flat"
                    startContent={<CheckCircle size={16} />}
                    isDisabled
                  >
                    Installed
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    startContent={
                      selectedTemplate?.premium &&
                      !isTemplateInstalled(selectedTemplate?.id) ? (
                        <Lock size={16} />
                      ) : (
                        <Download size={16} />
                      )
                    }
                    isLoading={isInstalling}
                    onClick={() => handleInstall(selectedTemplate)}
                  >
                    {selectedTemplate?.premium &&
                    !isTemplateInstalled(selectedTemplate?.id)
                      ? "Unlock & Install"
                      : "Install Now"}
                  </Button>
                )}
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
