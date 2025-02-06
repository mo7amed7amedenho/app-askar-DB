import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { name, email, password, role, permissions } = await req.json();

  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
        password,
        role,
        permissions: {
          deleteMany: {}, // حذف الأذونات القديمة
          create: permissions?.map((permission: string) => ({
            menuItem: permission,
          })), // إضافة الأذونات الجديدة
        },
      },
    });

    return NextResponse.json(
      { message: "تم تعديل المستخدم بنجاح" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "حدث خطأ أثناء تعديل المستخدم" },
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
