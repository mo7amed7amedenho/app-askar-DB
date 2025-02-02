// 'use client' لتحديد أنه مكون عميل
'use client'

import { BiLogOutCircle } from "react-icons/bi";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    router.push("/login"); // إعادة التوجيه إلى صفحة تسجيل الدخول بعد الخروج
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
