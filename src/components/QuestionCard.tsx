import { Question } from "@/lib/types";
import React from "react";

interface QuestionCardProps {
  question: Question;
  onAnswerSelect: (selectedAnswer: string) => void; //callback when an answer is selected
  questionNumber: number;
  totalQuestions: number;
}
const QuestionCard = ({
  question,
  onAnswerSelect,
  questionNumber,
  totalQuestions,
}: QuestionCardProps) => {
  return (
    <div className='gradient-primary p-4 rounded-lg flex flex-col gap-3 max-w-[700px]'>
      <p className='text-sm sm:text-base font-semibold font-body border-b-1 border-b-foreground pb-3 '>
        Question {questionNumber} of {totalQuestions}
      </p>
      <h2 className='text-xl sm:text-2xl font-medium sm:font-semibold my-3'>
        {question.text}
      </h2>
      <div className='grid grid-cols-1 gap-3'>
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(option)}
            className='px-4 py-2 font-medium border-2 border-foreground rounded-lg hover:bg-foreground  hover:text-background-dark transition-colors duration-200 ease-in-out cursor-pointer'
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
