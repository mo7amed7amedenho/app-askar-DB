import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const id = Number(req.nextUrl.pathname.split("/").pop());

    if (isNaN(id)) {
      return NextResponse.json({ error: "معرف العهدة غير صالح" }, { status: 400 });
    }

    const { name, code, quantity, status, projectId } = await req.json();

    const custody = await prisma.custody.update({
      where: { id },
      data: { name, code, quantity, status, projectId },
    });

    return NextResponse.json(custody, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "حدث خطأ في التحديث" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = Number(req.nextUrl.pathname.split("/").pop());

    if (isNaN(id)) {
      return NextResponse.json({ error: "معرف العهدة غير صالح" }, { status: 400 });
    }

    await prisma.custody.delete({ where: { id } });

    return NextResponse.json({ message: "تم حذف العهدة بنجاح" }, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "حدث خطأ في الحذف" }, { status: 500 });
  }
}
