import { useApiAdmin } from "@/hooks/useApi/useApiAdmin";
import { setCookie } from "@/lib/utils/cookies";

export const useProject = () => {
  const {
    data,
    error,
    loading,
    fetchData,
    createData,
    updateData,
    deleteData,
  } = useApiAdmin(`/en/project`, "/project");

  const cookieOptions = {
    domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || 'localhost',
    path: "/",
    secure: true,
    sameSite: "none",
    maxAge: 3600 // 1 hour for access token
  };

  // Set first project data in cookies with username
  if (data && data.data && data.data[0]) {
    const projectData = data.data[0];
    const username = projectData.username || 'defaultUser';
    setCookie("project", username, cookieOptions);
  }


  return {
    projects: data,
    errorProject: error,
    loadingProject: loading,
    fetchProjects: fetchData,
    createProject: createData,
    updateProject: updateData,
    deleteProject: deleteData,
  };
};