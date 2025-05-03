import React, { useEffect, useState } from "react";
import {
  Input,
  Modal,
  ModalContent,
  ModalBody,
  Kbd,
  ModalHeader,
  Button,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import SearchResults from "./SearchResults";
import { useProjectSettings } from "@/hooks/settings/useProjectSettings";
import RecentSearches from "./RecentSearches";
import { useGlobalSearch } from "@/hooks/useGlobalSearch";

export const GlobalSearch = () => {
  const t = useTranslations("navbar.search");

  const {
    settings: { locale, project },
  } = useProjectSettings();

  const {
    query,
    setQuery,
    recentSearches,
    searchResults,
    loadingProducts,
    handleSearch,
    removeRecentSearch,
  } = useGlobalSearch();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    if (!query || query.length < 2) return;

    const debounceTimer = setTimeout(() => {
      handleSearch();
    }, 200);

    return () => clearTimeout(debounceTimer);
  }, [query]); // Remove handleSearch from dependencies if possible

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setQuery("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Button
        isIconOnly
        variant="light"
        className="hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10"
        onClick={() => setIsSearchOpen(true)}
      >
        <Search className="h-5 w-5" />
      </Button>

      <Modal
        isOpen={isSearchOpen}
        onClose={() => {
          setIsSearchOpen(false);
          setQuery("");
        }}
        size="2xl"
        classNames={{
          backdrop: "bg-background/80 backdrop-blur-md",
          base: "border border-default-200 bg-background/60 dark:bg-default-100/50 backdrop-blur-md",
          header: "border-b border-default-200",
          body: "p-0",
        }}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.2,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="px-6 py-4">
                <Input
                  autoFocus
                  startContent={<Search className="h-4 w-4 text-default-400" />}
                  endContent={<Kbd className="hidden lg:inline-block">ESC</Kbd>}
                  placeholder={t("searchPlaceholder")}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  variant="bordered"
                  classNames={{
                    input: "text-base",
                    inputWrapper: "h-12",
                  }}
                />
              </ModalHeader>

              <ModalBody className="max-h-[calc(80vh-8rem)] overflow-y-auto">
                <AnimatePresence mode="wait">
                  {!query && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="px-4 py-3 space-y-6"
                    >
                      <div className="space-y-4">
                        <RecentSearches
                          recentSearches={recentSearches}
                          setQuery={setQuery}
                          removeRecentSearch={removeRecentSearch}
                        />
                      </div>
                    </motion.div>
                  )}

                  {query && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-6"
                    >
                      <SearchResults
                        results={searchResults}
                        isSearching={loadingProducts}
                        searchQuery={query}
                        translations={{
                          noItemsFound: t("noItemsFound"),
                          searching: t("searching"),
                          products: t("products"),
                          pages: t("pages"),
                        }}
                        onResultClick={() => {
                          setQuery("");
                          onClose();
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
