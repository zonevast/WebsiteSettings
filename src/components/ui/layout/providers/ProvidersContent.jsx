"use client";
import { useEffect, useState } from "react";
import { NotificationProvider } from "@/components/CustomNotification/NotificationProvider";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "react-query";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { BackgroundWrapper } from "./BackgroundWrapper";

export default function ProvidersContent({
  children,
  defaultTheme = "light",
  defaultColorScheme = "default",
  defaultDensity = "comfortable",
}) {
  const [queryClient] = useState(() => new QueryClient());
  const [mounted, setMounted] = useState(false);

  // Get initializeSettings and updateAppearance from Zustand store
  const initializeSettings = useSettingsStore(
    (state) => state.initializeSettings
  );
  const colorScheme = useSettingsStore(
    (state) => state.appearance?.colorScheme || defaultColorScheme
  );

  // Initialize settings on mount using the defaults provided via props
  useEffect(() => {
    initializeSettings({
      appearance: {
        theme: defaultTheme,
        colorScheme: defaultColorScheme,
        density: defaultDensity,
      },
    });

    // Apply appearance settings to the document directly
    document.documentElement.setAttribute(
      "data-color-scheme",
      defaultColorScheme
    );
    document.documentElement.setAttribute("data-density", defaultDensity);

    setMounted(true);
  }, [defaultTheme, defaultColorScheme, defaultDensity, initializeSettings]);

  // Updated theme change handler without cookies
  const handleThemeChange = (theme) => {
    // Update appearance in your store without using cookies
    // The next-themes provider will handle the theme change itself
    useSettingsStore.getState().updateAppearance({ theme });
  };

  return (
    <NextUIProvider>
      <NextThemesProvider
        defaultTheme={defaultTheme}
        attribute="class"
        onValueChange={handleThemeChange}
      >
        <NotificationProvider>
          <QueryClientProvider client={queryClient}>
            {mounted && (
              <BackgroundWrapper colorScheme={colorScheme}>
                {children}
              </BackgroundWrapper>
            )}
          </QueryClientProvider>
        </NotificationProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
