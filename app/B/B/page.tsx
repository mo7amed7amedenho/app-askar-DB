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

// تعريف نوع البيانات للعامل
interface Employee {
  id: string;
  label: string;
  job: string;
  dailySalary: string;
  nationalId: string;
  phoneNumber: string;
}

export default function AddEmployeePage() {
  const [employeeData, setEmployeeData] = useState({
    employeeName: "",
    employeeJob: "",
    dailySalary: "",
    nationalId: "",
    phoneNumber: "",
  });

  const [people, setPeople] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "danger";
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // حالة العاملين الثابتة
  const status = [
    { key: "active", label: "نشط" },
    { key: "inactive", label: "غير نشط" },
  ];

  // جلب بيانات العاملين عند تحميل المكون
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch("/api/employees");
        const data = await res.json();
        setPeople(
          data.map((emp: any) => ({
            id: emp.id,
            label: emp.employeeName,
            job: emp.employeeJob,
            dailySalary: emp.dailySalary,
            nationalId: emp.nationalId,
            phoneNumber: emp.phoneNumber,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployee) return;
    try {
      const res = await fetch(`/api/employees/${selectedEmployee.id}`, {
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

  const handleDelete = async () => {
    if (!selectedEmployee) return;
    try {
      const res = await fetch(`/api/employees/${selectedEmployee.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setAlert({ message: "تم حذف العامل بنجاح", type: "success" });
        setSelectedEmployee(null);
        setEmployeeData({
          employeeName: "",
          employeeJob: "",
          dailySalary: "",
          nationalId: "",
          phoneNumber: "",
        });
      } else {
        setAlert({ message: data.error || "فشل في الحذف", type: "danger" });
      }
    } catch (error) {
      setAlert({ message: "خطأ في الاتصال بالخادم", type: "danger" });
    }
    setIsModalOpen(false);
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
            defaultItems={people}
            onSelectionChange={(key) => {
              const employee = people.find((p) => p.id === key);
              if (employee) {
                setSelectedEmployee(employee);
                setEmployeeData({
                  employeeName: employee.label,
                  employeeJob: employee.job,
                  dailySalary: employee.dailySalary,
                  nationalId: employee.nationalId,
                  phoneNumber: employee.phoneNumber,
                });
              }
            }}
          >
            {(person) => (
              <AutocompleteItem key={person.id}>
                {person.label}
              </AutocompleteItem>
            )}
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
            variant="underlined"
            label="الرقم القومي"
            placeholder="أدخل الرقم القومي"
            className="w-full"
            type="number"
            value={employeeData.nationalId}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, nationalId: e.target.value })
            }
          />
          <Input
            isRequired
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
              type="button"
              color="danger"
              className="w-full py-2 text-lg font-medium"
              onClick={() => setIsModalOpen(true)}
              disabled={!selectedEmployee}
            >
              حذف العامل
            </Button>
          </div>
        </Form>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalHeader>تأكيد الحذف</ModalHeader>
        <ModalBody>هل أنت متأكد من حذف {selectedEmployee?.label}؟</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>
            نعم، حذف
          </Button>
          <Button onClick={() => setIsModalOpen(false)}>إلغاء</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
