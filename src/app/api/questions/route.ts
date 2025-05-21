import { Question } from "@/lib/types";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import QuestionModel, { IQuestion } from "@/lib/models/Question.model";

export const GET = async () => {
  try {
    await dbConnect();

    const questions: IQuestion[] = await QuestionModel.find({});

    const formattedQuestions: Question[] = questions.map((question) => ({
      id: question._id.toString(),
      text: question.text,
      options: question.options,
      answer: question.answer,
      category: question.category,
    }));

    return NextResponse.json(formattedQuestions);
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
