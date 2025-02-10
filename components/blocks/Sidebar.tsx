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
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => setSidebarToggled(false), [pathname]);

  useEffect(() => {
    if (session?.user?.id) {
      fetch(`/api/userMenu?userId=${session.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("🚀 Allowed Menu Items:", data.allowedMenu); // التأكد من البيانات المسترجعة
          setAllowedMenuItems(data.allowedMenu);
        })
        .catch((error) =>
          console.error("❌ Error fetching menu items:", error)
        );
    }
  }, [session]);

  console.log("📋 Original Menu Items:", MENU_ITEMS);
  const filteredMenu =
    allowedMenuItems.length === 0
      ? MENU_ITEMS // إذا لم تكن هناك بيانات، عرض كل القائمة
      : MENU_ITEMS.filter((item) => {
          const isMainItemAllowed = allowedMenuItems.includes(item.link);
          const allowedSubItems = item.subItems.filter((subItem) =>
            allowedMenuItems.includes(subItem.link)
          );

          return isMainItemAllowed || allowedSubItems.length > 0;
        }).map((item) => ({
          ...item,
          subItems: item.subItems.filter((subItem) =>
            allowedMenuItems.includes(subItem.link)
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
          {filteredMenu.length === 0 ? (
            <p className="text-center text-gray-500">لا توجد عناصر متاحة</p>
          ) : (
            filteredMenu.map((item) => (
              <div key={item.title}>
                {item.subItems.length > 0 ? (
                  <>
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
