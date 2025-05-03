// store/useReportStore.ts
import { create } from "zustand";

const initialState = {
  title: "",
  subtitle: "",
  headerLogo: null,
  footerText: "",
  showPageNumbers: true,
  dateFormat: "short",
  pageNumberPosition: "bottom",
  selectedProducts: [],
  summary: "",
  selectedMetrics: [],
  template: null,
  trendsData: [],
  categoryData: [],
  revenueData: [],
  stockData: [],
};

export const useReportStore = create((set) => ({
  reportData: initialState,

  setReportData: (data) =>
    set((state) => ({
      reportData: { ...state.reportData, ...data },
    })),

  setTemplate: (template) =>
    set((state) => {
      // Add null check and default values
      if (!template) {
        console.warn('Template is undefined or null');
        return state;
      }

      return {
        reportData: {
          ...state.reportData,
          template,

          title: template?.title || `New ${template?.type || 'Report'}`,
          selectedMetrics: [],
          trendsData: generateMockData(template?.charts),
          categoryData: generateMockData(template?.charts),
          revenueData: generateMockData(template?.charts),
          stockData: generateMockData(template?.charts),
        },
      };
    }),

  // Rest of the store code remains the same...
  addProducts: (products) =>
    set((state) => {
      const existingIds = new Set(
        state.reportData.selectedProducts.map((p) => p.id)
      );
      const newProducts = products.filter((p) => !existingIds.has(p.id));
      return {
        reportData: {
          ...state.reportData,
          selectedProducts: [...state.reportData.selectedProducts, ...newProducts],
        },
      };
    }),

  removeProduct: (productId) =>
    set((state) => ({
      reportData: {
        ...state.reportData,
        selectedProducts: state.reportData.selectedProducts.filter(
          (p) => p.id !== productId
        ),
      },
    })),

  resetReport: () => set({ reportData: initialState }),
  clearProducts: () =>
    set((state) => ({
      reportData: {
        ...state.reportData,
        selectedProducts: [],
      },
    })),

  updateMetrics: (metric) =>
    set((state) => ({
      reportData: {
        ...state.reportData,
        selectedMetrics: state.reportData.selectedMetrics.includes(metric)
          ? state.reportData.selectedMetrics.filter((m) => m !== metric)
          : [...state.reportData.selectedMetrics, metric],
      },
    })),
}));

// Helper function to generate mock data for charts
function generateMockData(charts = []) {
  // Add your mock data generation logic here
  return [];
}