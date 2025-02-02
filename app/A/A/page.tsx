"use client";
import React from "react";
import {
  Button,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Alert,
  Form,
} from "@heroui/react";
import { now, getLocalTimeZone } from "@internationalized/date";
const kinds = [
  { key: "طعام", label: "🍽 طعام" },
  { key: "مواصلات", label: "🚗 مواصلات" },
  { key: "بنزين", label: "⛽ بنزين" },
  { key: "صيانه", label: "🛠 صيانة" },
  { key: "أخرى", label: "🔹 أخرى" },
];
export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center space-y-3 p-4">
      <div className="bg-white dark:bg-zinc-900 dark:text-white shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center text-zinc-800 mb-6 dark:text-white">
          إضافة مصروف جديد
        </h2>
        <Form className="space-y-4">
          <Input
            label="اسم العامل"
            placeholder="ادخل اسم العامل ..."
            className="w-full"
            required
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
          <Select label="اختر نوع المصروف" className="w-full">
            {kinds.map((kind) => (
              <SelectItem key={kind.key} value={kind.key}>
                {kind.label}
              </SelectItem>
            ))}
          </Select>

          <Select label="اختر العهدة" className="w-full">
            {kinds.map((kind) => (
              <SelectItem key={kind.key} value={kind.key}>
                {kind.label}
              </SelectItem>
            ))}
          </Select>
          <div className="grid grid-cols-2 justify-center gap-4">
            <Button
              type="submit"
              color="primary"
              className="w-full py-2 text-lg font-medium"
            >
              حفظ المصروف
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

      <Alert
        color="success"
        title="تمت اضافة المصروف بنجاح"
        className="max-w-lg mt-4"
      />
    </div>
  );
}
