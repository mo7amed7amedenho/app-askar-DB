"use client";
import {
  Button,
  Card,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import React, { useState, useMemo } from "react";
import { FaPrint, FaSearch } from "react-icons/fa";

// بيانات الجدول
const data = [
  { id: 1, name: "محمد أحمد", job: "مهندس مدني", salary: 300, status: "نشط" },
  { id: 2, name: "أحمد علي", job: "سباك", salary: 250, status: "غير نشط" },
  { id: 3, name: "سارة محمود", job: "محاسبة", salary: 400, status: "نشط" },
  { id: 4, name: "ياسين خالد", job: "كهربائي", salary: 270, status: "غير نشط" },
  {
    id: 5,
    name: "ليلى إبراهيم",
    job: "مصممة جرافيك",
    salary: 350,
    status: "نشط",
  },
  { id: 6, name: "خالد يوسف", job: "حداد", salary: 280, status: "نشط" },
  { id: 7, name: "مروان سامي", job: "نجار", salary: 260, status: "غير نشط" },
  {
    id: 8,
    name: "هند عصام",
    job: "مهندسة معمارية",
    salary: 500,
    status: "نشط",
  },
  {
    id: 9,
    name: "يوسف علاء",
    job: "عامل بناء",
    salary: 220,
    status: "غير نشط",
  },
  {
    id: 10,
    name: "منى فاروق",
    job: "مديرة مشاريع",
    salary: 600,
    status: "نشط",
  },
];

export default function Page() {
  const [filterValue, setFilterValue] = useState("");

  // تصفية البيانات حسب البحث
  const filteredData = useMemo(() => {
    return data.filter((user) => {
      const textToSearch = `${user.name} ${user.job}`
        .normalize("NFD")
        .replace(/[\u064B-\u065F]/g, "")
        .toLowerCase();

      const searchNormalized = filterValue
        .normalize("NFD")
        .replace(/[\u064B-\u065F]/g, "")
        .toLowerCase();

      return textToSearch.includes(searchNormalized);
    });
  }, [filterValue]);

  const handlePrint = () => {
    const printWindow = window.open("", "PRINT", "width=800,height=600");
    if (printWindow) {
      const content = `
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
          <title>تقرير الرواتب</title>
          <style>
            body {
              font-family: Cairo, sans-serif;
              padding: 10px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th, td {
              border: 3px solid #ddd;
              padding: 4px;
              text-align: center;
            }
            th {
              background-color: #f4f4f4;
            }
              h2 {
              text-align: right;
              font-size: 14px;
              color: #333;
            }
            .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 2px solid #ddd;
              padding-bottom: 10px;
              margin: 20px;
            }
            .header img {
              max-width: 100px;
              display: block;
            }
            .header .text {
              text-align: center;
              flex: 1;
            }
            .header .text h1 {
              font-size: 18px;
              margin: 0;
              font-weight: bold;
            }
            .header .text p {
              font-size: 14px;
              margin: 0;
              color: #555;
            }
            h1 {
              text-align: center;
              font-size: 20px;
              color: #333;
            }
            p {
              text-align: center;
              font-size: 14px;
              color: #333;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              font-size: 12px;
              color: #888;
              border-top: 1px solid #ddd;
              padding-top: 10px;
           
            @media print {
              body {
                padding: 10px;
              }
              table th, table td {
                font-size: 12px;
                padding: 5px;
              }
              h1 {
                font-size: 18px;
              }
              .footer {
                font-size: 12px;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="company-name">
              <h2>Askar Group for <br /> General Contracting<br />عسكر للمقاولات العمومية</h2>
              
            </div>
            <div class="logo">
              <img src="/logo.webp" alt="Logo" />
            </div>
          </div>
  
          <h1>تقرير العاملين </h1>
  
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>اسم العامل</th>
                <th>الوظيفة</th>
                <th>اليومية</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              ${filteredData
                .map(
                  (data) => `
                <tr>
                  <td>${data.id}</td>
                  <td>${data.name}</td>
                  <td>${data.job}</td>
                  <td>${data.salary} جنيه</td>
                  <td>${data.status}</td>
                </tr>
              `
                )
                .join("")}
             
            </tbody>
          </table>
  
          <p>تم إنشاء التقرير في ${new Date().toLocaleString("ar-EG")}</p>
  
          <div class="footer">
            <p>بواسطة <strong>Hamedenho</strong>، شركة <strong>عسكر للمقاولات العمومية</strong></p>
          </div>
        </body>
        </html>
      `;
      printWindow.document.write(content);
      printWindow.document.close();
      printWindow.focus();

      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 1000); // تأخير 1500 ميلي ثانية
    }
  };

  return (
    <div className="flex flex-col gap-y-2 p-4 pb-0">
      <Card className="flex flex-col gap-y-2 p-4">
        <div className="flex flex-col gap-y-3">
          <h1 className="text-3xl font-bold">إدارة بيانات العمال</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            يمكنك الحصول علي جميع بيانات العمال من هنا
          </p>
        </div>

        {/* مربع البحث */}
        <div className="flex items-center justify-between py-2">
          <Input
            isClearable
            className="w-full sm:max-w-[90%]"
            placeholder="ابحث بالاسم أو الوظيفة..."
            startContent={<FaSearch />}
            value={filterValue}
            onClear={() => setFilterValue("")}
            onChange={(e) => setFilterValue(e.target.value)}
          />
          <Button variant="bordered" onClick={handlePrint}>
            <FaPrint />
            طباعة
          </Button>
        </div>

        {/* جدول البيانات */}
        <div className="flex flex-col gap-y-2">
          <Table aria-label="جدول بيانات العمال">
            <TableHeader>
              <TableColumn>ID</TableColumn>
              <TableColumn>الاسم</TableColumn>
              <TableColumn>الوظيفة</TableColumn>
              <TableColumn>الراتب</TableColumn>
              <TableColumn className="text-center">الحالة</TableColumn>
            </TableHeader>

            <TableBody
              emptyContent={
                <div className="py-4 text-center text-gray-500">
                  لا توجد نتائج مطابقة
                </div>
              }
            >
              {filteredData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.job}</TableCell>
                  <TableCell>{user.salary} جنيه</TableCell>
                  <TableCell
                    className={`text-white w-[80px] text-center ${
                      user.status === "نشط" ? "bg-green-800" : "bg-red-800"
                    }`}
                  >
                    {user.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
