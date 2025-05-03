"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { 
  Button, 
  Input, 
  Switch,
  Card, 
  CardBody,
  Select,
  SelectItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Chip
} from "@nextui-org/react";
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Eye, 
  EyeOff,
  ChevronUp,
  ChevronDown,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Github,
  Globe,
  Share2
} from "lucide-react";

const SocialSettings = ({ settings, updateSettings }) => {
  const t = useTranslations("FooterSettings.socialSettings");
  const [editingSocial, setEditingSocial] = useState(null);
  const [newSocial, setNewSocial] = useState({ platform: "", url: "", isVisible: true });
  
  const socialIcons = {
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
    linkedin: Linkedin,
    youtube: Youtube,
    github: Github,
    website: Globe,
    other: Share2
  };
  
  const handleAddSocial = () => {
    if (newSocial.platform && newSocial.url) {
      const updatedSocials = [
        ...settings.socialLinks,
        { 
          id: Date.now().toString(), 
          ...newSocial
        }
      ];
      updateSettings({ socialLinks: updatedSocials });
      setNewSocial({ platform: "", url: "", isVisible: true });
    }
  };
  
  const handleRemoveSocial = (socialId) => {
    const updatedSocials = settings.socialLinks.filter(social => social.id !== socialId);
    updateSettings({ socialLinks: updatedSocials });
  };
  
  const handleToggleSocialVisibility = (socialId) => {
    const updatedSocials = settings.socialLinks.map(social => {
      if (social.id === socialId) {
        return { ...social, isVisible: !social.isVisible };
      }
      return social;
    });
    updateSettings({ socialLinks: updatedSocials });
  };
  
  const handleEditSocial = (social) => {
    setEditingSocial(social);
  };
  
  const handleUpdateSocial = () => {
    if (editingSocial && editingSocial.platform && editingSocial.url) {
      const updatedSocials = settings.socialLinks.map(social => {
        if (social.id === editingSocial.id) {
          return { 
            ...social, 
            platform: editingSocial.platform,
            url: editingSocial.url
          };
        }
        return social;
      });
      
      updateSettings({ socialLinks: updatedSocials });
      setEditingSocial(null);
    }
  };
  
  const handleMoveSocial = (socialId, direction) => {
    const socialIndex = settings.socialLinks.findIndex(social => social.id === socialId);
    
    if (
      (direction === "up" && socialIndex === 0) || 
      (direction === "down" && socialIndex === settings.socialLinks.length - 1)
    ) {
      return;
    }
    
    const newIndex = direction === "up" ? socialIndex - 1 : socialIndex + 1;
    const updatedSocials = [...settings.socialLinks];
    const [movedSocial] = updatedSocials.splice(socialIndex, 1);
    updatedSocials.splice(newIndex, 0, movedSocial);
    
    updateSettings({ socialLinks: updatedSocials });
  };
  
  const renderSocialIcon = (platform) => {
    const Icon = socialIcons[platform] || socialIcons.other;
    return <Icon size={18} />;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">{t("socialLinks")}</h3>
          <Card className="mb-6">
            <CardBody className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-md font-medium">{t("manageSocialLinks")}</h4>
                <Button 
                  size="sm" 
                  color="primary" 
                  startContent={<Plus size={16} />}
                  onPress={() => setNewSocial({ platform: "", url: "", isVisible: true })}
                >
                  {t("addSocialLink")}
                </Button>
              </div>
              
              {newSocial && newSocial.platform !== undefined && (
                <div className="p-4 border border-default-200 rounded-lg mb-4">
                  <h4 className="text-md font-medium mb-3">{t("newSocialLink")}</h4>
                  <div className="space-y-4 mb-4">
                    <Select 
                      label={t("platform")} 
                      placeholder={t("selectPlatform")}
                      value={newSocial.platform}
                      onChange={(e) => setNewSocial({...newSocial, platform: e.target.value})}
                    >
                      <SelectItem key="facebook" value="facebook">Facebook</SelectItem>
                      <SelectItem key="twitter" value="twitter">Twitter</SelectItem>
                      <SelectItem key="instagram" value="instagram">Instagram</SelectItem>
                      <SelectItem key="linkedin" value="linkedin">LinkedIn</SelectItem>
                      <SelectItem key="youtube" value="youtube">YouTube</SelectItem>
                      <SelectItem key="github" value="github">GitHub</SelectItem>
                      <SelectItem key="website" value="website">{t("website")}</SelectItem>
                      <SelectItem key="other" value="other">{t("other")}</SelectItem>
                    </Select>
                    <Input
                      label={t("url")}
                      placeholder={t("enterUrl")}
                      value={newSocial.url}
                      onChange={(e) => setNewSocial({...newSocial, url: e.target.value})}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="flat" 
                      onPress={() => setNewSocial({ platform: undefined, url: "", isVisible: true })}
                    >
                      {t("cancel")}
                    </Button>
                    <Button 
                      color="primary"
                      onPress={handleAddSocial}
                    >
                      {t("add")}
                    </Button>
                  </div>
                </div>
              )}
              
              {editingSocial && (
                <div className="p-4 border border-default-200 rounded-lg mb-4">
                  <h4 className="text-md font-medium mb-3">{t("editSocialLink")}</h4>
                  <div className="space-y-4 mb-4">
                    <Select 
                      label={t("platform")} 
                      placeholder={t("selectPlatform")}
                      value={editingSocial.platform}
                      onChange={(e) => setEditingSocial({...editingSocial, platform: e.target.value})}
                    >
                      <SelectItem key="facebook" value="facebook">Facebook</SelectItem>
                      <SelectItem key="twitter" value="twitter">Twitter</SelectItem>
                      <SelectItem key="instagram" value="instagram">Instagram</SelectItem>
                      <SelectItem key="linkedin" value="linkedin">LinkedIn</SelectItem>
                      <SelectItem key="youtube" value="youtube">YouTube</SelectItem>
                      <SelectItem key="github" value="github">GitHub</SelectItem>
                      <SelectItem key="website" value="website">{t("website")}</SelectItem>
                      <SelectItem key="other" value="other">{t("other")}</SelectItem>
                    </Select>
                    <Input
                      label={t("url")}
                      placeholder={t("enterUrl")}
                      value={editingSocial.url}
                      onChange={(e) => setEditingSocial({...editingSocial, url: e.target.value})}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="flat" 
                      onPress={() => setEditingSocial(null)}
                    >
                      {t("cancel")}
                    </Button>
                    <Button 
                      color="primary"
                      onPress={handleUpdateSocial}
                    >
                      {t("update")}
                    </Button>
                  </div>
                </div>
              )}
              
              {settings.socialLinks.length > 0 ? (
                <Table aria-label="Social links table">
                  <TableHeader>
                    <TableColumn>{t("platform")}</TableColumn>
                    <TableColumn>{t("url")}</TableColumn>
                    <TableColumn width={140}>{t("actions")}</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {settings.socialLinks.map((social) => (
                      <TableRow key={social.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {renderSocialIcon(social.platform)}
                            <span className={social.isVisible ? "" : "text-default-400 line-through"}>
                              {social.platform.charAt(0).toUpperCase() + social.platform.slice(1)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-default-500 text-sm">{social.url}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Tooltip content={t("moveUp")}>
                              <Button 
                                isIconOnly 
                                size="sm" 
                                variant="light"
                                onPress={() => handleMoveSocial(social.id, "up")}
                              >
                                <ChevronUp size={16} />
                              </Button>
                            </Tooltip>
                            <Tooltip content={t("moveDown")}>
                              <Button 
                                isIconOnly 
                                size="sm" 
                                variant="light"
                                onPress={() => handleMoveSocial(social.id, "down")}
                              >
                                <ChevronDown size={16} />
                              </Button>
                            </Tooltip>
                            <Tooltip content={t("edit")}>
                              <Button 
                                isIconOnly 
                                size="sm" 
                                variant="light"
                                onPress={() => handleEditSocial(social)}
                              >
                                <Edit2 size={16} />
                              </Button>
                            </Tooltip>
                            <Tooltip content={social.isVisible ? t("hide") : t("show")}>
                              <Button 
                                isIconOnly 
                                size="sm" 
                                variant="light"
                                onPress={() => handleToggleSocialVisibility(social.id)}
                              >
                                {social.isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                              </Button>
                            </Tooltip>
                            <Tooltip content={t("delete")}>
                              <Button 
                                isIconOnly 
                                size="sm" 
                                variant="light" 
                                color="danger"
                                onPress={() => handleRemoveSocial(social.id)}
                              >
                                <Trash2 size={16} />
                              </Button>
                            </Tooltip>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-6 text-default-400">
                  {t("noSocialLinks")}
                </div>
              )}
            </CardBody>
          </Card>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">{t("displaySettings")}</h3>
          <Card className="mb-6">
            <CardBody className="space-y-4">
              <Select 
                label={t("socialIconsPosition")} 
                value={settings.socialIconsPosition}
                onChange={(e) => updateSettings({ socialIconsPosition: e.target.value })}
              >
                <SelectItem key="top" value="top">{t("top")}</SelectItem>
                <SelectItem key="bottom" value="bottom">{t("bottom")}</SelectItem>
                <SelectItem key="left" value="left">{t("left")}</SelectItem>
                <SelectItem key="right" value="right">{t("right")}</SelectItem>
              </Select>
              
              <Select 
                label={t("socialIconsSize")} 
                value={settings.socialIconsSize}
                onChange={(e) => updateSettings({ socialIconsSize: e.target.value })}
              >
                <SelectItem key="small" value="small">{t("small")}</SelectItem>
                <SelectItem key="medium" value="medium">{t("medium")}</SelectItem>
                <SelectItem key="large" value="large">{t("large")}</SelectItem>
              </Select>
              
              <Select 
                label={t("socialIconsStyle")} 
                value={settings.socialIconsStyle}
                onChange={(e) => updateSettings({ socialIconsStyle: e.target.value })}
              >
                <SelectItem key="filled" value="filled">{t("filled")}</SelectItem>
                <SelectItem key="outlined" value="outlined">{t("outlined")}</SelectItem>
                <SelectItem key="monochrome" value="monochrome">{t("monochrome")}</SelectItem>
                <SelectItem key="colorful" value="colorful">{t("colorful")}</SelectItem>
              </Select>
              
              <div className="flex justify-between items-center">
                <span>{t("showSocialText")}</span>
                <Switch 
                  isSelected={settings.showSocialText} 
                  onValueChange={(value) => updateSettings({ showSocialText: value })}
                />
              </div>
            </CardBody>
          </Card>
          
          <h3 className="text-lg font-semibold mb-4">{t("newsletter")}</h3>
          <Card>
            <CardBody className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{t("showNewsletter")}</p>
                  <p className="text-sm text-default-500">{t("newsletterDescription")}</p>
                </div>
                <Switch 
                  isSelected={settings.showNewsletter} 
                  onValueChange={(value) => updateSettings({ showNewsletter: value })}
                />
              </div>
              
              {settings.showNewsletter && (
                <>
                  <Input
                    label={t("newsletterTitle")}
                    placeholder={t("enterNewsletterTitle")}
                    value={settings.newsletterTitle}
                    onChange={(e) => updateSettings({ newsletterTitle: e.target.value })}
                  />
                  
                  <Input
                    label={t("newsletterSubtitle")}
                    placeholder={t("enterNewsletterSubtitle")}
                    value={settings.newsletterSubtitle}
                    onChange={(e) => updateSettings({ newsletterSubtitle: e.target.value })}
                  />
                  
                  <Input
                    label={t("buttonText")}
                    placeholder={t("enterButtonText")}
                    value={settings.newsletterButtonText}
                    onChange={(e) => updateSettings({ newsletterButtonText: e.target.value })}
                  />
                  
                  <Select 
                    label={t("newsletterPosition")} 
                    value={settings.newsletterPosition}
                    onChange={(e) => updateSettings({ newsletterPosition: e.target.value })}
                  >
                    <SelectItem key="top" value="top">{t("top")}</SelectItem>
                    <SelectItem key="bottom" value="bottom">{t("bottom")}</SelectItem>
                    <SelectItem key="left" value="left">{t("left")}</SelectItem>
                    <SelectItem key="right" value="right">{t("right")}</SelectItem>
                  </Select>
                </>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
      
      <div className="bg-content1 p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4">{t("preview")}</h3>
        <div className="border border-divider rounded-lg p-4">
          <h4 className="text-md font-medium mb-3">{t("socialIconsPreview")}</h4>
          <div className="flex items-center gap-3 mb-6">
            {settings.socialLinks
              .filter(social => social.isVisible)
              .map((social) => {
                const Icon = socialIcons[social.platform] || socialIcons.other;
                const size = {
                  small: 16,
                  medium: 20,
                  large: 24
                }[settings.socialIconsSize] || 20;
                
                return (
                  <div 
                    key={social.id} 
                    className={`flex items-center justify-center ${
                      settings.socialIconsStyle === 'filled' 
                        ? 'bg-primary text-white' 
                        : settings.socialIconsStyle === 'outlined'
                        ? 'border border-primary text-primary'
                        : settings.socialIconsStyle === 'colorful'
                        ? `bg-${social.platform} text-white`
                        : 'text-default-600'
                    } ${
                      settings.socialIconsStyle === 'monochrome' ? '' : 'rounded-full'
                    } p-2`}
                  >
                    <Icon size={size} />
                    {settings.showSocialText && (
                      <span className="ml-2 text-sm">
                        {social.platform.charAt(0).toUpperCase() + social.platform.slice(1)}
                      </span>
                    )}
                  </div>
                );
              })}
          </div>
          
          {settings.showNewsletter && (
            <div className="border border-divider rounded-lg p-4 bg-default-50">
              <h4 className="text-lg font-medium">{settings.newsletterTitle || t("defaultNewsletterTitle")}</h4>
              <p className="text-default-600 mb-3">{settings.newsletterSubtitle || t("defaultNewsletterSubtitle")}</p>
              <div className="flex gap-2">
                <Input placeholder="Email" className="max-w-xs" />
                <Button color="primary">
                  {settings.newsletterButtonText || t("defaultButtonText")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialSettings;