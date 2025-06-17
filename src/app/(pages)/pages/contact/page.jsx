// contactSettingsPage.js
"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Card,
  CardBody,
  Input,
  Textarea,
  Button,
  Switch,
  Tabs,
  Tab,
  Checkbox,
  Select,
  SelectItem,
  Divider,
  Tooltip,
} from "@nextui-org/react";
import { 
  Save, 
  RotateCcw, 
  MapPin, 
  Mail, 
  PhoneCall, 
  Settings, 
  FormInput, 
  Map, 
  Plus, 
  Trash2,
  Eye,
  EyeOff
} from "lucide-react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/components/animations";
import ColorPicker from "@/components/homePage/ColorPicker";

const ContactSettingsPage = () => {
  const t = useTranslations("ContactSettings");
  const [activeTab, setActiveTab] = useState("general");
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [contactSettings, setContactSettings] = useState({
    general: {
      title: "Contact Us",
      description: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
      showContactInfo: true,
      showMap: true,
    },
    contactInfo: {
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "91234",
        showAddress: true,
      },
      email: "info@example.com",
      showEmail: true,
      phone: "+1 (555) 123-4567",
      showPhone: true,
    },
    formFields: [
      { id: 1, type: "text", name: "name", label: "Name", required: true, enabled: true },
      { id: 2, type: "email", name: "email", label: "Email", required: true, enabled: true },
      { id: 3, type: "text", name: "subject", label: "Subject", required: true, enabled: true },
      { id: 4, type: "textarea", name: "message", label: "Message", required: true, enabled: true },
    ],
    styling: {
      backgroundColor: "#ffffff",
      textColor: "#333333",
      accentColor: "#0070f3",
      borderRadius: "medium",
      formPosition: "left", // left, right, center
    },
    map: {
      latitude: 37.7749,
      longitude: -122.4194,
      zoom: 13,
      apiKey: "",
      height: 400,
    },
    notifications: {
      emailNotifications: true,
      notificationEmail: "admin@example.com",
      sendAutoReply: true,
      autoReplySubject: "Thank you for contacting us",
      autoReplyMessage: "We've received your message and will get back to you shortly.",
    }
  });

  const handleGeneralChange = (key, value) => {
    setContactSettings({
      ...contactSettings,
      general: {
        ...contactSettings.general,
        [key]: value,
      },
    });
  };

  const handleContactInfoChange = (key, value) => {
    setContactSettings({
      ...contactSettings,
      contactInfo: {
        ...contactSettings.contactInfo,
        [key]: value,
      },
    });
  };

  const handleAddressChange = (key, value) => {
    setContactSettings({
      ...contactSettings,
      contactInfo: {
        ...contactSettings.contactInfo,
        address: {
          ...contactSettings.contactInfo.address,
          [key]: value,
        },
      },
    });
  };

  const handleStylingChange = (key, value) => {
    setContactSettings({
      ...contactSettings,
      styling: {
        ...contactSettings.styling,
        [key]: value,
      },
    });
  };

  const handleMapChange = (key, value) => {
    setContactSettings({
      ...contactSettings,
      map: {
        ...contactSettings.map,
        [key]: value,
      },
    });
  };

  const handleNotificationsChange = (key, value) => {
    setContactSettings({
      ...contactSettings,
      notifications: {
        ...contactSettings.notifications,
        [key]: value,
      },
    });
  };

  const handleFormFieldChange = (id, key, value) => {
    const updatedFields = contactSettings.formFields.map(field => 
      field.id === id ? { ...field, [key]: value } : field
    );
    setContactSettings({
      ...contactSettings,
      formFields: updatedFields,
    });
  };

  const handleAddFormField = () => {
    const newId = Math.max(...contactSettings.formFields.map(f => f.id), 0) + 1;
    const newField = {
      id: newId,
      type: "text",
      name: `field_${newId}`,
      label: "New Field",
      required: false,
      enabled: true,
    };
    
    setContactSettings({
      ...contactSettings,
      formFields: [...contactSettings.formFields, newField],
    });
  };

  const handleRemoveFormField = (id) => {
    setContactSettings({
      ...contactSettings,
      formFields: contactSettings.formFields.filter(field => field.id !== id),
    });
  };

  const handleResetToDefaults = () => {
    setIsLoading(true);
    setTimeout(() => {
      setContactSettings({
        general: {
          title: "Contact Us",
          description: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
          showContactInfo: true,
          showMap: true,
        },
        contactInfo: {
          address: {
            street: "123 Main St",
            city: "Anytown",
            state: "CA",
            zip: "91234",
            showAddress: true,
          },
          email: "info@example.com",
          showEmail: true,
          phone: "+1 (555) 123-4567",
          showPhone: true,
        },
        formFields: [
          { id: 1, type: "text", name: "name", label: "Name", required: true, enabled: true },
          { id: 2, type: "email", name: "email", label: "Email", required: true, enabled: true },
          { id: 3, type: "text", name: "subject", label: "Subject", required: true, enabled: true },
          { id: 4, type: "textarea", name: "message", label: "Message", required: true, enabled: true },
        ],
        styling: {
          backgroundColor: "#ffffff",
          textColor: "#333333",
          accentColor: "#0070f3",
          borderRadius: "medium",
          formPosition: "left",
        },
        map: {
          latitude: 37.7749,
          longitude: -122.4194,
          zoom: 13,
          apiKey: "",
          height: 400,
        },
        notifications: {
          emailNotifications: true,
          notificationEmail: "admin@example.com",
          sendAutoReply: true,
          autoReplySubject: "Thank you for contacting us",
          autoReplyMessage: "We've received your message and will get back to you shortly.",
        }
      });
      setIsLoading(false);
    }, 500);
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // In a real application, save the settings to your backend (API call)
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate saving
      alert(t("settingsSavedSuccess") || "Settings saved successfully"); // Replace with a notification library
    } catch (error) {
      console.error("Error saving settings:", error);
      alert(t("settingsSaveError") || "Error saving settings"); // Display error message
    } finally {
      setIsSaving(false);
    }
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6 p-6"
    >
      {/* Header Section */}
      <motion.div
        variants={itemVariants}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t("title") || "Contact Page Settings"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t("description") || "Customize your contact page appearance and functionality"}
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            color="primary"
            variant="flat"
            startContent={showPreview ? <EyeOff size={18} /> : <Eye size={18} />}
            onPress={togglePreview}
          >
            {showPreview ? t("hidePreview") || "Hide Preview" : t("showPreview") || "Show Preview"}
          </Button>
          <Button
            color="default"
            variant="flat"
            startContent={<RotateCcw size={18} />}
            onPress={handleResetToDefaults}
            isLoading={isLoading}
          >
            {t("resetToDefaults") || "Reset to Defaults"}
          </Button>
          <Button
            color="primary"
            startContent={<Save size={18} />}
            onPress={handleSaveSettings}
            isLoading={isSaving}
          >
            {t("saveChanges") || "Save Changes"}
          </Button>
        </div>
      </motion.div>

      {/* Settings Tabs */}
      <motion.div variants={itemVariants}>
        <Tabs
          aria-label="Contact Page Settings Tabs"
          selectedKey={activeTab}
          onSelectionChange={setActiveTab}
          color="primary"
          variant="underlined"
          classNames={{
            tabList:
              "gap-6 w-full relative rounded-none p-0 border-b border-divider",
            cursor: "w-full bg-primary",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-primary",
          }}
        >
          <Tab
            key="general"
            title={
              <div className="flex items-center gap-2">
                <Settings size={18} />
                <span>{t("generalTab") || "General"}</span>
              </div>
            }
          />
          <Tab
            key="form"
            title={
              <div className="flex items-center gap-2">
                <FormInput size={18} />
                <span>{t("formFieldsTab") || "Form Fields"}</span>
              </div>
            }
          />
          <Tab
            key="contactInfo"
            title={
              <div className="flex items-center gap-2">
                <Mail size={18} />
                <span>{t("contactInfoTab") || "Contact Info"}</span>
              </div>
            }
          />
          <Tab
            key="map"
            title={
              <div className="flex items-center gap-2">
                <Map size={18} />
                <span>{t("mapTab") || "Map"}</span>
              </div>
            }
          />
          <Tab
            key="styling"
            title={
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="4"></circle>
                  <line x1="21.17" y1="8" x2="12" y2="8"></line>
                  <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
                  <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
                </svg>
                <span>{t("stylingTab") || "Styling"}</span>
              </div>
            }
          />
          <Tab
            key="notifications"
            title={
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path>
                </svg>
                <span>{t("notificationsTab") || "Notifications"}</span>
              </div>
            }
          />
        </Tabs>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Tab Content */}
        <motion.div
          variants={itemVariants}
          className={`${showPreview ? "w-full md:w-1/2" : "w-full"} bg-content1 p-6 rounded-xl shadow-sm`}
        >
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* General Settings */}
            {activeTab === "general" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">{t("generalSettings") || "General Settings"}</h3>
                
                <Input
                  label={t("pageTitle") || "Page Title"}
                  value={contactSettings.general.title}
                  onChange={(e) => handleGeneralChange("title", e.target.value)}
                  variant="bordered"
                />
                
                <Textarea
                  label={t("pageDescription") || "Page Description"}
                  value={contactSettings.general.description}
                  onChange={(e) => handleGeneralChange("description", e.target.value)}
                  variant="bordered"
                  minRows={3}
                />
                
                <div className="flex flex-col gap-4">
                  <Switch
                    isSelected={contactSettings.general.showContactInfo}
                    onValueChange={(value) => handleGeneralChange("showContactInfo", value)}
                  >
                    {t("showContactInfo") || "Show Contact Information"}
                  </Switch>
                  
                  <Switch
                    isSelected={contactSettings.general.showMap}
                    onValueChange={(value) => handleGeneralChange("showMap", value)}
                  >
                    {t("showMap") || "Show Map"}
                  </Switch>
                </div>
              </div>
            )}
            
            {/* Form Fields Settings */}
            {activeTab === "form" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{t("formFields") || "Form Fields"}</h3>
                  <Button
                    color="primary"
                    variant="flat"
                    startContent={<Plus size={16} />}
                    onPress={handleAddFormField}
                    size="sm"
                  >
                    {t("addField") || "Add Field"}
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {contactSettings.formFields.map((field) => (
                    <Card key={field.id} className="p-3">
                      <CardBody className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h5 className="text-sm font-medium">
                            {field.label} ({field.type})
                          </h5>
                          <div className="flex gap-2">
                            <Switch
                              size="sm"
                              isSelected={field.enabled}
                              onValueChange={(value) => handleFormFieldChange(field.id, "enabled", value)}
                            >
                              {field.enabled ? t("enabled") || "Enabled" : t("disabled") || "Disabled"}
                            </Switch>
                            <Tooltip content={t("removeField") || "Remove Field"}>
                              <Button
                                color="danger"
                                variant="light"
                                size="sm"
                                isIconOnly
                                onPress={() => handleRemoveFormField(field.id)}
                                isDisabled={contactSettings.formFields.length <= 1}
                              >
                                <Trash2 size={16} />
                              </Button>
                            </Tooltip>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <Input
                            label={t("fieldLabel") || "Field Label"}
                            value={field.label}
                            onChange={(e) => handleFormFieldChange(field.id, "label", e.target.value)}
                            size="sm"
                            variant="bordered"
                          />
                          
                          <Input
                            label={t("fieldName") || "Field Name"}
                            value={field.name}
                            onChange={(e) => handleFormFieldChange(field.id, "name", e.target.value)}
                            size="sm"
                            variant="bordered"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <Select
                            label={t("fieldType") || "Field Type"}
                            selectedKeys={[field.type]}
                            onChange={(e) => handleFormFieldChange(field.id, "type", e.target.value)}
                            size="sm"
                            variant="bordered"
                          >
                            <SelectItem key="text" value="text">{t("text") || "Text"}</SelectItem>
                            <SelectItem key="email" value="email">{t("email") || "Email"}</SelectItem>
                            <SelectItem key="tel" value="tel">{t("phone") || "Phone"}</SelectItem>
                            <SelectItem key="textarea" value="textarea">{t("textarea") || "Text Area"}</SelectItem>
                            <SelectItem key="select" value="select">{t("dropdown") || "Dropdown"}</SelectItem>
                            <SelectItem key="checkbox" value="checkbox">{t("checkbox") || "Checkbox"}</SelectItem>
                          </Select>
                          
                          <div className="flex items-center h-full">
                            <Checkbox
                              isSelected={field.required}
                              onValueChange={(value) => handleFormFieldChange(field.id, "required", value)}
                            >
                              {t("required") || "Required Field"}
                            </Checkbox>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {/* Contact Info Settings */}
            {activeTab === "contactInfo" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">{t("contactInformation") || "Contact Information"}</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-md font-medium">{t("address") || "Address"}</h4>
                    <Switch
                      isSelected={contactSettings.contactInfo.address.showAddress}
                      onValueChange={(value) => handleAddressChange("showAddress", value)}
                    >
                      {t("show") || "Show"}
                    </Switch>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      label={t("street") || "Street"}
                      value={contactSettings.contactInfo.address.street}
                      onChange={(e) => handleAddressChange("street", e.target.value)}
                      variant="bordered"
                    />
                    
                    <Input
                      label={t("city") || "City"}
                      value={contactSettings.contactInfo.address.city}
                      onChange={(e) => handleAddressChange("city", e.target.value)}
                      variant="bordered"
                    />
                    
                    <Input
                      label={t("state") || "State/Province"}
                      value={contactSettings.contactInfo.address.state}
                      onChange={(e) => handleAddressChange("state", e.target.value)}
                      variant="bordered"
                    />
                    
                    <Input
                      label={t("zip") || "ZIP/Postal Code"}
                      value={contactSettings.contactInfo.address.zip}
                      onChange={(e) => handleAddressChange("zip", e.target.value)}
                      variant="bordered"
                    />
                  </div>
                </div>
                
                <Divider />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-md font-medium">{t("email") || "Email"}</h4>
                    <Switch
                      isSelected={contactSettings.contactInfo.showEmail}
                      onValueChange={(value) => handleContactInfoChange("showEmail", value)}
                    >
                      {t("show") || "Show"}
                    </Switch>
                  </div>
                  
                  <Input
                    label={t("emailAddress") || "Email Address"}
                    value={contactSettings.contactInfo.email}
                    onChange={(e) => handleContactInfoChange("email", e.target.value)}
                    variant="bordered"
                  />
                </div>
                
                <Divider />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-md font-medium">{t("phone") || "Phone"}</h4>
                    <Switch
                      isSelected={contactSettings.contactInfo.showPhone}
                      onValueChange={(value) => handleContactInfoChange("showPhone", value)}
                    >
                      {t("show") || "Show"}
                    </Switch>
                  </div>
                  
                  <Input
                    label={t("phoneNumber") || "Phone Number"}
                    value={contactSettings.contactInfo.phone}
                    onChange={(e) => handleContactInfoChange("phone", e.target.value)}
                    variant="bordered"
                  />
                </div>
              </div>
            )}
            
            {/* Map Settings */}
            {activeTab === "map" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">{t("mapSettings") || "Map Settings"}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="number"
                    label={t("latitude") || "Latitude"}
                    value={contactSettings.map.latitude.toString()}
                    onChange={(e) => handleMapChange("latitude", parseFloat(e.target.value))}
                    variant="bordered"
                  />
                  
                  <Input
                    type="number"
                    label={t("longitude") || "Longitude"}
                    value={contactSettings.map.longitude.toString()}
                    onChange={(e) => handleMapChange("longitude", parseFloat(e.target.value))}
                    variant="bordered"
                  />
                </div>
                
                <Input
                  type="number"
                  label={t("zoom") || "Zoom Level (1-20)"}
                  value={contactSettings.map.zoom.toString()}
                  onChange={(e) => handleMapChange("zoom", parseInt(e.target.value))}
                  min={1}
                  max={20}
                  variant="bordered"
                />
                
                <Input
                  type="number"
                  label={t("mapHeight") || "Map Height (px)"}
                  value={contactSettings.map.height.toString()}
                  onChange={(e) => handleMapChange("height", parseInt(e.target.value))}
                  min={200}
                  max={800}
                  variant="bordered"
                />
                
                <Input
                  label={t("mapApiKey") || "Map API Key (optional)"}
                  value={contactSettings.map.apiKey}
                  onChange={(e) => handleMapChange("apiKey", e.target.value)}
                  variant="bordered"
                />
                
                <div className="bg-default-100 p-4 rounded-lg">
                  <p className="text-sm text-default-600">
                    {t("mapApiKeyInfo") || "For Google Maps, you'll need to provide an API key. For OpenStreetMap, no API key is required."}
                  </p>
                </div>
              </div>
            )}
            
            {/* Styling Settings */}
            {activeTab === "styling" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">{t("stylingSettings") || "Styling Settings"}</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{t("backgroundColor") || "Background Color"}</p>
                    <ColorPicker
                      value={contactSettings.styling.backgroundColor}
                      onChange={(color) => handleStylingChange("backgroundColor", color)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{t("textColor") || "Text Color"}</p>
                    <ColorPicker
                      value={contactSettings.styling.textColor}
                      onChange={(color) => handleStylingChange("textColor", color)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{t("accentColor") || "Accent Color"}</p>
                    <ColorPicker
                      value={contactSettings.styling.accentColor}
                      onChange={(color) => handleStylingChange("accentColor", color)}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Select
                    label={t("borderRadius") || "Border Radius"}
                    selectedKeys={[contactSettings.styling.borderRadius]}
                    onChange={(e) => handleStylingChange("borderRadius", e.target.value)}
                    variant="bordered"
                  >
                    <SelectItem key="none" value="none">{t("none") || "None"}</SelectItem>
                    <SelectItem key="small" value="small">{t("small") || "Small"}</SelectItem>
                    <SelectItem key="medium" value="medium">{t("medium") || "Medium"}</SelectItem>
                    <SelectItem key="large" value="large">{t("large") || "Large"}</SelectItem>
                  </Select>
                  
                  <Select
                    label={t("formPosition") || "Form Position"}
                    selectedKeys={[contactSettings.styling.formPosition]}
                    onChange={(e) => handleStylingChange("formPosition", e.target.value)}
                    variant="bordered"
                  >
                    <SelectItem key="left" value="left">{t("left") || "Left"}</SelectItem>
                    <SelectItem key="right" value="right">{t("right") || "Right"}</SelectItem>
                    <SelectItem key="center" value="center">{t("center") || "Center (Full Width)"}</SelectItem>
                  </Select>
                </div>
              </div>
            )}
            
            {/* Notifications Settings */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">{t("notificationSettings") || "Notification Settings"}</h3>
                
                <div className="space-y-4">
                  <Switch
                    isSelected={contactSettings.notifications.emailNotifications}
                    onValueChange={(value) => handleNotificationsChange("emailNotifications", value)}
                  >
                    {t("receiveEmailNotifications") || "Receive Email Notifications"}
                  </Switch>
                  
                  {contactSettings.notifications.emailNotifications && (
                    <Input
                      label={t("notificationEmail") || "Notification Email"}
                      value={contactSettings.notifications.notificationEmail}
                      onChange={(e) => handleNotificationsChange("notificationEmail", e.target.value)}
                      variant="bordered"
                    />
                  )}
                </div>
                
                <Divider />
                
                <div className="space-y-4">
                  <Switch
                    isSelected={contactSettings.notifications.sendAutoReply}
                    onValueChange={(value) => handleNotificationsChange("sendAutoReply", value)}
                  >
                    {t("sendAutoReply") || "Send Auto-Reply to User"}
                  </Switch>
                  
                  {contactSettings.notifications.sendAutoReply && (
                    <>
                      <Input
                        label={t("autoReplySubject") || "Auto-Reply Subject"}
                        value={contactSettings.notifications.autoReplySubject}
                        onChange={(e) => handleNotificationsChange("autoReplySubject", e.target.value)}
                        variant="bordered"
                      />
                      
                      <Textarea
                        label={t("autoReplyMessage") || "Auto-Reply Message"}
                        value={contactSettings.notifications.autoReplyMessage}
                        onChange={(e) => handleNotificationsChange("autoReplyMessage", e.target.value)}
                        variant="bordered"
                        minRows={4}
                      />
                    </>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Preview Section */}
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full md:w-1/2 bg-content1 p-6 rounded-xl shadow-sm"
          >
            <h3 className="text-lg font-semibold mb-4">{t("preview") || "Preview"}</h3>
            
            <div className="border border-divider rounded-lg overflow-hidden">
              <div 
                className="p-6"
                style={{
                  backgroundColor: contactSettings.styling.backgroundColor,
                  color: contactSettings.styling.textColor,
                }}
              >
                <h2 className="text-2xl font-bold mb-2" style={{ color: contactSettings.styling.textColor }}>
                  {contactSettings.general.title}
                </h2>
                <p className="mb-6" style={{ color: contactSettings.styling.textColor }}>
                  {contactSettings.general.description}
                </p>
                
                <div className={`flex flex-col ${contactSettings.styling.formPosition === 'center' ? '' : 'md:flex-row'} gap-6`}>
                  {/* Form Preview */}
                  <div className={`
                    ${contactSettings.styling.formPosition === 'right' ? 'md:order-2' : ''} 
                    ${contactSettings.styling.formPosition === 'center' ? 'w-full' : 'w-full md:w-1/2'}
                  `}>
                    <div className="space-y-4">
                      {contactSettings.formFields
                        .filter(field => field.enabled)
                        .map(field => (
                          <div key={field.id} className="space-y-2">
                            <label className="block text-sm font-medium">
                              {field.label} {field.required && <span className="text-red-500">*</span>}
                            </label>
                            {field.type === 'textarea' ? (
                              <textarea 
                                className="w-full p-2 border rounded-md" 
                                style={{ 
                                  borderRadius: 
                                    contactSettings.styling.borderRadius === 'small' ? '0.25rem' : 
                                    contactSettings.styling.borderRadius === 'medium' ? '0.5rem' : 
                                    contactSettings.styling.borderRadius === 'large' ? '1rem' : '0'
                                }}
                                rows={4}
                                disabled
                              />
                            ) : (
                              <input 
                                type={field.type} 
                                className="w-full p-2 border rounded-md" 
                                style={{ 
                                  borderRadius: 
                                    contactSettings.styling.borderRadius === 'small' ? '0.25rem' : 
                                    contactSettings.styling.borderRadius === 'medium' ? '0.5rem' : 
                                    contactSettings.styling.borderRadius === 'large' ? '1rem' : '0'
                                }}
                                disabled
                              />
                            )}
                          </div>
                        ))}
                      
                      <button 
                        className="px-4 py-2 text-white rounded-md"
                        style={{ 
                          backgroundColor: contactSettings.styling.accentColor,
                          borderRadius: 
                            contactSettings.styling.borderRadius === 'small' ? '0.25rem' : 
                            contactSettings.styling.borderRadius === 'medium' ? '0.5rem' : 
                            contactSettings.styling.borderRadius === 'large' ? '1rem' : '0'
                        }}
                      >
                        {t("sendMessage") || "Send Message"}
                      </button>
                    </div>
                  </div>
                  
                  {/* Contact Info Preview */}
                  {contactSettings.general.showContactInfo && (
                    <div className={`
                      ${contactSettings.styling.formPosition === 'right' ? 'md:order-1' : ''} 
                      ${contactSettings.styling.formPosition === 'center' ? 'w-full' : 'w-full md:w-1/2'}
                    `}>
                      <div className="space-y-4">
                        {contactSettings.contactInfo.address.showAddress && (
                          <div className="flex items-start gap-3">
                            <MapPin size={20} style={{ color: contactSettings.styling.accentColor }} />
                            <div>
                              <h4 className="font-medium" style={{ color: contactSettings.styling.textColor }}>
                                {t("address") || "Address"}
                              </h4>
                              <p style={{ color: contactSettings.styling.textColor }}>
                                {contactSettings.contactInfo.address.street}<br />
                                {contactSettings.contactInfo.address.city}, {contactSettings.contactInfo.address.state} {contactSettings.contactInfo.address.zip}
                              </p>
                            </div>
                          </div>
                        )}
                        
                        {contactSettings.contactInfo.showEmail && (
                          <div className="flex items-start gap-3">
                            <Mail size={20} style={{ color: contactSettings.styling.accentColor }} />
                            <div>
                              <h4 className="font-medium" style={{ color: contactSettings.styling.textColor }}>
                                {t("email") || "Email"}
                              </h4>
                              <p style={{ color: contactSettings.styling.textColor }}>
                                {contactSettings.contactInfo.email}
                              </p>
                            </div>
                          </div>
                        )}
                        
                        {contactSettings.contactInfo.showPhone && (
                          <div className="flex items-start gap-3">
                            <PhoneCall size={20} style={{ color: contactSettings.styling.accentColor }} />
                            <div>
                              <h4 className="font-medium" style={{ color: contactSettings.styling.textColor }}>
                                {t("phone") || "Phone"}
                              </h4>
                              <p style={{ color: contactSettings.styling.textColor }}>
                                {contactSettings.contactInfo.phone}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Map Preview */}
                {contactSettings.general.showMap && (
                  <div className="mt-6">
                    <div 
                      className="w-full bg-gray-200 flex items-center justify-center"
                      style={{ 
                        height: `${contactSettings.map.height}px`,
                        borderRadius: 
                          contactSettings.styling.borderRadius === 'small' ? '0.25rem' : 
                          contactSettings.styling.borderRadius === 'medium' ? '0.5rem' : 
                          contactSettings.styling.borderRadius === 'large' ? '1rem' : '0'
                      }}
                    >
                      <p className="text-gray-500">
                        {t("mapPreview") || "Map Preview"} ({contactSettings.map.latitude}, {contactSettings.map.longitude})
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ContactSettingsPage;