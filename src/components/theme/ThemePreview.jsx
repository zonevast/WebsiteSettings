"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { 
  Button, 
  Card, 
  CardBody, 
  CardHeader, 
  CardFooter,
  Input,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  Tabs,
  Tab,
  Chip,
  Avatar,
  Divider,
  Tooltip,
  Pagination,
  Badge,
  Progress,
  Select,
  SelectItem
} from "@nextui-org/react";
import { 
  Heart, 
  Share, 
  Bookmark, 
  Star, 
  Search, 
  Bell, 
  User, 
  Settings, 
  Home, 
  Mail, 
  Calendar, 
  Image, 
  FileText, 
  Plus, 
  Trash2, 
  Edit, 
  Check, 
  X, 
  ChevronDown,
  Info,
  AlertTriangle,
  AlertCircle,
  CheckCircle
} from "lucide-react";

const ThemePreview = ({ settings, device }) => {
  const t = useTranslations("ThemeSettingsPage.preview");
  const activeMode = settings.defaultToDarkMode ? "darkMode" : "lightMode";
  const colors = settings[activeMode];
  
  const containerStyle = {
    backgroundColor: colors.backgroundColor,
    color: colors.textColor,
    fontFamily: settings.typography.bodyFont,
    fontSize: `${settings.typography.fontSizes.base}px`,
    lineHeight: settings.typography.lineHeight,
    letterSpacing: `${settings.typography.letterSpacing}em`,
    padding: "20px",
    borderRadius: settings.layout.enableRounded ? `${settings.layout.borderRadius}px` : '0',
    width: device === "mobile" ? "375px" : device === "tablet" ? "768px" : "100%",
    height: device === "mobile" ? "667px" : device === "tablet" ? "800px" : "800px",
    overflow: "auto",
    margin: "0 auto",
    transition: settings.layout.enableAnimations && !settings.layout.reducedMotion ? "all 0.2s ease" : "none",
    boxShadow: settings.layout.enableShadows ? "0 4px 14px 0 rgba(0, 0, 0, 0.1)" : "none",
    border: device !== "desktop" ? `1px solid ${colors.borderColor}` : "none"
  };
  
  const headingStyle = {
    fontFamily: settings.typography.headingFont,
    fontWeight: settings.typography.fontWeights.heading,
    color: colors.textColor,
    marginBottom: "0.5em"
  };
  
  const cardStyle = {
    backgroundColor: colors.surfaceColor,
    borderRadius: settings.layout.enableRounded ? `${settings.layout.borderRadius}px` : '0',
    boxShadow: settings.layout.enableShadows && settings.layout.componentStyles.card === 'shadow' ? '0 4px 14px 0 rgba(0, 0, 0, 0.1)' : 'none',
    border: settings.layout.componentStyles.card === 'bordered' ? `1px solid ${colors.borderColor}` : 'none',
    overflow: "hidden"
  };
  
  const buttonStyle = {
    borderRadius: settings.layout.enableRounded ? `${settings.layout.borderRadius}px` : '0',
    transition: settings.layout.enableAnimations && !settings.layout.reducedMotion ? "all 0.2s ease" : "none"
  };
  
  const inputStyle = {
    borderRadius: settings.layout.enableRounded ? `${settings.layout.borderRadius}px` : '0',
    backgroundColor: settings.layout.componentStyles.input === 'filled' ? `${colors.surfaceColor}` : 'transparent',
    borderBottom: settings.layout.componentStyles.input === 'underlined' ? `2px solid ${colors.borderColor}` : 'none',
    border: settings.layout.componentStyles.input === 'bordered' ? `1px solid ${colors.borderColor}` : 'none'
  };
  
  return (
    <div style={containerStyle}>
      {/* Header Section */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ ...headingStyle, fontSize: `${settings.typography.fontSizes.h1}px` }}>
          {t("headerTitle")}
        </h1>
        <p style={{ color: colors.secondaryTextColor, marginBottom: "1rem" }}>
          {t("headerDescription")}
        </p>
        
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <Button 
            color="primary" 
            style={buttonStyle}
            variant={settings.layout.componentStyles.button}
          >
            {t("primaryButton")}
          </Button>
          <Button 
            color="secondary" 
            style={buttonStyle}
            variant={settings.layout.componentStyles.button}
          >
            {t("secondaryButton")}
          </Button>
          <Button 
            color="default" 
            style={buttonStyle}
            variant={settings.layout.componentStyles.button}
          >
            {t("defaultButton")}
          </Button>
        </div>
      </div>
      
      {/* Color Showcase */}
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ ...headingStyle, fontSize: `${settings.typography.fontSizes.h2}px` }}>
          {t("colorShowcase")}
        </h2>
        
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: device === "mobile" ? "1fr" : "repeat(auto-fill, minmax(120px, 1fr))",
          gap: `${settings.layout.gap.x * settings.layout.spacingUnit}px`,
          marginBottom: "1rem"
        }}>
          <div style={{ 
            backgroundColor: colors.primaryColor, 
            color: "#fff", 
            padding: "1rem", 
            borderRadius: settings.layout.enableRounded ? `${settings.layout.borderRadius}px` : '0',
            textAlign: "center"
          }}>
            {t("primary")}
          </div>
          <div style={{ 
            backgroundColor: colors.secondaryColor, 
            color: "#fff", 
            padding: "1rem", 
            borderRadius: settings.layout.enableRounded ? `${settings.layout.borderRadius}px` : '0',
            textAlign: "center"
          }}>
            {t("secondary")}
          </div>
          <div style={{ 
            backgroundColor: colors.accentColor, 
            color: "#fff", 
            padding: "1rem", 
            borderRadius: settings.layout.enableRounded ? `${settings.layout.borderRadius}px` : '0',
            textAlign: "center"
          }}>
            {t("accent")}
          </div>
          <div style={{ 
            backgroundColor: colors.successColor, 
            color: "#fff", 
            padding: "1rem", 
            borderRadius: settings.layout.enableRounded ? `${settings.layout.borderRadius}px` : '0',
            textAlign: "center"
          }}>
            {t("success")}
          </div>
          <div style={{ 
            backgroundColor: colors.warningColor, 
            color: "#fff", 
            padding: "1rem", 
            borderRadius: settings.layout.enableRounded ? `${settings.layout.borderRadius}px` : '0',
            textAlign: "center"
          }}>
            {t("warning")}
          </div>
          <div style={{ 
            backgroundColor: colors.errorColor, 
            color: "#fff", 
            padding: "1rem", 
            borderRadius: settings.layout.enableRounded ? `${settings.layout.borderRadius}px` : '0',
            textAlign: "center"
          }}>
            {t("error")}
          </div>
        </div>
      </div>
      
      {/* Typography Showcase */}
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ ...headingStyle, fontSize: `${settings.typography.fontSizes.h2}px` }}>
          {t("typographyShowcase")}
        </h2>
        
        <div style={{ marginBottom: "1rem" }}>
          <h1 style={{ ...headingStyle, fontSize: `${settings.typography.fontSizes.h1}px` }}>
            {t("heading1")}
          </h1>
          <h2 style={{ ...headingStyle, fontSize: `${settings.typography.fontSizes.h2}px` }}>
            {t("heading2")}
          </h2>
          <h3 style={{ ...headingStyle, fontSize: `${settings.typography.fontSizes.h3}px` }}>
            {t("heading3")}
          </h3>
          <h4 style={{ ...headingStyle, fontSize: `${settings.typography.fontSizes.h4}px` }}>
            {t("heading4")}
          </h4>
          <h5 style={{ ...headingStyle, fontSize: `${settings.typography.fontSizes.h5}px` }}>
            {t("heading5")}
          </h5>
          <h6 style={{ ...headingStyle, fontSize: `${settings.typography.fontSizes.h6}px` }}>
            {t("heading6")}
          </h6>
        </div>
        
        <div style={{ marginBottom: "1rem" }}>
          <p style={{ marginBottom: `${settings.typography.paragraphSpacing}em` }}>
            {t("paragraph1")}
          </p>
          <p style={{ marginBottom: `${settings.typography.paragraphSpacing}em` }}>
            {t("paragraph2")}
          </p>
        </div>
        
        <div style={{ 
          display: "flex", 
          gap: "1rem", 
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: "1rem"
        }}>
          <span style={{ fontSize: `${settings.typography.fontSizes.small}px` }}>
            {t("smallText")}
          </span>
          <span>
            {t("normalText")}
          </span>
          <span style={{ fontSize: `${settings.typography.fontSizes.large}px` }}>
            {t("largeText")}
          </span>
        </div>
        
        <div style={{ 
          fontFamily: settings.typography.monoFont,
          backgroundColor: colors.surfaceColor,
          padding: "1rem",
          borderRadius: settings.layout.enableRounded ? `${settings.layout.borderRadius}px` : '0',
          border: `1px solid ${colors.borderColor}`
        }}>
          <code>{t("codeExample")}</code>
        </div>
      </div>
      
      {/* Components Showcase */}
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ ...headingStyle, fontSize: `${settings.typography.fontSizes.h2}px` }}>
          {t("componentsShowcase")}
        </h2>
        
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: device === "mobile" ? "1fr" : "repeat(auto-fill, minmax(300px, 1fr))",
          gap: `${settings.layout.gap.y * settings.layout.spacingUnit}px ${settings.layout.gap.x * settings.layout.spacingUnit}px`,
        }}>
          {/* Card Component */}
          <Card style={cardStyle}>
            <CardHeader className="flex gap-3">
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              <div className="flex flex-col">
                <p className="text-md">{t("cardTitle")}</p>
                <p className="text-small text-default-500">{t("cardSubtitle")}</p>
              </div>
            </CardHeader>
            <CardBody>
              <p>{t("cardContent")}</p>
            </CardBody>
            <CardFooter>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <Button 
                  size="sm" 
                  style={buttonStyle}
                  variant={settings.layout.componentStyles.button}
                  startContent={<Heart size={16} />}
                >
                  {t("like")}
                </Button>
                <Button 
                  size="sm" 
                  style={buttonStyle}
                  variant={settings.layout.componentStyles.button}
                  startContent={<Share size={16} />}
                >
                  {t("share")}
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          {/* Form Components */}
          <Card style={cardStyle}>
            <CardHeader>
              <h3 style={{ ...headingStyle, fontSize: `${settings.typography.fontSizes.h5}px`, margin: 0 }}>
                {t("formElements")}
              </h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <Input 
                label={t("inputLabel")} 
                placeholder={t("inputPlaceholder")} 
                style={inputStyle}
              />
              
              <div>
                <Checkbox defaultSelected>{t("checkboxLabel")}</Checkbox>
              </div>
              
              <RadioGroup label={t("radioGroupLabel")}>
                <Radio value="option1">{t("radioOption1")}</Radio>
                <Radio value="option2">{t("radioOption2")}</Radio>
              </RadioGroup>
              
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span>{t("switchLabel")}</span>
                <Switch defaultSelected />
              </div>
              
              <Select 
                label={t("selectLabel")}
                placeholder={t("selectPlaceholder")}
                style={inputStyle}
              >
                <SelectItem key="option1" value="option1">{t("selectOption1")}</SelectItem>
                <SelectItem key="option2" value="option2">{t("selectOption2")}</SelectItem>
                <SelectItem key="option3" value="option3">{t("selectOption3")}</SelectItem>
              </Select>
            </CardBody>
          </Card>
          
          {/* Status Components */}
          <Card style={cardStyle}>
            <CardHeader>
              <h3 style={{ ...headingStyle, fontSize: `${settings.typography.fontSizes.h5}px`, margin: 0 }}>
                {t("statusComponents")}
              </h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <Chip color="primary">{t("primaryChip")}</Chip>
                <Chip color="secondary">{t("secondaryChip")}</Chip>
                <Chip color="success">{t("successChip")}</Chip>
                <Chip color="warning">{t("warningChip")}</Chip>
                <Chip color="danger">{t("dangerChip")}</Chip>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <Badge content="5" color="primary">
                  <Button style={buttonStyle} variant={settings.layout.componentStyles.button}>
                    {t("notifications")}
                  </Button>
                </Badge>
                
                <Badge content="New" color="danger">
                  <Button style={buttonStyle} variant={settings.layout.componentStyles.button}>
                    {t("messages")}
                  </Button>
                </Badge>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <p style={{ marginBottom: "0.5rem" }}>{t("progressLabel")}</p>
                  <Progress value={45} color="primary" />
                </div>
                
                <div>
                  <p style={{ marginBottom: "0.5rem" }}>{t("progressLabelSecondary")}</p>
                  <Progress value={75} color="secondary" />
                </div>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "0.5rem", 
                  padding: "0.5rem", 
                  backgroundColor: colors.successColor + "20",
                  borderRadius: settings.layout.enableRounded ? `${settings.layout.borderRadius}px` : '0',
                }}>
                  <CheckCircle size={18} color={colors.successColor} />
                  <span>{t("successAlert")}</span>
                </div>
                
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "0.5rem", 
                  padding: "0.5rem", 
                  backgroundColor: colors.warningColor + "20",
                  borderRadius: settings.layout.enableRounded ? `${settings.layout.borderRadius}px` : '0',
                }}>
                  <AlertTriangle size={18} color={colors.warningColor} />
                  <span>{t("warningAlert")}</span>
                </div>
                
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "0.5rem", 
                  padding: "0.5rem", 
                  backgroundColor: colors.errorColor + "20",
                  borderRadius: settings.layout.enableRounded ? `${settings.layout.borderRadius}px` : '0',
                }}>
                  <AlertCircle size={18} color={colors.errorColor} />
                  <span>{t("errorAlert")}</span>
                </div>
                
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "0.5rem", 
                  padding: "0.5rem", 
                  backgroundColor: colors.infoColor + "20",
                  borderRadius: settings.layout.enableRounded ? `${settings.layout.borderRadius}px` : '0',
                }}>
                  <Info size={18} color={colors.infoColor} />
                  <span>{t("infoAlert")}</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      
      {/* Navigation Components */}
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ ...headingStyle, fontSize: `${settings.typography.fontSizes.h2}px` }}>
          {t("navigationComponents")}
        </h2>
        
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: `${settings.layout.gap.y * settings.layout.spacingUnit}px`,
        }}>
          <Card style={cardStyle}>
            <CardBody>
              <Tabs aria-label="Tabs">
                <Tab key="photos" title={t("tabPhotos")}>
                  <div style={{ padding: "1rem 0" }}>
                    <p>{t("tabPhotosContent")}</p>
                  </div>
                </Tab>
                <Tab key="music" title={t("tabMusic")}>
                  <div style={{ padding: "1rem 0" }}>
                    <p>{t("tabMusicContent")}</p>
                  </div>
                </Tab>
                <Tab key="videos" title={t("tabVideos")}>
                  <div style={{ padding: "1rem 0" }}>
                    <p>{t("tabVideosContent")}</p>
                  </div>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
          
          <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
            <Pagination total={10} initialPage={1} />
          </div>
          
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            backgroundColor: colors.surfaceColor,
            padding: "0.75rem",
            borderRadius: settings.layout.enableRounded ? `${settings.layout.borderRadius}px` : '0',
            marginTop: "1rem",
            border: `1px solid ${colors.borderColor}`
          }}>
            <Button isIconOnly style={buttonStyle} variant={settings.layout.componentStyles.button}>
              <Home size={20} />
            </Button>
            <Button isIconOnly style={buttonStyle} variant={settings.layout.componentStyles.button}>
              <Search size={20} />
            </Button>
            <Button isIconOnly style={buttonStyle} variant={settings.layout.componentStyles.button}>
              <Bell size={20} />
            </Button>
            <Button isIconOnly style={buttonStyle} variant={settings.layout.componentStyles.button}>
              <Mail size={20} />
            </Button>
            <Button isIconOnly style={buttonStyle} variant={settings.layout.componentStyles.button}>
              <User size={20} />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Layout Example */}
      <div>
        <h2 style={{ ...headingStyle, fontSize: `${settings.typography.fontSizes.h2}px` }}>
          {t("layoutExample")}
        </h2>
        
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: device === "mobile" ? "1fr" : "3fr 1fr",
          gap: `${settings.layout.gap.x * settings.layout.spacingUnit}px`,
        }}>
          <div>
            <Card style={cardStyle}>
              <CardHeader>
                <h3 style={{ ...headingStyle, fontSize: `${settings.typography.fontSizes.h4}px`, margin: 0 }}>
                  {t("mainContent")}
                </h3>
              </CardHeader>
              <CardBody>
                <p style={{ marginBottom: `${settings.typography.paragraphSpacing}em` }}>
                  {t("mainContentParagraph1")}
                </p>
                <p>
                  {t("mainContentParagraph2")}
                </p>
                
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: device === "mobile" ? "1fr" : "1fr 1fr",
                  gap: `${settings.layout.gap.y * settings.layout.spacingUnit}px ${settings.layout.gap.x * settings.layout.spacingUnit}px`,
                  marginTop: "1rem"
                }}>
                  <div style={{ 
                    backgroundColor: colors.surfaceColor,
                    padding: "1rem",
                    borderRadius: settings.layout.enableRounded ? `${settings.layout.borderRadius}px` : '0',
                    border: `1px solid ${colors.borderColor}`
                  }}>
                    <h4 style={{ ...headingStyle, fontSize: `${settings.typography.fontSizes.h6}px` }}>
                      {t("featureTitle1")}
                    </h4>
                    <p>{t("featureDescription1")}</p>
                  </div>
                  
                  <div style={{ 
                    backgroundColor: colors.surfaceColor,
                    padding: "1rem",
                    borderRadius: settings.layout.enableRounded ? `${settings.layout.borderRadius}px` : '0',
                    border: `1px solid ${colors.borderColor}`
                  }}>
                    <h4 style={{ ...headingStyle, fontSize: `${settings.typography.fontSizes.h6}px` }}>
                      {t("featureTitle2")}
                    </h4>
                    <p>{t("featureDescription2")}</p>
                  </div>
                </div>
              </CardBody>
              <CardFooter>
                <Button 
                  color="primary" 
                  style={buttonStyle}
                  variant={settings.layout.componentStyles.button}
                >
                  {t("learnMore")}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {device !== "mobile" && (
            <div>
              <Card style={cardStyle}>
                <CardHeader>
                  <h3 style={{ ...headingStyle, fontSize: `${settings.typography.fontSizes.h5}px`, margin: 0 }}>
                    {t("sidebar")}
                  </h3>
                </CardHeader>
                <CardBody>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <Button 
                      style={buttonStyle}
                      variant={settings.layout.componentStyles.button}
                      startContent={<Home size={16} />}
                      fullWidth
                    >
                      {t("home")}
                    </Button>
                    <Button 
                      style={buttonStyle}
                      variant={settings.layout.componentStyles.button}
                      startContent={<User size={16} />}
                      fullWidth
                    >
                      {t("profile")}
                    </Button>
                    <Button 
                      style={buttonStyle}
                      variant={settings.layout.componentStyles.button}
                      startContent={<Settings size={16} />}
                      fullWidth
                    >
                      {t("settings")}
                    </Button>
                    <Button 
                      style={buttonStyle}
                      variant={settings.layout.componentStyles.button}
                      startContent={<Mail size={16} />}
                      fullWidth
                    >
                      {t("messages")}
                    </Button>
                  </div>
                  
                  <Divider className="my-4" />
                  
                  <div>
                    <h4 style={{ ...headingStyle, fontSize: `${settings.typography.fontSizes.h6}px` }}>
                      {t("recentPosts")}
                    </h4>
                    <ul style={{ 
                      listStyleType: "none", 
                      padding: 0, 
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem"
                    }}>
                      <li style={{ 
                        padding: "0.5rem", 
                        borderRadius: settings.layout.enableRounded ? `${settings.layout.borderRadius}px` : '0',
                        backgroundColor: colors.backgroundColor
                      }}>
                        {t("recentPost1")}
                      </li>
                      <li style={{ 
                        padding: "0.5rem", 
                        borderRadius: settings.layout.enableRounded ? `${settings.layout.borderRadius}px` : '0',
                        backgroundColor: colors.backgroundColor
                      }}>
                        {t("recentPost2")}
                      </li>
                      <li style={{ 
                        padding: "0.5rem", 
                        borderRadius: settings.layout.enableRounded ? `${settings.layout.borderRadius}px` : '0',
                        backgroundColor: colors.backgroundColor
                      }}>
                        {t("recentPost3")}
                      </li>
                    </ul>
                  </div>
                </CardBody>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThemePreview;