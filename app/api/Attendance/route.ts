import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const attendances = await prisma.attendance.findMany();
    return NextResponse.json(attendances, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "حدث خطاء" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { employeeId, date, checkIn, checkOut } = await req.json();
    const attendance = await prisma.attendance.create({
      data: {
        employeeId,
        date,
        checkIn,
        checkOut,
      },
    });
    return NextResponse.json(attendance, { status: 201 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "حدث خطاء" }, { status: 500 });
  }
}
