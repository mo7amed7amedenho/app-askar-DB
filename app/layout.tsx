/* eslint-disable */
"use client";
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";
import { Navbar, Sidebar } from "@/components/blocks";
import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // ✅ لمعرفة الصفحة الحالية

  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${fontSans.variable} antialiased font-sans custom-scrollbar`}
      >
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <div className="flex h-screen">
              {/* Sidebar */}
              <div className="text-white shadow-xl shadow-blue-700">
                <Sidebar />
              </div>

              {/* Main Content */}
              <main className="flex-1 h-screen overflow-y-auto dark:bg-neutral-950 bg-gray-100 text-foreground">
                <Navbar />
                <div className="p-4 page-container">
                  <Providers>
                    {/* ✅ تفعيل الأنيميشن عند تغيير الصفحة */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={pathname} // ✅ يجعل كل صفحة جديدة تُعيد الأنيميشن
                        initial={{ opacity: 0, scale: 0.95 }} // ✅ تأثير البداية
                        animate={{ opacity: 1, scale: 1 }} // ✅ التأثير بعد الظهور
                        transition={{ duration: 0.4 }} // ✅ مدة الأنيميشن
                      >
                        {children}
                      </motion.div>
                    </AnimatePresence>
                  </Providers>
                </div>
              </main>
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
