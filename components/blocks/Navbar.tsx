"use client";

import { Button } from "@heroui/react";
import { useSession } from "next-auth/react";
import LogoutButton from "./LogoutButton";
import ThemeSwitcher from "./ThemeSwitcher";
import { FaSyncAlt } from "react-icons/fa";
export default function Navbar() {
  const { data: session } = useSession();
  const handleRefresh = () => {
    window.location.reload();
  };
  return (
    <div className="print:hidden bg-white h-16 dark:bg-zinc-900 py-2 px-6 md:px-8 flex top-0 left-0 right-0 justify-between items-center shadow-md shadow-blue-100 dark:shadow-zinc-800">
      <div className="flex flex-col">
        {session ? (
          <span className="text-lg font-semibold text-zinc-800 dark:text-white">
            مرحبا بك {session.user?.name}
          </span>
        ) : (
          <span className="text-lg font-semibold text-zinc-800 dark:text-white">
            الرجاء تسجيل الدخول
          </span>
        )}
      </div>
      <div className="flex items-center gap-4">
        <Button variant="flat" onClick={handleRefresh}>
          <span>Refresh</span>
          <FaSyncAlt />
        </Button>
        <ThemeSwitcher />
        <LogoutButton />
      </div>
    </div>
  );
}
