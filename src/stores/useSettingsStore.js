import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

// Define default settings
const defaultSettings = {
  language: "ar",
  timezone: "UTC",
  dateFormat: "MM/DD/YYYY",
  currency: "USD",
  appearance: {
    theme: "system",
    density: "comfortable",
    colorScheme: "default",
    sidebarCollapsed: false,
  },
  productSettings: {
    enableVariants: true,
    enableBulkEdit: false,
    autoGenerateSKU: true,
    enableCardView: false,
    enableAdvanceMode: false,
    itemsPerPage: 10, // New setting: default is 10
  },
};

// Create Zustand store with persistence
export const useSettingsStore = create(
  persist(
    (set, get) => ({
      // Initial state
      ...defaultSettings,

      // Initialize settings with server values
      initializeSettings: (serverSettings) => {
        set((state) => ({
          ...state,
          ...serverSettings,
        }));
      },

      // Update a single setting
      updateSetting: (key, value) => {
        set({ [key]: value });

        // Also update cookie for critical settings that need to be available server-side
        if (["language", "timezone", "currency"].includes(key)) {
          Cookies.set(key, value, { expires: 365 });
        }
      },

      // Update appearance settings
      updateAppearance: (appearanceSettings) => {
        set((state) => {
          const newAppearance = {
            ...state.appearance,
            ...appearanceSettings,
          };

          // Update cookies for server-side rendering
          if (appearanceSettings.colorScheme) {
            Cookies.set("colorScheme", appearanceSettings.colorScheme, {
              expires: 365,
            });
          }
          if (appearanceSettings.density) {
            Cookies.set("density", appearanceSettings.density, { expires: 365 });
          }
          return { appearance: newAppearance };
        });
      },

      // Update product settings
      updateProductSetting: (key, value) => {
        set((state) => ({
          productSettings: {
            ...state.productSettings,
            [key]: value,
          },
        }));
      },

      // Reset all settings to defaults
      resetSettings: () => {
        set(defaultSettings);
        // Clear cookies
        ["language", "timezone", "currency", "dateFormat", "colorScheme", "density"].forEach((key) => {
          Cookies.remove(key);
        });
      },
    }),
    {
      name: "app-settings", // Storage key
      partialize: (state) => {
        // Don't persist functions
        const { updateSetting, updateAppearance, updateProductSetting, resetSettings, initializeSettings, ...rest } = state;
        return rest;
      },
    }
  )
);
