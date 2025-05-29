import React from "react";
import AnswersDisplay from "./AnswersDisplay";

interface ResultsDisplayProps {
  selectedAnswers: {
    [key: number | string]: {
      question: string;
      selectedAnswer: string;
      correctAnswer: string;
    };
  };
  score: number;
  totalQuestions: number;
  onRestart: () => void; // callback to restart the quiz
  onChallenge: () => void;
  isGeneratingLink: boolean;
  challengeLink: string | null;
}
const ResultsDisplay = ({
  selectedAnswers,
  score,
  totalQuestions,
  onRestart,
  onChallenge,
  isGeneratingLink,
  challengeLink,
}: ResultsDisplayProps) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  //Function to copy the challenge link to the clipboard
  const handleCopyLink = () => {
    if (challengeLink) {
      navigator.clipboard
        .writeText(challengeLink)
        .then(() => {
          alert("Link copied to clipboard");
        })
        .catch(() => {
          console.error("Failed to copy link to clipboard");
        });
    }
  };

  return (
    <div className='flex sm:flex-row flex-col gap-5'>
      <div className='max-w-[700px] w-full'>
        <h2 className='font-heading text-2xl text-foreground '>Your Answers</h2>
        <hr className=' text-primary my-3' />
        <div className='flex flex-col gap-3 overflow-x-scroll h-[500px] '>
          {Object.values(selectedAnswers).map((answer, index) => (
            <AnswersDisplay
              key={index}
              question={answer.question}
              selectedAnswer={answer.selectedAnswer}
              correctAnswer={answer.correctAnswer}
            />
          ))}
        </div>
      </div>
      <div className='gradient-primary p-4 rounded-lg flex flex-col gap-3 w-full max-w-[500px] h-full self-center'>
        <h2 className='text-2xl font-heading border-b-2 border-b-foreground pb-2'>
          Quiz Results!
        </h2>
        <p className='font-medium'>
          You scored{" "}
          <span className='text-2xl text-foreground font-heading'>{score}</span>{" "}
          out of{" "}
          <span className='text-2xl text-foreground font-heading'>
            {totalQuestions}
          </span>{" "}
          <span className='text-2xl text-foreground font-heading'>
            ({percentage}%)
          </span>
        </p>
        <button onClick={onRestart} className='btn-inverse'>
          Play Again?
        </button>
        {!challengeLink ? (
          <button
            onClick={onChallenge}
            disabled={isGeneratingLink}
            className='btn'
          >
            {isGeneratingLink ? "Generating link..." : "Challenge a friend!"}
          </button>
        ) : (
          <div className='flex flex-col gap-2 my-4 border-t-2 border-t-foreground pt-4'>
            <p>Want to challenge a friend?</p>
            <p className='font-semibold'>Share this link:</p>
            <div className='flex gap-3 justify-between'>
              <input
                type='text'
                readOnly
                name='challengeLink'
                value={challengeLink}
                className='text-sm w-[60%] bg-primary px-2 py-1 rounded-lg border-2 border-foreground'
                id=''
              />
              <button onClick={handleCopyLink} className='btn-inverse'>
                Copy Link
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsDisplay;
