import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, jobTitle, nationalId, phoneNumber, dailySalary } =
      await req.json();

    const employee = await prisma.employee.create({
      data: {
        name,
        jobTitle,
        nationalId,
        phoneNumber,
        dailySalary,
      },
    });

    return NextResponse.json(employee, { status: 201 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "حدث خطأ أثناء الحفظ" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const employees = await prisma.employee.findMany();
    return NextResponse.json(employees, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء جلب البيانات" },
      { status: 500 }
    );
  }
}
