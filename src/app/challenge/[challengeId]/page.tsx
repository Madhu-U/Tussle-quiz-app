"use client";
import React from "react";
import QuestionCard from "@/components/QuestionCard";
import { Question, ChallengeDetails } from "@/lib/types";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

interface ChallengePageProps {
  params: {
    challengeId: string;
  };
}

const ChallengePage = ({ params }: ChallengePageProps) => {
  // const resolvedParams = React.use(params);
  const { challengeId } = params;

  const [challengeDetails, setChallengeDetails] =
    useState<ChallengeDetails | null>(null);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);

  // State for the challenger's quiz attempt
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [questionId: string]: string;
  }>({});
  const [challengerScore, setChallengerScore] = useState(0);
  const [quizStatus, setQuizStatus] = useState<
    | "loading"
    | "fetching_details"
    | "fetching_questions"
    | "ready"
    | "active"
    | "completed"
    | "error"
  >("fetching_details");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadChallenge = async () => {
      if (!challengeId) {
        setError("Invalid Challenge link.");
        setQuizStatus("error");
        return;
      }

      setQuizStatus("fetching_details");
      try {
        const detailsRes = await fetch(`/api/challenge/${challengeId}`);
        if (!detailsRes.ok)
          throw new Error(
            "Challenge not found or error loading details " + detailsRes.status
          );
        const details: ChallengeDetails = await detailsRes.json();
        setChallengeDetails(details);

        //Fetch all questions to filter from
        setQuizStatus("fetching_questions");
        const questionsRes = await fetch("/api/questions");
        if (!questionsRes.ok) throw new Error("Failed to fetch questions");

        const allQuestionsData: Question[] = await questionsRes.json();
        setAllQuestions(allQuestionsData);

        //Filter and set the specific questions for this challenge
        const challengeQuestionIds = details.questionIds;
        const questionsForQuiz = allQuestionsData.filter((q) =>
          challengeQuestionIds.includes(q.id)
        );

        if (questionsForQuiz.length !== challengeQuestionIds.length) {
          console.warn(
            "Mismatch between requested question IDs and available questions"
          );
        }

        if (questionsForQuiz.length > 0) {
          setQuizQuestions(questionsForQuiz);
          setQuizStatus("active");
        } else {
          throw new Error("No questions found for this challenge");
        }
      } catch (err: any) {
        console.error("Error loading challenge details", err);
        setError(err.message || "Failed to load challenge");
        setQuizStatus("error");
      }
    };

    loadChallenge();
  }, [challengeId]);

  const handleChallengerAnswer = (selectedAnswer: string) => {
    if (quizStatus !== "active") return;
    const currentQuestion = quizQuestions[currentQuestionIndex]; // Use quizQuestions
    const isCorrect = selectedAnswer === currentQuestion.answer;

    if (isCorrect) {
      setChallengerScore((prev) => prev + 1);
    }
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: selectedAnswer,
    }));

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < quizQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setQuizStatus("completed"); // Challenger finished
    }
  };

  return (
    <div className='flex flex-col gap-7 items-center min-h-[80vh] justify-center font-medium p-10 rounded-lg bg-secondary  mx-auto text-foreground'>
      <h1 className='text-4xl font-semibold md-4'>Friend Challenge!</h1>
      {quizStatus === "loading" ||
        quizStatus === "fetching_details" ||
        (quizStatus === "fetching_questions" && <Loader></Loader>)}
      {error && <p>{error}</p>}

      {/* Active quize for Challenger */}
      {quizStatus === "active" && quizQuestions.length > 0 && (
        <QuestionCard
          question={quizQuestions[currentQuestionIndex]}
          onAnswerSelect={handleChallengerAnswer}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={quizQuestions.length}
        ></QuestionCard>
      )}

      {/* Results Comparison */}
      {quizStatus === "completed" && challengeDetails && (
        <div className='bg-primary p-4 rounded-lg flex flex-col gap-3 w-full max-w-[500px]'>
          <h2 className='text-2xl font-heading border-b-2 border-b-foreground pb-2'>
            Challenge Results
          </h2>
          <p className='font-medium'>
            Original Player Score: {challengeDetails.originalScore}/
            {quizQuestions.length}
          </p>
          <p className='font-medium'>
            Your Score : {challengerScore}/{quizQuestions.length}
          </p>
          <hr />
          {challengerScore > challengeDetails.originalScore && (
            <p className='text-center text-2xl font-heading '>
              You won the challenge!
            </p>
          )}
          {challengerScore < challengeDetails.originalScore && (
            <p className='text-center text-2xl font-heading'>
              Your friend won this time!
            </p>
          )}
          {challengerScore === challengeDetails.originalScore && (
            <p className='text-center text-2xl font-heading'>
              It&apos;s a tie!
            </p>
          )}

          <button
            onClick={() => (window.location.href = "/")}
            className='btn-inverse'
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default ChallengePage;
