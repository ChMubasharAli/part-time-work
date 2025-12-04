import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const resolvedParams = await params;
    const patientId = parseInt(resolvedParams.id);

    if (isNaN(patientId)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid patient ID",
        },
        { status: 400 }
      );
    }

    const contact = await prisma.task9PatientContact.findUnique({
      where: { patientId },
    });

    return NextResponse.json({
      success: true,
      contact,
    });
  } catch (error: any) {
    console.error("Error fetching contact details:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch contact details",
      },
      { status: 500 }
    );
  }
}
