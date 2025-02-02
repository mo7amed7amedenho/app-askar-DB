"use client";
import React, { useState } from "react";
import {
  Button,
  Card,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  DateRangePicker,
  Select,
  SelectItem,
} from "@heroui/react";
import { FaSearch } from "react-icons/fa";

interface Asset {
  id: number;
  name: string;
}

interface Expense {
  id: number;
  item: string;
  type: string;
  amount: number;
  date: string;
}

const assetData: Asset[] = [
  { id: 1, name: " مشروع A" },
  { id: 2, name: " مشروع B" },
];

const expenseData: Record<number, Expense[]> = {
  1: [
    {
      id: 1,
      item: "شراء أدوات",
      type: "صرف عادي",
      amount: 500,
      date: "2024-01-01",
    },
    {
      id: 2,
      item: "إصلاح معدات",
      type: "سلفة",
      amount: 300,
      date: "2024-01-05",
    },
  ],
  2: [
    {
      id: 1,
      item: "شراء مواد",
      type: "صرف مرتب",
      amount: 700,
      date: "2024-01-02",
    },
    {
      id: 2,
      item: "نقل مواد",
      type: "صرف عادي",
      amount: 200,
      date: "2024-01-06",
    },
  ],
};

const AssetExpenseReport: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("");
  const [dateRange, setDateRange] = useState<{ start?: Date; end?: Date }>({});
  const [showExpenses, setShowExpenses] = useState<boolean>(false);

  console.log("Selected Asset:", selectedAsset);
  console.log("Show Expenses:", showExpenses);

  const expenses: Expense[] = selectedAsset
    ? expenseData[selectedAsset] || []
    : [];
  console.log("Expenses:", expenses);

  const filteredExpenses = expenses.filter((expense) => {
    const matchesItem = expense.item.includes(filterValue);
    const matchesType = selectedType ? expense.type === selectedType : true;
    const expenseDate = new Date(expense.date);
    const inDateRange =
      (!dateRange.start || expenseDate >= dateRange.start) &&
      (!dateRange.end || expenseDate <= dateRange.end);
    return matchesItem && matchesType && inDateRange;
  });

  return (
    <div className="flex flex-col gap-y-4 p-4">
      <Card className="p-4 space-y-4">
        <h1 className="text-2xl font-bold">تقرير مشروع</h1>
        <div className="flex gap-x-4">
          <Select placeholder="اختر مشروع">
            {assetData.map((asset) => (
              <SelectItem key={asset.id} value={String(asset.id)}>
                {asset.name}
              </SelectItem>
            ))}
          </Select>
          <DateRangePicker className="max-w-xs" />

          <Button onClick={() => setShowExpenses(true)}>إظهار</Button>
        </div>

        {showExpenses && selectedAsset && (
          <>
            <Input
              isClearable
              placeholder="ابحث عن بند..."
              startContent={<FaSearch />}
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            />
            <Table>
              <TableHeader>
                <TableColumn>رقم</TableColumn>
                <TableColumn>البند</TableColumn>
                <TableColumn>النوع</TableColumn>
                <TableColumn>المبلغ</TableColumn>
                <TableColumn>التاريخ</TableColumn>
              </TableHeader>
              <TableBody>
                {filteredExpenses.length > 0 ? (
                  filteredExpenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>{expense.id}</TableCell>
                      <TableCell>{expense.item}</TableCell>
                      <TableCell>{expense.type}</TableCell>
                      <TableCell>
                        {isNaN(expense.amount) ? 0 : expense.amount} جنيه
                      </TableCell>
                      <TableCell>{expense.date}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      لا توجد بيانات متاحة
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </>
        )}
      </Card>
    </div>
  );
};

export default AssetExpenseReport;
