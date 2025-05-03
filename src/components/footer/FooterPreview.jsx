"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Input, Button } from "@nextui-org/react";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Github, 
  Globe, 
  Share2 
} from "lucide-react";

const FooterPreview = ({ settings }) => {
  const t = useTranslations("FooterSettings.preview");
  
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
  
  const renderSocialIcon = (platform) => {
    const Icon = socialIcons[platform] || socialIcons.other;
    const size = {
      small: 16,
      medium: 20,
      large: 24
    }[settings.socialIconsSize] || 20;
    
    return <Icon size={size} />;
  };
  
  const renderSocialLinks = () => {
    return (
      <div className={`flex items-center gap-3 ${
        settings.socialIconsPosition === 'top' || settings.socialIconsPosition === 'bottom' 
          ? 'justify-center' 
          : 'justify-start'
      }`}>
        {settings.socialLinks
          .filter(social => social.isVisible)
          .map((social) => (
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
              } p-2 cursor-pointer hover:opacity-80 transition-opacity`}
            >
              {renderSocialIcon(social.platform)}
              {settings.showSocialText && (
                <span className="ml-2 text-sm">
                  {social.platform.charAt(0).toUpperCase() + social.platform.slice(1)}
                </span>
              )}
            </div>
          ))}
      </div>
    );
  };
  
  const renderNewsletter = () => {
    if (!settings.showNewsletter) return null;
    
    return (
      <div className="bg-default-50 p-4 rounded-lg">
        <h4 className="text-lg font-medium">
          {settings.newsletterTitle || t("defaultNewsletterTitle")}
        </h4>
        <p className="text-default-600 mb-3">
          {settings.newsletterSubtitle || t("defaultNewsletterSubtitle")}
        </p>
        <div className="flex gap-2">
          <Input placeholder="Email" className="max-w-xs" />
          <Button color="primary">
            {settings.newsletterButtonText || t("subscribe")}
          </Button>
        </div>
      </div>
    );
  };
  
  const renderColumns = () => {
    return settings.columns
      .filter(column => column.isVisible)
      .map((column) => (
        <div key={column.id} className="flex flex-col">
          <h4 className="font-medium mb-3">{column.title}</h4>
          <ul className="space-y-2">
            {column.links
              .filter(link => link.isVisible)
              .map((link) => (
                <li key={link.id}>
                  <a 
                    href={link.url} 
                    target={link.isExternal ? "_blank" : "_self"}
                    rel={link.isExternal ? "noopener noreferrer" : ""}
                    className="text-default-600 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      ));
  };
  
  const renderLogo = () => {
    if (!settings.showFooterLogo) return null;
    
    return (
      <div className="mb-4">
        {settings.footerLogoUrl ? (
          <img 
            src={settings.footerLogoUrl} 
            alt="Footer Logo" 
            className="max-h-16 object-contain"
          />
        ) : (
          <div className="bg-primary/10 text-primary font-bold p-3 rounded-lg inline-block">
            Logo
          </div>
        )}
      </div>
    );
  };
  
  const renderCopyright = () => {
    return (
      <div className="text-default-500 text-sm">
        {settings.copyrightText || `© ${new Date().getFullYear()} ${t("yourCompany")}. ${t("allRightsReserved")}`}
        {settings.additionalText && (
          <div className="mt-1">{settings.additionalText}</div>
        )}
      </div>
    );
  };
  
  // Determine the background color with fallback
  const bgColor = settings.backgroundColor || "#ffffff";
  const textColor = settings.textColor || "#333333";
  
  // Determine border style
  const getBorderStyle = () => {
    if (settings.borderStyle === "none") return "";
    if (settings.borderStyle === "top") return `border-t-${settings.borderWidth || 1} border-${settings.borderColor?.replace('#', '') || 'default-200'}`;
    if (settings.borderStyle === "all") return `border border-${settings.borderColor?.replace('#', '') || 'default-200'}`;
    return "";
  };
  
  // Determine padding based on settings
  const getPadding = () => {
    return `pt-${settings.topPadding / 4 || 6} pb-${settings.bottomPadding / 4 || 6}`;
  };
  
  // Render the footer based on the type
  const renderFooterContent = () => {
    switch (settings.footerType) {
      case "simple":
        return (
          <div className="flex flex-col items-center text-center">
            {renderLogo()}
            {settings.socialIconsPosition === "top" && renderSocialLinks()}
            {settings.newsletterPosition === "top" && renderNewsletter()}
            <div className="my-4">
              {renderCopyright()}
            </div>
            {settings.socialIconsPosition === "bottom" && renderSocialLinks()}
            {settings.newsletterPosition === "bottom" && renderNewsletter()}
          </div>
        );
        
      case "multiColumn":
        return (
          <div className="w-full">
            <div className={`grid grid-cols-1 md:grid-cols-${settings.columnCount || 3} gap-${settings.columnSpacing / 4 || 6} mb-8`}>
              <div className="col-span-1">
                {renderLogo()}
                {settings.socialIconsPosition === "left" && renderSocialLinks()}
                {settings.newsletterPosition === "left" && renderNewsletter()}
              </div>
              
              {renderColumns()}
              
              {(settings.socialIconsPosition === "right" || settings.newsletterPosition === "right") && (
                <div className="col-span-1">
                  {settings.socialIconsPosition === "right" && renderSocialLinks()}
                  {settings.newsletterPosition === "right" && renderNewsletter()}
                </div>
              )}
            </div>
            
            <div className={`border-t border-default-200 pt-6 ${
              settings.stackOnMobile ? 'text-center md:text-left' : 'text-left'
            }`}>
              {renderCopyright()}
            </div>
          </div>
        );
        
      case "complex":
        return (
          <div className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start mb-8">
              <div className="mb-6 md:mb-0">
                {renderLogo()}
                <div className="max-w-md mb-4">
                  <p className="text-default-600">
                    {settings.additionalText || t("companyDescription")}
                  </p>
                </div>
                {settings.socialIconsPosition === "left" && renderSocialLinks()}
              </div>
              
              <div className={`grid grid-cols-2 md:grid-cols-${Math.min(settings.columnCount || 3, 4)} gap-8`}>
                {renderColumns()}
              </div>
              
              {(settings.newsletterPosition === "right") && (
                <div className="mt-6 md:mt-0 md:ml-8">
                  {renderNewsletter()}
                </div>
              )}
            </div>
            
            {settings.newsletterPosition === "bottom" && (
              <div className="mb-6">
                {renderNewsletter()}
              </div>
            )}
            
            <div className="border-t border-default-200 pt-6 flex flex-col md:flex-row justify-between items-center">
              {renderCopyright()}
              {settings.socialIconsPosition === "bottom" && (
                <div className="mt-4 md:mt-0">
                  {renderSocialLinks()}
                </div>
              )}
            </div>
          </div>
        );
        
      default:
        return (
          <div className="text-center">
            {renderLogo()}
            {renderCopyright()}
          </div>
        );
    }
  };
  
  return (
    <div 
      className={`w-full ${getPadding()} ${getBorderStyle()}`}
      style={{ 
        backgroundColor: bgColor,
        color: textColor
      }}
    >
      <div className={`${settings.footerWidth === 'contained' ? 'container mx-auto px-4' : 'px-4'}`}>
        {renderFooterContent()}
      </div>
    </div>
  );
};

export default FooterPreview;