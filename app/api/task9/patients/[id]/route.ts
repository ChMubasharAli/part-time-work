import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid patient ID",
        },
        { status: 400 }
      );
    }

    // Get ONLY personal info - NO relations
    const patient = await prisma.task9PatientPersonal.findUnique({
      where: { id },
    });

    if (!patient) {
      return NextResponse.json(
        {
          success: false,
          error: "Patient not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      patient,
    });
  } catch (error: any) {
    console.error("Error fetching patient details:", error);
    return NextResponse.json(
      { 
        success: false,
        error: error.message || "Failed to fetch patient details" 
      },
      { status: 500 }
    );
  }
}