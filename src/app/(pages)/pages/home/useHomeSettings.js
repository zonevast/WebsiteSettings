"use client";
import { useState } from "react";

export const useHomeSettings = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Default home page settings
  const defaultSettings = {
    // Hero section
    hero: {
      title: "Welcome to Our Website",
      subtitle: "We provide the best solutions for your business needs. Explore our services and find out how we can help you grow.",
      buttons: [
        {
          text: "Get Started",
          url: "#",
          variant: "solid",
          color: "primary",
          size: "lg",
          icon: "",
          openInNewTab: false
        },
        {
          text: "Learn More",
          url: "#",
          variant: "bordered",
          color: "primary",
          size: "lg",
          icon: "",
          openInNewTab: false
        }
      ],
      backgroundImage: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      foregroundImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      overlay: {
        show: true,
        color: "#000000",
        opacity: 0.5
      },
      style: "centered",
      height: 600,
      fullScreen: false,
      contentAlignment: "center",
      contentPosition: "left",
      padding: {
        top: 80,
        bottom: 80
      },
      backgroundColor: "#f5f5f5",
      textColor: "#ffffff",
      animation: {
        enabled: true,
        type: "fade"
      },
      videoUrl: "https://example.com/video.mp4",
      videoMuted: true,
      videoLoop: true
    },

    // Features section
    features: {
      title: "Our Features",
      description: "Discover the amazing features that make our product stand out from the competition.",
      items: [
        {
          title: "Easy to Use",
          description: "Our intuitive interface makes it simple for anyone to get started without a steep learning curve.",
          icon: "Star",
          image: "",
          link: "#",
          linkText: "Learn More"
        },
        {
          title: "Powerful Analytics",
          description: "Gain valuable insights with our comprehensive analytics and reporting tools.",
          icon: "BarChart",
          image: "",
          link: "#",
          linkText: "View Demo"
        },
        {
          title: "Secure & Reliable",
          description: "Your data is protected with enterprise-grade security and 99.9% uptime guarantee.",
          icon: "Shield",
          image: "",
          link: "#",
          linkText: "Read More"
        },
        {
          title: "24/7 Support",
          description: "Our dedicated support team is always available to help you with any questions or issues.",
          icon: "Headphones",
          image: "",
          link: "#",
          linkText: "Contact Us"
        }
      ],
      layout: "grid",
      columns: 4,
      gap: 24,
      padding: {
        top: 80,
        bottom: 80
      },
      backgroundColor: "#ffffff",
      textColor: "#000000",
      iconStyle: "outlined",
      iconColor: "#0070f3",
      featureStyle: "simple",
      titleAlignment: "center"
    },

    // Content blocks section
    contentBlocks: {
      title: "Why Choose Us",
      blocks: [
        {
          title: "Our Mission",
          content: "We're on a mission to transform how businesses operate by providing innovative solutions that drive growth and efficiency.",
          image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
          imagePosition: "right",
          backgroundColor: "#ffffff",
          textColor: "#000000",
          buttonText: "Learn More",
          buttonUrl: "#",
          buttonVariant: "solid",
          buttonColor: "primary"
        },
        {
          title: "Our Approach",
          content: "We combine cutting-edge technology with human expertise to deliver solutions that are both powerful and easy to use.",
          image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
          imagePosition: "left",
          backgroundColor: "#f5f5f5",
          textColor: "#000000",
          buttonText: "Our Process",
          buttonUrl: "#",
          buttonVariant: "bordered",
          buttonColor: "primary"
        }
      ],
      layout: "alternating",
      spacing: 0,
      padding: {
        top: 0,
        bottom: 0
      },
      fullWidth: false,
      backgroundColor: "#ffffff",
      titleColor: "#000000",
      titleAlignment: "center",
      blockStyle: "simple",
      animation: {
        enabled: true,
        type: "fade"
      }
    },

    // Testimonials section
    testimonials: {
      title: "What Our Customers Say",
      description: "Don't just take our word for it. Here's what our customers have to say about their experience with us.",
      items: [
        {
          quote: "This product has completely transformed our workflow. We're now able to accomplish in hours what used to take days.",
          author: "Sarah Johnson",
          role: "Marketing Director",
          company: "TechCorp",
          avatar: "https://randomuser.me/api/portraits/women/1.jpg",
          rating: 5
        },
        {
          quote: "The customer support team is exceptional. They've been incredibly responsive and helpful throughout our onboarding process.",
          author: "Michael Chen",
          role: "CTO",
          company: "Innovate Inc",
          avatar: "https://randomuser.me/api/portraits/men/2.jpg",
          rating: 4.5
        },
        {
          quote: "I've tried many similar products, but this one stands out for its ease of use and powerful features. Highly recommended!",
          author: "Emily Rodriguez",
          role: "Small Business Owner",
          company: "",
          avatar: "https://randomuser.me/api/portraits/women/3.jpg",
          rating: 5
        }
      ],
      layout: "grid",
      columns: 3,
      gap: 24,
      padding: {
        top: 80,
        bottom: 80
      },
      backgroundColor: "#f5f5f5",
      textColor: "#000000",
      testimonialStyle: "card",
      quoteColor: "#0070f3",
      showRating: true,
      showQuotationMarks: true,
      titleAlignment: "center",
      autoplay: true,
      autoplaySpeed: 5000,
      showNavigation: true,
      showDots: true
    },

    // CTA section
    cta: {
      title: "Ready to Get Started?",
      description: "Join thousands of satisfied customers who are already using our product to grow their business.",
      button: {
        text: "Sign Up Now",
        url: "#",
        variant: "solid",
        color: "primary",
        size: "lg",
        icon: "",
        openInNewTab: false
      },
      backgroundImage: "",
      overlay: {
        show: false,
        color: "#000000",
        opacity: 0.5
      },
      layout: "centered",
      height: 300,
      padding: {
        top: 60,
        bottom: 60
      },
      contentAlignment: "center",
      backgroundColor: "#0070f3",
      textColor: "#ffffff",
      style: "simple",
      gradientStartColor: "#0070f3",
      gradientEndColor: "#00cffd",
      gradientDirection: "to-right",
      animation: {
        enabled: true,
        type: "fade"
      }
    }
  };

  const [homeSettings, setHomeSettings] = useState(defaultSettings);

  const updateHomeSettings = (newSettings) => {
    setHomeSettings(prevSettings => ({
      ...prevSettings,
      ...newSettings
    }));
  };

  const resetToDefaults = async () => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      setHomeSettings(defaultSettings);
    } catch (error) {
      // Optionally log or handle error
    } finally {
      setIsLoading(false);
    }
  };

  return {
    homeSettings,
    updateHomeSettings,
    resetToDefaults,
    isLoading
  };
};
