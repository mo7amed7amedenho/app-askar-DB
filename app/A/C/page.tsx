"use client";
import React from "react";
import {
  Button,
  DatePicker,
  Input,
  Select,
  Autocomplete,
  Form,
  AutocompleteItem,
  SelectItem,
} from "@heroui/react";
import { now, getLocalTimeZone } from "@internationalized/date";

export default function SalaryPage() {
  // const [formData, setFormData] = useState({
  //   name: "",
  //   amount: "",
  //   kind: "",
  //   dateRange: {
  //     start: today(getLocalTimeZone()),
  //     end: today(getLocalTimeZone()),
  //   },
  // });
  // const [, setDateRange] = useState<{
  //   start: CalendarDate;
  //   end: CalendarDate;
  // } | null>(null);
  // // const handleDateChange = (value: RangeValue<CalendarDate> | null) => {
  // //   if (value) {
  // //     setDateRange({ start: value.start, end: value.end });
  // //   } else {
  // //     setDateRange(null); // أو تعيين قيمة افتراضية
  // //   }
  // // };

  return (
    <div className="flex flex-col items-center justify-center space-y-3 p-4">
      <div className="bg-white dark:bg-zinc-900 shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center text-zinc-800 dark:text-white mb-6">
          صرف الراتب
        </h2>
        <Form className="space-y-4">
          <Autocomplete label="اسم العامل" placeholder="ابحث عن العامل">
            <AutocompleteItem>عبد الله عبد الله</AutocompleteItem>
          </Autocomplete>
          <DatePicker
            hideTimeZone
            showMonthAndYearPickers
            defaultValue={now(getLocalTimeZone())}
            label="Event Date"
          />
          <Select label="اختر العهدة" className="w-full">
           <SelectItem value="option1">Option 1</SelectItem>
          </Select>

          <div className="grid grid-cols-3 gap-4">
            <Input
              label="الراتب اليومى"
              readOnly
              value="200 جنيه"
              className="text-lg font-medium text-zinc-800 dark:text-white"
            />
            <Input
              label="إجمالى الخصومات"
              color="danger"
              readOnly
              value="50 جنيه"
              className="text-lg font-medium text-zinc-800 dark:text-white"
            />
            <Input
              label="إجمالى أيام الحضور"
              readOnly
              color="warning"
              value="26 يوم"
              className="text-lg font-medium text-zinc-800 dark:text-white"
            />
            <Input
              label="Overtime"
              readOnly
              color="success"
              value="10 ساعات"
              className="text-lg font-medium text-zinc-800 dark:text-white"
            />
            <Input
              label="إجمالى الراتب"
              readOnly
              value="5000 جنيه"
              className="text-lg font-medium text-zinc-800 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 justify-center gap-4">
            <Button
              type="submit"
              color="primary"
              className="w-full py-2 text-lg font-medium"
            >
              حفظ و صرف
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
