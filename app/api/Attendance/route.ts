import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

// API لتسجيل الحضور والانصراف
export async function POST(req: Request) {
  try {
    const {
      employeeId,
      date,
      checkIn,
      checkOut,
      normalHours,
      overtimeHours,
      totalTime,
    } = await req.json();

    if (!employeeId || !date || !checkIn || !checkOut) {
      return NextResponse.json(
        { error: "الرجاء إدخال جميع البيانات" },
        { status: 400 }
      );
    }

    const attendance = await prisma.attendance.create({
      data: {
        employeeId,
        date: new Date(date),
        checkIn: new Date(`${date}T${checkIn}`),
        checkOut: new Date(`${date}T${checkOut}`),
        normalHours,
        overtimeHours,
        totalTime,
      },
    });

    return NextResponse.json(attendance, { status: 201 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء تسجيل الحضور" },
      { status: 500 }
    );
  }
}


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  
  try {
    const employeeId = Number(searchParams.get("employeeId"));
    const start = new Date(searchParams.get("start")!);
    const end = new Date(searchParams.get("end")!);

    if (!employeeId || isNaN(employeeId)) {
      return NextResponse.json({ error: "المعرف غير صحيح" }, { status: 400 });
    }

    const data = await prisma.attendance.findMany({
      where: {
        employeeId,
        date: { gte: start, lte: end },
      },
      include: { employee: true },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "خطأ في جلب البيانات" }, { status: 500 });
  }
}
