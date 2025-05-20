import { Question } from "@/lib/types";
import questionsData from "@/lib/questions.json";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const questions: Question[] = questionsData;
    return NextResponse.json(questions);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Failed to load questions",
      },
      { status: 500 }
    );
  }
};
