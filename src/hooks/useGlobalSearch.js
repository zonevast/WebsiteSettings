// hooks/useGlobalSearch.js
import { useState, useEffect, useCallback } from "react";
import { useProducts } from "@/hooks/products/useProducts";

const RECENT_SEARCHES_KEY = "recent_searches";

export const useGlobalSearch = () => {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchResults, setSearchResults] = useState([]); // Only products
  const { search, loadingProducts } = useProducts();

  // Load recent searches from localStorage
  useEffect(() => {
    const storedSearches = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  // Save recent search to localStorage
  const addToRecentSearches = useCallback(
    (searchTerm) => {
      const updatedSearches = [
        searchTerm,
        ...recentSearches.filter((term) => term !== searchTerm),
      ].slice(0, 5); // Keep only the latest 5
      setRecentSearches(updatedSearches);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updatedSearches));
    },
    [recentSearches]
  );

  // Remove a search term from recent searches
  const removeRecentSearch = useCallback(
    (searchTerm) => {
      if (searchTerm === "all") {
        setRecentSearches([]);
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify([]));
        return;
      }
      const updatedSearches = recentSearches.filter(
        (term) => term !== searchTerm
      );
      setRecentSearches(updatedSearches);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updatedSearches));
    },
    [recentSearches]
  );

  // Perform search
  const handleSearch = useCallback(async () => {
    if (query.trim().length < 2) {
      setSearchResults([]); 
      return;
    }

    try {
      await search.searchProducts(query); 
      setSearchResults(search.searchData || []); 
      addToRecentSearches(query); 
    } catch (error) {
      console.error("Error searching:", error);
      setSearchResults([]);
    }
  }, [query, search, addToRecentSearches]);

  return {
    query,
    setQuery,
    recentSearches,
    searchResults,
    loadingProducts,
    handleSearch,
    removeRecentSearch,
  };
};