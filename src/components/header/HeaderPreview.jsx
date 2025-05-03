"use client";
import React from "react";
import { useTranslations } from "next-intl";

const HeaderPreview = ({ settings }) => {
  const t = useTranslations("HeaderSettingsPage.preview");
  
  // Generate CSS styles based on settings
  const getHeaderStyles = () => {
    const styles = {
      height: `${settings.headerHeight}px`,
      padding: `0 ${settings.headerPadding}px`,
      color: settings.textColor,
    };
    
    // Background
    if (settings.isTransparent) {
      styles.backgroundColor = 'transparent';
    } else if (settings.useGradient) {
      styles.backgroundImage = `linear-gradient(to right, ${settings.gradientStart}, ${settings.gradientEnd})`;
    } else {
      styles.backgroundColor = settings.backgroundColor;
    }
    
    // Border
    if (settings.borderStyle === 'bottom') {
      styles.borderBottom = `${settings.borderWidth}px solid ${settings.borderColor}`;
    } else if (settings.borderStyle === 'top') {
      styles.borderTop = `${settings.borderWidth}px solid ${settings.borderColor}`;
    } else if (settings.borderStyle === 'all') {
      styles.border = `${settings.borderWidth}px solid ${settings.borderColor}`;
    }
    
    // Shadow
    if (settings.shadowStyle === 'small') {
      styles.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    } else if (settings.shadowStyle === 'medium') {
      styles.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    } else if (settings.shadowStyle === 'large') {
      styles.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
    }
    
    // Glassmorphism
    if (settings.useGlassmorphism) {
      styles.backdropFilter = `blur(${settings.blurIntensity}px)`;
      styles.backgroundColor = settings.backgroundColor.replace(')', ', 0.7)').replace('rgb', 'rgba');
    }
    
    return styles;
  };
  
  // Get logo styles
  const getLogoStyles = () => {
    const sizes = {
      small: '30px',
      medium: '40px',
      large: '50px'
    };
    
    return {
      height: sizes[settings.logoSize] || '40px',
      marginRight: '16px'
    };
  };
  
  // Get title styles
  const getTitleStyles = () => {
    const sizes = {
      small: '16px',
      medium: '20px',
      large: '24px'
    };
    
    return {
      fontSize: sizes[settings.titleSize] || '20px',
      fontFamily: settings.titleFont || 'inherit',
      color: settings.titleColor
    };
  };

  return (
    <div className="w-full">
      <header style={getHeaderStyles()} className="flex items-center justify-between">
        <div className="flex items-center">
          {settings.showLogo && settings.logoUrl && (
            <img 
              src={settings.logoUrl} 
              alt="Logo" 
              style={getLogoStyles()} 
            />
          )}
          {settings.showTitle && (
            <h1 style={getTitleStyles()}>
              {settings.siteTitle || t("defaultSiteTitle")}
            </h1>
          )}
        </div>
        
        <nav>
          <ul className="flex items-center gap-6">
            {settings.navigationItems && settings.navigationItems
              .filter(item => item.isVisible)
              .map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.url} 
                    target={item.isExternal ? "_blank" : "_self"}
                    rel={item.isExternal ? "noopener noreferrer" : ""}
                    className="hover:opacity-80 transition-opacity"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
          </ul>
        </nav>
      </header>
      
      {/* Preview content */}
      <div className="bg-default-100 h-40 flex items-center justify-center text-default-500">
        {t("previewContent")}
      </div>
    </div>
  );
};

export default HeaderPreview;