import { Search, Frown } from "lucide-react"; // Changing the icon for better UX
import { useTheme } from "next-themes";

export function NotFoundData({
  message,
  descriptionText = "No data found. Please try adjusting your search.",
}) {
  const { theme } = useTheme();

  // Determine if dark mode is enabled
  const isDark = theme === "dark";
  const titleColor = isDark ? "text-white" : "text-gray-700"; // Title color
  const descriptionColor = isDark ? "text-gray-300" : "text-gray-500"; // Description color

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      {/* Updated the icon to a more relevant one */}
      <Frown className="w-16 h-16 text-gray-400 mb-4" />
      {/* Updated h3 styling */}
      <h3 className={`text-lg font-semibold ${titleColor} mb-2`}>{message}</h3>
      <p className={`text-base ${descriptionColor}`}>{descriptionText}</p>
    </div>
  );
}
