"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
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
  { key: "مصروفات مكتبة", label: "مصروفات مكتبة" },
  { key: "مصروفات صيانة", label: "مصروفات صيانة" },
  { key: "مصروفات عامة", label: "مصروفات عامة" },
];
export default function Page() {
  const [showAlert, setShowAlert] = React.useState(false);

  const handleSave = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };
  return (
    <div className="flex flex-col items-center justify-center space-y-3 p-4">
      <div className="bg-white dark:bg-zinc-900 dark:text-white shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center text-zinc-800 mb-6 dark:text-white">
          إضافة مصروف جديد
        </h2>
        <Form className="space-y-4 items-center" autoComplete="on">
          <Input
            label="بيان المصروف"
            placeholder="ادخل بيان المصروف"
            className="w-full"
            required
          />
          <Input
            label="اسم المسؤول عن الصرف"
            placeholder="ادخل اسم المسؤول عن المصروف"
            className="w-full"
            required
          />
          <div dir="ltr" className="grid grid-cols-2 gap-4">
            <DatePicker
              hideTimeZone
              showMonthAndYearPickers
              defaultValue={now(getLocalTimeZone())}
              label="Event Date"
              className="w-full"
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
          </div>
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
              color="primary"
              className="w-full py-2 text-lg font-medium"
              onClick={handleSave}
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
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 left-4"
          >
            <div className="mt-4">
              <Alert color="success" title="تم حفظ التعديلات" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
