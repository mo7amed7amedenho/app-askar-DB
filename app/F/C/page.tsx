"use client";
import React from "react";
import { Button, DatePicker, Input, Autocomplete, Form, AutocompleteItem } from "@heroui/react";
import { now, getLocalTimeZone } from "@internationalized/date";

export default function EditAssetPage() {
 
  // تحميل بيانات العهدة عند فتح الصفحة
 

  const handleSave = () => {
    alert("تم حفظ التعديلات بنجاح!");
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3 p-4">
      <div className="bg-white dark:bg-zinc-900 shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center dark:text-white text-zinc-800 mb-6">
          تعديل بيانات مشروع
        </h2>
        <Form className="space-y-4">
          <Autocomplete
            label="اسم المشروع"
            placeholder="أدخل اسم المشروع"
            className="w-full"
          
         
          >
          <AutocompleteItem value="Option 1">Option 1</AutocompleteItem>
          </Autocomplete>
          <Input
            label="مدير المشروع"
            placeholder="أدخل اسم مدير المشروع"
            className="w-full"
           
          />
          <Input
            label="الميزانية"
            type="number"
            placeholder="0"
            className="w-full"
           
          />

          <DatePicker
            label="تاريخ البدء في المشروع"
            hideTimeZone
            showMonthAndYearPickers
            defaultValue={now(getLocalTimeZone())}
          />
          <DatePicker
            label="تاريخ إستلام المشروع"
            hideTimeZone
            showMonthAndYearPickers
            defaultValue={now(getLocalTimeZone())}
          />
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              color="primary"
              className="w-full py-2 text-lg font-medium"
              onClick={handleSave}
            >
              حفظ التعديلات
            </Button>
            <Button
              type="reset"
              color="danger"
              className="w-full py-2 text-lg font-medium"
            >
              إلغاء التعديلات
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
