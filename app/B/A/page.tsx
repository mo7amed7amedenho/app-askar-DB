"use client";
import React, { useState } from "react";
import { Button, Input, Form } from "@heroui/react";
import Alerts from "@/components/blocks/Alerts";

export default function AddEmployeePage() {
  const [employeeData, setEmployeeData] = useState({
    employeeName: "",
    employeeJob: "",
    dailySalary: "",
    nationalId: "",
    phoneNumber: "",
  });

  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "danger";
  } | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false); // حالة لتعطيل الزر أثناء الإرسال

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // التحقق من أن جميع الحقول غير فارغة
    if (Object.values(employeeData).some((value) => value.trim() === "")) {
      setAlert({ message: "يرجى تعبئة جميع الحقول", type: "danger" });
      return;
    }

    setIsSubmitting(true); // تعطيل الزر أثناء الإرسال

    try {
      const response = await fetch("/api/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: employeeData.employeeName,
          jobTitle: employeeData.employeeJob,
          dailySalary: Number(employeeData.dailySalary),
          nationalId: employeeData.nationalId,
          phoneNumber: employeeData.phoneNumber,
        }),
      });

      if (response.ok) {
        setAlert({ message: "تمت إضافة العامل بنجاح", type: "success" });
        setEmployeeData({
          employeeName: "",
          employeeJob: "",
          dailySalary: "",
          nationalId: "",
          phoneNumber: "",
        }); // مسح البيانات بعد الحفظ
      } else {
        setAlert({ message: "حدث خطأ أثناء الإضافة", type: "danger" });
      }
    } catch (error) {
      setAlert({ message: "فشل الاتصال بالخادم", type: "danger" });
    } finally {
      setIsSubmitting(false); // إعادة تفعيل الزر بعد الإرسال
    }

    // إخفاء التنبيه بعد 3 ثوانٍ
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-full bg-white dark:bg-zinc-900 shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-semibold text-center dark:text-white text-zinc-800 mb-8">
          إضافة عامل جديد
        </h2>

        {/* عرض التنبيه إذا كان هناك رسالة */}
        {alert && <Alerts message={alert.message} color={alert.type} />}

        <Form className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <Input
            isRequired
            variant="underlined"
            label="اسم العامل"
            placeholder="أدخل اسم العامل"
            className="w-full"
            value={employeeData.employeeName}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, employeeName: e.target.value })
            }
          />
          <Input
            isRequired
            variant="underlined"
            label="الوظيفة"
            placeholder="أدخل وظيفة العامل"
            className="w-full"
            value={employeeData.employeeJob}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, employeeJob: e.target.value })
            }
          />
          <Input
            isRequired
            variant="underlined"
            label="الراتب اليومي"
            placeholder="أدخل الراتب اليومي"
            className="w-full"
            type="number"
            value={employeeData.dailySalary}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, dailySalary: e.target.value })
            }
          />
          <Input
            isRequired
            variant="underlined"
            minLength={14}
            label="الرقم القومي"
            placeholder="أدخل الرقم القومي"
            className="w-full"
            type="text"
            value={employeeData.nationalId}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, nationalId: e.target.value })
            }
          />
          <Input
            isRequired
            variant="underlined"
            minLength={11}
            label="رقم الهاتف"
            className="w-full"
            type="tel"
            value={employeeData.phoneNumber}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, phoneNumber: e.target.value })
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              type="submit"
              color="primary"
              className="w-full py-3 text-lg font-medium"
              isDisabled={isSubmitting} // تعطيل الزر أثناء الإرسال
            >
              {isSubmitting ? "جارٍ الحفظ..." : "حفظ"}
            </Button>
            <Button
              type="reset"
              color="danger"
              className="w-full py-3 text-lg font-medium"
              onClick={() =>
                setEmployeeData({
                  employeeName: "",
                  employeeJob: "",
                  dailySalary: "",
                  nationalId: "",
                  phoneNumber: "",
                })
              }
            >
              مسح البيانات
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
