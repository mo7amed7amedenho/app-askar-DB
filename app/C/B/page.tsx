"use client";
import React, { useState } from "react";
import { Button, DatePicker, Input, Autocomplete, Form } from "@heroui/react";
import { now, getLocalTimeZone, today } from "@internationalized/date";

export default function AddAssetPage() {
  const [formData, setFormData] = useState({
    assetName: "",
    assetNumber: "",
    quantity: "",
    condition: "",
    receiver: "",
    dateReceived: today(getLocalTimeZone()),
  });

  // const handlePrint = () => {
  //   const printWindow = window.open("", "window", "width=800,height=600");
  //   if (!printWindow) {
  //     alert("فشل فتح نافذة الطباعة. يرجى السماح للنوافذ المنبثقة.");
  //     return;
  //   }
  //   printWindow.document.write(`
  //     <html>
  //       <head>
  //         <title>طباعة بيانات العهدة</title>
  //         <style>
  //           body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
  //           .container { border: 1px solid #ddd; padding: 20px; margin: auto; width: 50%; }
  //         </style>
  //       </head>
  //       <body>
  //         <div class='container'>
  //           <h2>بيانات العهدة</h2>
  //           <p><strong>اسم العهدة:</strong> ${formData.assetName}</p>
  //           <p><strong>رقم العهدة:</strong> ${formData.assetNumber}</p>
  //           <p><strong>الكمية:</strong> ${formData.quantity}</p>
  //           <p><strong>الحالة:</strong> ${formData.condition}</p>
  //           <p><strong>المستلم:</strong> ${formData.receiver}</p>
  //           <p><strong>تاريخ الاستلام:</strong> ${formData.dateReceived}</p>
  //           <button onclick="window.print()">طباعة</button>
  //         </div>
  //       </body>
  //     </html>
  //   `);

  //   printWindow.document.close();

  //   printWindow.onload = () => {
  //     printWindow.print();
  //   };

  //   printWindow.onafterprint = () => {
  //     printWindow.close();
  //   };
  // };

  return (
    <div className="flex flex-col items-center justify-center space-y-3 p-4">
      <div className="bg-white dark:bg-zinc-900 shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center dark:text-white text-zinc-800 mb-6">
          إضافة عهدة جديدة
        </h2>
        <Form className="space-y-4">
          <Input
            label="اسم العهدة"
            placeholder="أدخل اسم العهدة"
            className="w-full"
            onChange={(e) =>
              setFormData({ ...formData, assetName: e.target.value })
            }
          />
          <Input
            label="رقم العهدة"
            placeholder="أدخل رقم العهدة"
            className="w-full"
            onChange={(e) =>
              setFormData({ ...formData, assetNumber: e.target.value })
            }
          />
          <Input
            label="الكمية"
            type="number"
            placeholder="0"
            className="w-full"
            onChange={(e) =>
              setFormData({ ...formData, quantity: e.target.value })
            }
          />

          <Autocomplete label="تابعه لمشروع" placeholder="ابحث عن المشروع">
            <option value=""></option>
          </Autocomplete>
          <DatePicker
            label="تاريخ الاستلام"
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
            {/* <Button
              type="button"
              color="success"
              className="w-full py-2 text-lg font-medium"
              onClick={handlePrint}
            >
              طباعة
            </Button> */}
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
