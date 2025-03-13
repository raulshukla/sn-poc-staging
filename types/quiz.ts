export type SolvedQuiz = {
  quizId: number;
  correctAnswer: number;
  selectedAnswer: number;
  isAnswered: boolean;
  reason: string;
  attempts: number;
};

export type QuizType = {
  question: string;
  answers: string[];
  correctAnswer: number;
};

export type ResponseData = {
  title: string;
  questions: QuizType[];
};

export type ScoreType = {
  corrects: number;
  incorrects: number;
};

export type ReasonRequest = {
  reason: string;
};
