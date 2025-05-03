import { useCallback } from "react";
import { useApiV2 } from "./useApi/useApiV2";
import { useProjectSettings } from "./settings/useProjectSettings";

export const useRecycleBin = () => {

    const { settings: {
        locale,
        project,
    } } = useProjectSettings();
  // Initialize the API hook for the recycle bin functionality
  const {
    trash: { fetchTrashedData, restoreData, forceDeleteData },
    loading,
    error,
  } = useApiV2(`/${locale}/${project}/ecommerce/products/m`, `/products`, {
    notify: true,
  });

  // Fetch trashed products
  const fetchTrashedProducts = useCallback(async () => {
    try {
      const trashedData = await fetchTrashedData();
      return trashedData;
    } catch (err) {
      console.log("Error fetching trashed products:", err);
      throw err;
    }
  }, [fetchTrashedData]);

  // Restore a trashed product by ID
  const restoreProduct = useCallback(async (id) => {
    try {
      const restoredData = await restoreData(id);
      return restoredData;
    } catch (err) {
      console.log("Error restoring product:", err);
      throw err;
    }
  }, [restoreData]);

  // Permanently delete a trashed product by ID
  const forceDeleteProduct = useCallback(async (id) => {
    try {
      const deleteResponse = await forceDeleteData(id);
      return deleteResponse;
    } catch (err) {
      console.log("Error force-deleting product:", err);
      throw err;
    }
  }, [forceDeleteData]);

  return {
    fetchTrashedProducts,
    restoreProduct,
    forceDeleteProduct,
    loading,
    error,
  };
};
