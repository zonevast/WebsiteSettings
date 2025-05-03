
import { useApiAdmin } from "@/hooks/useApi/useApiAdmin";
import { useProjectSettings } from "./settings/useProjectSettings";


export const useTags = () => {
  const { settings: {
    locale,
    project,
  } } = useProjectSettings();
  const {
    data,
    error,
    loading,
    fetchData,
    createData,
    updateData,
    deleteData,
    search,
    pagination,
    options,
  } = useApiAdmin(`/${locale}/${project}/groups`, "/tags");



  return {
    tags: data,
    errorTags: error,
    loadingTags: loading,
    searchTags: search.handleSearch,
    fetchTags: fetchData,
    createTag: createData,
    updateTag: updateData,
    deleteTag: deleteData,
    totalPagesTags: pagination.totalPages,
    setCurrentPageTags: pagination.setCurrentPage,
    currentPage: pagination.currentPage,
    tagsOptions: options,
  };
};


