// hooks/useMediaLogic.js - Fixed version
import { useState, useRef, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { useProjectSettings } from "@/hooks/settings/useProjectSettings";
import useGallery from "./useGallery";

export const useMediaLogic = (initialMode = "product") => {
  const [mode, setMode] = useState(initialMode);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [attachmentToDelete, setAttachmentToDelete] = useState(null);

  // Track previous mode to detect changes
  const prevModeRef = useRef(mode);

  const fileInputRef = useRef(null);
  const { ref: loadMoreRef, inView } = useInView();

  const {
    settings: { locale, project },
  } = useProjectSettings();

  // Determine endpoint based on mode
  const endpoint = mode === "product" ? "/attachments" : "/meta_attachment";

  const {
    gallery,
    isLoading,
    error,
    uploadProgress,
    selectedFiles,
    handleFileSelect,
    uploadFiles,
    deleteFile,
    handleSearch: apiHandleSearch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isUploading,
    isDeleting,
    refetchGallery,
    resetGallery,
  } = useGallery({
    prefix: `/${locale}/${project}/ecommerce/products`,
    endpoint,
    notify: true,
    mode,
  });

  // Custom mode change handler
  const handleModeChange = useCallback((newMode) => {
    if (newMode !== mode) {
      setMode(newMode);
      // Clear search query when mode changes
      setSearchQuery("");
    }
  }, [mode]);

  // Effect to handle mode changes
  useEffect(() => {
    const modeChanged = prevModeRef.current !== mode;

    if (modeChanged) {
      // Reset gallery data when mode changes
      resetGallery();
      // Refetch with new mode/endpoint
      refetchGallery();
      // Update previous mode ref
      prevModeRef.current = mode;
    }
  }, [mode, resetGallery, refetchGallery]);

  // Stable search handler that won't be affected by mode changes
  const handleSearch = useCallback((value) => {
    setSearchQuery(value);
    apiHandleSearch(value);
  }, [apiHandleSearch]);

  // Fetch more data when the "load more" ref is in view
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !searchQuery) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, searchQuery]);

  // Get the correct data source
  const filteredAttachments = gallery || [];

  // Handle file deletion with stable callback
  const handleDelete = useCallback(async (id) => {
    await deleteFile(id);
    refetchGallery();
  }, [deleteFile, refetchGallery]);

  return {
    mode,
    setMode: handleModeChange, // Use the custom handler instead of raw setter
    searchQuery,
    setSearchQuery,
    deleteModalOpen,
    setDeleteModalOpen,
    attachmentToDelete,
    setAttachmentToDelete,
    fileInputRef,
    loadMoreRef,
    filteredAttachments,
    isLoading,
    error,
    uploadProgress,
    selectedFiles,
    handleFileSelect,
    handleDelete,
    handleSearch,
    hasNextPage,
    isFetchingNextPage,
    isUploading,
    isDeleting,
    refetchGallery,
    uploadFiles,
  };
};