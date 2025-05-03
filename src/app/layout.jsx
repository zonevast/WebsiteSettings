import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Cairo } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/theme.css"; // Add the theme CSS
import LoadingPage from "./loading";
import { Suspense } from "react";
import ProvidersContent from "@/components/ui/layout/providers";
import { cookies } from "next/headers";

// Correct Cairo font configuration
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata = {
  title: "Report360 - Insights for Products, Inventory, and Sales",
  description:
    "Get comprehensive reports on your products, inventory, customers, and sales to make data-driven decisions.",
};
// Function to get initial settings from cookies
const getInitialSettings = (cookieStore) => {
  // Get basic settings from cookies
  const locale = cookieStore.get("language")?.value || "ar";
  const theme = cookieStore.get("theme")?.value || "system";
  const colorScheme = cookieStore.get("colorScheme")?.value || "default";
  const density = cookieStore.get("density")?.value || "comfortable";

  return {
    locale,
    theme,
    colorScheme,
    density,
    dir: locale === "ar" ? "rtl" : "ltr",
  };
};

export default async function RootLayout({ children }) {
  const cookieStore = cookies();
  const { locale, theme, colorScheme, density, dir } =
    getInitialSettings(cookieStore);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${cairo.variable} overflow-x-hidden`}
      data-color-scheme={colorScheme}
      data-density={density}
    >
      <head>
        <meta name="theme-color" content="#7C3AED" />
      </head>
      <body
        className={`font-cairo antialiased ${dir === "rtl" ? "rtl" : "ltr"}`}
      >
        <Suspense fallback={<LoadingPage />}>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <ProvidersContent
              defaultTheme={theme}
              defaultColorScheme={colorScheme}
              defaultDensity={density}
            >
              <main
                dir={dir}
                className={`min-h-screen flex flex-col ${
                  dir === "rtl" ? "rtl" : "ltr"
                }`}
              >
                {children}
              </main>
            </ProvidersContent>
          </NextIntlClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
