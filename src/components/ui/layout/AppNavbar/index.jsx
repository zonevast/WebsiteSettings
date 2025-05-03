"use client";

import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Button, ButtonGroup } from "@nextui-org/button";
import { useTheme } from "next-themes";
import {
  Sun,
  Moon,
  User,
  ExternalLink,
  LogOut,
  Plus,
  ChevronDown,
} from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { GlobalSearch } from "./search";
import { Tooltip } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import useAccounts from "@/hooks/useAccounts";

export default function AppNavbar() {
  const { theme, setTheme } = useTheme();
  const { handleLogout } = useAccounts();
  const t = useTranslations("AppNavbar");

  return (
    <>
      <Navbar
        maxWidth="full"
        className="bg-background/60 backdrop-blur-lg border-b border-divider"
      >
        <NavbarContent className="basis-1/5 sm:basis-full" justify="end">
          <NavbarItem className="flex items-center gap-4">
            {/* Portal Dropdown */}
            <ButtonGroup variant="flat">
              <Button
                color="primary"
                startContent={<ExternalLink className="h-4 w-4" />}
                className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20"
              >
                {t("goToPortal")}
              </Button>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Button
                    color="primary"
                    isIconOnly
                    className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Portal Actions">
                  <DropdownItem
                    key="portal"
                    startContent={<ExternalLink className="h-4 w-4" />}
                    description={t("goToPortalDescription")}
                    href="/portal"
                    target="_blank"
                  >
                    {t("goToPortal")}
                  </DropdownItem>
                  <DropdownItem
                    key="create-order"
                    startContent={<Plus className="h-4 w-4" />}
                    description={t("createOrderDescription")}
                    href="/pos"
                  >
                    {t("createOrder")}
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </ButtonGroup>

            {/* Search Button */}
            {/* <GlobalSearch placeholder={t("searchPlaceholder")} /> */}

            {/* Theme Toggle */}
            <Button
              isIconOnly
              variant="light"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            {/* User Profile Dropdown */}
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button
                  isIconOnly
                  variant="light"
                  className="hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10"
                >
                  <Avatar
                    className="h-8 w-8 transition-transform duration-300 hover:scale-105"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    isBordered
                    classNames={{
                      base: "bg-gradient-to-r from-blue-500 to-purple-500",
                    }}
                  />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" className="w-60">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">{t("signedInAs")}</p>
                  <p className="font-semibold text-blue-500">
                    admin@zonevast.com
                  </p>
                </DropdownItem>
                <DropdownItem
                  key="profile"
                  startContent={<User className="h-4 w-4" />}
                  href="/profile"
                  className="hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10"
                >
                  {t("profile")}
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  className="text-danger"
                  startContent={<LogOut className="h-4 w-4" />}
                  onClick={handleLogout}
                >
                  {t("logout")}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
}
