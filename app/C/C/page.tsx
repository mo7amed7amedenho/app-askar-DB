"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Autocomplete,
  Form,
  AutocompleteItem,
  Select,
  SelectItem,
} from "@heroui/react";
import { Check, X } from "lucide-react";
import Alerts from "@/components/blocks/Alerts";
import ConfirmationModal from "@/components/blocks/ConfirmationModal";
import { Custody } from "@prisma/client";

export default function EditAssetPage() {
  const [custodyData, setCustodyData] = useState({
    name: "",
    code: "",
    quantity: 0,
    status: "",
    projectId: null,
  });
  
  const [custodyList, setCustodyList] = useState<Custody[]>([]);
  const [selectedCustody, setSelectedCustody] = useState<Custody | null>(null);
  const [alert, setAlert] = useState<{ message: string; type: "success" | "danger" } | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    const fetchCustody = async () => {
      try {
        const res = await fetch("/api/custody");
        const data = await res.json();
        setCustodyList(data);
      } catch (error) {
        console.error("Failed to fetch custody:", error);
      }
    };
    fetchCustody();
  }, []);

  useEffect(() => {
    if (selectedCustody) {
      setCustodyData({
        name: selectedCustody.name,
        code: selectedCustody.code,
        quantity: selectedCustody.quantity,
        status: selectedCustody.status,
        projectId: null,
      });
    }
  }, [selectedCustody]);

  const handleSubmit = async () => {
    if (!selectedCustody) return;
    setIsUpdateModalOpen(true);
  };

  const confirmUpdate = async () => {
    if (!selectedCustody) return;
    try {
      const res = await fetch(`/api/custody/${selectedCustody.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...custodyData,
          quantity: Number(custodyData.quantity),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setAlert({ message: "تم تحديث بيانات العهدة بنجاح", type: "success" });
      } else {
        setAlert({ message: data.error || "فشل في التحديث", type: "danger" });
      }
    } catch (error) {
      setAlert({ message: "خطأ في الاتصال بالخادم", type: "danger" });
    } finally {
      setIsUpdateModalOpen(false);
    }
  };

  const handleDelete = () => {
    if (!selectedCustody) return;
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedCustody) return;
    try {
      const res = await fetch(`/api/custody/${selectedCustody.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAlert({ message: "تم حذف العهدة بنجاح", type: "success" });
        setCustodyList(custodyList.filter((c) => c.id !== selectedCustody.id));
        setSelectedCustody(null);
        setCustodyData({ name: "", code: "", quantity: 0, status: "", projectId: null });
      } else {
        setAlert({ message: "فشل في الحذف", type: "danger" });
      }
    } catch (error) {
      setAlert({ message: "خطأ في الاتصال بالخادم", type: "danger" });
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3 p-4">
      <div className="bg-white dark:bg-zinc-900 shadow-lg rounded-2xl p-6 w-full">
        <h2 className="text-2xl font-semibold text-center dark:text-white text-zinc-800 mb-6">
          تعديل بيانات العهدة
        </h2>
        {alert && <Alerts message={alert.message} color={alert.type} />}
        <Form className="grid grid-cols-2 gap-4">
          <Autocomplete
            label="اسم العهدة"
            placeholder="أدخل اسم العهدة"
            className="w-full"
            selectedKey={selectedCustody?.id}
            defaultItems={custodyList}
            onSelectionChange={(key) =>
              setSelectedCustody(
                custodyList.find((c) => c.id === Number(key)) || null
              )
            }
          >
            {(custody) => (
              <AutocompleteItem key={custody.id}>{custody.name}</AutocompleteItem>
            )}
          </Autocomplete>
          <Input
            label="رقم العهدة"
            placeholder="أدخل رقم العهدة"
            className="w-full"
            value={custodyData.code}
            onChange={(e) =>
              setCustodyData({ ...custodyData, code: e.target.value })
            }
          />
          <Input
            label="الكمية"
            type="number"
            placeholder="0"
            className="w-full"
            value={custodyData.quantity.toString()}
            onChange={(e) =>
              setCustodyData({
                ...custodyData,
                quantity: Number(e.target.value),
              })
            }
          />
          <Button type="button" color="primary" className="w-full py-2 text-lg font-medium" onClick={handleSubmit}>
            حفظ التعديلات
          </Button>
          <Button type="button" color="danger" className="w-full py-2 text-lg font-medium" onClick={handleDelete}>
            حذف العهدة
          </Button>
        </Form>
      </div>

      <ConfirmationModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onConfirm={confirmUpdate}
        title="تأكيد التحديث"
        message="هل أنت متأكد أنك تريد تحديث بيانات هذه العهدة؟"
        confirmButtonText="نعم"
        confirmButtonColor="primary"
      />
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="تأكيد الحذف"
        message="هل أنت متأكد أنك تريد حذف هذه العهدة؟"
        confirmButtonText="نعم"
        confirmButtonColor="danger"
      />
    </div>
  );
}
