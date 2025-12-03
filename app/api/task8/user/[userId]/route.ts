import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await context.params;
    const id = parseInt(userId);

    console.log(`Fetching Task8 user with ID: ${id}`);

    const [userBasic, userEndDate, userAdditional] = await Promise.all([
      prisma.task8UserBasic.findFirst({
        where: { id },
      }),
      prisma.task8UserEndDate.findFirst({
        where: { userId: id },
      }),
      prisma.task8UserAdditional.findFirst({
        where: { userId: id },
      }),
    ]);

    if (!userBasic) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Combine data from all 3 tables
    const combinedData = {
      id: userBasic.id,
      firstName: userBasic.firstName,
      lastName: userBasic.lastName,
      email: userBasic.email,
      status: userBasic.status,
      maritalStatus: userBasic.maritalStatus,
      gender: userBasic.gender,
      estimatedStartDate: userBasic.estimatedStartDate.toISOString(),

      // EndDate data
      country: userEndDate?.country || "",
      address: userEndDate?.address || "",
      city: userEndDate?.city || "",
      estimatedEndDate: userEndDate?.estimatedEndDate?.toISOString() || "",

      // Additional data
      notifications: userAdditional?.notifications || "",
      preferences: userAdditional?.preferences || [],
      department: userAdditional?.department || "",
      bio: userAdditional?.bio || "",
      experienceYears: userAdditional?.experienceYears?.toString() || "0",
      isActive: userAdditional?.isActive || false,
      salaryRange: userAdditional?.salaryRange?.toString() || "0",
      favoriteColor: userAdditional?.favoriteColor || "",
    };

    return NextResponse.json({
      success: true,
      userData: combinedData,
    });
  } catch (error: any) {
    console.error("Error fetching Task8 user:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch user data",
      },
      { status: 500 }
    );
  }
}
