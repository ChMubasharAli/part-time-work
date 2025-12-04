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

    const visits = await prisma.task9PatientVisit.findMany({
      where: { patientId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      visits,
    });
  } catch (error: any) {
    console.error("Error fetching visit details:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch visit details",
      },
      { status: 500 }
    );
  }
}
