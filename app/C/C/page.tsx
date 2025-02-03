"use client";
import React from "react";
import {
  Button,
  DatePicker,
  Input,
  Autocomplete,
  Form,
  AutocompleteItem,
} from "@heroui/react";

export default function EditAssetPage() {
  const handleSave = () => {
    alert("تم حفظ التعديلات بنجاح!");
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3 p-4">
      <div className="bg-white dark:bg-zinc-900 shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center dark:text-white text-zinc-800 mb-6">
          تعديل بيانات العهدة
        </h2>
        <Form className="space-y-4">
          <Autocomplete
            label="اسم العهدة"
            placeholder="أدخل اسم العهدة"
            className="w-full"
          >
            <AutocompleteItem key="1">مشروع 1</AutocompleteItem>
          </Autocomplete>
          <Input
            label="رقم العهدة"
            placeholder="أدخل رقم العهدة"
            className="w-full"
          />
          <Input
            label="الكمية"
            type="number"
            placeholder="0"
            className="w-full"
          />
          <Autocomplete label="تابعه لمشروع" placeholder="ابحث عن المشروع">
            <AutocompleteItem key="1">مشروع 1</AutocompleteItem>
          </Autocomplete>
          <DatePicker
            label="تاريخ الاستلام"
            hideTimeZone
            showMonthAndYearPickers
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
              حذف العهدة
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
