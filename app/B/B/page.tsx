"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Form,
  Autocomplete,
  AutocompleteItem,
} from "@heroui/react";
import Alerts from "@/components/blocks/Alerts";
import { Employee } from "@prisma/client";
import ConfirmationModal from "@/components/blocks/ConfirmationModal"; // استيراد المودال

export default function AddEmployeePage() {
  const [employeeData, setEmployeeData] = useState({
    employeeName: "",
    employeeJob: "",
    dailySalary: "",
    nationalId: "",
    phoneNumber: "",
  });

  const [people, setPeople] = useState<Employee[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null
  );
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "danger";
  } | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch("/api/employee");
        const data = await res.json();
        setPeople(data);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (selectedEmployeeId) {
      const employee = people.find((p) => p.id.toString() === selectedEmployeeId);
      if (employee) {
        setEmployeeData({
          employeeName: employee.name,
          employeeJob: employee.jobTitle,
          dailySalary: employee.dailySalary.toString(),
          nationalId: employee.nationalId,
          phoneNumber: employee.phoneNumber,
        });
      }
    }
  }, [selectedEmployeeId, people]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployeeId) return;
    setIsUpdateModalOpen(true);
  };

  const confirmUpdate = async () => {
    try {
      const res = await fetch(`/api/employee/${selectedEmployeeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: employeeData.employeeName,
          jobTitle: employeeData.employeeJob,
          dailySalary: parseFloat(employeeData.dailySalary),
          nationalId: employeeData.nationalId,
          phoneNumber: employeeData.phoneNumber,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setAlert({ message: "تم تحديث بيانات العامل بنجاح", type: "success" });
      } else {
        setAlert({ message: data.error || "فشل في التحديث", type: "danger" });
      }
    } catch (error) {
      setAlert({ message: "خطأ في الاتصال بالخادم", type: "danger" });
    } finally {
      setIsUpdateModalOpen(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedEmployeeId) return;
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`/api/employee/${selectedEmployeeId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAlert({ message: "تم حذف العامل بنجاح", type: "success" });
        setPeople(people.filter((p) => p.id.toString() !== selectedEmployeeId));
        setSelectedEmployeeId(null);
        setEmployeeData({
          employeeName: "",
          employeeJob: "",
          dailySalary: "",
          nationalId: "",
          phoneNumber: "",
        });
      } else {
        setAlert({ message: "فشل في حذف العامل", type: "danger" });
      }
    } catch (error) {
      setAlert({ message: "خطأ في الاتصال بالخادم", type: "danger" });
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3 p-4">
      {alert && <Alerts message={alert.message} color={alert.type} />}
      <div className="bg-white dark:bg-zinc-900 shadow-lg rounded-2xl p-6 w-full">
        <h2 className="text-2xl font-semibold text-center dark:text-white text-zinc-800 mb-6">
          تعديل بيانات عامل
        </h2>
        <Form className="grid grid-cols-1 md:grid-cols-2" onSubmit={handleSubmit}>
          <Autocomplete
            label="اسم العامل"
            variant="underlined"
            selectedKey={selectedEmployeeId}
            defaultItems={people}
            onSelectionChange={(key) => setSelectedEmployeeId(String(key))}
          >
            {(person) => (
              <AutocompleteItem key={person.id}>
                {person.name}
              </AutocompleteItem>
            )}
          </Autocomplete>
          <Input
            isRequired
            variant="underlined"
            label="الوظيفة"
            value={employeeData.employeeJob}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, employeeJob: e.target.value })
            }
          />
          <Input
            isRequired
            variant="underlined"
            label="الراتب اليومي"
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
            type="tel"
            value={employeeData.phoneNumber}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, phoneNumber: e.target.value })
            }
          />
          <div className="grid grid-cols-2 gap-4">
            <Button type="submit" color="primary">
              حفظ
            </Button>
            <Button type="button" color="danger" onClick={handleDelete}>
              حذف
            </Button>
          </div>
        </Form>
      </div>

      {/* Modal for Update Confirmation */}
      <ConfirmationModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onConfirm={confirmUpdate}
        title="تأكيد التحديث"
        message="هل أنت متأكد أنك تريد تحديث بيانات هذا العامل؟"
        confirmButtonText="نعم"
        confirmButtonColor="primary"
      />

      {/* Modal for Delete Confirmation */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="تأكيد الحذف"
        message="هل أنت متأكد أنك تريد حذف هذا العامل؟"
        confirmButtonText="نعم"
        confirmButtonColor="danger"
      />
    </div>
  );
}