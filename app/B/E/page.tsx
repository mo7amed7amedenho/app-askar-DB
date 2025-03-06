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
  Autocomplete,
  AutocompleteItem,
} from "@heroui/react";
import { useState, useMemo, useEffect } from "react";
import { FaPrint, FaSearch } from "react-icons/fa";
import { Employee, Attendance } from "@prisma/client"; // تأكد من استيراد النماذج الصحيحة
import  toDate  from '@internationalized/date';

// تعريف واجهات TypeScript
interface AttendanceReport extends Attendance {
  employee: Employee;
}

interface ReportData {
  id: number;
  name: string;
  jobTitle: string;
  dailySalary: number;
  totalAttendance: number;
  totalNormalHours: number;
  totalOvertime: number;
  totalSalary: number;
}

export default function AttendanceReport() {
  const [filterValue, setFilterValue] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedRange, setSelectedRange] = useState<{ 
    start: Date | null, 
    end: Date | null 
  }>({ start: null, end: null });
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [reportData, setReportData] = useState<ReportData[]>([]);

  // جلب بيانات الموظفين عند تحميل المكون
  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await fetch('/api/employees');
      const data = await res.json();
      setEmployees(data);
    };
    fetchEmployees();
  }, []);

  // جلب بيانات التقرير عند تحديد الموظف والمدة
  const fetchReportData = async () => {
    if (!selectedEmployee || !selectedRange.start || !selectedRange.end) return;

    const params = new URLSearchParams({
      employeeId: selectedEmployee.id.toString(),
      start: selectedRange.start.toISOString(),
      end: selectedRange.end.toISOString()
    });

    const res = await fetch(`/api/attendance?${params}`);
    const attendanceData: AttendanceReport[] = await res.json();

    // معالجة البيانات
    const processedData: ReportData = {
      id: selectedEmployee.id,
      name: selectedEmployee.name,
      jobTitle: selectedEmployee.jobTitle,
      dailySalary: Number(selectedEmployee.dailySalary),
      totalAttendance: attendanceData.length,
      totalNormalHours: attendanceData.reduce((sum, a) => sum + a.normalHours, 0),
      totalOvertime: attendanceData.reduce((sum, a) => sum + a.overtimeHours, 0),
      totalSalary: attendanceData.reduce((sum, a) => {
        const daily = Number(selectedEmployee.dailySalary);
        return sum + (daily * a.normalHours / 8) + (daily * a.overtimeHours / 8 * 1.5);
      }, 0)
    };

    setReportData([processedData]);
  };

  // حساب الراتب النهائي
  const calculateTotalSalary = (data: ReportData) => {
    return data.totalSalary.toFixed(2);
  };

  // طباعة التقرير
  const handlePrint = () => {
    // ... (نفس كود الطباعة مع تعديل البيانات)
  };

  return (
    <div className="flex flex-col gap-y-4 p-4">
      <Card className="flex flex-col gap-y-4 p-4">
        <h1 className="text-3xl font-bold">تقرير الحضور والانصراف</h1>
        
        <div className="flex flex-col gap-y-2">
          <label className="font-bold">حدد الموظف والمدة:</label>
          <div className="flex items-center gap-x-2">
            <Autocomplete
              label="اختر الموظف"
              onSelectionChange={(key) => 
                setSelectedEmployee(employees.find(e => e.id === Number(key)) || null
              }
            >
              {employees.map((employee) => (
                <AutocompleteItem key={employee.id}>
                  {employee.name}
                </AutocompleteItem>
              ))}
            </Autocomplete>

            <DateRangePicker
  label="اختر المدة"
  value={{
    start: selectedRange.start ? toDate(selectedRange.start) : null,
    end: selectedRange.end ? toDate(selectedRange.end) : null,
  }}
  onChange={(range) => setSelectedRange({
    start: range.start,
    end: range.end,
  })}
/>

            <Button 
              onClick={fetchReportData}
              isDisabled={!selectedEmployee || !selectedRange.start}
            >
              إظهار التقرير
            </Button>
          </div>
        </div>

        {reportData.length > 0 && (
          <>
            <div className="flex items-center justify-between py-2">
              <Input
                placeholder="ابحث..."
                startContent={<FaSearch />}
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              />
              <Button onClick={handlePrint}>
                <FaPrint /> طباعة
              </Button>
            </div>

            <Table aria-label="تقرير الحضور">
              <TableHeader>
                <TableColumn>الاسم</TableColumn>
                <TableColumn>الوظيفة</TableColumn>
                <TableColumn>الأيام</TableColumn>
                <TableColumn>الساعات العادية</TableColumn>
                <TableColumn>الساعات الإضافية</TableColumn>
                <TableColumn>الراتب الإجمالي</TableColumn>
              </TableHeader>
              <TableBody>
                {reportData.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.jobTitle}</TableCell>
                    <TableCell>{data.totalAttendance}</TableCell>
                    <TableCell>{data.totalNormalHours}</TableCell>
                    <TableCell>{data.totalOvertime}</TableCell>
                    <TableCell>{calculateTotalSalary(data)} جنيه</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </Card>
    </div>
  );
}

// const handlePrint = () => {
//   const printWindow = window.open("", "PRINT", "width=800,height=600");
//   if (printWindow) {
//     const content = `
//       <!DOCTYPE html>
//       <html lang="ar" dir="rtl">
//       <head>
//         <title>تقرير الرواتب</title>
//         <style>
//           body {
//             font-family: Cairo, sans-serif;
//             padding: 10px;
//           }
//           table {
//             width: 100%;
//             border-collapse: collapse;
//             margin: 10px 0;
//           }
//           th, td {
//             border: 4px solid #ddd;
//             padding: 3px;
//             text-align: center;
//           }
//           th {
//             background-color: #f4f4f4;
//           }
//             h2 {
//             text-align: right;
//             font-size: 8px;
//             color: #333;
//           }
//           .header {
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             border-bottom: 2px solid #ddd;
//             padding-bottom: 10px;
//             margin: 20px;
//           }
//           .header img {
//             max-width: 100px;
//             display: block;
//           }
//           .header .text {
//             text-align: center;
//             flex: 1;
//           }
//           .header .text h1 {
//             font-size: 12px;
//             margin: 0;
//             font-weight: bold;
//           }
//           .header .text p {
//             font-size: 14px;
//             margin: 0;
//             color: #555;
//           }
//           h1 {
//             text-align: center;
//             font-size: 20px;
//             color: #333;
//           }
//           p {
//             text-align: center;
//             font-size: 10px;
//             color: #333;
//           }
//           .footer {
//             text-align: center;
//             margin-top: 30px;
//             font-size: 12px;
//             color: #888;
//             border-top: 1px solid #ddd;
//             padding-top: 10px;
         
//           @media print {
//             body {
//               padding: 10px;
//             }
//             table th, table td {
//               font-size: 8px;
//               padding: 1px;
//             }
//             h1 {
//               font-size: 18px;
//             }
//             .footer {
//               font-size: 12px;
//             }
//           }
//         </style>
//       </head>
//       <body>
//         <div class="header">
//           <div class="company-name">
//             <h2>Askar Group for <br /> General Contracting<br />عسكر للمقاولات العمومية</h2>
            
//           </div>
//           <div class="logo">
//             <img src="/logo.webp" alt="Logo" />
//           </div>
//         </div>

//         <h1>تقرير العاملين </h1>

//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>الاسم</th>
//               <th>الوظيفة</th>
//               <th>اليومية</th>
//               <th>الحضور</th>
//               <th>س.اضافية</th>
//               <th>إ.السلف</th>
//               <th>الراتب النهائي</th>
//             </tr>
//           </thead>
//           <tbody>
//              ${filteredData
//                .map(
//                  (data) => `
//               <tr>
//                 <td>${data.id}</td>
//                 <td>${data.name}</td>
//                 <td>${data.job}</td>
//                 <td>${data.dailySalary} جنيه</td>
//                 <td>${data.attendanceDays} يوم</td>
//                 <td>${data.extraHours}</td>
//                 <td>${data.totalAdvance} جنيه</td>
//                 <td>${calculateTotalSalary(data)} جنيه</td>
//               </tr>
//             `
//                )
//                .join("")}
           
//           </tbody>
//         </table>

//         <p>تم إنشاء التقرير في ${new Date().toLocaleString("ar-EG")}</p>

//         <div class="footer">
//           <p>بواسطة <strong>Hamedenho</strong>، شركة <strong>عسكر للمقاولات العمومية</strong></p>
//         </div>
//       </body>
//       </html>
//     `;
//     printWindow.document.write(content);
//     printWindow.document.close();
//     printWindow.focus();

//     setTimeout(() => {
//       printWindow.print();
//     }, 1000); // تأخير 1500 ميلي ثانية
//   }
// };