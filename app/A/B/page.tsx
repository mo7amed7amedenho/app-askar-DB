"use client";
import {
  DatePicker,
  Alert,
  Button,
  Form,
  Input,
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
} from "@heroui/react";
import { now, getLocalTimeZone } from "@internationalized/date";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const animals = [
  { label: "Cat", key: "cat" },
  { label: "Dog", key: "dog" },
  { label: "Elephant", key: "elephant" },
  { label: "Lion", key: "lion" },
  { label: "Tiger", key: "tiger" },
  { label: "Giraffe", key: "giraffe" },
  { label: "Dolphin", key: "dolphin" },
  { label: "Penguin", key: "penguin" },
  { label: "Zebra", key: "zebra" },
  { label: "Shark", key: "shark" },
  { label: "Whale", key: "whale" },
  { label: "Otter", key: "otter" },
  { label: "Crocodile", key: "crocodile" },
];
const prices = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
  { key: "lion", label: "Lion" },
  { key: "tiger", label: "Tiger" },
  { key: "giraffe", label: "Giraffe" },
  { key: "dolphin", label: "Dolphin" },
  { key: "penguin", label: "Penguin" },
  { key: "zebra", label: "Zebra" },
  { key: "shark", label: "Shark" },
  { key: "whale", label: "Whale" },
  { key: "otter", label: "Otter" },
  { key: "crocodile", label: "Crocodile" },
];
export default function Page() {
  const [salary] = useState(0);
  const [, setLoan] = useState(0);
  const [, setRemainingSalary] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const handleSave = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };
  const handleLoanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const loanValue = parseFloat(e.target.value);
    setLoan(loanValue);
    setRemainingSalary(salary - loanValue); // Recalculate remaining salary
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3 p-4">
      <div className="bg-white dark:bg-zinc-900 dark:text-white shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center text-zinc-800 dark:text-white mb-6">
          طلب سلفة من الراتب
        </h2>
        <Form className="space-y-4">
          <Autocomplete
            defaultItems={animals}
            label="اسم العامل"
            placeholder="ابحث عن العامل"
          >
            {(item) => (
              <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
            )}
          </Autocomplete>
          <DatePicker
            hideTimeZone
            showMonthAndYearPickers
            defaultValue={now(getLocalTimeZone())}
            label="تاريخ الطلب"
          />

          <Input
            label="المبلغ المطلوب كـ سلفة"
            placeholder="ادخل السلفة المطلوبة"
            className="w-full"
            type="number"
            onChange={handleLoanChange}
          />
          <Select label="اختر العهدة" className="w-full">
            {prices.map((price) => (
              <SelectItem key={price.key}>{price.label}</SelectItem>
            ))}
          </Select>
          <Input
            className="text-lg font-semibold text-zinc-800 dark:text-white mt-4 w-64"
            readOnly
            value="الراتب المتبقي"
          />

          <div className="flex justify-between gap-4">
            <Button
              color="primary"
              className="w-full py-2 text-lg font-medium"
              onClick={handleSave}
            >
              حفظ الطلب
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
