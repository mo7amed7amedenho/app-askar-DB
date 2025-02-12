"use client";

import { useTheme } from "next-themes";
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import { useEffect, useState } from "react";
import { Button } from "@heroui/react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      variant="flat"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <div className="flex items-center gap-2">
          <IoMdSunny className="w-6 h-6 text-white" />
          الوضع الفاتح
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <IoMdMoon className="w-6 h-6 text-zinc-800" />
          الوضع الغامق
        </div>
      )}
    </Button>
  );
}
