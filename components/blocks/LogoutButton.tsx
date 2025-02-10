"use client";

import { signOut } from "next-auth/react";
import { BiLogOutCircle } from "react-icons/bi";

const LogoutButton = () => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" }); // تسجيل الخروج وإعادة التوجيه
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 bg-transparent text-red-600 hover:bg-red-600 hover:text-white rounded-lg shadow-sm transition duration-200"
    >
      <span className="hidden md:inline">تسجيل الخروج</span>
      <BiLogOutCircle className="text-lg" />
    </button>
  );
};

export default LogoutButton;
