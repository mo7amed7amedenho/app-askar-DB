import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // تأكد من وجود ملف prisma.ts في `lib`

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const permissions = await prisma.permission.findMany({
      where: { userId: Number(userId) },
      select: { menuItem: true },
    });

    const allowedMenu = permissions.map((p) => p.menuItem);

    return NextResponse.json({ allowedMenu });
  } catch (error) {
    console.error("Error fetching permissions:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
