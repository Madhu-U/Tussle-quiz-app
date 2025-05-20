// src/app/api/challenge/[challengeId]/route.ts
import { NextResponse } from "next/server";

// This object reference MUST be the same as the one in the other route file for in-memory to work.
// This is fragile! Better to use a proper store/DB.
// For now, we might need to define it in a separate file and import it in both API routes.
// Let's assume for now `challengeStore` is accessible (e.g., defined in a separate `src/lib/challengeStore.ts`)
// **REFACTOR NEEDED FOR IN-MEMORY ACROSS FILES - See note below**
import { challengeStore } from "@/lib/challengeStore";

interface RouteParams {
  params: {
    challengeId: string;
  };
}

// GET handler for fetching specific challenge details
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { challengeId } = params;

    if (!challengeId) {
      return NextResponse.json(
        { error: "Challenge ID missing" },
        { status: 400 }
      );
    }

    const challengeData = challengeStore[challengeId];

    if (!challengeData) {
      return NextResponse.json(
        { error: "Challenge not found or expired" },
        { status: 404 }
      );
    }

    // Return the stored data needed for the challenge
    return NextResponse.json({
      originalScore: challengeData.originalScore,
      questionIds: challengeData.questionIds,
    });
  } catch (error) {
    console.error(`Failed to fetch challenge ${params?.challengeId}:`, error);
    return NextResponse.json(
      { error: "Failed to load challenge details" },
      { status: 500 }
    );
  }
}
