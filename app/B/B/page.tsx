"use client";
import React, { useState } from "react";
import {
  Button,
  Input,
  Form,
  Autocomplete,
  Select,
  SelectItem,
} from "@heroui/react";
export const status = [
  { key: "نشط", label: "نشط" },
  { key: "غير نشط", label: "غير نشط" },
];
export default function AddEmployeePage() {
  const [employeeData, setEmployeeData] = useState({
    employeeName: "",
    employeeJob: "",
    dailySalary: "",
    nationalId: "",
    phoneNumber: "",
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // هنا يمكنك إضافة الكود لتخزين البيانات أو إرسالها إلى الخادم
    console.log(employeeData);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3 p-4">
      <div className="bg-white dark:bg-zinc-900 shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center dark:text-white text-zinc-800 mb-6">
          إضافة عامل جديد
        </h2>
        <Form className="space-y-4" onSubmit={handleSubmit}>
          <Autocomplete
            label="اسم العامل"
            name="اسم العامل"
            variant="underlined"
          >
            <option value=""></option>
          </Autocomplete>
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
            validationBehavior="aria"
            variant="underlined"
            minLength={14}
            maxLength={14}
            label="الرقم القومي"
            placeholder="أدخل الرقم القومي"
            className="w-full"
            type="number"
            onChange={(e) =>
              setEmployeeData({ ...employeeData, nationalId: e.target.value })
            }
            value={employeeData.nationalId}
          />
          <Input
            isRequired
            minLength={11}
            variant="underlined"
            label="رقم الهاتف"
            className="w-full"
            type="tel"
            value={employeeData.phoneNumber}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, phoneNumber: e.target.value })
            }
          />
          <Select label="حالة العامل" variant="underlined">
            {status.map((statu) => (
              <SelectItem key={statu.key}>{statu.label}</SelectItem>
            ))}
          </Select>
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="submit"
              color="primary"
              className="w-full py-2 text-lg font-medium"
            >
              حفظ
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
    </div>
  );
}
