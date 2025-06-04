// contactPage.js
"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Textarea,
  Button,
  Divider,
  Avatar,
  Spinner,
} from "@nextui-org/react";
import { Send, MapPin, Mail, PhoneCall } from "lucide-react";
import { motion } from "framer-motion"; // Import motion

const ContactPage = () => {
  const t = useTranslations("ContactPage");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionSuccess(false);
    setSubmissionError(false);

    // Simulate API call (replace with your actual API endpoint)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate a delay
      // In a real application, you would send the `formData` to your backend API
      console.log("Form data submitted:", formData);
      setSubmissionSuccess(true);
      // Reset form after successful submission
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Submission error:", error);
      setSubmissionError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = {
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "91234",
    },
    email: "info@example.com",
    phone: "+1 (555) 123-4567",
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="w-full max-w-full">
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">{t("title")}</h3>

        <Card className="w-full">
          <CardHeader className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col">
              <p className="text-md">{t("getInTouch")}</p>
              <p className="text-small text-default-500">
                {t("contactPageDescription")}
              </p>
            </div>
          </CardHeader>

          <Divider />

          <CardBody>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Contact Form */}
              <motion.div
                variants={formVariants}
                initial="hidden"
                animate="visible"
                className="lg:w-1/2"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    type="text"
                    label={t("name")}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    variant="bordered"
                    isRequired
                  />
                  <Input
                    type="email"
                    label={t("email")}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    variant="bordered"
                    isRequired
                  />
                  <Input
                    type="text"
                    label={t("subject")}
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    variant="bordered"
                    isRequired
                  />
                  <Textarea
                    label={t("message")}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    variant="bordered"
                    minRows={4}
                    isRequired
                  />

                  <Button
                    type="submit"
                    color="primary"
                    endContent={isSubmitting ? <Spinner size="sm" /> : <Send />}
                    isDisabled={isSubmitting}
                  >
                    {isSubmitting ? t("submitting") : t("sendMessage")}
                  </Button>

                  {submissionSuccess && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md">
                      {t("submissionSuccessMessage")}
                    </div>
                  )}
                  {submissionError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md">
                      {t("submissionErrorMessage")}
                    </div>
                  )}
                </form>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                variants={formVariants}
                initial="hidden"
                animate="visible"
                className="lg:w-1/2"
              >
                <div className="space-y-6">
                  {/* Address */}
                  <Card>
                    <CardBody className="flex items-center gap-4">
                      <Avatar
                        isBordered
                        color="primary"
                        variant="shadow"
                        size="lg"
                        icon={<MapPin size={28} />}
                      />
                      <div>
                        <h5 className="text-md font-semibold">
                          {t("address")}
                        </h5>
                        <p className="text-sm">
                          {contactInfo.address.street}
                          <br />
                          {contactInfo.address.city},{" "}
                          {contactInfo.address.state}{" "}
                          {contactInfo.address.zip}
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                  {/* Email */}
                  <Card>
                    <CardBody className="flex items-center gap-4">
                      <Avatar
                        isBordered
                        color="primary"
                        variant="shadow"
                        size="lg"
                        icon={<Mail size={28} />}
                      />
                      <div>
                        <h5 className="text-md font-semibold">{t("email")}</h5>
                        <p className="text-sm">{contactInfo.email}</p>
                      </div>
                    </CardBody>
                  </Card>
                  {/* Phone */}
                  <Card>
                    <CardBody className="flex items-center gap-4">
                      <Avatar
                        isBordered
                        color="primary"
                        variant="shadow"
                        size="lg"
                        icon={<PhoneCall size={28} />}
                      />
                      <div>
                        <h5 className="text-md font-semibold">{t("phone")}</h5>
                        <p className="text-sm">{contactInfo.phone}</p>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </motion.div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;