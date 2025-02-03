"use client";
import React, { useState } from "react";
import { Button, Input, Form, Autocomplete, AutocompleteItem } from "@heroui/react";

export default function AddToolPage() {
  const [toolData, setToolData] = useState({
    toolName: "",
    toolType: "",
    purchaseDate: "",
    toolPrice: "",
    toolQuantity: "",
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // هنا يمكنك تعديل الكود لتخزين البيانات أو إرسالها إلى الخادم
    console.log(toolData);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3 p-4">
      <div className="bg-white dark:bg-zinc-900 shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center dark:text-white text-zinc-800 mb-6">
          إضافة عدة الى الصيانه
        </h2>
        <Form className="space-y-4" onSubmit={handleSubmit}>
          <Autocomplete
            isRequired
            variant="underlined"
            label="اسم العدة"
            placeholder="أدخل اسم العدة"
            className="w-full"
            value={toolData.toolName}
            onChange={(e) =>
              setToolData({ ...toolData, toolName: e.target.value })
            }
          >
          <AutocompleteItem value="Option 1">Option 1</AutocompleteItem>
          </Autocomplete>

          <Input
            isRequired
            variant="underlined"
            label="تاريخ تسليم العدة الى الصيانه"
            placeholder="أدخل تاريخ تسليم العدة الى الصيانه"
            className="w-full"
            type="date"
            value={toolData.purchaseDate}
            onChange={(e) =>
              setToolData({ ...toolData, purchaseDate: e.target.value })
            }
          />
          <Input
            isRequired
            variant="underlined"
            label="تاريخ إستلام العدة من الصيانه"
            placeholder="أدخل تاريخ إستلام العدة من الصيانه"
            className="w-full"
            type="date"
            value={toolData.purchaseDate}
            onChange={(e) =>
              setToolData({ ...toolData, purchaseDate: e.target.value })
            }
          />

          <Input
            isRequired
            variant="underlined"
            label="الكمية"
            placeholder="أدخل الكمية"
            className="w-full"
            type="number"
            value={toolData.toolQuantity}
            onChange={(e) =>
              setToolData({ ...toolData, toolQuantity: e.target.value })
            }
          />
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
