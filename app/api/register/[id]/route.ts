import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function PUT(
  req: Request,
  {params}: {params: {id: string}}
) {
  const { id } = params;
  const { name, email, password, role, permissions } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "بريد الكتروني وكلمة المرور مطلوبة" },
      { status: 400 }
    );
  }

  try {
    // 🔹 تحديث بيانات المستخدم في قاعدة البيانات
    const userUpdate = await prisma.user.update({
      where: { id: parseInt(id, 10) }, // تأكد أن id رقم صحيح
      data: { name, email, password, role },
    });

    // ✅ إرجاع استجابة نجاح
    return NextResponse.json(
      { message: "تم تحديث المستخدم بنجاح", user: userUpdate },
      { status: 200 }
    );

  } catch (error) {
    console.error("خطأ أثناء تحديث المستخدم:", error); // 🔴 طباعة الخطأ في السيرفر لرؤية التفاصيل

    return NextResponse.json(
      { error: "حدث خطأ أثناء تحديث المستخدم" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const user = await prisma.user.delete({
      where: { id: parseInt(id) }, // حذف المستخدم باستخدام الـ id
    });

    return NextResponse.json(
      { message: "تم حذف المستخدم بنجاح" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "حدث خطأ أثناء حذف المستخدم" },
      { status: 500 }
    );
  }
}
