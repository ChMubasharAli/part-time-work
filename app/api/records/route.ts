import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newRecord = await prisma.user.create({
      data: {
        firstName: body.firstName || null,
        lastName: body.lastName || null,
        email: body.email || null,
        status: body.status || null,
        maritalStatus: body.maritalStatus || null,
        gender: body.gender || null,
        estimatedStartDate:
          body.estimatedStartDate && !isNaN(Date.parse(body.estimatedStartDate))
            ? new Date(body.estimatedStartDate)
            : null,

        country: body.country || null,
        city: body.city || null,
        address: body.address || null,
        estimatedEndDate:
          body.estimatedEndDate && !isNaN(Date.parse(body.estimatedEndDate))
            ? new Date(body.estimatedEndDate)
            : null,
      },
    });

    return NextResponse.json(
      { message: "User record created successfully!", record: newRecord },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create user record" },
      { status: 500 }
    );
  }
}
