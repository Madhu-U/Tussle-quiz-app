import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ChallengeModel from "../../../../models/Challenge.model";

// interface RouteContext {
//   params: {
//     challengeId: string;
//   };
// }

// GET handler for fetching specific challenge details
export async function GET(
  request: Request,
  { params }: { params: Promise<{ challengeId: string }> }
) {
  try {
    const { challengeId } = await params;

    if (!challengeId) {
      return NextResponse.json(
        { error: "Challenge ID missing" },
        { status: 400 }
      );
    }

    await dbConnect();

    const challengeData = await ChallengeModel.findById(challengeId).exec();

    if (!challengeData) {
      return NextResponse.json(
        { error: "Challenge not found or expired" },
        { status: 404 }
      );
    }

    const questionIds = challengeData.questionIds.map((id) => id.toString());

    return NextResponse.json({
      originalScore: challengeData.originalScore,
      questionIds: questionIds,
    });
  } catch (error) {
    console.error(`Failed to fetch challenge :`, error);
    return NextResponse.json(
      { error: "Failed to load challenge details" },
      { status: 500 }
    );
  }
}
