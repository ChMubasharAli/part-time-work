import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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

    // Find all empty fields
    const emptyFields = requiredFields.filter(
      (field) => !body[field] || body[field].trim() === ""
    );

    if (emptyFields.length > 0) {
      return NextResponse.json(
        {
          error: "Please fill in all required fields",
          emptyFields: emptyFields,
          message: `Missing fields: ${emptyFields.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Prepare data for database
    const userData: any = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      status: body.status,
      maritalStatus: body.maritalStatus,
      gender: body.gender,
      estimatedStartDate: new Date(body.estimatedStartDate),
      country: body.country,
      city: body.city,
      address: body.address,
      estimatedEndDate: new Date(body.estimatedEndDate),

      // ONLY THESE 3 client metadata fields
      clientTimestamp: body.clientTimestamp
        ? new Date(body.clientTimestamp)
        : null,
      timezoneOffset: body.timezoneOffset || null,
      browserTimezone: body.browserTimezone || null,
    };

    // Create record
    const newRecord = await prisma.user.create({
      data: userData,
    });

    return NextResponse.json(
      {
        message: "User record created successfully!",
        record: newRecord,
        metadata: {
          clientTime: body.clientTimestamp,
          serverTime: new Date().toISOString(),
          timezoneOffset: body.timezoneOffset,
        },
      },
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
