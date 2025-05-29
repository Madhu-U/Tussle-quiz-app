import React from "react";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
const AnswersDisplay = ({
  question,
  selectedAnswer,
  correctAnswer,
}: {
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
}) => {
  return (
    <div className='bg-foreground text-background-dark p-2 rounded-lg '>
      <p className='font-heading font-medium border-b-2 border-b-primary pb-1 mb-1'>
        {question}
      </p>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-sm font-heading font-semibold mb-2'>Your Answer</p>
          <div className='flex gap-3 items-center'>
            <p className=' text-sm text-center bg-primary text-foreground font-medium w-[7rem]'>
              {selectedAnswer}
            </p>
            <span>
              {selectedAnswer === correctAnswer ? (
                <FaCheck className='text-green-600' />
              ) : (
                <ImCross className='text-red-600' />
              )}
            </span>
          </div>
        </div>
        <div>
          <p className='text-sm font-heading font-semibold mb-2'>
            Correct Answer
          </p>
          <p className='text-sm text-center font-medium bg-green-300 w-[7rem]'>
            {correctAnswer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnswersDisplay;
