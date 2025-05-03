import AppNavbar from "@/components/ui/layout/AppNavbar";
import Sidebar from "@/components/ui/layout/sidebar";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { cookies } from "next/headers";

export default async function DashboardLayout({ children }) {
  const cookieStore = cookies();

  // Get locale from cookie or fallback to default
  const locale = cookieStore.get("language")?.value || "ar";

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} suppressHydrationWarning>
      <div
        className="relative flex min-h-screen h-screen overflow-hidden"
        suppressHydrationWarning
      >
        {/* Sidebar with fixed position and full height */}
        <Sidebar className="h-screen fixed inset-y-0 z-40" />

        {/* Main content area with proper margin to account for sidebar */}
        <div
          className={`flex-1 flex flex-col h-screen transition-all duration-300 ${
            locale === "ar" ? "mr-[88px]" : "ml-[88px]"
          }`}
        >
          <AppNavbar className="sticky top-0 z-30" />
          <main className="flex-1 overflow-y-auto custom-scrollbar relative">
            <div className="container mx-auto max-w-7xl p-6">{children}</div>
          </main>
        </div>
      </div>
    </NextIntlClientProvider>
  );
}
