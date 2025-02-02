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

// بيانات المستهلكات
const data = [
  { id: 1, name: "الأسمنت", unit: "كيس", quantity: 50, status: "متوفر" },
  { id: 2, name: "الحديد", unit: "طن", quantity: 5, status: "متوفر" },
  { id: 3, name: "الخشب", unit: "متر مكعب", quantity: 0, status: "نافد" },
  { id: 4, name: "المسامير", unit: "علبة", quantity: 3, status: "قرب النفاذ" },
  { id: 5, name: "الدهانات", unit: "لتر", quantity: 20, status: "متوفر" },
];

export default function Page() {
  const [filterValue, setFilterValue] = useState("");

  // تصفية البيانات حسب البحث
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const textToSearch = `${item.name} ${item.unit}`
        .normalize("NFD")
        .replace(/[ً-ٟ]/g, "")
        .toLowerCase();

      const searchNormalized = filterValue
        .normalize("NFD")
        .replace(/[ً-ٟ]/g, "")
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
  
          <h1>تقرير المستهلكات </h1>
  
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>اسم المستهلك</th>
                <th>الكمية</th>
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
                  <td>${data.quantity + " " + data.unit} جنيه</td>
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
      }, 1000); // تأخير 1500 ميلي ثانية
    }
  };

  return (
    <div className="flex flex-col gap-y-2 p-4 pb-0">
      <Card className="flex flex-col gap-y-2 p-4">
        <div className="flex flex-col gap-y-3">
          <h1 className="text-3xl font-bold">إدارة المستهلكات</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            يمكنك الاطلاع على جميع بيانات المستهلكات المتاحة هنا
          </p>
        </div>

        {/* مربع البحث */}
        <div className="flex items-center justify-between py-2">
          <Input
            isClearable
            className="w-full sm:max-w-[90%]"
            placeholder="ابحث عن المستهلك أو الوحدة..."
            startContent={<FaSearch />}
            value={filterValue}
            onClear={() => setFilterValue("")}
            onChange={(e) => setFilterValue(e.target.value)}
          />

          <Button startContent={<FaPrint />} onClick={handlePrint}>
            طباعة
          </Button>
        </div>

        {/* جدول البيانات */}
        <div className="flex flex-col gap-y-2">
          <Table aria-label="جدول المستهلكات">
            <TableHeader>
              <TableColumn>ID</TableColumn>
              <TableColumn>اسم المستهلك</TableColumn>
              <TableColumn>الكمية المتاحة</TableColumn>
              <TableColumn className="text-center">حالة النفاذ</TableColumn>
            </TableHeader>

            <TableBody
              emptyContent={
                <div className="py-4 text-center text-gray-500">
                  لا توجد نتائج مطابقة
                </div>
              }
            >
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity + " " + item.unit}</TableCell>
                  <TableCell
                    className={`text-white w-[100px] text-center ${
                      item.status === "متوفر"
                        ? "bg-green-700"
                        : item.status === "قرب النفاذ"
                          ? "bg-yellow-700"
                          : "bg-red-700"
                    }`}
                  >
                    {item.status}
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
