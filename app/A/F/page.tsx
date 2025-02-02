"use client";
import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Input,
  Autocomplete,
  Form,
} from "@heroui/react";
import {
  now,
  getLocalTimeZone,
  today,
} from "@internationalized/date";

export default function EmployeeBonusPage() {
  const [formData, setFormData] = useState({
    employeeName: "",
    bonusAmount: "",
    bonusReason: "",
    date: today(getLocalTimeZone()),
  });

  const handlePrint = () => {
    const printWindow = window.open("", "window", "width=800,height=600");
    if (!printWindow) {
      alert("فشل فتح نافذة الطباعة. يرجى السماح للنوافذ المنبثقة.");
      return;
    }
    printWindow.document.write(`
      <html>
        <head>
          <title>طباعة مكافأة العامل</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
            .container { border: 1px solid #ddd; padding: 20px; margin: auto; width: 50%; }
          </style>
        </head>
        <body>
          <div class='container'>
            <h2>بيانات مكافأة العامل</h2>
            <p><strong>اسم العامل:</strong> ${formData.employeeName}</p>
            <p><strong>المبلغ المكافأة:</strong> ${formData.bonusAmount} $</p>
            <p><strong>سبب المكافأة:</strong> ${formData.bonusReason}</p>
            <p><strong>تاريخ المكافأة:</strong> ${formData.date}</p>
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
        <h2 className="text-2xl font-semibold text-center dark:text-white text-zinc-800 mb-6">
          إضافة مكافأة على العامل
        </h2>
        <Form className="space-y-4">
          <Autocomplete
            label="اسم العامل"
            placeholder="ابحث عن العامل"
            children={null}
          />
          <Input
            label="المبلغ المكافأة"
            placeholder="0.00"
            className="w-full"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-zinc-500 text-sm">$</span>
              </div>
            }
            type="number"
            onChange={(e) => setFormData({ ...formData, bonusAmount: e.target.value })}
          />
          <Input
            label="سبب المكافأة"
            placeholder="أدخل سبب المكافأة"
            className="w-full"
            onChange={(e) => setFormData({ ...formData, bonusReason: e.target.value })}
          />
          <DatePicker
            label="تاريخ المكافأة"
            hideTimeZone
            showMonthAndYearPickers
            defaultValue={now(getLocalTimeZone())}
          />
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
