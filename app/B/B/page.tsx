"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Form,
  Autocomplete,
  Select,
  SelectItem,
  AutocompleteItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import Alerts from "@/components/blocks/Alerts";

interface Employee {
  id: string;
  label: string;
  job: string;
  dailySalary: string;
  nationalId: string;
  phoneNumber: string;
  status: string;
}

export default function AddEmployeePage() {
  const [employeeData, setEmployeeData] = useState({
    employeeName: "",
    employeeJob: "",
    dailySalary: "",
    nationalId: "",
    phoneNumber: "",
    status: "active",
  });

  const [people, setPeople] = useState<Employee[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [alert, setAlert] = useState<{ message: string; type: "success" | "danger" } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch("/api/employee");
        const data = await res.json();
        setPeople(
          data.map((emp: any) => ({
            id: emp.id,
            label: emp.name,
            job: emp.jobTitle,
            dailySalary: emp.dailySalary,
            nationalId: emp.nationalId,
            phoneNumber: emp.phoneNumber,
            status: emp.status,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (selectedEmployeeId) {
      const employee = people.find((p) => p.id === selectedEmployeeId);
      if (employee) {
        setEmployeeData({
          employeeName: employee.label,
          employeeJob: employee.job,
          dailySalary: employee.dailySalary,
          nationalId: employee.nationalId,
          phoneNumber: employee.phoneNumber,
          status: employee.status,
        });
      }
    }
  }, [selectedEmployeeId, people]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployeeId) return;
    try {
      const res = await fetch(`/api/employees/${selectedEmployeeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeData),
      });
      const data = await res.json();
      if (res.ok) {
        setAlert({ message: "تم تحديث بيانات العامل بنجاح", type: "success" });
      } else {
        setAlert({ message: data.error || "فشل في التحديث", type: "danger" });
      }
    } catch (error) {
      setAlert({ message: "خطأ في الاتصال بالخادم", type: "danger" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3 p-4">
      {alert && <Alerts message={alert.message} color={alert.type} />}
      <div className="bg-white dark:bg-zinc-900 shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center dark:text-white text-zinc-800 mb-6">
          تعديل بيانات عامل
        </h2>
        <Form className="space-y-4" onSubmit={handleSubmit}>
          <Autocomplete
            label="اسم العامل"
            variant="underlined"
            selectedKey={selectedEmployeeId}
            defaultItems={people}
            onSelectionChange={(key) => setSelectedEmployeeId(String(key))}
          >
            {(person) => <AutocompleteItem key={person.id}>{person.label}</AutocompleteItem>}
          </Autocomplete>
          <Input
            isRequired
            variant="underlined"
            label="الوظيفة"
            value={employeeData.employeeJob}
            onChange={(e) => setEmployeeData({ ...employeeData, employeeJob: e.target.value })}
          />
          <Input
            isRequired
            variant="underlined"
            label="الراتب اليومي"
            type="number"
            value={employeeData.dailySalary}
            onChange={(e) => setEmployeeData({ ...employeeData, dailySalary: e.target.value })}
          />
          <Input
            isRequired
            variant="underlined"
            label="الرقم القومي"
            type="number"
            value={employeeData.nationalId}
            onChange={(e) => setEmployeeData({ ...employeeData, nationalId: e.target.value })}
          />
          <Input
            isRequired
            variant="underlined"
            label="رقم الهاتف"
            type="tel"
            value={employeeData.phoneNumber}
            onChange={(e) => setEmployeeData({ ...employeeData, phoneNumber: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Button type="submit" color="primary">حفظ</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
