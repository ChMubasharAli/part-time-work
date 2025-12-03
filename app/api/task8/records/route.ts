import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Get basic users with pagination
    const [userBasics, totalCount] = await Promise.all([
      prisma.task8UserBasic.findMany({
        skip,
        take: limit,
        orderBy: { id: 'asc' },
      }),
      prisma.task8UserBasic.count()
    ]);

    // Get all related data
    const userIds = userBasics.map(user => user.id);
    
    const [userEndDates, userAdditionals] = await Promise.all([
      prisma.task8UserEndDate.findMany({
        where: { userId: { in: userIds } },
      }),
      prisma.task8UserAdditional.findMany({
        where: { userId: { in: userIds } },
      }),
    ]);

    // Create maps for quick lookup
    const endDateMap = new Map(userEndDates.map(item => [item.userId, item]));
    const additionalMap = new Map(userAdditionals.map(item => [item.userId, item]));

    // Combine data from all 3 tables
    const combinedRecords = userBasics.map(user => {
      const endDate = endDateMap.get(user.id);
      const additional = additionalMap.get(user.id);

      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        status: user.status,
        maritalStatus: user.maritalStatus,
        gender: user.gender,
        estimatedStartDate: user.estimatedStartDate.toISOString(),
        
        // EndDate data
        country: endDate?.country || "",
        address: endDate?.address || "",
        city: endDate?.city || "",
        estimatedEndDate: endDate?.estimatedEndDate?.toISOString() || "",
        
        // Additional data
        subscriptionType: additional?.subscriptionType || "basic",
        communicationPref: additional?.communicationPref || "email",
        salaryRange: additional?.salaryRange?.toString() || "50000",
        profilePicture: additional?.profilePicture || null,
        supportingDocuments: additional?.supportingDocs || [],
        namedFiles: additional?.namedFiles ? JSON.parse(additional.namedFiles) : [],
      };
    });

    return NextResponse.json({
      success: true,
      records: combinedRecords,
      totalCount,
      hasMore: skip + userBasics.length < totalCount,
      currentPage: page,
      pageSize: limit
    });
  } catch (error: any) {
    console.error("Error fetching Task8 records:", error);
    return NextResponse.json(
      { 
        success: false,
        error: error.message || "Failed to fetch records" 
      },
      { status: 500 }
    );
  }
}