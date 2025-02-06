import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Permissions {
  [key: string]: boolean;
}
// POST handler لإنشاء مستخدم جديد
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, role, permissions } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "بريد الكتروني وكلمة المرور مطلوبة" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "البريد الكتروني مستخدم بالفعل" },
        { status: 400 }
      );
    }

   
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role,
      },
    });

    // 2. إدراج الصلاحيات للمستخدم الجديد بعد إنشائه
    if (permissions && Array.isArray(permissions) && permissions.length > 0) {
      await prisma.permission.createMany({
        data: permissions.map((permission: string) => ({
          userId: newUser.id,
          menuItem: permission,
        })),
      });
    }

    return NextResponse.json(
      { message: "تم تسجيل المستخدم بنجاح" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "حدث خطأ ما" }, { status: 500 });
  }
}

// GET handler لجلب المستخدمين
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "حدث خطأ ما" }, { status: 500 });
  }
}
