/* eslint-disable */
"use client";

import "@/styles/globals.css";
import { fontSans } from "@/config/fonts";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const pathname = usePathname(); // ✅ لمعرفة الصفحة الحالية

  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} antialiased font-sans custom-scrollbar dark:bg-zinc-900 bg-gray-100 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        {/* خلفية متحركة */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-30 dark:opacity-20 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-l from-pink-500 to-red-500 opacity-30 dark:opacity-20 blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* المحتوى */}
        <main className="flex justify-center items-center w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
