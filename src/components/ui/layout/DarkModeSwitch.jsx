import React from "react";
import { useTheme as useNextTheme } from "next-themes";
import { Button } from "@nextui-org/react";
import { Moon, Sun } from "lucide-react"; // Import icons

export const DarkModeSwitch = () => {
  const { setTheme, resolvedTheme } = useNextTheme();

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex justify-between items-center">
      <Button
        isIconOnly
        variant="light"
        onClick={toggleTheme}
        className="text-foreground-500 hover:bg-default-100 active:bg-default-200"
      >
        {resolvedTheme === "dark" ? (
          <Moon className="w-5 h-5 text-yellow-500" /> // Moon icon for dark mode
        ) : (
          <Sun className="w-5 h-5 text-orange-500" /> // Sun icon for light mode
        )}
      </Button>
    </div>
  );
};