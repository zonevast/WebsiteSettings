import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, X } from "lucide-react";
import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

export const RecentSearches = ({
  recentSearches,
  setQuery,
  removeRecentSearch,
}) => {
  // Move hooks to the top level - they should always be called
  const { theme } = useTheme();
  const t = useTranslations("navbar.search");
  
  // Compute values after hooks
  const isDark = theme === "dark";

  return (
    <div className="space-y-2">
      {/* Header */}
      {recentSearches.length > 0 && (
        <div className="flex items-center justify-between px-2 py-1">
          <div className="flex items-center gap-2 text-default-500">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">{t("recentSearches")}</span>
          </div>
          <Button
            size="sm"
            variant="light"
            className="text-tiny text-default-400 hover:text-default-500"
            onClick={() => removeRecentSearch("all")}
          >
            {t("clearAll")}
          </Button>
        </div>
      )}

      {/* Recent Searches List */}
      <AnimatePresence>
        <div className="space-y-1">
          {recentSearches.map((searchTerm, index) => (
            <motion.div
              key={searchTerm}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{
                duration: 0.2,
                delay: index * 0.05,
                ease: "easeOut",
              }}
            >
              <div
                className={`
                group flex items-center gap-2 w-full px-2 py-1.5 rounded-lg
                transition-colors duration-150
                ${isDark ? "hover:bg-content2" : "hover:bg-default-100"}
              `}
              >
                <Button
                  className={`
                    flex-1 h-auto justify-start px-3 py-1.5
                    text-default-700 bg-transparent
                    hover:bg-transparent
                    ${isDark ? "hover:text-primary" : "hover:text-blue-600"}
                  `}
                  onClick={() => setQuery(searchTerm)}
                  startContent={
                    <Search
                      className={`
                      h-3.5 w-3.5 mr-2 
                      ${isDark ? "text-default-500" : "text-default-400"}
                      group-hover:text-primary transition-colors
                    `}
                    />
                  }
                >
                  <span className="text-sm truncate">{searchTerm}</span>
                </Button>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-shrink-0"
                >
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    className={`
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-200
                      min-w-unit-8 w-unit-8 h-unit-8
                      ${isDark ? "hover:bg-default-100" : "hover:bg-default-200"}
                    `}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeRecentSearch(searchTerm);
                    }}
                    aria-label="Remove search term"
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {recentSearches.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-4 py-8 text-center"
          >
            <Clock className="h-8 w-8 mx-auto mb-3 text-default-300" />
            <p className="text-sm text-default-500">{t("noResults")}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecentSearches;