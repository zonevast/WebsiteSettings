// hooks/settings/useFooterSettings.js
"use client";
import { useState, useEffect } from "react";

export const useFooterSettings = () => {
    // Default footer settings (dummy data)
    const defaultSettings = {
        footerType: "multiColumn",
        footerWidth: "contained",
        columnCount: "4",
        stickToBottom: true,
        topPadding: 64,
        bottomPadding: 64,
        columnSpacing: 32,
        stackOnMobile: true,
        mobileAlignment: "center",
        hideOnMobile: false,

        backgroundColor: "#ffffff",
        textColor: "#333333",
        borderStyle: "top",
        borderWidth: "1",
        borderColor: "#e5e7eb",

        showFooterLogo: true,
        footerLogoUrl: "https://placehold.co/200x80/6366F1/white?text=Logo",

        columns: [
            {
                id: "1",
                title: "Company",
                isVisible: true,
                links: [
                    { id: "1-1", label: "About Us", url: "/about", isExternal: false, isVisible: true },
                    { id: "1-2", label: "Careers", url: "/careers", isExternal: false, isVisible: true },
                    { id: "1-3", label: "Press", url: "/press", isExternal: false, isVisible: true },
                    { id: "1-4", label: "Blog", url: "/blog", isExternal: false, isVisible: true }
                ]
            },
            {
                id: "2",
                title: "Products",
                isVisible: true,
                links: [
                    { id: "2-1", label: "Features", url: "/features", isExternal: false, isVisible: true },
                    { id: "2-2", label: "Pricing", url: "/pricing", isExternal: false, isVisible: true },
                    { id: "2-3", label: "Marketplace", url: "/marketplace", isExternal: false, isVisible: true },
                    { id: "2-4", label: "Integrations", url: "/integrations", isExternal: false, isVisible: true }
                ]
            },
            {
                id: "3",
                title: "Resources",
                isVisible: true,
                links: [
                    { id: "3-1", label: "Documentation", url: "/docs", isExternal: false, isVisible: true },
                    { id: "3-2", label: "Guides", url: "/guides", isExternal: false, isVisible: true },
                    { id: "3-3", label: "API Status", url: "/api-status", isExternal: false, isVisible: true },
                    { id: "3-4", label: "Community", url: "/community", isExternal: false, isVisible: true }
                ]
            },
            {
                id: "4",
                title: "Legal",
                isVisible: true,
                links: [
                    { id: "4-1", label: "Privacy Policy", url: "/privacy", isExternal: false, isVisible: true },
                    { id: "4-2", label: "Terms of Service", url: "/terms", isExternal: false, isVisible: true },
                    { id: "4-3", label: "Cookie Policy", url: "/cookies", isExternal: false, isVisible: true },
                    { id: "4-4", label: "GDPR", url: "/gdpr", isExternal: false, isVisible: true }
                ]
            }
        ],

        copyrightText: "© 2025 Your Company, Inc. All rights reserved.",
        additionalText: "Made with ❤️ by the awesome team.",

        socialLinks: [
            { id: "1", platform: "facebook", url: "https://facebook.com/yourcompany", isVisible: true },
            { id: "2", platform: "twitter", url: "https://twitter.com/yourcompany", isVisible: true },
            { id: "3", platform: "instagram", url: "https://instagram.com/yourcompany", isVisible: true },
            { id: "4", platform: "linkedin", url: "https://linkedin.com/company/yourcompany", isVisible: true },
            { id: "5", platform: "github", url: "https://github.com/yourcompany", isVisible: true }
        ],
        socialIconsPosition: "bottom",
        socialIconsSize: "medium",
        socialIconsStyle: "filled",
        showSocialText: false,

        showNewsletter: true,
        newsletterTitle: "Subscribe to our newsletter",
        newsletterSubtitle: "Get the latest news and updates delivered to your inbox",
        newsletterButtonText: "Subscribe",
        newsletterPosition: "right"
    };

    const [footerSettings, setFooterSettings] = useState(defaultSettings);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadSettings = async () => {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 500));
            setFooterSettings(defaultSettings);
            setIsLoading(false);
        };
        loadSettings();
    }, []);

    const updateFooterSettings = (newSettings) => {
        setFooterSettings(prevSettings => ({
            ...prevSettings,
            ...newSettings
        }));
    };

    const resetToDefaults = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setFooterSettings(defaultSettings);
        setIsLoading(false);
    };

    const saveSettings = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
    };

    return {
        footerSettings,
        updateFooterSettings,
        resetToDefaults,
        saveSettings,
        isLoading
    };
};

export default useFooterSettings;
