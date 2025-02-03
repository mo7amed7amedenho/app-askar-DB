"use client";

import {
  Button,
  Input,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import React, { useState } from "react";
import { FaPrint, FaSave } from "react-icons/fa";

interface Item {
  name: string;
  quantity: string;
  unit: string;
  unitPrice: string;
}

export default function SupplierInvoicePage() {
  const [supplier, setSupplier] = useState<string>("");
  const [invoiceType, setInvoiceType] = useState<string>("cash");
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Item>({
    name: "",
    quantity: "",
    unit: "",
    unitPrice: "",
  });

  const addItem = () => {
    if (
      !newItem.name ||
      !newItem.quantity ||
      !newItem.unit ||
      !newItem.unitPrice
    ) {
      alert("يرجى ملء جميع الحقول قبل إضافة العنصر.");
      return;
    }
    setItems([...items, newItem]);
    setNewItem({ name: "", quantity: "", unit: "", unitPrice: "" });
  };

  const calculateTotal = (): number => {
    return items.reduce(
      (total, item) =>
        total + (parseFloat(item.quantity) * parseFloat(item.unitPrice) || 0),
      0
    );
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (!printWindow) {
      alert("فشل فتح نافذة الطباعة. يرجى السماح للنوافذ المنبثقة.");
      return;
    }
    printWindow.document.write(`
      <!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <title>فاتورة المورد</title>
  <style>
    body {
      font-family: Cairo, sans-serif;
      padding: 10px;
      background-color: #fff;
      color: #000;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    th, td {
      border: 3px solid #ddd;
      padding: 4px;
      text-align: center;
    }
    th {
      background-color: #f4f4f4;
    }
    h2 {
      text-align: right;
      font-size: 14px;
      color: #333;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #ddd;
      padding-bottom: 10px;
      margin: 20px;
    }
    .header img {
      max-width: 100px;
      display: block;
    }
    .header .text {
      text-align: center;
      flex: 1;
    }
    .header .text h1 {
      font-size: 18px;
      margin: 0;
      font-weight: bold;
    }
    .header .text p {
      font-size: 14px;
      margin: 0;
      color: #555;
    }
    h1 {
      text-align: center;
      font-size: 20px;
      color: #333;
    }
    p {
      text-align: center;
      font-size: 14px;
      color: #333;
    }
      .container {
  display: flex;
  align-items: center; /* لمحاذاة العناصر عموديًا */
  justify-content: space-between; /* توزيع العناصر بالتساوي */
}

.supplier {
  text-align: right;
  flex: 1;
  justify-content: flex-end;
  margin-right: 20px;
  font-size: 14px;
  color: #333;
}
    .footer {
      text-align: center;
      margin-top: 30px;
      font-size: 12px;
      color: #888;
      border-top: 1px solid #ddd;
      padding-top: 10px;
    }
    @media print {
      body {
        padding: 10px;
      }
      table th, table td {
        font-size: 12px;
        padding: 5px;
      }
      h1 {
        font-size: 18px;
      }
      .footer {
        font-size: 12px;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="company-name">
      <h2>Askar Group for <br /> General Contracting<br />عسكر للمقاولات العمومية</h2>
    </div>
    <div class="logo">
      <img src="/logo.webp" alt="Logo" />
    </div>
  </div>

  <h1>فاتورة المورد</h1>
  <div class="container">
  <p class="supplier"><strong>اسم المورد:</strong> ${supplier}</p>
  <p class="supplier"><strong>نوع الفاتورة:</strong> ${
    invoiceType === "cash" ? "نقدي" : "محفظة"
  }</p>
  </div>
  <table>
    <thead>
      <tr>
        <th>اسم العنصر</th>
        <th>الكمية</th>
        <th>الوحدة</th>
        <th>سعر الوحدة</th>
        <th>الإجمالي</th>
      </tr>
    </thead>
    <tbody>
      ${items
        .map(
          (item) =>
            `<tr><td>${item.name}</td><td>${item.quantity}</td><td>${
              item.unit
            }</td><td>${item.unitPrice}</td><td>${(
              parseFloat(item.quantity) * parseFloat(item.unitPrice)
            ).toFixed(2)}</td></tr>`
        )
        .join("")}
    </tbody>
  </table>
  
  <h3>إجمالي الفاتورة: ${calculateTotal().toFixed(2)}</h3>
  <button onclick="window.print()">طباعة</button>

  <div class="footer">
    <p>بواسطة <strong>Hamedenho</strong>، شركة <strong>عسكر للمقاولات العمومية</strong></p>
  </div>
</body>
</html>
    `);
    printWindow.document.close();
    printWindow.onload = () => printWindow.print();
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-4">
      <div className="bg-white dark:bg-zinc-900 shadow-lg rounded-2xl p-6 w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">
          فاتورة المورد
        </h2>
        <div className="space-y-4">
          <div className="flex flex-row gap-2">
            <Input
              type="text"
              placeholder="اسم المورد"
              className="w-full"
              onChange={(e) => setSupplier(e.target.value)}
            />
            <Select
              placeholder="نوع الفاتورة"
              className="w-1/2"
              onChange={(e) => setInvoiceType(e.target.value)}
            >
              <SelectItem value="cash">نقدي</SelectItem>
              <SelectItem value="wallet">محفظة</SelectItem>
            </Select>
          </div>

          <div className="flex flex-row gap-2">
            <Input
              type="text"
              placeholder="اسم العنصر"
              className="w-full"
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
            <Select placeholder="النوع">
              <SelectItem value="cash">معدات</SelectItem>
              <SelectItem value="wallet">مستهلكات</SelectItem>
            </Select>
            <Input
              type="number"
              placeholder="الكمية"
              className="w-full"
              onChange={(e) =>
                setNewItem({ ...newItem, quantity: e.target.value })
              }
            />
            <Input
              type="text"
              placeholder="الوحدة"
              className="w-full"
              onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
            />
            <Input
              type="number"
              placeholder="سعر الوحدة"
              className="w-full"
              onChange={(e) =>
                setNewItem({ ...newItem, unitPrice: e.target.value })
              }
            />
            <Button onClick={addItem} className="p-2">
              إضافة عنصر
            </Button>
          </div>
          <h3 className="text-lg font-semibold">
            إجمالي الفاتورة: {calculateTotal().toFixed(2)}
          </h3>
          <Button onClick={handlePrint} className="ml-5">
            حفظ الفاتورة <FaSave />
          </Button>
          <Button onClick={handlePrint}>
            طباعة الفاتورة
            <FaPrint />
          </Button>
        </div>
      </div>
      {items.length > 0 && (
        <div className="w-full">
          <Table>
            <TableHeader>
              <TableColumn className="w-[100px]">اسم العنصر</TableColumn>
              <TableColumn>الكمية</TableColumn>
              <TableColumn>الوحدة</TableColumn>
              <TableColumn>سعر الوحدة</TableColumn>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>{item.unitPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
