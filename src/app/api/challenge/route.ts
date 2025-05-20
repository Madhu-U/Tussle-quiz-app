import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { challengeStore } from "@/lib/challengeStore";

export async function POST(request: Request) {
  try {
    const { originalScore, questionIds } = await request.json();

    if (
      typeof originalScore !== "number" ||
      !Array.isArray(questionIds) ||
      questionIds.length === 0
    ) {
      return NextResponse.json(
        { error: "Invalid challenge data" },
        { status: 400 }
      );
    }

    const challengeId = nanoid(10); //Generate a unique challenge ID
    const createdAt = Date.now();

    //store the challenge data
    challengeStore[challengeId] = {
      originalScore,
      questionIds,
      createdAt,
    };

    return NextResponse.json({ challengeId });
  } catch (error) {
    console.error("Failed to create challenge", error);
    return NextResponse.json(
      { error: "Failed to create challenge" },
      { status: 500 }
    );
  }
}
