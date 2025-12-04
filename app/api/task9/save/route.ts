import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mode, ...data } = body;

    if (mode === "create") {
      // Use transaction for atomic operations
      const result = await prisma.$transaction(async (tx) => {
        // 1. Create Personal Information
        const personal = await tx.task9PatientPersonal.create({
          data: {
            fullName: data.fullName || "",
            gender: data.gender || "",
            dateOfBirth: new Date(data.dateOfBirth),
            age: data.age || 0,
            cnic: data.cnic || "",
            maritalStatus: data.maritalStatus || "",
            bloodGroup: data.bloodGroup || "",
          },
        });

        // 2. Create Contact Information
        await tx.task9PatientContact.create({
          data: {
            patientId: personal.id,
            phoneNumber: data.phoneNumber || "",
            emergencyContact: data.emergencyContact || "",
            email: data.email || "",
            address: data.address || "",
            city: data.city || "",
          },
        });

        // 3. Create Medical History
        await tx.task9PatientMedical.create({
          data: {
            patientId: personal.id,
            chronicDiseases: Array.isArray(data.chronicDiseases)
              ? data.chronicDiseases
              : [],
            pastSurgeries: Array.isArray(data.pastSurgeries)
              ? data.pastSurgeries
              : [],
            currentConditions: Array.isArray(data.currentConditions)
              ? data.currentConditions
              : [],
          },
        });

        // 4. Create Visit Information
        await tx.task9PatientVisit.create({
          data: {
            patientId: personal.id,
            visitType: data.visitType || "",
            reason: data.reason || "",
            assignedDoctor: data.assignedDoctor || "",
          },
        });

        return personal;
      });

      return NextResponse.json({
        success: true,
        message: "Patient record created successfully!",
        patientId: result.id,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid mode",
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("Database error:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        {
          success: false,
          error: "Patient with this CNIC already exists",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to save patient record",
      },
      { status: 500 }
    );
  }
}
