"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button, Card, CardBody, Divider } from "@nextui-org/react";
import { Star, ChevronRight } from "lucide-react";

const HomePreview = ({ settings, device }) => {
  const t = useTranslations("HomePage.preview");
  
  const containerStyle = {
    width: device === "mobile" ? "375px" : device === "tablet" ? "768px" : "100%",
    margin: "0 auto",
    overflow: "hidden",
    border: device !== "desktop" ? "1px solid #ddd" : "none",
    borderRadius: "8px",
    backgroundColor: "#fff",
    fontFamily: "Inter, sans-serif"
  };
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };
  
  const slideUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  const slideIn = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };
  
  const renderHeroSection = () => {
    const { hero } = settings;
    
    const heroStyle = {
      position: "relative",
      height: hero.fullScreen ? "100vh" : `${hero.height}px`,
      backgroundImage: hero.backgroundImage ? `url(${hero.backgroundImage})` : "none",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: hero.backgroundColor,
      color: hero.textColor,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: `${hero.padding.top}px 20px ${hero.padding.bottom}px`,
      textAlign: hero.contentAlignment
    };
    
    const overlayStyle = hero.overlay.show ? {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: hero.overlay.color,
      opacity: hero.overlay.opacity,
      zIndex: 1
    } : {};
    
    const contentStyle = {
      position: "relative",
      zIndex: 2,
      maxWidth: "100%",
      width: hero.style === "fullWidth" ? "100%" : "800px",
      display: "flex",
      flexDirection: hero.style === "split" ? "row" : "column",
      alignItems: hero.contentAlignment === "center" ? "center" : 
                 hero.contentAlignment === "right" ? "flex-end" : "flex-start",
      justifyContent: "center",
      gap: "20px"
    };
    
    if (hero.style === "split") {
      contentStyle.flexDirection = device === "mobile" ? "column" : "row";
      contentStyle.textAlign = device === "mobile" ? hero.contentAlignment : "left";
    }
    
    const textContainerStyle = {
      flex: 1,
      order: hero.style === "split" && hero.contentPosition === "right" && device !== "mobile" ? 2 : 1
    };
    
    const imageContainerStyle = {
      flex: 1,
      order: hero.style === "split" && hero.contentPosition === "right" && device !== "mobile" ? 1 : 2,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    };
    
    return (
      <div style={heroStyle}>
        {hero.overlay.show && <div style={overlayStyle}></div>}
        
        {hero.style === "video" && hero.videoUrl && (
          <video
            autoPlay
            loop={hero.videoLoop}
            muted={hero.videoMuted}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0
            }}
          >
            <source src={hero.videoUrl} type="video/mp4" />
          </video>
        )}
        
        <div style={contentStyle}>
          <motion.div 
            style={textContainerStyle}
            initial={hero.animation.enabled ? "hidden" : "visible"}
            animate="visible"
            variants={
              hero.animation.enabled && hero.animation.type === "fade" ? fadeIn :
              hero.animation.enabled && hero.animation.type === "slideUp" ? slideUp :
              hero.animation.enabled && hero.animation.type === "slideLeft" ? slideIn :
              {}
            }
          >
            <h1 style={{ 
              fontSize: device === "mobile" ? "32px" : "48px", 
              marginBottom: "16px",
              fontWeight: "bold"
            }}>
              {hero.title}
            </h1>
            <p style={{ 
              fontSize: device === "mobile" ? "16px" : "18px", 
              marginBottom: "24px",
              opacity: 0.8
            }}>
              {hero.subtitle}
            </p>
            <div style={{ 
              display: "flex", 
              gap: "12px",
              flexWrap: "wrap",
              justifyContent: hero.contentAlignment === "center" ? "center" : 
                            hero.contentAlignment === "right" ? "flex-end" : "flex-start"
            }}>
              {hero.buttons.map((button, index) => (
                <Button
                  key={index}
                  color={button.color}
                  variant={button.variant}
                  size={button.size}
                  startContent={button.icon ? <span className="material-icons">{button.icon}</span> : null}
                >
                  {button.text}
                </Button>
              ))}
            </div>
          </motion.div>
          
          {hero.foregroundImage && hero.style !== "minimal" && (
            <motion.div 
              style={imageContainerStyle}
              initial={hero.animation.enabled ? "hidden" : "visible"}
              animate="visible"
              variants={
                hero.animation.enabled && hero.animation.type === "fade" ? fadeIn :
                hero.animation.enabled && hero.animation.type === "slideUp" ? slideUp :
                hero.animation.enabled && hero.animation.type === "slideRight" ? {
                  hidden: { opacity: 0, x: 50 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                } :
                {}
              }
            >
              <img 
                src={hero.foregroundImage} 
                alt="Hero" 
                style={{ 
                  maxWidth: "100%", 
                  maxHeight: device === "mobile" ? "200px" : "400px",
                  objectFit: "contain"
                }} 
              />
            </motion.div>
          )}
        </div>
      </div>
    );
  };
  
  const renderFeaturesSection = () => {
    const { features } = settings;
    
    const sectionStyle = {
      padding: `${features.padding.top}px 20px ${features.padding.bottom}px`,
      backgroundColor: features.backgroundColor,
      color: features.textColor
    };
    
    const headerStyle = {
      textAlign: features.titleAlignment,
      marginBottom: "40px"
    };
    
    const gridStyle = {
      display: "grid",
      gridTemplateColumns: device === "mobile" ? "1fr" : 
                          device === "tablet" && features.columns > 2 ? "repeat(2, 1fr)" :
                          `repeat(${features.columns}, 1fr)`,
      gap: `${features.gap}px`
    };
    
    const featureStyle = {
      padding: "20px",
      borderRadius: "8px",
      backgroundColor: features.featureStyle === "simple" ? "transparent" :
                      features.featureStyle === "bordered" ? "transparent" : "#fff",
      border: features.featureStyle === "bordered" ? "1px solid #eaeaea" : "none",
      boxShadow: features.featureStyle === "shadowed" || features.featureStyle === "elevated" ? 
                "0 4px 14px 0 rgba(0, 0, 0, 0.1)" : "none",
      transform: features.featureStyle === "elevated" ? "translateY(0)" : "none",
      transition: "transform 0.2s, box-shadow 0.2s"
    };
    
    return (
      <div style={sectionStyle}>
        <div style={headerStyle}>
          <h2 style={{ 
            fontSize: device === "mobile" ? "28px" : "36px", 
            marginBottom: "16px",
            fontWeight: "bold"
          }}>
            {features.title}
          </h2>
          {features.description && (
            <p style={{ 
              fontSize: device === "mobile" ? "16px" : "18px",
              opacity: 0.8,
              maxWidth: "800px",
              margin: "0 auto"
            }}>
              {features.description}
            </p>
          )}
        </div>
        
        <div style={gridStyle}>
          {features.items.map((feature, index) => (
            <motion.div
              key={index}
              style={featureStyle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={features.featureStyle === "elevated" ? { 
                transform: "translateY(-5px)", 
                boxShadow: "0 10px 25px 0 rgba(0, 0, 0, 0.1)" 
              } : {}}
            >
              <div style={{ marginBottom: "16px" }}>
                {feature.icon && (
                  <div style={{ 
                    color: features.iconColor,
                    fontSize: "32px",
                    marginBottom: "16px"
                  }}>
                    <span className="material-icons">{feature.icon}</span>
                  </div>
                )}
                {feature.image && (
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    style={{ 
                      maxWidth: "64px", 
                      maxHeight: "64px",
                      marginBottom: "16px"
                    }} 
                  />
                )}
              </div>
              
              <h3 style={{ 
                fontSize: "20px", 
                marginBottom: "12px",
                fontWeight: "600"
              }}>
                {feature.title}
              </h3>
              
              <p style={{ 
                fontSize: "16px",
                marginBottom: feature.link ? "16px" : "0",
                opacity: 0.8
              }}>
                {feature.description}
              </p>
              
              {feature.link && feature.linkText && (
                <a 
                  href={feature.link} 
                  style={{ 
                    color: features.iconColor,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "14px",
                    fontWeight: "500",
                    marginTop: "8px"
                  }}
                >
                  {feature.linkText}
                  <ChevronRight size={16} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    );
  };
  
  const renderContentBlocks = () => {
    const { contentBlocks } = settings;
    
    const sectionStyle = {
      padding: `${contentBlocks.padding.top}px 0 ${contentBlocks.padding.bottom}px`,
      backgroundColor: contentBlocks.backgroundColor
    };
    
    const headerStyle = {
      textAlign: contentBlocks.titleAlignment,
      marginBottom: "40px",
      padding: "0 20px",
      color: contentBlocks.titleColor
    };
    
    return (
      <div style={sectionStyle}>
        {contentBlocks.title && (
          <div style={headerStyle}>
            <h2 style={{ 
              fontSize: device === "mobile" ? "28px" : "36px", 
              marginBottom: "16px",
              fontWeight: "bold"
            }}>
              {contentBlocks.title}
            </h2>
          </div>
        )}
        
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: `${contentBlocks.spacing}px` 
        }}>
          {contentBlocks.blocks.map((block, index) => {
            const isEven = index % 2 === 0;
            const isAlternating = contentBlocks.layout === "alternating" || contentBlocks.layout === "zigzag";
            const imagePosition = isAlternating ? 
                                (isEven ? block.imagePosition : block.imagePosition === "left" ? "right" : "left") : 
                                block.imagePosition;
            
            const blockStyle = {
              display: "flex",
              flexDirection: device === "mobile" ? "column" : 
                            (imagePosition === "left" ? "row" : 
                            imagePosition === "right" ? "row-reverse" : 
                            imagePosition === "top" ? "column" : 
                            imagePosition === "bottom" ? "column-reverse" : "row"),
              backgroundColor: block.backgroundColor,
              color: block.textColor,
              borderRadius: contentBlocks.blockStyle === "rounded" ? "12px" : "0",
              overflow: "hidden",
              border: contentBlocks.blockStyle === "bordered" ? "1px solid #eaeaea" : "none",
              boxShadow: contentBlocks.blockStyle === "shadowed" ? "0 4px 14px 0 rgba(0, 0, 0, 0.1)" : "none",
              maxWidth: contentBlocks.fullWidth ? "100%" : "1200px",
              margin: contentBlocks.fullWidth ? "0" : "0 auto",
              position: "relative"
            };
            
            const contentStyle = {
              flex: "1",
              padding: "40px 20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            };
            
            const imageStyle = {
              flex: "1",
              minHeight: device === "mobile" ? "200px" : "300px",
              backgroundImage: block.image ? `url(${block.image})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center"
            };
            
            if (imagePosition === "background" && block.image) {
              blockStyle.backgroundImage = `url(${block.image})`;
              blockStyle.backgroundSize = "cover";
              blockStyle.backgroundPosition = "center";
              contentStyle.backgroundColor = `${block.backgroundColor}CC`;
              contentStyle.width = "100%";
              contentStyle.zIndex = "1";
            }
            
            return (
              <motion.div
                key={index}
                style={blockStyle}
                initial={contentBlocks.animation.enabled ? "hidden" : "visible"}
                animate="visible"
                variants={
                  contentBlocks.animation.enabled && contentBlocks.animation.type === "fade" ? fadeIn :
                  contentBlocks.animation.enabled && contentBlocks.animation.type === "slideUp" ? slideUp :
                  contentBlocks.animation.enabled && contentBlocks.animation.type === "slideIn" ? slideIn :
                  {}
                }
              >
                {block.image && imagePosition !== "background" && (
                  <div style={imageStyle}></div>
                )}
                
                <div style={contentStyle}>
                  <h3 style={{ 
                    fontSize: device === "mobile" ? "24px" : "30px", 
                    marginBottom: "16px",
                    fontWeight: "bold"
                  }}>
                    {block.title}
                  </h3>
                  
                  <p style={{ 
                    fontSize: "16px",
                    marginBottom: "24px",
                    opacity: 0.9
                  }}>
                    {block.content}
                  </p>
                  
                  {block.buttonText && (
                    <div>
                      <Button
                        color={block.buttonColor}
                        variant={block.buttonVariant}
                      >
                        {block.buttonText}
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };
  
  const renderTestimonials = () => {
    const { testimonials } = settings;
    
    const sectionStyle = {
      padding: `${testimonials.padding.top}px 20px ${testimonials.padding.bottom}px`,
      backgroundColor: testimonials.backgroundColor,
      color: testimonials.textColor
    };
    
    const headerStyle = {
      textAlign: testimonials.titleAlignment,
      marginBottom: "40px"
    };
    
    const gridStyle = {
      display: "grid",
      gridTemplateColumns: device === "mobile" ? "1fr" : 
                          device === "tablet" && testimonials.columns > 2 ? "repeat(2, 1fr)" :
                          `repeat(${testimonials.columns}, 1fr)`,
      gap: `${testimonials.gap}px`
    };
    
    const testimonialStyle = {
      padding: "24px",
      borderRadius: "8px",
      backgroundColor: testimonials.testimonialStyle === "simple" ? "transparent" :
                      testimonials.testimonialStyle === "card" ? "#fff" : "transparent",
      border: testimonials.testimonialStyle === "bordered" ? "1px solid #eaeaea" : "none",
      boxShadow: testimonials.testimonialStyle === "shadowed" ? "0 4px 14px 0 rgba(0, 0, 0, 0.1)" : "none",
      position: "relative"
    };
    
    if (testimonials.testimonialStyle === "quote") {
      testimonialStyle.paddingTop = "40px";
    }
    
    return (
      <div style={sectionStyle}>
        <div style={headerStyle}>
          <h2 style={{ 
            fontSize: device === "mobile" ? "28px" : "36px", 
            marginBottom: "16px",
            fontWeight: "bold"
          }}>
            {testimonials.title}
          </h2>
          {testimonials.description && (
            <p style={{ 
              fontSize: device === "mobile" ? "16px" : "18px",
              opacity: 0.8,
              maxWidth: "800px",
              margin: "0 auto"
            }}>
              {testimonials.description}
            </p>
          )}
        </div>
        
        <div style={gridStyle}>
          {testimonials.items.map((testimonial, index) => (
            <motion.div
              key={index}
              style={testimonialStyle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {testimonials.testimonialStyle === "quote" && testimonials.showQuotationMarks && (
                <div style={{ 
                  position: "absolute",
                  top: "20px",
                  left: "24px",
                  fontSize: "64px",
                  lineHeight: "0",
                  color: testimonials.quoteColor,
                  opacity: 0.3,
                  fontFamily: "serif"
                }}>
                  "
                </div>
              )}
              
              <p style={{ 
                fontSize: "16px",
                marginBottom: "20px",
                position: "relative",
                zIndex: 1,
                fontStyle: "italic"
              }}>
                {testimonials.showQuotationMarks && testimonials.testimonialStyle !== "quote" && '"'}
                {testimonial.quote}
                {testimonials.showQuotationMarks && testimonials.testimonialStyle !== "quote" && '"'}
              </p>
              
              {testimonials.showRating && testimonial.rating > 0 && (
                <div style={{ 
                  display: "flex",
                  gap: "4px",
                  marginBottom: "16px",
                  color: "#FFB400"
                }}>
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      fill={i < testimonial.rating ? "currentColor" : "none"} 
                    />
                  ))}
                </div>
              )}
              
              <div style={{ 
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}>
                {testimonial.avatar && (
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author} 
                    style={{ 
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      objectFit: "cover"
                    }} 
                  />
                )}
                
                <div>
                  <p style={{ 
                    fontSize: "16px",
                    fontWeight: "600",
                    marginBottom: "4px"
                  }}>
                    {testimonial.author}
                  </p>
                  
                  <p style={{ 
                    fontSize: "14px",
                    opacity: 0.7
                  }}>
                    {testimonial.role}{testimonial.company ? `, ${testimonial.company}` : ""}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };
  
  const renderCTA = () => {
    const { cta } = settings;
    
    const sectionStyle = {
      height: `${cta.height}px`,
      padding: `${cta.padding.top}px 20px ${cta.padding.bottom}px`,
      backgroundColor: cta.backgroundColor,
      color: cta.textColor,
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: cta.contentAlignment,
      backgroundImage: cta.backgroundImage ? `url(${cta.backgroundImage})` : "none",
      backgroundSize: "cover",
      backgroundPosition: "center",
      overflow: "hidden"
    };
    
    if (cta.style === "gradient") {
      sectionStyle.backgroundImage = `linear-gradient(${cta.gradientDirection}, ${cta.gradientStartColor}, ${cta.gradientEndColor})`;
    }
    
    const overlayStyle = cta.overlay.show ? {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: cta.overlay.color,
      opacity: cta.overlay.opacity,
      zIndex: 1
    } : {};
    
    const contentStyle = {
      position: "relative",
      zIndex: 2,
      maxWidth: cta.layout === "fullWidth" ? "100%" : "800px",
      width: "100%"
    };
    
    if (cta.layout === "split" && device !== "mobile") {
      contentStyle.display = "flex";
      contentStyle.alignItems = "center";
      contentStyle.justifyContent = "space-between";
      contentStyle.gap = "40px";
      contentStyle.textAlign = "left";
    }
    
    return (
      <div style={sectionStyle}>
        {cta.overlay.show && <div style={overlayStyle}></div>}
        
        <motion.div 
          style={contentStyle}
          initial={cta.animation.enabled ? "hidden" : "visible"}
          animate="visible"
          variants={
            cta.animation.enabled && cta.animation.type === "fade" ? fadeIn :
            cta.animation.enabled && cta.animation.type === "slideUp" ? slideUp :
            cta.animation.enabled && cta.animation.type === "zoom" ? {
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
            } :
            {}
          }
        >
          <div style={cta.layout === "split" && device !== "mobile" ? { flex: "1" } : {}}>
            <h2 style={{ 
              fontSize: device === "mobile" ? "28px" : "36px", 
              marginBottom: "16px",
              fontWeight: "bold"
            }}>
              {cta.title}
            </h2>
            
            {cta.description && (
              <p style={{ 
                fontSize: device === "mobile" ? "16px" : "18px",
                marginBottom: "24px",
                opacity: 0.9,
                maxWidth: "600px",
                margin: cta.contentAlignment === "center" ? "0 auto 24px" : "0 0 24px"
              }}>
                {cta.description}
              </p>
            )}
          </div>
          
          {cta.button.text && (
            <div style={cta.layout === "split" && device !== "mobile" ? { flex: "0 0 auto" } : {}}>
              <Button
                color={cta.button.color}
                variant={cta.button.variant}
                size={cta.button.size}
                startContent={cta.button.icon ? <span className="material-icons">{cta.button.icon}</span> : null}
              >
                {cta.button.text}
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    );
  };
  
  return (
    <div style={containerStyle}>
      {renderHeroSection()}
      {renderFeaturesSection()}
      {renderContentBlocks()}
      {renderTestimonials()}
      {renderCTA()}
    </div>
  );
};

export default HomePreview;