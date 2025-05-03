import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Chip,
  Avatar,
  Divider,
  Spinner,
} from "@nextui-org/react";
import {
  Star,
  Download,
  Eye,
  Heart,
  Share2,
  Calendar,
  CheckCircle,
  Crown,
} from "lucide-react";

export const TemplatePreviewModal = ({
  isOpen,
  onClose,
  template,
  onInstall,
  isInstalling,
  isInstalled,
}) => {
  if (!template) return null;

  // Handle fallback if template is actually a plan object
  const title = template.title || template.name || "Template";
  const description = template.description || "No description provided.";
  const features = template.features || [];
  const price = template.price ?? 0;
  const thumbnail = template.thumbnail || "/placeholder-template.jpg";
  const previewImage = template.previewImage || thumbnail;
  const isPremium = template.premium || template.recommended;
  const rating = template.rating || 5;
  const reviews = template.reviews || 0;
  const tags = template.tags || [];
  const usage = template.usage ?? "N/A";
  const lastUpdated = template.lastUpdated || new Date().toISOString();
  const category = template.category || "General";
  const author = template.author || "AZ Tech";
  const authorRole = template.authorRole || "System";
  const authorAvatar = template.authorAvatar || "/avatar-default.png";

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl" scrollBehavior="inside">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{title}</h2>
                <div className="flex items-center gap-2">
                  {isPremium && (
                    <Chip color="warning" variant="flat">
                      <Crown size={14} className="mr-1" />
                      Premium
                    </Chip>
                  )}
                  <Chip color="primary" variant="flat">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Chip>
                </div>
              </div>
            </ModalHeader>

            <ModalBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={thumbnail}
                    alt={title}
                    className="w-full rounded-lg shadow-md"
                  />
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-1">
                      <Avatar src={authorAvatar} size="sm" className="mr-1" />
                      <div>
                        <p className="text-sm font-medium">By {author}</p>
                        <p className="text-xs text-gray-500">{authorRole}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="text-warning fill-warning" size={16} />
                      <span className="font-medium">{rating}</span>
                      <span className="text-xs text-gray-500">
                        ({reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Features</h3>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      {features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Details</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Download size={14} />
                        <span>{usage} usage</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>
                          Updated: {new Date(lastUpdated).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {tags.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Tags</h3>
                      <div className="flex flex-wrap gap-1">
                        {tags.map((tag, index) => (
                          <Chip key={index} size="sm" variant="flat">
                            {tag}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Divider className="my-4" />

              <div>
                <h3 className="text-lg font-semibold mb-2">Preview</h3>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 h-64 flex items-center justify-center">
                  <img
                    src={previewImage}
                    alt={`${title} preview`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
            </ModalBody>

            <ModalFooter className="flex justify-between">
              <div className="flex items-center gap-2">
                <Button isIconOnly variant="flat" size="sm">
                  <Heart size={16} />
                </Button>
                <Button isIconOnly variant="flat" size="sm">
                  <Share2 size={16} />
                </Button>
                {price > 0 ? (
                  <Chip color="primary">${price}</Chip>
                ) : (
                  <Chip color="success">Free</Chip>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => onInstall(template)}
                  isLoading={isInstalling}
                  isDisabled={isInstalled}
                  startContent={
                    isInstalled ? (
                      <CheckCircle size={16} />
                    ) : (
                      <Download size={16} />
                    )
                  }
                >
                  {isInstalled
                    ? "Used"
                    : isInstalling
                    ? "Using..."
                    : "Use Template"}
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
