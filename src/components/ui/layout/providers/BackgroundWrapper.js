// BackgroundWrapper.jsx
"use client";
import { useTheme } from "next-themes";

// Background wrapper with theme-aware styling
export function BackgroundWrapper({ children, colorScheme = "default" }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Get color variables based on color scheme
  const getPrimaryColor = () => {
    switch (colorScheme) {
      case "blue":
        return "bg-blue-500/20";
      case "green":
        return "bg-green-500/20";
      case "purple":
        return "bg-purple-500/20";
      case "amber":
        return "bg-amber-500/20";
      default:
        return "bg-primary/20";
    }
  };

  const getSecondaryColor = () => {
    switch (colorScheme) {
      case "blue":
        return "bg-cyan-500/20";
      case "green":
        return "bg-purple-500/20";
      case "purple":
        return "bg-pink-500/20";
      case "amber":
        return "bg-cyan-500/20";
      default:
        return "bg-secondary/20";
    }
  };

  const getLightBgGradient = () => {
    switch (colorScheme) {
      case "blue":
        return "bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50";
      case "green":
        return "bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50";
      case "purple":
        return "bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50";
      case "amber":
        return "bg-gradient-to-br from-gray-50 via-amber-50 to-yellow-50";
      default:
        return "bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50";
    }
  };

  const primaryGlow = getPrimaryColor();
  const secondaryGlow = getSecondaryColor();
  const lightBackground = getLightBgGradient();

  return (
    <div
      className={`min-h-screen w-full relative ${isDark ? "bg-background/60 backdrop-blur-xl" : lightBackground
        }`}
    >
      <div className="absolute inset-0 bg-grid-primary/[0.02] bg-[size:20px] pointer-events-none" />

      {isDark ? (
        <>
          <div
            className={`absolute top-1/4 left-1/4 w-96 h-96 ${primaryGlow} rounded-full filter blur-3xl animate-pulse`}
          />
          <div
            className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${secondaryGlow} rounded-full filter blur-3xl animate-pulse delay-700`}
          />
        </>
      ) : (
        <>
          <div
            className={`absolute top-1/4 left-1/4 w-96 h-96 ${primaryGlow} rounded-full filter blur-3xl animate-pulse`}
          />
          <div
            className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${secondaryGlow} rounded-full filter blur-3xl animate-pulse delay-700`}
          />
        </>
      )}

      <div className="relative z-10 min-h-screen">{children}</div>
    </div>
  );
}