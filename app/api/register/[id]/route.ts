import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { name, email, currentPassword, newPassword, role } = await req.json();

  // تحقق من وجود الحقول الأساسية
  if (!name || !email || !currentPassword) {
    return NextResponse.json(
      { error: "البريد الالكتروني وكلمة المرور الحالية مطلوبة" },
      { status: 400 }
    );
  }

  // هنا يجب استرجاع المستخدم من قاعدة البيانات للتحقق من كلمة المرور الحالية
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id, 10) },
  });
  if (!user) {
    return NextResponse.json({ error: "المستخدم غير موجود" }, { status: 404 });
  }

  // (اختياري) التحقق من صحة كلمة المرور الحالية مثلاً باستخدام bcrypt
  // if (!bcrypt.compareSync(currentPassword, user.password)) {
  //   return NextResponse.json({ error: "كلمة المرور الحالية غير صحيحة" }, { status: 400 });
  // }

  // إذا لم يُدخل المستخدم كلمة مرور جديدة، استخدم كلمة المرور الحالية
  const updatedPassword = newPassword ? newPassword : user.password;

  try {
    // تحديث بيانات المستخدم
    const userUpdate = await prisma.user.update({
      where: { id: parseInt(id, 10) },
      data: { name, email, password: updatedPassword, role },
    });

    return NextResponse.json(
      { message: "تم تحديث المستخدم بنجاح", user: userUpdate },
      { status: 200 }
    );
  } catch (error) {
    console.error("خطأ أثناء تحديث المستخدم:", error);
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
