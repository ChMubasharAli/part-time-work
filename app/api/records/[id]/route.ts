import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ← IMPORTANT
    const userId = parseInt(id);

    const body = await request.json();

    const existing = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existing) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...body,
        estimatedStartDate: body.estimatedStartDate
          ? new Date(body.estimatedStartDate)
          : undefined,
        estimatedEndDate: body.estimatedEndDate
          ? new Date(body.estimatedEndDate)
          : undefined,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
