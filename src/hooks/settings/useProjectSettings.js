import { useState, useEffect, useCallback } from "react";
import { getCookie, setCookie } from "@/lib/utils/cookies";

// Define the cookie domain to be used for all cookies
const cookieDomain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN || null;

export const useProjectSettings = () => {
  const [settings, setSettings] = useState(() => ({
    locale: getCookie("locale") || "en",
    project: getCookie("project") || "defaultProject",
  }));

  useEffect(() => {
    // Persist settings in cookies with a 365-day expiration and the specified domain.
    setCookie("locale", settings.locale, { days: 365, domain: cookieDomain });
    setCookie("project", settings.project, { days: 365, domain: cookieDomain });
  }, [settings.locale, settings.project]);

  const updateLocale = useCallback((newLocale) => {
    setSettings((prev) => ({ ...prev, locale: newLocale }));
  }, []);

  const updateProject = useCallback((newProject) => {
    setSettings((prev) => ({ ...prev, project: newProject }));
  }, []);

  return {
    settings,
    updateLocale,
    updateProject,
  };
};
