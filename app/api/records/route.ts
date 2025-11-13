import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "status",
      "maritalStatus",
      "gender",
      "estimatedStartDate",
      "country",
      "city",
      "address",
      "estimatedEndDate",
    ];

    const missingField = requiredFields.find((f) => !body[f]);
    if (missingField) {
      return NextResponse.json(
        { error: `Missing required field: ${missingField}` },
        { status: 400 }
      );
    }

    const newRecord = await prisma.user.create({
      data: {
        firstName: body.firstName || "",
        lastName: body.lastName || "",
        email: body.email || "",
        status: body.status || "",
        maritalStatus: body.maritalStatus || "",
        gender: body.gender,
        estimatedStartDate: new Date(body.estimatedStartDate) || undefined,
        // Task-2 new fields (optional)
        country: body.country || "",
        address: body.address || "",
        city: body.city || "",
        estimatedEndDate: new Date(body.estimatedEndDate),
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

// get all the records from the database

export async function GET() {
  try {
    const userData = await prisma.user.findMany();
    return NextResponse.json(
      { message: "User record created successfully!", userData },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create user record" },
      { status: 500 }
    );
  }
}
