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

const data = [
  {
    id: 1,
    name: "مثقاب كهربائي",
    quantity: 10,
    damaged: 2,
    maintenance: 1,
    status: "نشط",
  },
  {
    id: 2,
    name: "منشار كهربائي",
    quantity: 5,
    damaged: 1,
    maintenance: 2,
    status: "في الصيانة",
  },
  {
    id: 3,
    name: "شاكوش مطرقة",
    quantity: 15,
    damaged: 3,
    maintenance: 0,
    status: "هالك",
  },
  {
    id: 4,
    name: "مفك براغي",
    quantity: 20,
    damaged: 0,
    maintenance: 1,
    status: "نشط",
  },
  {
    id: 5,
    name: "معدات لحام",
    quantity: 8,
    damaged: 1,
    maintenance: 1,
    status: "في الصيانة",
  },
  {
    id: 6,
    name: "مثقاب يدوي",
    quantity: 12,
    damaged: 0,
    maintenance: 0,
    status: "نشط",
  },
];

export default function EquipmentReport() {
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter] = useState("الجميع");

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const textToSearch = item.name.toLowerCase();
      const searchNormalized = filterValue.toLowerCase();
      const matchesSearch = textToSearch.includes(searchNormalized);
      const matchesStatus =
        statusFilter === "الجميع" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [filterValue, statusFilter]);
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
  
          <h1>تقرير المعدات </h1>
  
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>اسم المعدة</th>
                <th>الكمية</th>
                <th>الهالك</th>
                <th>الصيانة</th>
              </tr>
            </thead>
            <tbody>
              ${filteredData
                .map(
                  (data) => `
                <tr>
                  <td>${data.id}</td>
                  <td>${data.name}</td>
                  <td>${data.quantity}</td>
                  <td>${data.damaged}</td>
                  <td>${data.maintenance}</td>
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
    <div className="flex flex-col gap-y-4 p-6">
      <Card className="flex flex-col gap-y-4 p-6 shadow-lg">
        <div className="flex flex-col gap-y-3">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            تقارير المعدات
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-50">
            يمكنك الحصول على جميع بيانات المعدات من هنا
          </p>
        </div>

        {/* البحث والتصفية */}
        <div className="flex flex-col sm:flex-row items-center justify-between py-2 gap-3">
          <Input
            isClearable
            className="w-full sm:max-w-[90%] border-gray-300"
            placeholder="ابحث باسم العدة..."
            startContent={<FaSearch className="text-gray-500" />}
            value={filterValue}
            onClear={() => setFilterValue("")}
            onChange={(e) => setFilterValue(e.target.value)}
          />
          <Button
            startContent={<FaPrint className="w-6 h-6" />}
            onClick={handlePrint}
          >
            طباعة
          </Button>
        </div>

        {/* جدول المعدات */}
        <div className="overflow-x-auto">
          <Table aria-label="جدول بيانات المعدات">
            <TableHeader>
              <TableColumn>ID</TableColumn>
              <TableColumn>اسم العدة</TableColumn>
              <TableColumn className="text-center">الكمية</TableColumn>
              <TableColumn className="text-center">كمية الهوالك</TableColumn>
              <TableColumn className="text-center">كمية الصيانة</TableColumn>
              <TableColumn className="text-center">المصروف للخارج</TableColumn>
              <TableColumn className="text-center">المتبقى</TableColumn>
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
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="text-center">{item.quantity}</TableCell>
                  <TableCell
                    className={
                      item.damaged > 0
                        ? "text-red-600 font-bold text-center"
                        : "text-center"
                    }
                  >
                    {item.damaged}
                  </TableCell>
                  <TableCell
                    className={
                      item.maintenance > 0
                        ? "text-yellow-600 font-bold text-center"
                        : "text-center"
                    }
                  >
                    {item.maintenance}
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
