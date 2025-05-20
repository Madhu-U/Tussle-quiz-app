// Interface for questions
export interface Question {
  id: number | string;
  text: string;
  options: string[];
  answer: string;
  category?: string;
}

// Interface for the quiz state
export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  selectedAnswers: { [questionId: string]: string };
  score: number;
  quizStatus: "loading" | "active" | "completed";
}
