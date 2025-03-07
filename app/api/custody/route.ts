import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("Received Data:", data); // التحقق من البيانات المستلمة

    // تحقق من القيم المطلوبة
    if (!data.name || !data.code || typeof data.quantity !== "number") {
      return NextResponse.json(
        { error: "تأكد من إدخال جميع الحقول المطلوبة" },
        { status: 400 }
      );
    }

    const custody = await prisma.custody.create({ data });
    return NextResponse.json(custody, { status: 201 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "حدث خطأ في الحفظ" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const custody = await prisma.custody.findMany();
    return NextResponse.json(custody, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "حدث خطأ في جلب البيانات" },
      { status: 500 }
    );
  }
}
