"use client";
import {
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Autocomplete,
  AutocompleteItem,
  DateRangePicker,
  CalendarDate,
} from "@heroui/react";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { Employee, Attendance } from "@prisma/client";
import { FaPrint, FaSearch } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

// تعريف واجهة بيانات التقرير
interface AttendanceReport extends Attendance {
  employee: Employee;
}

export default function AttendanceReport() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [reportData, setReportData] = useState<AttendanceReport[]>([]);
  const [startDate, setStartDate] = useState<CalendarDate | null>(null);
  const [endDate, setEndDate] = useState<CalendarDate | null>(null);
  const totalHours = reportData.reduce((sum, data) => {
    return sum + (data.overtimeHours * 1.5 + data.normalHours);
  }, 0);
  // جلب بيانات الموظفين
  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await fetch("/api/employee");
      const data = await res.json();
      setEmployees(data);
    };
    fetchEmployees();
  }, []);

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
            .total-hours-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px;
            gap: 8px;
            border-top: 1px solid #ddd; /* لون افتراضي */
}

.total-hours-title {
  font-size: 14px;
  font-weight: bold;
}

.total-hours-value {
  display: flex;
  flex-direction: column;
  gap: 8px;
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
    }
            .text-employee {
  display: flex;
  align-items: center;
  gap: 20px; 
  font-size: 0.8rem;
 
  font-weight: bold; 
  flex-wrap: wrap; 
}

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
  
          <h1>تقرير الحضور والانصراف</h1>
          <div class="text-employee">
          <h3>اسم الموظف: ${selectedEmployee?.name}</h3>
          <h4>من تاريخ: ${startDate}</h4>
          <h4>إلى تاريخ: ${endDate}</h4>
          </div>
         
          <table>
            <thead>
              <tr>
              <th>اليوم</th>
              <th>التاريخ</th>
              <th>الحضور</th>
              <th>الانصراف</th>
              <th>الساعات الإضافية</th>
              <th>إجمالى الساعات</th>
              </tr>
            </thead>
            <tbody>
               ${reportData
                 .map(
                   (data) => `
                 <tr>
                   <td>$${format(new Date(data.date), "EEEE")}</td>
                   <td>${format(new Date(data.date), "yyyy-MM-dd")}</td>
                   <td>${format(new Date(data.checkIn), "HH:mm")}</td>
                   <td>${format(new Date(data.checkOut), "HH:mm")}</td>
                   <td>${data.overtimeHours.toFixed(2)}</td>
                   <td>
                     ${(data.overtimeHours * 1.5 + data.normalHours).toFixed(2)}
                   </td>
                 </tr>
               `
                 )
                 .join("")}
  
            </tbody>
          </table>
   <div className="total-hours-container">
 
  <div className="total-hours-value">
   <span className="total-hours-title">إجمالى الساعات :</span>
    <span>${totalHours.toFixed(2)} ساعة</span>
  </div>
</div>
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

  // جلب بيانات التقرير
  const fetchReportData = async () => {
    if (!selectedEmployee || !startDate || !endDate) return;

    const params = new URLSearchParams({
      employeeId: selectedEmployee.id.toString(),
      start: startDate.toString(),
      end: endDate.toString(),
    });

    const res = await fetch(`/api/Attendance?${params}`);
    const data: AttendanceReport[] = await res.json();
    setReportData(data);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <Card className="p-6 bg-white dark:bg-zinc-900 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          تقرير الحضور والانصراف
        </h1>

        <div className="flex flex-col gap-4">
          <label className="font-bold text-gray-700 dark:text-gray-300">
            حدد الموظف والمدة:
          </label>
          <div className="flex flex-wrap items-center gap-4">
            <Autocomplete
              label="اختر الموظف"
              onSelectionChange={(key) =>
                setSelectedEmployee(
                  employees.find((e) => e.id.toString() === key) || null
                )
              }
              className="flex-1"
            >
              {employees.map((employee) => (
                <AutocompleteItem key={employee.id} id={employee.id.toString()}>
                  {employee.name}
                </AutocompleteItem>
              ))}
            </Autocomplete>

            <DateRangePicker
              label="اختر نطاق التاريخ"
              value={
                startDate && endDate ? { start: startDate, end: endDate } : null
              }
              onChange={(range) => {
                setStartDate(range?.start || null);
                setEndDate(range?.end || null);
              }}
              className="flex-1"
            />

            <Button
              onClick={fetchReportData}
              variant="solid"
              color="primary"
              isDisabled={!selectedEmployee || !startDate || !endDate}
              startContent={<FaSearch />}
            >
              إظهار التقرير
            </Button>

            <Button
              variant="bordered"
              onClick={handlePrint}
              isDisabled={!selectedEmployee || !startDate || !endDate}
              startContent={<FaPrint />}
            >
              طباعة
            </Button>
          </div>
        </div>

        {reportData.length > 0 ? (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Table aria-label="تقرير الحضور" className="mt-6">
                <TableHeader>
                  <TableColumn>اليوم</TableColumn>
                  <TableColumn>التاريخ</TableColumn>
                  <TableColumn>الحضور</TableColumn>
                  <TableColumn>الانصراف</TableColumn>
                  <TableColumn>الساعات الإضافية</TableColumn>
                  <TableColumn>إجمالى الساعات</TableColumn>
                </TableHeader>
                <TableBody loadingContent="جارى التحميل">
                  {reportData.map((data) => (
                    <TableRow key={data.id}>
                      <TableCell>
                        {format(new Date(data.date), "EEEE")}
                      </TableCell>
                      <TableCell>
                        {format(new Date(data.date), "yyyy-MM-dd")}
                      </TableCell>
                      <TableCell>
                        {format(new Date(data.checkIn), "HH:mm")}
                      </TableCell>
                      <TableCell>
                        {format(new Date(data.checkOut), "HH:mm")}
                      </TableCell>
                      <TableCell>{data.overtimeHours.toFixed(2)}</TableCell>
                      <TableCell>
                        {(data.overtimeHours * 1.5 + data.normalHours).toFixed(
                          2
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex items-center justify-between mt-6 p-4 border-t dark:border-t-zinc-700">
                <h2 className="text-sm font-bold text-gray-700 dark:text-gray-300">
                  اجمالى الساعات
                </h2>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {totalHours.toFixed(2)} ساعة
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="flex items-center justify-center mt-6">
            <p className="text-gray-600 dark:text-gray-400">
              لا يوجد بيانات لعرضها
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
