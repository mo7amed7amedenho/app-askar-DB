"use client";
import {
  Alert,
  Button,
  Card,
  CardFooter,
  Checkbox,
  CheckboxGroup,
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
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { MENU_ITEMS } from "@/components/blocks";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  permissions: string[];
}

export default function Page() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [role, setRole] = useState<string>("user");
  const [error, setError] = useState<string>("");
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  const [showAlertWarning, setShowAlertWarning] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [userToDeleteId, setUserToDeleteId] = useState<number | null>(null);

  const handlePermissionChange = (menuItem: string) => {
    setPermissions((prev) =>
      prev.includes(menuItem)
        ? prev.filter((item) => item !== menuItem)
        : [...prev, menuItem]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError("يجب ملء جميع الحقول");
      setShowErrorAlert(true);
      return;
    }
    if (password !== confirmPassword) {
      setError("كلمة المرور غير متطابقة");
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 5000);
      return;
    }

    if (error) setError(""); // إزالة الخطأ في حالة نجاح التحقق
    submitData();
  };

  const submitData = async () => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role, permissions }),
      });

      if (response.ok) {
        const newUser = await response.json();
        setUsers((prevUsers) => [...prevUsers, newUser]);
        setShowSuccessAlert(true);
        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 5000);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        setShowErrorAlert(true);
        setError("حدث خطأ في عملية التسجيل");
        setTimeout(() => {
          setShowErrorAlert(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Error:", error);
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 5000);
    }
  };

  const handleDeleteBefore = (id: number) => {
    setUserToDeleteId(id);
    setShowAlertWarning(true);
  };
  const handleDelete = async () => {
    if (!userToDeleteId) return; // إذا لم يتم تحديد مستخدم، لا تفعل شيء

    try {
      const response = await fetch(`/api/register/${userToDeleteId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== userToDeleteId)
        );
        setShowSuccessAlert(true);
        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 5000);
      } else {
        setError("حدث خطأ أثناء حذف المستخدم");
        setShowErrorAlert(true);
        setTimeout(() => {
          setShowErrorAlert(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Error:", error);
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 5000);
    }

    setShowAlertWarning(false); // إخفاء رسالة التحذير بعد الحذف
    setUserToDeleteId(null); // إعادة تعيين الحالة
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/register");
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <main>
      <Card className="w-full p-6 border-b dark:border-b-zinc-700">
        <h1 className="text-2xl text-center font-bold mb-6">
          إضافة مستخدم جديد
        </h1>
        <form autoComplete="on" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="اسم الموظف"
              isRequired
              placeholder="اسم الموظف"
              className="w-full"
              variant="underlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              isRequired
              label="البريد الالكتروني"
              type="email"
              placeholder="Hamedenho@askar.com"
              errorMessage="برجاء كتابة بريد الكتروني صحيح"
              className="w-full"
              variant="underlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center gap-4">
            <Input
              isRequired
              label="كلمة المرور"
              minLength={6}
              type="password"
              placeholder="كلمة المرور"
              errorMessage="كلمة المرور غير صحيحة"
              className="w-full"
              variant="underlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              isRequired
              label="تأكيد كلمة المرور"
              placeholder="تأكيد كلمة المرور"
              errorMessage={
                password !== confirmPassword ? "كلمة المرور غير متطابقة" : ""
              }
              type="password"
              className="w-full"
              variant="underlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Select
              isRequired
              label="نوع المستخدم"
              placeholder="نوع المستخدم"
              className="w-full"
              variant="underlined"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <SelectItem key={"مدير"}>مدير</SelectItem>
              <SelectItem key={"محاسب"}>محاسب</SelectItem>
            </Select>
          </div>

          <div className="grid grid-cols-3 gap-4 my-5">
            <label className="col-span-3">البنود المسموحة:</label>
            {MENU_ITEMS.map((item) => (
              <div key={item.title} className="flex items-center">
                <CheckboxGroup>
                  <Checkbox
                    checked={permissions.includes(item.title)}
                    onChange={() => handlePermissionChange(item.title)}
                    value={item.title}
                  >
                    {item.title}
                  </Checkbox>
                </CheckboxGroup>
              </div>
            ))}
          </div>
          <CardFooter className="flex justify-end">
            <Button type="submit" color="default">
              <FaPlus />
              إضافة
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card className="w-full p-6 border-b dark:border-b-zinc-700 mt-4">
        <Table>
          <TableHeader>
            <TableColumn>اسم الموظف</TableColumn>
            <TableColumn>البريد الالكتروني</TableColumn>
            <TableColumn>نوع المستخدم</TableColumn>
            <TableColumn>الإجراءات</TableColumn>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className="flex gap-x-2">
                  <Button
                    variant="light"
                    isIconOnly
                    color="danger"
                    onClick={() => handleDeleteBefore(user.id)}
                  >
                    <FaTrash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <AnimatePresence>
        {showSuccessAlert && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 left-4"
          >
            <div className="mt-4">
              <Alert color="success" title="تم حفظ التعديلات" />
            </div>
          </motion.div>
        )}
        {showErrorAlert && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 left-4"
          >
            <div className="mt-4">
              <Alert color="danger" title={error} />
            </div>
          </motion.div>
        )}
        {showAlertWarning && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 left-4"
          >
            <div className="flex items-center justify-center w-full">
              <Alert
                color="warning"
                description="هل انت متأكد من حذف هذا المستخدم؟"
                variant="solid"
                className="w-full flex"
                title="تحذير"
              >
                <div className="flex gap-2 mt-2">
                  <Button
                    color="danger"
                    size="sm"
                    variant="solid"
                    onClick={handleDelete}
                  >
                    حذف
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    variant="light"
                    onClick={() => setShowAlertWarning(false)}
                  >
                    الغاء
                  </Button>
                </div>
              </Alert>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
