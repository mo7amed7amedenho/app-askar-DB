"use client";
import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Input,
  Autocomplete,
  Form,
  AutocompleteItem,
} from "@heroui/react";
import { getLocalTimeZone, today, CalendarDate } from "@internationalized/date";
import { FaSave } from "react-icons/fa";
import Alerts from "@/components/blocks/Alerts";

export default function AddAssetPage() {
  const [formData, setFormData] = useState({
    assetName: "",
    assetNumber: "",
    quantity: 0,
    condition: "active", // تأكد أن الحالة تتوافق مع Prisma
    receiver: "",
    dateReceived: today(getLocalTimeZone()) as CalendarDate,
    projectId: null, // اضفناه لأن المشروع مرتبط
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "danger";
  } | null>(null);
  const custodyCreate = async () => {
    try {
      const res = await fetch("/api/custody", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.assetName, // تأكد من مطابقة الحقول مع Prisma
          code: formData.assetNumber, // تأكد من إرسال `code`
          quantity: Number(formData.quantity), // تأكد من تحويل `quantity` إلى `Number`
          status: formData.condition,
          projectId: formData.projectId ? Number(formData.projectId) : null, // تأكد أن `projectId` رقم أو `null`
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setAlert({ message: "تم حفظ العهدة بنجاح", type: "success" });
        console.log("Success:", data);
      } else {
        setAlert({ message: data.error || "فشل في الحفظ", type: "danger" });
        console.error("Error:", data.error);
      }
    } catch (error) {
      setAlert({ message: "خطاء في الاتصال بالخادم", type: "danger" });
      console.error("Fetch Error:", error);
    }
    setFormData({
      assetName: "",
      assetNumber: "",
      quantity: 0,
      condition: "active",
      receiver: "",
      dateReceived: today(getLocalTimeZone()) as CalendarDate,
      projectId: null,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    await custodyCreate();
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center p-4">
      {alert && <Alerts message={alert.message} color={alert.type} />}
      <div className="w-full max-w-6xl">
        <h2 className="text-3xl font-semibold text-zinc-800 dark:text-white mb-6">
          إضافة عهدة جديدة
        </h2>
        <div className="bg-white dark:bg-zinc-900 shadow-md rounded-lg p-6">
          <Form
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-4">
              <Input
                label="اسم العهدة"
                placeholder="أدخل اسم العهدة"
                value={formData.assetName}
                onChange={(e) =>
                  setFormData({ ...formData, assetName: e.target.value })
                }
              />
              <Input
                label="رقم العهدة"
                placeholder="أدخل رقم العهدة"
                value={formData.assetNumber}
                onChange={(e) =>
                  setFormData({ ...formData, assetNumber: e.target.value })
                }
              />
              <Input
                label="الكمية"
                type="number"
                placeholder="0"
                value={formData.quantity.toString()}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    quantity: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-4">
              <Autocomplete label="تابعه لمشروع" placeholder="ابحث عن المشروع">
                <AutocompleteItem key="1">مشروع 1</AutocompleteItem>
              </Autocomplete>

              <DatePicker
                label="تاريخ الاستلام"
                hideTimeZone
                showMonthAndYearPickers
                value={formData.dateReceived}
                onChange={(date) =>
                  setFormData({
                    ...formData,
                    dateReceived: date as CalendarDate,
                  })
                }
              />
            </div>

            <div className="flex justify-end w-full col-span-2">
              <Button
                type="submit"
                color="primary"
                isDisabled={!formData.assetName}
                startContent={!loading && <FaSave />}
                isLoading={loading}
              >
                حفظ
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
