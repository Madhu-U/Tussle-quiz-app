// src/app/api/challenge/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ChallengeModel from "@/lib/models/Challenge.model";
import { Types } from "mongoose"; // Ensure Types is imported

export async function POST(request: Request) {
  try {
    const body: { originalScore: number; questionIds: string[] } =
      await request.json();
    const { originalScore, questionIds } = body;

    // Validate input
    if (
      typeof originalScore !== "number" ||
      !Array.isArray(questionIds) ||
      questionIds.length === 0
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid challenge data: score must be a number and questionIds must be a non-empty array.",
        },
        { status: 400 }
      );
    }

    await dbConnect(); // Connect to the database

    const validQuestionObjectIds: Types.ObjectId[] = [];
    for (const id of questionIds) {
      if (typeof id !== "string" || !Types.ObjectId.isValid(id)) {
        console.error(`Invalid question ID format received: ${id}`);
        return NextResponse.json(
          { error: `Invalid question ID format: ${id}` },
          { status: 400 }
        );
      }
      validQuestionObjectIds.push(new Types.ObjectId(id));
    }

    const newChallenge = await ChallengeModel.create({
      originalScore,
      questionIds: validQuestionObjectIds,
    });

    return NextResponse.json({ challengeId: newChallenge._id.toString() });
  } catch (error) {
    console.error("Failed to create challenge:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { error: "Failed to create challenge", details: errorMessage },
      { status: 500 }
    );
  }
}
