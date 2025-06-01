"use client";

import QuestionCard from "@/components/QuestionCard";
import ResultsDisplay from "@/components/ResultsDisplay";
import { Question, QuizState } from "@/lib/types";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";

const QuizPageContent = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number | string]: {
      question: string;
      selectedAnswer: string;
      correctAnswer: string;
    };
  }>({});
  const [score, setScore] = useState(0);
  const [quizStatus, setQuizStatus] =
    useState<QuizState["quizStatus"]>("loading");
  const [error, setError] = useState<string | null>(null);
  console.log(error);

  //State for challenge link generation
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [challengeLink, setChallengeLink] = useState<string | null>(null);

  //State to store the actual questions used in the quiz
  const [actualQuestions, setActualQuestions] = useState<Question[]>([]);

  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchQuestions = async () => {
      setQuizStatus("loading");
      setError(null);
      try {
        const response = await fetch("/api/questions");
        if (!response.ok) throw new Error("Failed to fetch questions");

        const allQuestions: Question[] = await response.json();

        const categoriesParam = searchParams.get("categories");
        const selectedCategories = categoriesParam
          ? categoriesParam.split(",")
          : [];

        const questionsCount = parseInt(searchParams.get("count") || "10");
        console.log("questionsCount", questionsCount);

        let filteredQuestions = allQuestions;

        if (selectedCategories.length > 0) {
          filteredQuestions = allQuestions.filter(
            (question) =>
              question.category &&
              selectedCategories.includes(question.category)
          );
        } else {
          console.warn("No categories selected, showing all questions");
        }

        const questionsChosen: Question[] = [];

        const categoryMap: { [key: string]: Question[] } = {};
        filteredQuestions.forEach((question) => {
          if (question.category) {
            if (categoryMap[question.category]) {
              categoryMap[question.category].push(question);
            } else {
              categoryMap[question.category] = [question];
            }
          }
        });

        for (let i = 0; i < questionsCount; i++) {
          const categoryKeys = Object.keys(categoryMap);
          const randomCategory =
            categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
          const randomQuestion =
            categoryMap[randomCategory][
              Math.floor(Math.random() * categoryMap[randomCategory].length)
            ];
          if (
            !questionsChosen.includes(randomQuestion) &&
            questionsChosen.length < questionsCount
          ) {
            questionsChosen.push(randomQuestion);
          }
        }

        // Shuffle the filtered questions
        questionsChosen.sort(() => Math.random() - 0.5);
        if (questionsChosen.length > 0) {
          setActualQuestions(questionsChosen);
          setQuestions(questionsChosen);
          setQuizStatus("active"); //Start the quiz
        } else {
          //When filtering results in no questions
          setActualQuestions([]);
          setQuestions([]);
          setQuizStatus("completed");
          console.error("No questions found for selected categories");
          setError("No questions found for selected categories");
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch questions");
        setQuizStatus("completed");
        setQuestions([]);
      } finally {
        // Reset states that might persist from previous quiz
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        setScore(0);
      }
    };

    fetchQuestions();
  }, [searchParams]);

  const handleAnswerSelect = (selectedAnswer: string) => {
    if (quizStatus !== "active") return; // Don't process if quiz is not active

    const currentquestion = actualQuestions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentquestion.answer;

    //update the score if correct
    if (isCorrect) setScore((prevScore) => prevScore + 1);

    // Record the selected Answer
    setSelectedAnswers((prevAnswers) => {
      return {
        ...prevAnswers,
        [currentquestion.id]: {
          question: currentquestion.text,
          correctAnswer: currentquestion.answer,
          selectedAnswer,
        },
      };
    });

    // Move to the next question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizStatus("completed"); //End of quiz
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setScore(0);
    setChallengeLink(null);
    setIsGeneratingLink(false);
    setQuizStatus("active");
  };

  const handleChallenge = async () => {
    if (!actualQuestions || actualQuestions.length === 0) return;
    setIsGeneratingLink(true);
    setChallengeLink(null); //Clear previous link

    //Prepare data
    const questionIds = actualQuestions.map((q) => q.id);
    const payload = {
      originalScore: score,
      questionIds,
    };

    try {
      const response = await fetch("/api/challenge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to create challenge link");

      const data = await response.json();
      const challengeId = data.challengeId;

      if (challengeId) {
        //Constructing the full URL
        const link = `${window.location.origin}/challenge/${challengeId}`;
        setChallengeLink(link);
      } else {
        throw new Error("Challenge ID not received");
      }
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Error creating challenge link: Please try again.");
      }
    } finally {
      setIsGeneratingLink(false);
    }
  };

  return (
    <div className='flex flex-col gap-7 items-center min-h-[80vh] justify-center p-10 rounded-lg bg-secondary  mx-auto text-foreground'>
      {quizStatus === "loading" && <Loader></Loader>}

      {quizStatus === "active" && actualQuestions.length > 0 && (
        <QuestionCard
          question={actualQuestions[currentQuestionIndex]}
          onAnswerSelect={handleAnswerSelect}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={actualQuestions.length}
        />
      )}

      {quizStatus === "completed" && (
        <ResultsDisplay
          selectedAnswers={selectedAnswers}
          score={score}
          totalQuestions={actualQuestions.length}
          onRestart={handleRestart}
          onChallenge={handleChallenge}
          isGeneratingLink={isGeneratingLink}
          challengeLink={challengeLink}
        />
      )}
    </div>
  );
};

export default function QuizPage() {
  return <Suspense fallback={<Loader />}>{<QuizPageContent />}</Suspense>;
}
