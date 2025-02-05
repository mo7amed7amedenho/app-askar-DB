"use client";
import { Button, Card, Form, Input, Select, SelectItem } from "@heroui/react";
import React, { useState } from "react";
// import prisma from "@/lib/prisma";
export default async function page() {
  const [password, setPassword] = useState("");
  const [, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // const user = await prisma.user.create({
  //   data: {
  //     name: "hamed",
  //     email: "Hamedenho@askar",
  //     password: "123456",
  //     role: "ADMIN",
  //   },
  // });
  const handeleConfirmPassword = (value: string) => {
    setConfirmPassword(value);
    if (value !== password) {
      setError("كلمة المرور غير متطابقة");
    } else {
      setError("");
    }
  };
  // console.log(user);
  return (
    <main className="flex items-center justify-center">
      <Card className="w-full p-6 border-b dark:border-b-zinc-700">
        <h1 className="text-2xl text-center font-bold mb-6">
          إضافة مستخدم جديد
        </h1>
        <Form
          className="grid grid-cols-2 gap-4"
          autoComplete="on"
          validationBehavior="native"
        >
          <Input
            label="اسم الموظف"
            isRequired
            placeholder="اسم الموظف"
            className="w-full"
            variant="underlined"
          />
          <Input
            isRequired
            label="البريد الالكتروني"
            type="email"
            placeholder="Hamedenho@askar.com"
            errorMessage="برجاء كتابة بريد الكتروني صحيح"
            className="w-full"
            variant="underlined"
          />
          <Input
            isRequired
            label="كلمة المرور"
            minLength={6}
            type="password"
            placeholder="كلمة المرور"
            errorMessage="كلمة المرور غير صحيحة"
            className="w-full"
            variant="underlined"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            isRequired
            label="تأكيد كلمة المرور"
            placeholder="تأكيد كلمة المرور"
            type="password"
            onChange={(e) => handeleConfirmPassword(e.target.value)}
            errorMessage={error}
            className="w-full"
            variant="underlined"
          />
          <div className="col-span-2 flex items-center gap-4">
            <Select
              isRequired
              label="نوع المستخدم"
              placeholder="نوع المستخدم"
              className="w-full"
              variant="underlined"
            >
              <SelectItem value="Manager">مدير</SelectItem>
              <SelectItem value="Employee">محاسب</SelectItem>
            </Select>
            <Button className="w-1/4" isDisabled={!error} color="primary">
              تسجيل المستخدم
            </Button>
          </div>
        </Form>
      </Card>
    </main>
  );
}
