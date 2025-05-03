
import { useState, useEffect } from "react";
import { Briefcase, Award, TrendingUp } from "lucide-react";
import { useBrands } from "./useBrands";

export const useBrandLogic = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterFeatured, setFilterFeatured] = useState("all");
  const {
    brands: apiBrands,
    errorBrands,
    loadingBrands,
    searchBrands,
    fetchBrands,
    totalPagesBrands,
    setCurrentPageBrands,
    currentPage,
    createBrand,
    updateBrand,
    deleteBrand,
  } = useBrands();

  // Stats cards data with brand-specific metrics
  const dummyStatsCards = [
    {
      title: "totalBrands",
      value: 0,
      change: 8,
      trend: "up",
      description: "brandsLastMonth",
      icon: Briefcase, // Brand portfolio icon
      color: "indigo",
    },
    {
      title: "featuredBrands",
      value: 0,
      change: 3,
      trend: "up",
      description: "featuredBrandsIncrease",
      icon: Award, // Featured/premium brand icon
      color: "amber",
    },
    {
      title: "brandPerformance",
      value: 0,
      change: 15,
      trend: "up",
      description: "averageSalesIncrease",
      icon: TrendingUp, // Brand performance icon
      color: "green",
    },
  ];


  useEffect(() => {
    if (searchQuery) {
      searchBrands(searchQuery);
    } else {
      fetchBrands();
    }
  }, [searchQuery, fetchBrands, searchBrands]);

  const exportBrands = (brandsToExport) => {
    console.log("Exporting brands:", brandsToExport);
  };


  // Map API categories to the format expected by the table
  const mappedBrands =
    apiBrands?.data?.map((brand) => ({
      id: brand.id,
      name: brand.name,
      slug: brand.slug,
      productCount: brand.product_count,
      featured: brand.featured,
      attachment: brand.attachment,
      createdAt: brand.created_at,
      updatedAt: brand.updated_at,
    })) || [];


  return {
    searchQuery,
    setSearchQuery,
    exportBrands,

    brands: mappedBrands,

    createBrand,
    updateBrand,
    deleteBrand,

    totalPagesBrands,
    setCurrentPageBrands,
    currentPage,

    dummyStatsCards,


    filterFeatured,
    setFilterFeatured,
    loadingBrands,
    errorBrands,
  };
};