import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// تحديث بيانات الموظف
export async function PUT(req: NextRequest) {
  try {
    const urlParts = req.url.split("/");
    const id = Number(urlParts[urlParts.length - 1]); // استخراج ID الموظف

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "معرف الموظف غير صالح" },
        { status: 400 }
      );
    }

    const { name, jobTitle, nationalId, phoneNumber, dailySalary } =
      await req.json();

    const employee = await prisma.employee.update({
      where: { id },
      data: { name, jobTitle, nationalId, phoneNumber, dailySalary },
    });

    return NextResponse.json(employee, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "حدث خطأ أثناء التحديث" }, { status: 500 });
  }
}

// حذف موظف معين
export async function DELETE(req: NextRequest) {
  try {
    const urlParts = req.url.split("/");
    const id = Number(urlParts[urlParts.length - 1]); // استخراج ID الموظف

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "معرف الموظف غير صالح" },
        { status: 400 }
      );
    }

    await prisma.employee.delete({ where: { id } });

    return NextResponse.json(
      { message: "تم حذف الموظف بنجاح" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء الحذف" },
      { status: 500 }
    );
  }
}
