// /api/records/route.ts - UPDATED GET METHOD
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

// UPDATED GET METHOD WITH PAGINATION
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const [userData, totalCount] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { id: "asc" },
      }),
      prisma.user.count(),
    ]);

    return NextResponse.json({
      records: userData,
      totalCount,
      hasMore: skip + userData.length < totalCount,
      currentPage: page,
      pageSize: limit,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch records" },
      { status: 500 }
    );
  }
}
