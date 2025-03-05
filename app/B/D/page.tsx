"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Card,
  CardBody,
  Form,
  Autocomplete,
  CardFooter,
  AutocompleteItem,
} from "@heroui/react";

export default function AttendancePage() {
  const [attendanceData, setAttendanceData] = useState({
    employeeId: "",
    date: new Date().toISOString().split("T")[0], // تاريخ اليوم تلقائيًا
    checkIn: "",
    checkOut: "",
    normalHours: 0,
    overtimeHours: 0,
  });
  const [dataEmployee, setDataEmployee] = useState([]);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch("/api/employee");
        const data = await res.json();
        setAttendanceData((prev) => ({
          ...prev,
          employeeId: data[0].id,
        }));
        setDataEmployee(data);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };
    fetchEmployees();
  }, [dataEmployee]);
   
  const calculateHours = () => {
    if (!attendanceData.checkIn || !attendanceData.checkOut) return;

    const checkInTime = new Date(`2024-01-01T${attendanceData.checkIn}`);
    const checkOutTime = new Date(`2024-01-01T${attendanceData.checkOut}`);
    const totalHours =
      (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60 * 60);

    const normalHours = Math.min(8, totalHours);
    const overtimeHours = Math.max(0, totalHours - 8);

    setAttendanceData((prev) => ({
      ...prev,
      normalHours,
      overtimeHours,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(attendanceData);
    // هنا يمكنك إرسال البيانات إلى قاعدة البيانات مثل Supabase أو أي API
  };

  return (
    <div className="flex flex-col items-center justify-center pt-10">
      <Card className="w-full max-w-lg shadow-lg rounded-xl text-center">
        <h2 className="text-2xl font-semibold text-center text-zinc-800 dark:text-white p-5">
          تسجيل الحضور والانصراف
        </h2>

        <CardBody>
          <Form className="space-y-4" onSubmit={handleSubmit}>
            <Autocomplete
              label="اسم الموظف"
              required
              value={attendanceData.employeeId}
              onChange={(e: { target: { value: string } }) =>
                setAttendanceData({
                  ...attendanceData,
                  employeeId: e.target.value,
                })
              }
            >
              <AutocompleteItem key="1">{dataEmployee[0].name}</AutocompleteItem>
              
            </Autocomplete>
            <div className="grid grid-cols-3 gap-4">
              <Input
                label="التاريخ"
                type="date"
                required
                value={attendanceData.date}
                onChange={(e: { target: { value: string } }) =>
                  setAttendanceData({ ...attendanceData, date: e.target.value })
                }
              />

              <Input
                label="وقت الحضور"
                type="time"
                required
                value={attendanceData.checkIn}
                onChange={(e: { target: { value: string } }) =>
                  setAttendanceData({
                    ...attendanceData,
                    checkIn: e.target.value,
                  })
                }
                onBlur={calculateHours} // احسب الساعات بعد الإدخال
              />
              <Input
                label="وقت الانصراف"
                type="time"
                required
                value={attendanceData.checkOut}
                onChange={(e: { target: { value: string } }) =>
                  setAttendanceData({
                    ...attendanceData,
                    checkOut: e.target.value,
                  })
                }
                onBlur={calculateHours}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="الساعات العادية"
                readOnly
                value={`${attendanceData.normalHours} ساعات`}
              />
              <Input
                label="الساعات الإضافية"
                readOnly
                value={`${attendanceData.overtimeHours} ساعات`}
              />
            </div>
            <CardFooter className="flex flex-row gap-4">
              <Button
                type="submit"
                color="primary"
                className="w-full py-2 text-lg font-medium"
              >
                حفظ الحضور
              </Button>
              <Button
                type="button"
                color="danger"
                className="w-full py-2 text-lg font-medium"
                onClick={() =>
                  setAttendanceData({
                    employeeId: "",
                    date: new Date().toISOString().split("T")[0],
                    checkIn: "",
                    checkOut: "",
                    normalHours: 0,
                    overtimeHours: 0,
                  })
                }
              >
                إعادة ضبط
              </Button>
            </CardFooter>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
