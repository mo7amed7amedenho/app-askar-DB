"use client";
import Link from "next/link";
import { LuAlignJustify } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import {
  FaHome,
  FaWallet,
  FaUsers,
  FaHandHolding,
  FaBoxes,
  FaTools,
  FaProjectDiagram,
  FaCog,
  FaUserShield,
  FaFileInvoice,
  FaPlus,
  FaUserEdit,
  FaCalendarCheck,
  FaChartLine,
  FaBoxOpen,
  FaWrench,
  FaTrash,
  FaClipboardList,
  FaCoins,
  FaGift,
} from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaBoxesPacking } from "react-icons/fa6";

import { usePathname } from "next/navigation";

// قائمة التكوين
const MENU_ITEMS = [
  {
    title: "الصفحة الرئيسية",
    icon: FaHome,
    link: "/Home",
    subItems: [],
  },
  {
    title: "إدارة الحسابات",
    icon: FaWallet,
    link: "#",
    subItems: [
      { title: "المصاريف اليومية", icon: FaFileInvoice, link: "/A/A" },
      { title: "سند صرف سلفة", icon: FaCoins, link: "/A/B" },
      { title: "سند صرف الراتب", icon: FaClipboardList, link: "/A/C" },
      // { title: "مصروفات صيانة", icon: FaWrench, link: "/A/D" },
      { title: "إضافة خصومات", icon: FaPlus, link: "/A/E" },
      { title: "إضافة مكافآت", icon: FaGift, link: "/A/F" },
      { title: "تقارير المصاريف اليومية", icon: FaChartLine, link: "/A/G" },
      {
        title: "تقارير المصاريف اليومية خلال مدة",
        icon: FaChartLine,
        link: "/A/H",
      },
      { title: "تقارير صرف سلف خلال مدة", icon: FaChartLine, link: "/A/I" },
      { title: "تقارير صرف سلفه لعامل", icon: FaChartLine, link: "/A/J" },
      { title: "تقارير الرواتب خلال مدة", icon: FaChartLine, link: "/A/K" },
      // { title: "تقارير مصروفات صيانه", icon: FaChartLine, link: "/A/L" },
    ],
  },
  {
    title: "إدارة العمال",
    icon: FaUsers,
    link: "#",
    subItems: [
      { title: "إضافة عامل", icon: FaPlus, link: "/B/A" },
      { title: "تعديل بيانات عامل", icon: FaUserEdit, link: "/B/B" },
      { title: "تقارير بيانات العمال", icon: FaUserEdit, link: "/B/C" },
      { title: "الحضور والإنصراف", icon: FaCalendarCheck, link: "/B/D" },
      { title: "تقارير الحضور والإنصراف", icon: FaChartLine, link: "/B/E" },
    ],
  },
  {
    title: "إدارة العهدة",
    icon: FaHandHolding,
    link: "#",
    subItems: [
      { title: "إدارة العهد", icon: FaBoxOpen, link: "/C/A" },
      { title: "إضافة عهدة جديدة", icon: FaPlus, link: "/C/B" },
      { title: "تعديل بيانات عهدة", icon: FaUserEdit, link: "/C/C" },
      { title: "تقارير عهدة", icon: FaChartLine, link: "/C/D" },
      // { title: "تقارير عهدة المؤرشفة", icon: FaArchive, link: "#" },
    ],
  },
  {
    title: "إدارة الموردين",
    icon: FaBoxesPacking,
    link: "#",
    subItems: [
      { title: "إضافة مورد جديد", icon: FaBoxOpen, link: "/G/A" },
      { title: "تعديل بيانات مورد", icon: FaPlus, link: "/G/B" },
      { title: "إنشاء فاتورة مورد", icon: FaChartLine, link: "/G/D" },
      { title: "تقارير الموردين", icon: FaChartLine, link: "/G/C" },
      // { title: "تقارير عهدة المؤرشفة", icon: FaArchive, link: "#" },
    ],
  },
  {
    title: "إدارة المستهلكات",
    icon: FaBoxes,
    link: "#",
    subItems: [
      { title: "إدارة المستهلكات", icon: FaBoxes, link: "/D/A" },
      { title: "صرف من المخزون", icon: FaChartLine, link: "/D/E" },
      { title: "إضافة مستهلك جديد", icon: FaPlus, link: "/D/B" },
      { title: "تعديل بيانات مستهلك", icon: FaUserEdit, link: "/D/C" },
      { title: "تقارير المستهلكات", icon: FaChartLine, link: "/D/D" },
      // { title: "تقارير المستهلكات قرب النفاد", icon: FaArchive, link: "#" },
    ],
  },
  {
    title: "إدارة المعدات",
    icon: FaTools,
    link: "#",
    subItems: [
      // { title: "إدارة المعدات", icon: FaToolbox, link: "#" },
      { title: "إضافة عدة جديد", icon: FaPlus, link: "/E/A" },
      { title: "تعديل بيانات عدة", icon: FaUserEdit, link: "/E/B" },
      { title: "مصروفات صيانة", icon: FaWrench, link: "/A/D" },
      { title: "إضافة عدة الى الصيانه", icon: FaWrench, link: "/E/C" },
      { title: "إضافة عدة الى الهوالك", icon: FaTrash, link: "/E/D" },
      { title: "تقارير المعدات", icon: FaChartLine, link: "/E/E" },
      { title: "تقارير مصروفات صيانه", icon: FaChartLine, link: "/A/L" },
    ],
  },
  {
    title: "إدارة المشاريع",
    icon: FaProjectDiagram,
    link: "#",
    subItems: [
      { title: "إدارة المشاريع", icon: FaProjectDiagram, link: "/F/A" },
      { title: "إضافة مشروع جديدة", icon: FaPlus, link: "/F/B" },
      { title: "تعديل بيانات مشروع", icon: FaUserEdit, link: "/F/C" },
      { title: "إضافة مصروف", icon: FaFileInvoice, link: "/F/D" },
      { title: "تقارير مشروع ", icon: FaChartLine, link: "/F/E" },
      // { title: "تقارير مشروع مؤرشفة", icon: FaArchive, link: "#" },
    ],
  },
  // {
  //   title: "حذف بيانات",
  //   icon: FaTrash,
  //   link: "#",
  //   subItems: [
  //     { title: "", icon: FaProjectDiagram, link: "/F/A" },
  //     { title: "إضافة مشروع جديدة", icon: FaPlus, link: "/F/B" },
  //     { title: "تعديل بيانات مشروع", icon: FaUserEdit, link: "/F/C" },
  //     { title: "إضافة مصروف", icon: FaFileInvoice, link: "/F/D" },
  //     { title: "تقارير مشروع ", icon: FaChartLine, link: "/F/E" },
  //     // { title: "تقارير مشروع مؤرشفة", icon: FaArchive, link: "#" },
  //   ],
  // },
  {
    title: "الإعدادات",
    icon: FaCog,
    link: "#",
    subItems: [],
  },
  {
    title: "إدارة المستخدمين",
    icon: FaUserShield,
    link: "#",
    subItems: [],
  },
];

