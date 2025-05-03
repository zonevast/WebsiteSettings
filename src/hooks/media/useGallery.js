import { useState, useCallback, useEffect, useRef } from "react";
import {
  useMutation,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "react-query";
import { apiClient, fileClientUpload } from "@/config/request";
import { useNotification } from "@/components/CustomNotification/NotificationProvider";

export const useGallery = (config = {}, id = null) => {
  const {
    prefix = "/api",
    endpoint = "/attachments",
    notify = true,
    mode = "product"
  } = config;

  const queryClient = useQueryClient();
  const { sendNotification } = useNotification();

  // Use refs to track previous values for comparison
  const prevEndpointRef = useRef(endpoint);
  const prevModeRef = useRef(mode);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Create a unique query key that includes the endpoint AND mode
  const galleryQueryKey = ["gallery-infinite", prefix, endpoint, mode];
  const searchQueryKey = ["gallery-search", prefix, endpoint, mode, searchTerm];

  // Reset state when endpoint or mode changes
  useEffect(() => {
    const endpointChanged = prevEndpointRef.current !== endpoint;
    const modeChanged = prevModeRef.current !== mode;

    if (endpointChanged || modeChanged) {
      // Reset search state
      setSearchTerm("");
      setSearchResults(null);
      setCurrentPage(1);
      setIsSearching(false);

      // Update refs
      prevEndpointRef.current = endpoint;
      prevModeRef.current = mode;
    }
  }, [endpoint, mode]);

  // Handle search term changes
  useEffect(() => {
    if (searchTerm) {
      performSearch(searchTerm);
    } else {
      setSearchResults(null);
      setIsSearching(false);
    }
  }, [searchTerm, endpoint, mode]);

  const performSearch = useCallback(
    async (term) => {
      if (!term) return;

      setIsSearching(true);

      try {
        const url = `${prefix}${endpoint}?search=${encodeURIComponent(term)}`;
        const response = await apiClient.get(url);
        setSearchResults(response.data.results);
      } catch (error) {
        if (notify) {
          sendNotification(`Search failed: ${error.message}`, "error");
        }
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    },
    [prefix, endpoint, notify, sendNotification]
  );

  const fetchGalleryPage = useCallback(
    async ({ pageParam = currentPage }) => {
      // Normal listing request, no ?search param
      const url = `${prefix}${endpoint}?page=${pageParam}`;
      const response = await apiClient.get(url);
      return {
        data: response.data.results,
        count: response.data.count,
        nextPage:
          pageParam < Math.ceil(response.data.count / 10)
            ? pageParam + 1
            : null,
      };
    },
    [prefix, endpoint, currentPage]
  );

  const {
    data: infiniteData,
    error: fetchError,
    isLoading: isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch: refetchGallery,
  } = useInfiniteQuery(
    galleryQueryKey,
    fetchGalleryPage,
    {
      enabled: !searchTerm, // Only run infinite query if no searchTerm
      getNextPageParam: (lastPage) => lastPage.nextPage,
      onError: (error) => {
        if (notify) {
          sendNotification(`Failed to fetch gallery: ${error.message}`, "error");
        }
      },
    }
  );

  const galleryData =
    infiniteData?.pages.reduce((acc, page) => [...acc, ...page.data], []) || [];

  const totalCount = infiniteData?.pages[0]?.count || 0;
  const totalPages = Math.ceil(totalCount / 10);

  const handleSearch = useCallback(
    (term) => {
      setSearchTerm(term);
    },
    []
  );

  const handleFileSelect = useCallback((event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  }, []);

  const uploadMutation = useMutation(
    async (files) => {
      const uploads = files.map((file) => {
        const formData = new FormData();
        formData.append("file", file);

        return fileClientUpload.post(`${prefix}${endpoint}/`, formData, {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        });
      });

      return Promise.all(uploads);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(galleryQueryKey);
        if (notify) sendNotification("Files uploaded successfully", "success");
        setSelectedFiles([]);
        setUploadProgress(0);
      },
      onError: (error) => {
        if (notify) {
          sendNotification(`Upload failed: ${error.message}`, "error");
        }
        setUploadProgress(0);
      },
    }
  );

  const deleteMutation = useMutation(
    (itemId) => apiClient.delete(`${prefix}${endpoint}/${itemId}/`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(galleryQueryKey);
        if (notify) sendNotification("File deleted successfully", "success");
      },
      onError: (error) => {
        if (notify) {
          sendNotification(`Delete failed: ${error.message}`, "error");
        }
      },
    }
  );

  const getItemById = useCallback(
    async (itemId) => {
      if (!itemId) throw new Error("ID is required");
      const url = `${prefix}${endpoint}/${itemId}/`;
      const response = await apiClient.get(url);
      return response.data;
    },
    [prefix, endpoint]
  );

  const {
    data: itemData,
    error: itemError,
    isLoading: isLoadingItem,
    refetch: refetchItem,
    remove: removeItemFromCache,
  } = useQuery(
    ["galleryItem", prefix, endpoint, id, mode],
    () => getItemById(id),
    {
      enabled: !!id,
      onError: (error) => {
        if (notify) {
          sendNotification(`Failed to fetch item: ${error.message}`, "error");
        }
      },
    }
  );

  const trashOperations = {
    fetchTrashed: useCallback(
      async () => {
        const url = `${prefix}${endpoint}/trashed/`;
        const response = await apiClient.get(url);
        return response.data;
      },
      [prefix, endpoint]
    ),

    restore: useCallback(
      async (itemId) => {
        const url = `${prefix}${endpoint}/restore/${itemId}/`;
        const response = await apiClient.post(url);
        queryClient.invalidateQueries(galleryQueryKey);
        return response.data;
      },
      [prefix, endpoint, queryClient, galleryQueryKey]
    ),

    forceDelete: useCallback(
      async (itemId) => {
        const url = `${prefix}${endpoint}/${itemId}/force-delete/`;
        const response = await apiClient.delete(url);
        queryClient.invalidateQueries(galleryQueryKey);
        return response.data;
      },
      [prefix, endpoint, queryClient, galleryQueryKey]
    ),
  };

  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [currentPage, totalPages]);

  const goToPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }, [currentPage]);

  // Properly implemented resetGallery function
  const resetGallery = useCallback(() => {
    // Reset all state
    setSearchTerm("");
    setSearchResults(null);
    setCurrentPage(1);
    setIsSearching(false);
    // Invalidate the specific gallery query
    queryClient.invalidateQueries(galleryQueryKey);
  }, [queryClient, galleryQueryKey]);

  const finalGallery = searchTerm ? searchResults || [] : galleryData;

  return {
    // Final data to show
    gallery: finalGallery,
    isLoading: (isFetching && !searchTerm) || (isSearching && searchTerm),
    error: fetchError,

    // Upload
    selectedFiles,
    handleFileSelect,
    uploadFiles: (files) => uploadMutation.mutate(files || selectedFiles),
    uploadProgress,
    isUploading: uploadMutation.isLoading,

    // Delete
    deleteFile: (itemId) => deleteMutation.mutate(itemId),
    isDeleting: deleteMutation.isLoading,

    // Searching
    searchTerm,
    setSearchTerm,
    handleSearch,
    searchResults,
    isSearching,

    // Infinite scroll
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetchGallery,
    resetGallery,

    // Single item
    item: itemData,
    itemError,
    isLoadingItem,
    refetchItem,
    removeItemFromCache,
    getItemById,

    // Trash
    trash: trashOperations,

    // Pagination
    totalCount,
    totalPages,
    currentPage,
    setCurrentPage,
    goToNextPage,
    goToPreviousPage,

    // Current mode
    mode,
  };
};

export default useGallery;