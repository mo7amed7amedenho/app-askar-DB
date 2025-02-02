"use client";

import { useState } from "react";
import { DatePicker, Button, Autocomplete } from "@heroui/react";
import { IoPrint } from "react-icons/io5";

const employees = [
  { id: 1, name: "محمد مصطفى", salary: 5000, job: "مهندس" },
  { id: 2, name: "علي حسن", salary: 5000, job: "مهندس" },
  { id: 3, name: "احمد علي", salary: 5000, job: "مهندس" },
  { id: 4, name: "عبد الله عمر", salary: 5000, job: "مهندس" },
  { id: 5, name: "محمد عبد الرحمن", salary: 5000, job: "مهندس" },
  { id: 6, name: "سالم عبد الله", salary: 5000, job: "مهندس" },
  { id: 7, name: "علي محمد", salary: 5000, job: "مهندس" },
  { id: 8, name: "احمد حسن", salary: 5000, job: "مهندس" },
  { id: 9, name: "عبد الرحمن علي", salary: 5000, job: "مهندس" },
  { id: 10, name: "محمد سالم", salary: 5000, job: "مهندس" },
  { id: 11, name: "علي عبد الله", salary: 5000, job: "مهندس" },
  { id: 12, name: "احمد عمر", salary: 5000, job: "مهندس" },
  { id: 13, name: "عبد الله محمد", salary: 5000, job: "مهندس" },
  { id: 14, name: "محمد عبد الله", salary: 5000, job: "مهندس" },
  { id: 15, name: "سالم علي", salary: 5000, job: "مهندس" },
  { id: 16, name: "علي احمد", salary: 5000, job: "مهندس" },
  { id: 17, name: "احمد عبد الرحمن", salary: 5000, job: "مهندس" },
  { id: 18, name: "عبد الرحمن محمد", salary: 5000, job: "مهندس" },
  { id: 19, name: "محمد علي", salary: 5000, job: "مهندس" },
  { id: 20, name: "علي سالم", salary: 5000, job: "مهندس" },
  { id: 21, name: "احمد عبد الله", salary: 5000, job: "مهندس" },
  { id: 22, name: "عبد الله احمد", salary: 5000, job: "مهندس" },
  { id: 23, name: "محمد عبد الرحمن", salary: 5000, job: "مهندس" },
  { id: 24, name: "سالم محمد", salary: 5000, job: "مهندس" },
  { id: 25, name: "علي عمر", salary: 5000, job: "مهندس" },
  { id: 26, name: "احمد علي", salary: 5000, job: "مهندس" },
  { id: 27, name: "عبد الرحمن سالم", salary: 5000, job: "مهندس" },
  { id: 28, name: "محمد احمد", salary: 5000, job: "مهندس" },
  { id: 29, name: "علي عبد الرحمن", salary: 5000, job: "مهندس" },
  { id: 30, name: "احمد محمد", salary: 5000, job: "مهندس" },
  { id: 31, name: "عبد الله علي", salary: 5000, job: "مهندس" },
  { id: 32, name: "محمد سالم", salary: 5000, job: "مهندس" },
  { id: 33, name: "سالم احمد", salary: 5000, job: "مهندس" },
  { id: 34, name: "علي عبد الله", salary: 5000, job: "مهندس" },
  { id: 35, name: "احمد عمر", salary: 5000, job: "مهندس" },
];

export default function SalaryReportsPage() {
  const [, setStartDate] = useState<Date | null>(null);
  const [, setEndDate] = useState<Date | null>(null);
  const [filteredEmployees, setFilteredEmployees] = useState<typeof employees>(
    []
  );

  const handleGenerateReport = () => {
    const sortedEmployees = employees.sort((a, b) =>
      a.name.localeCompare(b.name, "ar")
    );
    setFilteredEmployees(sortedEmployees);
  };

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    setFilteredEmployees([]);
  };

  const handlePrint = () => {
    const printWindow = window.open("", "PRINT", "width=800,height=600");
    if (printWindow) {
      const content = `
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
          <title>تقرير رواتب</title>
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
  
          <h1>تقرير رواتب خلال مدة</h1>
  
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>اسم العامل</th>
                <th>الوظيفة</th>
                <th>الراتب</th>
              </tr>
            </thead>
            <tbody>
              ${filteredEmployees
                .map(
                  (employee, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${employee.name}</td>
                  <td>${employee.job}</td>
                  <td>${employee.salary} جنيه</td>
                </tr>
              `
                )
                .join("")}
              <tr style="font-weight: bold; background-color: #f9f9f9;">
                <td colspan="3">الإجمالي</td>
                <td>${filteredEmployees.reduce(
                  (sum, emp) => sum + emp.salary,
                  0
                )} جنيه</td>
              </tr>
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
    <main className="min-h-screen p-6 bg-gray-100 dark:bg-zinc-900">
      <div className="flex justify-between items-center border-b pb-4 mb-6 dark:border-gray-700">
        <div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            تقارير رواتب خلال مدة
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            عرض رواتب المدفوعة خلال فترة زمنية محددة.
          </p>
        </div>
      </div>

      <section className="bg-white dark:bg-zinc-950 shadow-md rounded-lg p-6 mb-6">
        <Autocomplete
          id="employees"
          label="اسم العامل"
          placeholder="ادخل اسم العامل"
          children={null}
          defaultItems={employees}
          className="mb-4"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <DatePicker id="startDate" label="من تاريخ" />
          </div>
          <div>
            <DatePicker id="endDate" label="الى تاريخ" />
          </div>
        </div>

        <div className="flex justify-end gap-4 print:hidden">
          <Button onClick={handleGenerateReport}>عرض التقرير</Button>
          <Button variant="faded" onClick={handleClear}>
            مسح البيانات
          </Button>
        </div>
      </section>

      {filteredEmployees.length > 0 && (
        <section className="bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
              تفاصيل التقرير
            </h2>
            <Button variant="faded" onClick={handlePrint}>
              <IoPrint /> طباعة
            </Button>
          </div>

          <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr className="bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-300">
                <th className="border border-gray-300 dark:border-gray-600 p-2">
                  #
                </th>
                <th className="border border-gray-300 dark:border-gray-600 p-2">
                  اسم العامل
                </th>
                <th className="border border-gray-300 dark:border-gray-600 p-2">
                  الوظيفة
                </th>
                <th className="border border-gray-300 dark:border-gray-600 p-2">
                  الراتب
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee, index) => (
                <tr
                  key={employee.id}
                  className="hover:bg-gray-100 dark:hover:bg-zinc-700"
                >
                  <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2">
                    {employee.name}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2">
                    {employee.job}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                    {employee.salary} جنيه
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-100 dark:bg-zinc-700 font-bold">
                <td
                  className="border border-gray-300 dark:border-gray-600 p-2 text-center"
                  colSpan={3}
                >
                  الإجمالي
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-2 text-center text-green-600">
                  {filteredEmployees.reduce((sum, emp) => sum + emp.salary, 0)}{" "}
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
