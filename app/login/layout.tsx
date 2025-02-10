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
  const pathname = usePathname(); // ✅ لمعرفة الصفحة الحالية

  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} antialiased font-sans custom-scrollbar`}
      >
        <main className="flex justify-center items-center h-screen">{children}</main>
      </body>
    </html>
  );
}
