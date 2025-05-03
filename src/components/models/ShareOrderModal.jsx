// components/modals/ShareOrderModal.jsx
"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Tabs,
  Tab,
  Card,
  CardBody,
  Tooltip,
} from "@nextui-org/react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Send,
  Mail,
  Copy,
  Phone,
  Link as LinkIcon,
} from "lucide-react";

const ShareOrderModal = ({ isOpen, onOpenChange, order }) => {
  const [activeTab, setActiveTab] = useState("social");
  const [copied, setCopied] = useState(false);

  // Generate sharing URL and text
  const shareUrl = `${window.location.origin}/orders/${order?.id}`;
  const shareTitle = `Order #${order?.id} Details`;
  const shareMessage = `Check out order #${order?.id} with ${order?.order_products?.length} products, total amount: ${order?.invoices?.[0]?.total}`;

  // Copy to clipboard function
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Social sharing functions
  const shareToWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage + '\n' + shareUrl)}`, '_blank');
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareToLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareToTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareMessage)}`, '_blank');
  };

  const shareToEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareMessage + '\n\n' + shareUrl)}`;
  };

  const socialButtons = [
    {
      onClick: shareToWhatsApp,
      icon: <Phone size={20} />,
      label: "WhatsApp",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      onClick: shareToFacebook,
      icon: <Facebook size={20} />,
      label: "Facebook",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      onClick: shareToTwitter,
      icon: <Twitter size={20} />,
      label: "Twitter",
      color: "bg-sky-500 hover:bg-sky-600",
    },
    {
      onClick: shareToLinkedIn,
      icon: <Linkedin size={20} />,
      label: "LinkedIn",
      color: "bg-blue-700 hover:bg-blue-800",
    },
    {
      onClick: shareToTelegram,
      icon: <Send size={20} />,
      label: "Telegram",
      color: "bg-blue-400 hover:bg-blue-500",
    },
    {
      onClick: shareToEmail,
      icon: <Mail size={20} />,
      label: "Email",
      color: "bg-gray-500 hover:bg-gray-600",
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="md"
      placement="center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Share Order #{order?.id}
            </ModalHeader>
            <ModalBody>
              <Tabs
                selectedKey={activeTab}
                onSelectionChange={setActiveTab}
                aria-label="Share options"
              >
                <Tab key="social" title="Social Media">
                  <Card>
                    <CardBody>
                      <div className="grid grid-cols-3 gap-4">
                        {socialButtons.map(
                          ({ onClick, icon, label, color }, index) => (
                            <Button
                              key={index}
                              className={`w-full ${color} text-white`}
                              startContent={icon}
                              onPress={onClick}
                            >
                              {label}
                            </Button>
                          )
                        )}
                      </div>
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="link" title="Copy Link">
                  <Card>
                    <CardBody>
                      <div className="flex flex-col gap-4">
                        <Input
                          label="Share URL"
                          value={shareUrl}
                          readOnly
                          endContent={
                            <Button
                              isIconOnly
                              variant="light"
                              onPress={handleCopyLink}
                            >
                              {copied ? (
                                <Tooltip content="Copied!">
                                  <LinkIcon
                                    size={20}
                                    className="text-success"
                                  />
                                </Tooltip>
                              ) : (
                                <Tooltip content="Copy link">
                                  <Copy size={20} />
                                </Tooltip>
                              )}
                            </Button>
                          }
                        />
                        <div className="text-sm text-default-400">
                          Share this link with others to show them this order.
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ShareOrderModal;