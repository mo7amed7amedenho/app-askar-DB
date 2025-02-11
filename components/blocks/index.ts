import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import LogoutButton from "./LogoutButton";
import Logo from "./Logo";
import {
  FaHome,
  FaWallet,
  FaFileInvoice,
  FaCoins,
  FaClipboardList,
  FaPlus,
  FaGift,
  FaChartLine,
  FaUsers,
  FaUserEdit,
  FaCalendarCheck,
  FaHandHolding,
  FaBoxOpen,
  FaBoxes,
  FaTools,
  FaWrench,
  FaTrash,
  FaProjectDiagram,
  FaCog,
  FaUserShield,
} from "react-icons/fa";
import { FaBoxesPacking } from "react-icons/fa6";
import { GiClothes } from "react-icons/gi";

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
      { title: "صرف من المخزون", icon: FaPlus, link: "/E/F" },
      { title: "إسترجاع الى المخزون", icon: FaPlus, link: "/E/G" },
      { title: "مصروفات صيانة", icon: FaWrench, link: "/A/D" },
      { title: "إضافة عدة الى الصيانه", icon: FaWrench, link: "/E/C" },
      { title: "إضافة عدة الى الهوالك", icon: FaTrash, link: "/E/D" },
      { title: "تقارير المعدات", icon: FaChartLine, link: "/E/E" },
      { title: "تقارير مصروفات صيانه", icon: FaChartLine, link: "/A/L" },
    ],
  },
  {
    title: "إدارة المهمات",
    icon: GiClothes,
    link: "#",
    subItems: [
      // { title: "إدارة المعدات", icon: FaToolbox, link: "#" },
      { title: "إضافة وحدة جديدة", icon: FaPlus, link: "/H/A" },
      // { title: "تعديل بيانات وحده", icon: FaUserEdit, link: "/H/B" },
      { title: "صرف من المخزون", icon: FaPlus, link: "/H/C" },
      { title: "تقارير المخزون", icon: FaChartLine, link: "/H/D" },
      { title: "تقارير إستلام عمال", icon: FaChartLine, link: "/H/E" },
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
    link: "/Settings",
    subItems: [],
  },
  {
    title: "إدارة المستخدمين",
    icon: FaUserShield,
    link: "/Ac_Management",
    subItems: [],
  },
];

export { Sidebar, Navbar, LogoutButton, Logo, MENU_ITEMS };
