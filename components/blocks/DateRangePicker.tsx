"use client";
import { Button, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useState } from "react";
import { ar, enUS } from "date-fns/locale";
import { DateRange } from "react-day-picker"; // استيراد النوع الصحيح

export default function MyDatePicker() {
  // تحديث نوع selected ليكون مطابقًا لنوع DateRange
  const [selected, setSelected] = useState<DateRange | undefined>();

  return (
    <div dir="ltr">
      <Button>اختر نطاقًا زمنيًا</Button>
      <DayPicker
        mode="range"
        locale={ar}
        selected={selected}
        onSelect={setSelected} // الآن يتطابق النوع مع المتوقع
        footer={
          selected?.from
            ? `المُحدد: من ${selected.from.toLocaleDateString()} ${
                selected.to ? `إلى ${selected.to.toLocaleDateString()}` : ""
              }`
            : "اختر نطاقًا زمنيًا."
        }
      />
    </div>
  );
}