const Sidebar = () => {
  const [sidebarToggled, setSidebarToggled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const toggleMenu = (menuTitle: string) => {
    setOpenMenu(openMenu === menuTitle ? null : menuTitle);
  };
  useEffect(() => {
    setSidebarToggled(false);
  }, [pathname]);
  return (
    <>
      {/* Sidebar */}
      <aside
        dir="rtl"
        className={`fixed top-0 right-0 z-50 h-screen w-72 bg-white dark:bg-zinc-900 dark:text-white shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          sidebarToggled ? "translate-x-0" : "translate-x-full"
        } lg:static lg:translate-x-0`}
      >
        {/* Logo Section */}
        <div className="border-b dark:border-b-zinc-700">
          <Link href="#" className="flex items-center gap-3 p-4">
            <Logo />
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2 text-zinc-700 dark:text-white">
          {MENU_ITEMS.map((item) => (
            <div key={item.title} className="group">
              {item.subItems.length > 0 ? (
                <>
                  {/* Parent Item with Submenu */}
                  <button
                    onClick={() => toggleMenu(item.title)}
                    className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 dark:text-white transition duration-300 text-zinc-800 hover:text-blue-800"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="text-xl text-blue-600 dark:text-white" />
                      <span>{item.title}</span>
                    </div>
                    {openMenu === item.title ? (
                      <IoIosArrowUp className="text-xl" />
                    ) : (
                      <IoIosArrowDown className="text-xl" />
                    )}
                  </button>
                  {/* Submenu */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openMenu === item.title ? "max-h-[1000px]" : "max-h-0"
                    }`}
                  >
                    <div className="ml-4 pl-2 border-r dark:border-zinc-500 space-y-2 py-2">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.link}
                          className="flex items-center border-b dark:border-zinc-700 p-2 gap-2 text-sm hover:bg-blue-200 dark:hover:bg-blue-600 dark:text-white transition duration-300"
                        >
                          {/* <subItem.icon className="text-blue-600" /> */}
                          <span>{subItem.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                // Single Item (No Submenu)
                <Link
                  href={item.link}
                  className="flex items-center p-3 gap-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 dark:text-white transition duration-300 text-zinc-800 hover:text-blue-800"
                >
                  <item.icon className="text-xl text-blue-600 dark:text-white" />
                  <span>{item.title}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setSidebarToggled(!sidebarToggled)}
        className="lg:hidden fixed bottom-8 left-8 p-3 rounded-full shadow-md z-50 bg-gradient-to-r from-blue-600 to-blue-800 text-white flex items-center justify-center hover:bg-blue-700 transition-colors duration-300"
      >
        {sidebarToggled ? (
          <IoMdClose className="text-2xl" /> // أيقونة "X" عند الفتح
        ) : (
          <LuAlignJustify className="text-2xl" /> // أيقونة القائمة عند الإغلاق
        )}
      </button>
    </>
  );
};

export default Sidebar;
