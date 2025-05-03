"use client";
import { useState } from "react";

export const useThemeSettings = () => {
    const [isLoading, setIsLoading] = useState(false);

    // Default theme settings
    const defaultSettings = {
        lightMode: {
            primaryColor: "#0070F3",
            secondaryColor: "#7928CA",
            accentColor: "#FF4081",
            backgroundColor: "#FFFFFF",
            surfaceColor: "#F5F5F5",
            textColor: "#111111",
            secondaryTextColor: "#717171",
            borderColor: "#EAEAEA",
            dividerColor: "#EAEAEA",
            focusRingColor: "#0070F3",
            successColor: "#17C964",
            warningColor: "#F5A524",
            errorColor: "#F31260",
            infoColor: "#0070F3",
            primaryShades: {
                50: "#E6F0FE",
                100: "#CCE0FD",
                200: "#99C2FB",
                300: "#66A3F9",
                400: "#3385F7",
                500: "#0070F3",
                600: "#005AC2",
                700: "#004392",
                800: "#002D61",
                900: "#001631"
            },
            secondaryShades: {
                50: "#F2EAFA",
                100: "#E5D4F5",
                200: "#CBA9EB",
                300: "#B17EE0",
                400: "#9753D6",
                500: "#7928CA",
                600: "#6120A2",
                700: "#491879",
                800: "#301051",
                900: "#180828"
            },
            accentShades: {
                50: "#FFE5EF",
                100: "#FFCCE0",
                200: "#FF99C1",
                300: "#FF66A3",
                400: "#FF3384",
                500: "#FF0066",
                600: "#CC0052",
                700: "#99003D",
                800: "#660029",
                900: "#330014"
            }
        },
        darkMode: {
            primaryColor: "#0070F3",
            secondaryColor: "#9D4EDD",
            accentColor: "#FF4081",
            backgroundColor: "#000000",
            surfaceColor: "#111111",
            textColor: "#FFFFFF",
            secondaryTextColor: "#A1A1A1",
            borderColor: "#333333",
            dividerColor: "#333333",
            focusRingColor: "#0070F3",
            successColor: "#17C964",
            warningColor: "#F5A524",
            errorColor: "#F31260",
            infoColor: "#0070F3",
            primaryShades: {
                50: "#E6F0FE",
                100: "#CCE0FD",
                200: "#99C2FB",
                300: "#66A3F9",
                400: "#3385F7",
                500: "#0070F3",
                600: "#005AC2",
                700: "#004392",
                800: "#002D61",
                900: "#001631"
            },
            secondaryShades: {
                50: "#F5EAFD",
                100: "#EBD4FB",
                200: "#D7A9F7",
                300: "#C37EF3",
                400: "#AF53EF",
                500: "#9D4EDD",
                600: "#7E3EB1",
                700: "#5E2E85",
                800: "#3F1F58",
                900: "#1F0F2C"
            },
            accentShades: {
                50: "#FFE5EF",
                100: "#FFCCE0",
                200: "#FF99C1",
                300: "#FF66A3",
                400: "#FF3384",
                500: "#FF0066",
                600: "#CC0052",
                700: "#99003D",
                800: "#660029",
                900: "#330014"
            }
        },
        typography: {
            headingFont: "'Inter', sans-serif",
            bodyFont: "'Inter', sans-serif",
            monoFont: "'Fira Code', monospace",
            fontSizes: {
                base: 16,
                small: 14,
                large: 18,
                h1: 36,
                h2: 30,
                h3: 24,
                h4: 20,
                h5: 18,
                h6: 16,
                scaleRatio: 1.25
            },
            fontWeights: {
                heading: "600",
                body: "400"
            },
            lineHeight: 1.5,
            letterSpacing: 0,
            textAlignment: "left",
            paragraphSpacing: 1.5,
            useCustomFonts: false,
            customFonts: [
                { name: "", url: "", weight: "400", style: "normal" }
            ]
        },
        layout: {
            containerWidth: {
                desktop: 1280,
                tablet: 768,
                mobile: 375
            },
            layoutType: "fluid",
            boxedMaxWidth: 1200,
            spacingUnit: 8,
            borderRadius: 8,
            contentPadding: 4,
            sectionSpacing: 6,
            gap: {
                x: 4,
                y: 4
            },
            sidebarEnabled: true,
            sidebarWidth: 280,
            sidebarPosition: "left",
            sidebarCollapsible: true,
            enableShadows: true,
            enableRounded: true,
            enableAnimations: true,
            reducedMotion: false,
            componentStyles: {
                card: "shadow",
                button: "solid",
                input: "bordered"
            }
        },
        enableDarkMode: true,
        respectSystemPreference: true,
        defaultToDarkMode: false,
        allowUserToggle: true,
        activePreset: "default",
        presets: [
            {
                id: "default",
                name: "Default",
                primaryColor: "#0070F3",
                secondaryColor: "#7928CA",
                accentColor: "#FF4081",
                backgroundColor: "#FFFFFF",
                tags: ["blue", "modern"]
            },
            {
                id: "dark",
                name: "Dark Mode",
                primaryColor: "#0070F3",
                secondaryColor: "#9D4EDD",
                accentColor: "#FF4081",
                backgroundColor: "#000000",
                tags: ["dark", "modern"]
            },
            {
                id: "nature",
                name: "Nature",
                primaryColor: "#2E7D32",
                secondaryColor: "#8BC34A",
                accentColor: "#FFC107",
                backgroundColor: "#FFFFFF",
                tags: ["green", "organic"]
            },
            {
                id: "sunset",
                name: "Sunset",
                primaryColor: "#FF5722",
                secondaryColor: "#FF9800",
                accentColor: "#FFEB3B",
                backgroundColor: "#FFFFFF",
                tags: ["warm", "vibrant"]
            },
            {
                id: "ocean",
                name: "Ocean",
                primaryColor: "#0288D1",
                secondaryColor: "#26C6DA",
                accentColor: "#00BCD4",
                backgroundColor: "#FFFFFF",
                tags: ["blue", "calm"]
            }
        ],
        showCreatePreset: false
    };

    const [themeSettings, setThemeSettings] = useState(defaultSettings);

    const updateThemeSettings = (newSettings) => {
        setThemeSettings(prevSettings => ({
            ...prevSettings,
            ...newSettings
        }));
    };

    const resetToDefaults = async () => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 800));
            setThemeSettings(defaultSettings);
        } finally {
            setIsLoading(false);
        }
    };

    const saveSettings = async () => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Simulate successful save
        } finally {
            setIsLoading(false);
        }
    };

    return {
        themeSettings,
        updateThemeSettings,
        resetToDefaults,
        saveSettings,
        isLoading
    };
};
