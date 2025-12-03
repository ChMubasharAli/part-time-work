import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mode, userId, ...data } = body;

    if (mode === "create") {
      // 1. Create UserBasic
      const userBasic = await prisma.task8UserBasic.create({
        data: {
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          status: data.status || "",
          maritalStatus: data.maritalStatus || "",
          gender: data.gender || "",
          estimatedStartDate: new Date(data.estimatedStartDate),
        },
      });

      // 2. Create UserEndDate
      await prisma.task8UserEndDate.create({
        data: {
          userId: userBasic.id,
          country: data.country || "",
          address: data.address || "",
          city: data.city || "",
          estimatedEndDate: new Date(data.estimatedEndDate),
        },
      });

      // 3. Create UserAdditional
      await prisma.task8UserAdditional.create({
        data: {
          userId: userBasic.id,
          subscriptionType: data.subscriptionType || "basic",
          communicationPref: data.communicationPref || "email",
          salaryRange: parseInt(data.salaryRange) || 50000,
          profilePicture: data.profilePicture || null,
          supportingDocs: Array.isArray(data.supportingDocuments)
            ? data.supportingDocuments
            : [],
          namedFiles: data.namedFiles ? JSON.stringify(data.namedFiles) : null,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Record created successfully!",
        userId: userBasic.id,
      });
    } else if (mode === "edit" && userId) {
      // 1. Update UserBasic
      await prisma.task8UserBasic.update({
        where: { id: userId },
        data: {
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          status: data.status || "",
          maritalStatus: data.maritalStatus || "",
          gender: data.gender || "",
          estimatedStartDate: new Date(data.estimatedStartDate),
        },
      });

      // 2. Update or Create UserEndDate
      const existingEndDate = await prisma.task8UserEndDate.findFirst({
        where: { userId: userId },
      });

      if (existingEndDate) {
        await prisma.task8UserEndDate.update({
          where: { id: existingEndDate.id },
          data: {
            country: data.country || "",
            address: data.address || "",
            city: data.city || "",
            estimatedEndDate: new Date(data.estimatedEndDate),
          },
        });
      } else {
        await prisma.task8UserEndDate.create({
          data: {
            userId: userId,
            country: data.country || "",
            address: data.address || "",
            city: data.city || "",
            estimatedEndDate: new Date(data.estimatedEndDate),
          },
        });
      }

      // 3. Update or Create UserAdditional
      const existingAdditional = await prisma.task8UserAdditional.findFirst({
        where: { userId: userId },
      });

      if (existingAdditional) {
        await prisma.task8UserAdditional.update({
          where: { id: existingAdditional.id },
          data: {
            subscriptionType: data.subscriptionType || "basic",
            communicationPref: data.communicationPref || "email",
            salaryRange: parseInt(data.salaryRange) || 50000,
            profilePicture: data.profilePicture || null,
            supportingDocs: Array.isArray(data.supportingDocuments)
              ? data.supportingDocuments
              : [],
            namedFiles: data.namedFiles
              ? JSON.stringify(data.namedFiles)
              : null,
          },
        });
      } else {
        await prisma.task8UserAdditional.create({
          data: {
            userId: userId,
            subscriptionType: data.subscriptionType || "basic",
            communicationPref: data.communicationPref || "email",
            salaryRange: parseInt(data.salaryRange) || 50000,
            profilePicture: data.profilePicture || null,
            supportingDocs: Array.isArray(data.supportingDocuments)
              ? data.supportingDocuments
              : [],
            namedFiles: data.namedFiles
              ? JSON.stringify(data.namedFiles)
              : null,
          },
        });
      }

      return NextResponse.json({
        success: true,
        message: "Record updated successfully!",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid mode or missing userId for edit mode",
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("Database error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to save record",
      },
      { status: 500 }
    );
  }
}
