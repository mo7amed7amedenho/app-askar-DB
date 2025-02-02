/* eslint-disable react/no-children-prop */
"use client";
import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Input,
  Select,
  Autocomplete,
  Form,
  RangeValue,
} from "@heroui/react";
import {
  now,
  getLocalTimeZone,
  today,
  CalendarDate,
} from "@internationalized/date";

export const expenseTypes = [
  { key: "إصلاح", label: "🔧 إصلاح" },
  { key: "استبدال", label: "🔄 استبدال" },
  { key: "صيانة دورية", label: "🛠️ صيانة دورية" },
  { key: "أخرى", label: "🔹 أخرى" },
];

export default function MaintenanceExpensesPage() {
  const [formData, ] = useState({
    equipment: "",
    cost: "",
    type: "",
    dateRange: {
      start: today(getLocalTimeZone()),
      end: today(getLocalTimeZone()),
    },
  });
  const [, setDateRange] = useState<{
    start: CalendarDate;
    end: CalendarDate;
  } | null>(null);
  // const handleDateChange = (value: RangeValue<CalendarDate> | null) => {
  //   if (value) {
  //     setDateRange({ start: value.start, end: value.end });
  //   } else {
  //     setDateRange(null);
  //   }
  // };

  const handlePrint = () => {
    const printWindow = window.open("", "window", "width=800,height=600");
    if (!printWindow) {
      alert("فشل فتح نافذة الطباعة. يرجى السماح للنوافذ المنبثقة.");
      return;
    }
    printWindow.document.write(`
      <html>
        <head>
          <title>طباعة مصروف الصيانة</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
            .container { border: 1px solid #ddd; padding: 20px; margin: auto; width: 50%; }
          </style>
        </head>
        <body>
          <div class='container'>
            <h2>بيانات مصروف الصيانة</h2>
            <p><strong>اسم المعدة:</strong> ${formData.equipment}</p>
            <p><strong>التكلفة:</strong> ${formData.cost} $</p>
            <p><strong>نوع المصروف:</strong> ${expenseTypes.find((t) => t.key === formData.type)?.label || "غير محدد"}</p>
            <p><strong>الفترة:</strong> ${formData.dateRange.start} - ${formData.dateRange.end}</p>
            <button onclick="window.print()">طباعة</button>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();

    printWindow.onload = () => {
      printWindow.print();
    };

    printWindow.onafterprint = () => {
      printWindow.close();
    };

    printWindow.onabort = () => {
      printWindow.close();
    };
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3 p-4">
      <div className="bg-white dark:bg-zinc-900 shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center text-zinc-800 dark:text-white mb-6">
          مصروفات الصيانة
        </h2>
        <Form className="space-y-4">
          <Autocomplete
            label="اسم المعدة"
            placeholder="ابحث عن المعدة"
            children={null}
          />
          <DatePicker
            hideTimeZone
            showMonthAndYearPickers
            defaultValue={now(getLocalTimeZone())}
            label="Event Date"
          />
          <Input
            label="المبلغ المصروف"
            placeholder="0.00"
            className="w-full"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-zinc-500 text-sm">$</span>
              </div>
            }
            type="number"
          />
          <Select label="اختر العهدة" className="w-full" children={null} />
          <div className="grid grid-cols-3 gap-4">
            <Button
              type="submit"
              color="primary"
              className="w-full py-2 text-lg font-medium"
            >
              حفظ
            </Button>
            <Button
              type="button"
              color="success"
              className="w-full py-2 text-lg font-medium"
              onClick={handlePrint}
            >
              طباعة
            </Button>
            <Button
              type="reset"
              color="danger"
              className="w-full py-2 text-lg font-medium"
            >
              مسح البيانات
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
