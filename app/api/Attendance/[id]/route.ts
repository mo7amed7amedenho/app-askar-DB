import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const employeeId = Number(params.id);

    if (!employeeId || isNaN(employeeId)) {
      return NextResponse.json({ error: "المعرف غير صحيح" }, { status: 400 });
    }

    const attendanceRecords = await prisma.attendance.findMany({
      where: { employeeId },
      include: { employee: true },
    });

    return NextResponse.json(attendanceRecords);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "خطأ في جلب البيانات" }, { status: 500 });
  }
}
