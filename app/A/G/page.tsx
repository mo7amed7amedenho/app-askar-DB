"use client";

import { ChangeEvent, useState } from "react";
import { Button, Input } from "@heroui/react";
import { IoMdPrint } from "react-icons/io";
const expenses = [
  { id: 1, name: "شراء معدات", amount: 2000, date: "2025-01-25" },
  { id: 2, name: "صيانة أجهزة", amount: 500, date: "2025-01-26" },
  { id: 3, name: "فواتير كهرباء", amount: 300, date: "2025-01-27" },
  { id: 4, name: "أجرة شحن", amount: 150, date: "2025-01-27" },
  { id: 5, name: "مصروفات إدارية", amount: 100, date: "2025-01-28" },
  { id: 6, name: "رواتب العاملين", amount: 1500, date: "2025-01-26" },
];

export default function ExpenseReportPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filteredExpenses, setFilteredExpenses] = useState<typeof expenses>([]);

  const handleGenerateReport = () => {
    if (selectedDate) {
      // تحويل selectedDate إلى تنسيق تاريخ للتأكد من المقارنة الصحيحة
      const formattedDate = selectedDate.toLocaleDateString("en-CA"); // yyyy-mm-dd

      // تصفية المصروفات حسب التاريخ المحدد
      const filtered = expenses.filter((expense) => {
        return expense.date === formattedDate;
      });
      setFilteredExpenses(filtered);
    }
  };

  const handleClear = () => {
    setSelectedDate(null);
    setFilteredExpenses([]);
  };

  const handlePrint = () => {
    const printWindow = window.open("", "PRINT", "width=800,height=600");
    if (printWindow) {
      const content = `
        <html lang="ar" dir="rtl">
        <head>
          <title>تقرير المصروفات اليومية</title>
          <style>
            body {
              font-family: Cairo, sans-serif;
              padding: 30px;
              margin: 0;
              background-color: #fff;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th, td {
              border: 3px solid #ddd;
              padding: 2px;
              text-align: center;
            }
            th {
              background-color: #f4f4f4;
            }
            .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 20px;
              border-bottom: 2px solid #000;
              padding: 15px;
            }
            .header .company-name {
              text-align: right;
              flex: 1;
            }
            .header .company-name h1 {
              font-size: 14px;
              color: #000;
              margin: 0;
            }
            .header .company-name p {
              font-size: 18px;
              color: #000;
              margin: 0;
            }
            .header .logo {
              text-align: left;
              flex: 0;
            }
            .header img {
              max-width: 120px;
              display: block;
              margin: 0;
            }
            h2 {
              text-align: center;
              font-size: 24px;
              margin-top: 20px;
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
            }
            @media print {
              body {
                padding: 10px;
              }
              table th, table td {
                font-size: 16px;
                padding: 12px;
              }
              .header h1, .header p {
                font-size: 16px;
                margin: 0;
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
              <h1>Askar Group for <br /> General Contracting <br />عسكر للمقاولات العمومية</h1>
            </div>
            <div class="logo">
              <img src="/logo.png" alt="Logo" />
            </div>
          </div>
  
          <h2>تقرير المصروفات اليومية</h2>
  
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>اسم المصروف</th>
                <th>المبلغ</th>
              </tr>
            </thead>
            <tbody>
              ${filteredExpenses
                .map(
                  (expense, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${expense.name}</td>
                  <td>${expense.amount} جنيه</td>
                </tr>
              `
                )
                .join("")}
              <tr style="font-weight: bold; background-color: #f9f9f9;">
                <td colspan="2">الإجمالي</td>
                <td>${filteredExpenses.reduce(
                  (sum, exp) => sum + exp.amount,
                  0
                )} جنيه</td>
              </tr>
            </tbody>
          </table>
  
          <div class="footer">
                    <p>تم إنشاء التقرير في ${new Date().toLocaleString(
                      "ar-EG"
                    )}</p>
            <p>بواسطة <strong>Hamedenho</strong>، شركة <strong>عسكر للمقاولات العمومية</strong></p>
          </div>
        </body>
        </html>
      `;
      printWindow.document.write(content);
      printWindow.document.close();

      // تأخير الطباعة قليلاً
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 1500); // تأخير 1500 ميلي ثانية
    }
  };

  return (
    <main className="min-h-screen p-6">
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            تقارير المصروفات اليومية
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-50">
            عرض المصروفات المدفوعة ليوم واحد.
          </p>
        </div>
      </div>

      <section className="bg-white dark:bg-zinc-900 shadow-md rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 justify-center items-center">
          <div>
            <Input
              id="selectedDate"
              className=" p-2 rounded w-full"
              label="تاريخ التقرير"
              type="date"
              onSelect={() => handleGenerateReport()}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const date = new Date(event.target.value);
                setSelectedDate(date);
              }}
            />
          </div>
          <div className="flex justify-end gap-4 print:hidden">
            <Button onClick={handleGenerateReport}>عرض التقرير</Button>
            <Button variant="bordered" onClick={handleClear}>
              مسح البيانات
            </Button>
          </div>
        </div>
      </section>

      {filteredExpenses.length > 0 && (
        <section className="bg-white dark:bg-zinc-900 shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              تفاصيل التقرير
            </h2>
            <Button variant="bordered" onClick={handlePrint}>
              <IoMdPrint className="w-4 h-4" />
              طباعة
            </Button>
          </div>

          <table className="w-full border-collapse border border-gray-300 bg-white dark:bg-zinc-900">
            <thead>
              <tr className="bg-gray-200 dark:bg-zinc-800 text-gray-800 dark:text-white">
                <th className="border border-gray-300 p-2">#</th>
                <th className="border border-gray-300 p-2">اسم المصروف</th>
                <th className="border border-gray-300 p-2">المبلغ</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense, index) => (
                <tr key={expense.id}>
                  <td className="border border-gray-300 p-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 p-2">{expense.name}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    {expense.amount} جنيه
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-100 dark:bg-zinc-800 font-bold">
                <td
                  className="border border-gray-300 p-2 text-center"
                  colSpan={2}
                >
                  الإجمالي
                </td>
                <td className="border border-gray-300 p-2 text-center text-green-600">
                  {filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0)}{" "}
                  جنيه
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      )}
    </main>
  );
}
