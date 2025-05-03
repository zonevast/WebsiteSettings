"use client";
import React, { useState, useRef } from "react";
import { Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { Upload, X, Image as ImageIcon, Link as LinkIcon } from "lucide-react";

const ImageUploader = ({ value, onChange, label, aspectRatio = "16:9" }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageUrl, setImageUrl] = useState("");
  const [uploadMethod, setUploadMethod] = useState("url");
  const fileInputRef = useRef(null);

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload the file to a server
      // Here we're just creating a local URL for preview
      const localUrl = URL.createObjectURL(file);
      setImageUrl(localUrl);
    }
  };

  const handleConfirm = () => {
    onChange(imageUrl);
    onClose();
    setImageUrl("");
  };

  const handleRemove = () => {
    onChange("");
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="space-y-2">
      {label && <span className="text-sm">{label}</span>}
      
      {value ? (
        <div className="relative group">
          <div 
            className="w-full rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800"
            style={{ aspectRatio }}
          >
            <img 
              src={value} 
              alt="Uploaded image" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/400x225?text=Image+Error";
              }}
            />
          </div>
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button 
              isIconOnly 
              color="primary" 
              variant="flat" 
              size="sm"
              onClick={onOpen}
            >
              <Upload size={16} />
            </Button>
            <Button 
              isIconOnly 
              color="danger" 
              variant="flat" 
              size="sm"
              onClick={handleRemove}
            >
              <X size={16} />
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="bordered"
          startContent={<ImageIcon size={18} />}
          className="w-full"
          onClick={onOpen}
        >
          Select Image
        </Button>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Upload Image</ModalHeader>
          <ModalBody>
            <div className="flex gap-2 mb-4">
              <Button
                variant={uploadMethod === "url" ? "solid" : "bordered"}
                color={uploadMethod === "url" ? "primary" : "default"}
                startContent={<LinkIcon size={16} />}
                onClick={() => setUploadMethod("url")}
                className="flex-1"
              >
                URL
              </Button>
              <Button
                variant={uploadMethod === "file" ? "solid" : "bordered"}
                color={uploadMethod === "file" ? "primary" : "default"}
                startContent={<Upload size={16} />}
                onClick={() => setUploadMethod("file")}
                className="flex-1"
              >
                Upload
              </Button>
            </div>

            {uploadMethod === "url" ? (
              <Input
                label="Image URL"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={handleUrlChange}
              />
            ) : (
              <div className="space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <Button
                  variant="bordered"
                  startContent={<Upload size={16} />}
                  onClick={triggerFileInput}
                  className="w-full"
                >
                  Choose File
                </Button>
                {imageUrl && (
                  <div className="text-sm text-success">File selected</div>
                )}
              </div>
            )}

            {imageUrl && (
              <div className="mt-4 border rounded-lg overflow-hidden">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-auto"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/400x225?text=Invalid+Image+URL";
                  }}
                />
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="bordered" onClick={onClose}>
              Cancel
            </Button>
            <Button color="primary" onClick={handleConfirm} isDisabled={!imageUrl}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ImageUploader;