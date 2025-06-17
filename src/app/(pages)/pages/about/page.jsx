// aboutPage.js
"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Textarea,
  Button,
  Divider,
  Tabs,
  Tab,
  Tooltip,
} from "@nextui-org/react";
import {
  Edit,
  Save,
  RotateCcw,
  Trash2,
  Plus,
  User,
  Settings,
  Palette,
  Users,
} from "lucide-react";
import { containerVariants, itemVariants } from "@/components/animations";
import ColorPicker from "@/components/homePage/ColorPicker";
import ImageUploader from "@/components/homePage/ImageUploader";

const AboutPage = () => {
  const t = useTranslations("AboutPageSettings");
  const [aboutData, setAboutData] = useState({
    title: "About Us",
    content: "We are a team of passionate individuals dedicated to...",
    imageUrl: "/images/about-us.jpg",
    backgroundColor: "#f7f7f7",
    textColor: "#333333",
    teamMembers: [
      {
        id: 1,
        name: "John Doe",
        title: "CEO",
        bio: "Experienced leader...",
        imageUrl: "/images/team-member-1.jpg",
      },
      {
        id: 2,
        name: "Jane Smith",
        title: "CTO",
        bio: "Technology enthusiast...",
        imageUrl: "/images/team-member-2.jpg",
      },
    ],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const handleChange = (key, value) => {
    setAboutData({
      ...aboutData,
      [key]: value,
    });
  };

  const handleTeamMemberChange = (index, key, value) => {
    const updatedTeamMembers = [...aboutData.teamMembers];
    updatedTeamMembers[index] = {
      ...updatedTeamMembers[index],
      [key]: value,
    };
    setAboutData({
      ...aboutData,
      teamMembers: updatedTeamMembers,
    });
  };

  const handleAddTeamMember = () => {
    const newTeamMember = {
      id: Date.now(), // Simple unique ID (consider a better solution in a real app)
      name: "",
      title: "",
      bio: "",
      imageUrl: "",
    };
    setAboutData({
      ...aboutData,
      teamMembers: [...aboutData.teamMembers, newTeamMember],
    });
  };

  const handleRemoveTeamMember = (id) => {
    const updatedTeamMembers = aboutData.teamMembers.filter(
      (member) => member.id !== id
    );
    setAboutData({
      ...aboutData,
      teamMembers: updatedTeamMembers,
    });
  };

  const handleResetToDefaults = () => {
    setIsLoading(true);
    // Replace with your default data
    setTimeout(() => {
      setAboutData({
        title: "About Us",
        content: "We are a team of passionate individuals dedicated to...",
        imageUrl: "/images/about-us.jpg",
        backgroundColor: "#f7f7f7",
        textColor: "#333333",
        teamMembers: [
          {
            id: 1,
            name: "John Doe",
            title: "CEO",
            bio: "Experienced leader...",
            imageUrl: "/images/team-member-1.jpg",
          },
          {
            id: 2,
            name: "Jane Smith",
            title: "CTO",
            bio: "Technology enthusiast...",
            imageUrl: "/images/team-member-2.jpg",
          },
        ],
      });
      setIsLoading(false);
    }, 500);
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // In a real application, save the settings to your backend (API call)
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate saving
      alert(t("settingsSavedSuccess")); // Replace with a notification library
    } catch (error) {
      console.error("Error saving settings:", error);
      alert(t("settingsSaveError")); // Display error message
    } finally {
      setIsSaving(false);
    }
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
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
            {t("title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t("aboutPageDescription")}
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            color="default"
            startContent={<RotateCcw size={18} />}
            variant="flat"
            onPress={handleResetToDefaults}
            isLoading={isLoading}
          >
            {t("resetToDefaults")}
          </Button>
          <Button
            color="primary"
            startContent={<Save size={18} />}
            variant="solid"
            onPress={handleSaveSettings}
            isLoading={isSaving}
          >
            {t("saveChanges")}
          </Button>
        </div>
      </motion.div>

      {/* Settings Tabs */}
      <motion.div variants={itemVariants}>
        <Tabs
          aria-label="About Page Tabs"
          selectedKey={activeTab}
          onSelectionChange={handleTabChange}
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
                <span>{t("generalSettings")}</span>
              </div>
            }
          />
          <Tab
            key="styling"
            title={
              <div className="flex items-center gap-2">
                <Palette size={18} />
                <span>{t("stylingSettings")}</span>
              </div>
            }
          />
          <Tab
            key="team"
            title={
              <div className="flex items-center gap-2">
                <Users size={18} />
                <span>{t("teamMembers")}</span>
              </div>
            }
          />
        </Tabs>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        variants={itemVariants}
        className="bg-content1 p-6 rounded-xl shadow-sm"
      >
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          {activeTab === "general" && (
            <div className="space-y-4">
              <Input
                label={t("pageTitle")}
                value={aboutData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                fullWidth
              />

              <Textarea
                label={t("pageContent")}
                value={aboutData.content}
                onChange={(e) => handleChange("content", e.target.value)}
                fullWidth
                minRows={4}
              />

              <div className="space-y-2">
                <p className="text-sm font-medium">{t("backgroundImage")}</p>
                <ImageUploader
                  value={aboutData.imageUrl}
                  onChange={(url) => handleChange("imageUrl", url)}
                  label={t("uploadImage")}
                />
              </div>
            </div>
          )}

          {activeTab === "styling" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">{t("backgroundColor")}</p>
                <ColorPicker
                  value={aboutData.backgroundColor}
                  onChange={(color) => handleChange("backgroundColor", color)}
                />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">{t("textColor")}</p>
                <ColorPicker
                  value={aboutData.textColor}
                  onChange={(color) => handleChange("textColor", color)}
                />
              </div>
            </div>
          )}

          {activeTab === "team" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-md font-semibold">
                  {t("teamMembersSection")}
                </h4>
                <Button
                  color="primary"
                  variant="flat"
                  startContent={<Plus size={16} />}
                  onPress={handleAddTeamMember}
                  size="sm"
                >
                  {t("addTeamMember")}
                </Button>
              </div>

              <div className="space-y-4">
                {aboutData.teamMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="p-3">
                      <CardBody className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h5 className="text-sm font-medium flex items-center gap-2">
                            <User size={16} />
                            {t("teamMember")} {index + 1}
                          </h5>
                          <Tooltip content={t("removeMember")}>
                            <Button
                              color="danger"
                              variant="light"
                              size="sm"
                              isIconOnly
                              onPress={() => handleRemoveTeamMember(member.id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </Tooltip>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <Input
                            label={t("memberName")}
                            value={member.name}
                            onChange={(e) =>
                              handleTeamMemberChange(
                                index,
                                "name",
                                e.target.value
                              )
                            }
                            size="sm"
                          />

                          <Input
                            label={t("memberTitle")}
                            value={member.title}
                            onChange={(e) =>
                              handleTeamMemberChange(
                                index,
                                "title",
                                e.target.value
                              )
                            }
                            size="sm"
                          />
                        </div>

                        <Textarea
                          label={t("memberBio")}
                          value={member.bio}
                          onChange={(e) =>
                            handleTeamMemberChange(index, "bio", e.target.value)
                          }
                          size="sm"
                          minRows={2}
                        />

                        <div className="space-y-2">
                          <p className="text-sm font-medium">
                            {t("memberImage")}
                          </p>
                          <ImageUploader
                            value={member.imageUrl}
                            onChange={(url) =>
                              handleTeamMemberChange(index, "imageUrl", url)
                            }
                            label={t("uploadImage")}
                          />
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {aboutData.teamMembers.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8 text-default-500"
                >
                  <Users size={48} className="mx-auto mb-4 opacity-50" />
                  <p>{t("noTeamMembers")}</p>
                  <p className="text-sm">
                    {t("addFirstTeamMember")}
                  </p>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AboutPage;