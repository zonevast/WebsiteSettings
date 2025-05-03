import { useState, useMemo } from "react";
import { Folder, AlertTriangle } from "lucide-react";
import { useCategories } from "./useCategories";

export const useCategoryLogic = () => {
  const [filterFeatured, setFilterFeatured] = useState("all"); // Added

  // Use the API hook instead of dummy data
  const {
    categories: apiCategories,
    loadingCategories,
    errorCategories,
    search: { searchCategories, searchData, searchError, isSearchLoading },
    totalPagesCategories,
    setCurrentPageCategories,
    currentPage,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategories();

  // Stats cards data
  const dummyStatsCards = [
    {
      title: "totalCategories",
      value: 0,
      change: 12,
      trend: "up",
      description: "categoriesLastMonth",
      icon: Folder,
      color: "blue",
    },
    {
      title: "productsWithoutCategory",
      value: 7,
      change: 3,
      trend: "down",
      description: "uncategorizedProductsDecrease",
      icon: AlertTriangle,
      color: "amber",
    },
  ];


  // Map API categories to the format expected by the table
  const mappedCategories =
    apiCategories?.data?.map((category) => ({
      id: category.id,
      name: category.title,
      slug: category.slug,
      productCount: category.product_count,
      featured: category.featured,
      attachment: category.attachment,
      createdAt: new Date().toISOString().split("T")[0],
    })) || [];

  return {

    categories: mappedCategories,
    currentPage,
    totalPagesCategories,
    setCurrentPageCategories,
    dummyStatsCards,
    loadingCategories,
    errorCategories,
    filterFeatured,
    setFilterFeatured,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
