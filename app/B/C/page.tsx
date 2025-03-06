"use client";
import {
  Button,
  Card,
  Input,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import Link from "next/link";
import { Employee } from "@prisma/client";
import React, { useState, useMemo, useEffect } from "react";
import { FaPrint, FaSearch } from "react-icons/fa";
import { TbPencil, TbTrash } from "react-icons/tb";
import ConfirmationModal from "@/components/blocks/ConfirmationModal";
import useSWR from "swr";
import Alerts from "@/components/blocks/Alerts";
interface DataTableProps {
  id: number;
  name: string;
  jobTitle: string;
  dailySalary: number;
  status: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page() {
  const { data: people, mutate, isLoading } = useSWR("/api/employee", fetcher);
  const [alert, setAlert] = useState<{
    message: string;
    type:
      | "default"
      | "primary"
      | "secondary"
      | "success"
      | "warning"
      | "danger"
      | undefined;
  } | null>(null);

  const [filterValue, setFilterValue] = useState("");
  const [data] = useState([]);

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [employees, setEmployees] = useState<Employee[]>([]);
  useEffect(() => {
    if (people) {
      setEmployees(people);
    }
  }, [people]);

  const handleDelete = (id: number) => {
    setSelectedEmployeeId(id.toString());
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`/api/employee/${selectedEmployeeId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAlert({ message: "تم حذف العامل بنجاح", type: "success" });
        await mutate(); // تحديث البيانات بعد الحذف
      } else {
        setAlert({ message: "فشل في حذف العامل", type: "danger" });
      }
    } catch (error) {
      setAlert({ message: "خطأ في الاتصال بالخادم", type: "danger" });
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  // تصفية البيانات حسب البحث
  const filteredData = useMemo(() => {
    return data.filter((user: DataTableProps) => {
      const textToSearch = `${user.name} ${user.jobTitle}`
        .normalize("NFD")
        .replace(/[\u064B-\u065F]/g, "")
        .toLowerCase();

      const searchNormalized = filterValue
        .normalize("NFD")
        .replace(/[\u064B-\u065F]/g, "")
        .toLowerCase();

      return textToSearch.includes(searchNormalized);
    });
  }, [filterValue, data]);
  const handlePrint = () => {
    const printWindow = window.open("", "PRINT", "width=800,height=600");
    if (printWindow) {
      const content = `
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
          <title>تقرير الرواتب</title>
          <style>
            body {
              font-family: Cairo, sans-serif;
              padding: 10px;
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
            .footer {
              text-align: center;
              margin-top: 30px;
              font-size: 12px;
              color: #888;
              border-top: 1px solid #ddd;
              padding-top: 10px;
           
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
  
          <h1>تقرير العاملين </h1>
  
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>اسم العامل</th>
                <th>الوظيفة</th>
                <th>اليومية</th>             
              </tr>
            </thead>
            <tbody>
              ${filteredData
                .map(
                  (data: DataTableProps, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${data.name}</td>
                  <td>${data.jobTitle}</td>
                  <td>${data.dailySalary} جنيه</td>                
                </tr>
              `
                )
                .join("")}
             
            </tbody>
          </table>
  
          <p>تم إنشاء التقرير في ${new Date().toLocaleString("ar-EG")}</p>
  
          <div class="footer">
            <p>بواسطة <strong>Hamedenho</strong>، شركة <strong>عسكر للمقاولات العمومية</strong></p>
          </div>
        </body>
        </html>
      `;
      printWindow.document.write(content);
      printWindow.document.close();
      printWindow.focus();

      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 1000); // تأخير 1500 ميلي ثانية
    }
  };

  return (
    <div className="flex flex-col gap-y-2 p-4 pb-0">
      {alert && <Alerts message={alert.message} color={alert.type} />}
      <Card className="flex flex-col gap-y-2 p-4">
        <div className="flex flex-col gap-y-3">
          <h1 className="text-3xl font-bold">إدارة بيانات العمال</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            يمكنك الحصول علي جميع بيانات العمال من هنا
          </p>
        </div>

        {/* مربع البحث */}
        <div className="flex items-center justify-between py-2">
          <Input
            isClearable
            className="w-full sm:max-w-[90%]"
            placeholder="ابحث بالاسم أو الوظيفة..."
            startContent={<FaSearch />}
            value={filterValue}
            onClear={() => setFilterValue("")}
            onChange={(e) => setFilterValue(e.target.value)}
          />
          <Button variant="bordered" onClick={handlePrint}>
            <FaPrint />
            طباعة
          </Button>
        </div>

        {/* جدول البيانات */}
        <div className="flex flex-col gap-y-2">
          <Table aria-label="جدول بيانات العمال">
            <TableHeader>
              <TableColumn>ID</TableColumn>
              <TableColumn>الاسم</TableColumn>
              <TableColumn>الوظيفة</TableColumn>
              <TableColumn>الراتب</TableColumn>
              <TableColumn>الإجراءات</TableColumn>
            </TableHeader>
            {isLoading ? (
              <TableBody>
                {Array.from({ length: 10 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="skeleton h-2 w-full"></div>
                    </TableCell>
                    <TableCell>
                      <div className="skeleton h-2 w-full"></div>
                    </TableCell>
                    <TableCell>
                      <div className="skeleton h-2 w-full"></div>
                    </TableCell>
                    <TableCell>
                      <div className="skeleton h-2 w-full"></div>
                    </TableCell>
                    <TableCell>
                      <div className="skeleton h-2 w-full"></div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                {employees?.length ? (
                  employees.map((user, index) => (
                    <TableRow key={user.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.jobTitle}</TableCell>
                      <TableCell>{user.dailySalary.toString()} جنيه</TableCell>
                      <TableCell className="flex gap-x-2 max-w-[40px]">
                        <Button
                          isIconOnly
                          variant="light"
                          onClick={() => handleDelete(user.id)}
                          color="danger"
                        >
                          <TbTrash className="w-5 h-5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell className="text-center">
                      لا يوجد بيانات
                    </TableCell>
                    <TableCell className="text-center">
                      لا يوجد بيانات
                    </TableCell>
                    <TableCell className="text-center">
                      لا يوجد بيانات
                    </TableCell>
                    <TableCell className="text-center">
                      لا يوجد بيانات
                    </TableCell>
                    <TableCell className="text-center">
                      لا يوجد بيانات
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            )}
          </Table>
        </div>
      </Card>
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
