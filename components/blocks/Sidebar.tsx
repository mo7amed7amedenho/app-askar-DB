"use client";
import Link from "next/link";
import { LuAlignJustify } from "react-icons/lu";
import { IoMdClose, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { MENU_ITEMS } from "@/components/blocks";

const Sidebar = () => {
  const [sidebarToggled, setSidebarToggled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [allowedMenuItems, setAllowedMenuItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const { data: session } = useSession();

  // إغلاق السايدبار عند تغيير الصفحة
  useEffect(() => setSidebarToggled(false), [pathname]);

  // جلب البنود المسموح بها للمستخدم
  useEffect(() => {
    if (session?.user?.id) {
      setLoading(true);
      fetch(`/api/userMenu?userId=${session.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("🚀 Allowed Menu Items:", data.allowedMenu);
          setAllowedMenuItems(data.allowedMenu);
        })
        .catch((error) => console.error("❌ Error fetching menu items:", error))
        .finally(() => setLoading(false));
    }
  }, [session]);

  console.log("📋 Original Menu Items:", MENU_ITEMS);

  // تصفية البنود بناءً على صلاحيات المستخدم
  const filteredMenu =
    allowedMenuItems.length === 0
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => {
          const isMainItemAllowed = allowedMenuItems.includes(item.title);
          // لو العنصر الرئيسي مسموح به، نعرض كل البنود الفرعية بدون تصفية
          const allowedSubItems = isMainItemAllowed
            ? item.subItems
            : (item.subItems || []).filter((subItem) =>
                allowedMenuItems.includes(subItem.title)
              );

          return (
            isMainItemAllowed || (allowedSubItems && allowedSubItems.length > 0)
          );
        }).map((item) => ({
          ...item,
          subItems: allowedMenuItems.includes(item.title)
            ? item.subItems // نعرض البنود الفرعية كاملة لو العنصر الرئيسي مسموح به
            : (item.subItems || []).filter((subItem) =>
                allowedMenuItems.includes(subItem.title)
              ),
        }));

  return (
    <>
      <aside
        dir="rtl"
        className={`fixed top-0 right-0 z-50 h-screen w-72 bg-white dark:bg-zinc-900 dark:text-white shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          sidebarToggled ? "translate-x-0" : "translate-x-full"
        } lg:static lg:translate-x-0`}
      >
        <div className="border-b dark:border-b-zinc-700 p-4">
          <Link href="#" className="flex items-center gap-3">
            <Logo />
          </Link>
        </div>

        <nav className="p-4 space-y-2 text-zinc-700 dark:text-white">
          {loading ? (
            // عرض مؤقت أثناء تحميل البيانات
            <>
              {[...Array(22)].map((_, i) => (
                <div
                  key={i}
                  className="h-5 bg-gray-200 space-y-3 dark:bg-gray-700 animate-pulse rounded-lg"
                ></div>
              ))}
            </>
          ) : filteredMenu.length === 0 ? (
            <p className="text-center text-gray-500">لا توجد عناصر متاحة</p>
          ) : (
            filteredMenu.map((item) => (
              <div key={item.title}>
                {item.subItems.length > 0 ? (
                  <>
                    {/* زر البند الذي يحتوي على بنود فرعية */}
                    <button
                      onClick={() =>
                        setOpenMenu(openMenu === item.title ? null : item.title)
                      }
                      className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="text-xl text-blue-600" />
                        <span>{item.title}</span>
                      </div>
                      {openMenu === item.title ? (
                        <IoIosArrowUp className="text-xl" />
                      ) : (
                        <IoIosArrowDown className="text-xl" />
                      )}
                    </button>

                    {/* قائمة البنود الفرعية */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openMenu === item.title ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      <div className="ml-4 pl-2 border-r dark:border-zinc-500 space-y-2 py-2">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.link}
                            className="block p-2 text-sm hover:bg-blue-200 dark:hover:bg-blue-600 transition duration-300"
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  // عرض البند في حالة عدم وجود بنود فرعية
                  <Link
                    href={item.link}
                    className="flex items-center p-3 gap-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition duration-300"
                  >
                    <item.icon className="text-xl text-blue-600" />
                    <span>{item.title}</span>
                  </Link>
                )}
              </div>
            ))
          )}
        </nav>
      </aside>

      {/* زر التبديل (للعرض على الشاشات الصغيرة) */}
      <button
        onClick={() => setSidebarToggled(!sidebarToggled)}
        className="lg:hidden fixed bottom-8 left-8 p-3 rounded-full shadow-md z-50 bg-blue-700 text-white hover:bg-blue-800 transition duration-300"
      >
        {sidebarToggled ? (
          <IoMdClose className="text-2xl" />
        ) : (
          <LuAlignJustify className="text-2xl" />
        )}
      </button>
    </>
  );
};

export default Sidebar;
