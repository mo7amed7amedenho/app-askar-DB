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
import { FaSave } from "react-icons/fa";
import Alerts from "@/components/blocks/Alerts";

interface Employee {
  id: string;
  name: string;
  job: string;
  salary: number;
}

export default function AttendancePage() {
  const [attendanceData, setAttendanceData] = useState({
    employeeId: "",
    date: new Date().toISOString().split("T")[0],
    checkIn: "",
    checkOut: "",
    normalHours: 0,
    overtimeHours: 0,
    totalTime: 0,
  });
  const [dataEmployee, setDataEmployee] = useState<Employee[]>([]);
  const [alert, setAlert] = useState({ message: "", type: "" });
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch("/api/employee");
        const data = await res.json();
        if (data.length > 0) {
          setAttendanceData((prev) => ({
            ...prev,
            employeeId: data[0].id,
          }));
        }
        setDataEmployee(data);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  const calculateHours = () => {
    if (!attendanceData.checkIn || !attendanceData.checkOut) return;

    const checkInTime = new Date(`2024-01-01T${attendanceData.checkIn}`);
    const checkOutTime = new Date(`2024-01-01T${attendanceData.checkOut}`);
    const totalHours =
      (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60 * 60);

    const normalHours = Math.min(8, totalHours);
    const overtimeHours = Math.max(0, totalHours - 8);
    const totalTime = normalHours + overtimeHours;

    setAttendanceData((prev) => ({
      ...prev,
      normalHours,
      overtimeHours,
      totalTime,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/Attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(attendanceData),
      });
      const data = await response.json();
      if (data.error) {
        setAlert({
          message: `لم يتم تسجيل الحضور ${data.error}`,
          type: "danger",
        });
      } else {
        setAlert({
          message: "تم تسجيل الحضور بنجاح",
          type: "success",
        });
        setAttendanceData({
          employeeId: "",
          date: new Date().toISOString().split("T")[0],
          checkIn: "",
          checkOut: "",
          normalHours: 0,
          overtimeHours: 0,
          totalTime: 0,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-10">
      {alert && (
        <Alerts
          message={alert.message}
          color={alert.type as "success" | "danger"}
        />
      )}
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
              {dataEmployee.length > 0 ? (
                dataEmployee.map((emp) => (
                  <AutocompleteItem key={emp.id} value={emp.id}>
                    {emp.name}
                  </AutocompleteItem>
                ))
              ) : (
                <AutocompleteItem key="loading" isDisabled>
                  جاري التحميل...
                </AutocompleteItem>
              )}
            </Autocomplete>

            <div className="grid grid-cols-3 justify-between w-full gap-4">
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
                onBlur={calculateHours}
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

            <div className="grid grid-cols-3 gap-4">
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
              <Input
                label="إجمالى عدد الساعات"
                readOnly
                value={`${attendanceData.totalTime} ساعات`}
              />
            </div>
            <CardFooter className="flex flex-row gap-4">
              <Button
                type="submit"
                color="primary"
                className="w-1/8 py-2 text-lg rounded-lg border border-blue-950 font-medium"
                startContent={<FaSave />}
              >
                حفظ
              </Button>
            </CardFooter>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
