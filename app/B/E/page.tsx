"use client";
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
} from "@heroui/react";
import { useState, useMemo } from "react";
import { FaPrint, FaSearch } from "react-icons/fa";

// بيانات العمال
const attendanceData = [
  {
    id: 1,
    name: "محمد أحمد",
    job: "مهندس مدني",
    dailySalary: 300,
    attendanceDays: 25,
    extraHours: 5,
    totalAdvance: 500,
  },
  {
    id: 2,
    name: "أحمد علي",
    job: "سباك",
    dailySalary: 250,
    attendanceDays: 22,
    extraHours: 10,
    totalAdvance: 400,
  },
  {
    id: 3,
    name: "سارة محمود",
    job: "محاسبة",
    dailySalary: 400,
    attendanceDays: 28,
    extraHours: 3,
    totalAdvance: 700,
  },
  {
    id: 4,
    name: "ياسين خالد",
    job: "كهربائي",
    dailySalary: 270,
    attendanceDays: 24,
    extraHours: 8,
    totalAdvance: 350,
  },
];

export default function AttendanceReport() {
  const [filterValue, setFilterValue] = useState("");
  // const [selectedRange, setSelectedRange] = useState({
  //   startDate: new Date(),
  //   endDate: new Date(),
  // });
  const [showReport, setShowReport] = useState(false);

  // تصفية البيانات
  const filteredData = useMemo(() => {
    return attendanceData.filter((user) => {
      const textToSearch = `${user.name} ${user.job}`
        .normalize("NFD")
        .replace(/[\u064B-\u065F]/g, "")
        .toLowerCase();

      const searchNormalized = filterValue
        .normalize("NFD")
        .replace(/[\u064B-\u065F]/g, "")
        .toLowerCase();

      return textToSearch.includes(searchNormalized);
    });
  }, [filterValue]);

  // حساب الراتب النهائي
  const calculateTotalSalary = (user: {
    id?: number;
    name?: string;
    job?: string;
    dailySalary: any;
    attendanceDays: any;
    extraHours: any;
    totalAdvance: any;
  }) => {
    const { dailySalary, attendanceDays, extraHours, totalAdvance } = user;
    const extraSalary = extraHours * (dailySalary / 8);
    const totalSalary =
      dailySalary * attendanceDays + extraSalary - totalAdvance;
    return totalSalary.toFixed(2);
  };

  // طباعة التقرير
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
              margin: 10px 0;
            }
            th, td {
              border: 4px solid #ddd;
              padding: 3px;
              text-align: center;
            }
            th {
              background-color: #f4f4f4;
            }
              h2 {
              text-align: right;
              font-size: 8px;
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
              font-size: 12px;
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
              font-size: 10px;
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
                font-size: 8px;
                padding: 1px;
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
                <th>الاسم</th>
                <th>الوظيفة</th>
                <th>اليومية</th>
                <th>الحضور</th>
                <th>س.اضافية</th>
                <th>إ.السلف</th>
                <th>الراتب النهائي</th>
              </tr>
            </thead>
            <tbody>
               ${filteredData
                 .map(
                   (data) => `
                <tr>
                  <td>${data.id}</td>
                  <td>${data.name}</td>
                  <td>${data.job}</td>
                  <td>${data.dailySalary} جنيه</td>
                  <td>${data.attendanceDays} يوم</td>
                  <td>${data.extraHours}</td>
                  <td>${data.totalAdvance} جنيه</td>
                  <td>${calculateTotalSalary(data)} جنيه</td>
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
      }, 1000); // تأخير 1500 ميلي ثانية
    }
  };

  return (
    <div className="flex flex-col gap-y-4 p-4">
      <Card className="flex flex-col gap-y-4 p-4">
        <h1 className="text-3xl font-bold">تقرير الحضور والانصراف</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          يمكنك تحديد مدة معينة وعرض بيانات الحضور والراتب
        </p>

        {/* محدد التاريخ وزر إظهار التقرير */}
        <div className="flex flex-col gap-y-2">
          <label className="font-bold">حدد المدة:</label>
          <div className="flex items-center gap-x-2">
            <DateRangePicker
              className="max-w-xs"
              variant="underlined"
              isRequired
            />

            <Button variant="light" onClick={() => setShowReport(true)}>
              إظهار التقرير
            </Button>
          </div>
        </div>

        {/* مربع البحث وزر الطباعة */}
        {showReport && (
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
        )}

        {/* جدول البيانات */}
        {showReport && (
          <div className="flex flex-col gap-y-2">
            <Table aria-label="جدول بيانات الحضور والانصراف">
              <TableHeader>
                <TableColumn>ID</TableColumn>
                <TableColumn>الاسم</TableColumn>
                <TableColumn>الوظيفة</TableColumn>
                <TableColumn>اليومية</TableColumn>
                <TableColumn>عدد أيام الحضور</TableColumn>
                <TableColumn>عدد الساعات الإضافية</TableColumn>
                <TableColumn>إجمالي السلف</TableColumn>
                <TableColumn>الراتب النهائي</TableColumn>
              </TableHeader>
              <TableBody
                emptyContent={
                  <div className="py-4 text-center text-gray-500">
                    لا توجد نتائج مطابقة
                  </div>
                }
              >
                {filteredData.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.job}</TableCell>
                    <TableCell>{user.dailySalary} جنيه</TableCell>
                    <TableCell>{user.attendanceDays}</TableCell>
                    <TableCell>{user.extraHours}</TableCell>
                    <TableCell>{user.totalAdvance} جنيه</TableCell>
                    <TableCell>{calculateTotalSalary(user)} جنيه</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>
    </div>
  );
}
