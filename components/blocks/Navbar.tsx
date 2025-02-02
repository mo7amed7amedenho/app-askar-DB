"use client";

import LogoutButton from "./LogoutButton";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navbar() {
  return (
    <div className="print:hidden bg-white h-16 dark:bg-zinc-900 py-2 px-6 md:px-8 flex top-0 left-0 right-0 justify-between items-center shadow-md shadow-blue-100 dark:shadow-zinc-800">
      <div className="flex flex-col">
        <span className="text-lg font-semibold text-zinc-800 dark:text-white">لوحة التحكم</span>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">مدير الإدارة</span>
      </div>
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <LogoutButton />
      </div>
    </div>
  );
}
