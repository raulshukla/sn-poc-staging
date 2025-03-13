"use client";

import { use, useCallback, useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  Circle,
  CircleX,
  EllipsisVertical,
  Lightbulb,
  LoaderCircle,
  X,
} from "lucide-react";
import ChatInput from "@/components/chat/chat";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import { QuizType, ResponseData, ScoreType, SolvedQuiz } from "@/types/quiz";
import ReactMarkDown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { toast } from "sonner";

export default function Page({ params }: { params: Promise<{ quizId: string }> }) {
  const [answeredQuiz, setAnsweredQuiz] = useState<SolvedQuiz[]>([]);
  const [scores, setScores] = useState<ScoreType>({
    corrects: 0,
    incorrects: 0,
  });
  const [quizTitle, setQuizTitle] = useState("");
  const [quizData, setQuizData] = useState<QuizType[]>([]);
  const [isStart, setIsStart] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isOpen, SetIsOpen] = useState(false);

  const { quizId } = use(params);

  const getQuiz = useCallback(async () => {
    try {
      const { data: response } = await api.post<ResponseData>("/quiz/get_quiz_by_id", {
        courseId: quizId,
      });
      setQuizData(response.questions);
      setQuizTitle(response.title);
    } catch (ex) {
      console.log(ex);
    }
  }, [quizId]);

  useEffect(() => {
    getQuiz();
  }, []);

  const handleNext = async () => {
    if (currentIndex == 14) {
      router.push(`/quiz/${quizId}/result`);
    }

    let _answeredQuiz: SolvedQuiz[] = [];
    Object.assign(_answeredQuiz, answeredQuiz);

    if (currentIndex < answeredQuiz.length) {
      try {
        if (_answeredQuiz[currentIndex].isAnswered == false) {
          let reasoningQuiz = quizData[currentIndex];
          toast.success("Submitting...");
          setIsSubmit(true);
          const { data: response } = await api.post<string>("/quiz/get_reason", {
            question: reasoningQuiz.question,
            correctAnswer: reasoningQuiz.answers[reasoningQuiz.correctAnswer],
            selectedAnswer:
              reasoningQuiz.answers[_answeredQuiz[currentIndex].selectedAnswer],
          });
          toast.success("Submitted...");

          setIsSubmit(false);
          _answeredQuiz[currentIndex].reason = response;
          if (
            _answeredQuiz[currentIndex].correctAnswer ===
            _answeredQuiz[currentIndex].selectedAnswer
          ) {
            setScores({
              ...scores,
              corrects: scores.corrects + 1,
            });
          } else {
            setScores({
              ...scores,
              incorrects: scores.incorrects + 1,
            });
          }
          _answeredQuiz[currentIndex].isAnswered = true;
        } else {
          setCurrentIndex(currentIndex + 1);
        }

        setAnsweredQuiz(_answeredQuiz);
      } catch (ex) {
        console.log(ex);
        setIsSubmit(false);
        toast.error("Error on server");

      }
    }
  };

  const handleSelectAnswer = (index: number) => {
    let _answeredQuiz: SolvedQuiz[] = [];
    Object.assign(_answeredQuiz, answeredQuiz);
    if (answeredQuiz.length <= currentIndex) {
      let newData: SolvedQuiz = {
        quizId: currentIndex,
        correctAnswer: quizData[currentIndex].correctAnswer,
        selectedAnswer: index,
        reason: "",
        isAnswered: false,
        attempts: 1,
      };
      setAnsweredQuiz([...answeredQuiz, newData]);
    } else {
      if (_answeredQuiz[currentIndex].isAnswered == false)
        _answeredQuiz[currentIndex] = {
          quizId: currentIndex,
          correctAnswer: quizData[currentIndex].correctAnswer,
          selectedAnswer: index,
          reason: "",
          isAnswered: false,
          attempts: _answeredQuiz[currentIndex].attempts + 1,
        };

      setAnsweredQuiz(_answeredQuiz);
    }
  };

  return !isStart ? (
    <div className={`w-full h-full max-h-full flex flex-col justify-between`}>
      <div className="flex-grow h-full bg-white">
        <div className="flex flex-col h-full justify-center items-center py-3 gap-12">
          <div className="flex flex-col gap-2 text-center">
            <h4 className="text-[18px] font-bold">Progress Quiz</h4>
            <h1 className="text-[40px] font-bold text-primary">{quizTitle}</h1>
          </div>
          <img
            src="/assets/images/quiz_1.png"
            alt=""
            className="w-[640px] h-[360px] object-cover rounded-[24px]"
          />
          <Button
            className="h-[56px] text-[14px] font-[500] rounded-[8px] px-6 w-[200px]"
            onClick={() => setIsStart(quizData.length > 0)}
          >
            Start Quiz
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <div className="h-full w-full overflow-hidden">
      <div
        className={cn(
          `h-full max-h-full flex justify-between`,
          isOpen ? "flex-row" : "flex-col"
        )}
      >
        <div className={cn("flex-grow", isOpen ? "h-full" : "h-0")}>
          <div className="flex flex-col h-full bg-white justify-start">
            <div className={cn("flex-grow overflow-hidden", isOpen ? "h-0" : "h-full")}>
              <PerfectScrollbar
                options={{ suppressScrollX: true }}
                style={{ paddingRight: 0 }}
              >
                <div className="flex flex-col gap-8 p-6">
                  <div className="flex flex-row gap-4 justify-between">
                    <Button
                      variant="secondary"
                      className="h-9 rounded-[8px] px-3 text-[12px] font-[500]"
                      onClick={() => router.push(`/course/${quizId}`)}
                    >
                      <ChevronLeft />
                      Back to Class
                    </Button>
                    <h1 className="text-[20px] font-bold">Progress Quiz - {quizTitle}</h1>
                    <div className="flex flex-row gap-2">
                      <Button
                        variant="secondary"
                        className="bg-white rounded-[8px] w-9 border text-[12px] font-[500]"
                      >
                        <EllipsisVertical />
                      </Button>
                      <Button
                        variant="secondary"
                        className="bg-white rounded-[8px] border text-[12px] font-[500]"
                      >
                        <Lightbulb />
                        Hint
                      </Button>
                      <Button
                        variant="secondary"
                        className="rounded-[8px] border-none bg-[#FFE5E5] text-[12px] font-[500] px-3"
                      >
                        <Check />
                        Check
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-row gap-6 justify-between">
                    <div className="flex flex-col py-1 w-full justify-between">
                      <div className="flex flex-row w-full justify-between gap-6 items-center">
                        <Select>
                          <SelectTrigger
                            className={cn(
                              "px-2 outline-none border-none shadow-none focus:ring-0 text-[12px] font-[500 ] w-[120px]"
                            )}
                          >
                            <SelectValue placeholder="Questions" />
                          </SelectTrigger>
                          <SelectContent>
                            {quizData.map((q: QuizType, index: number) => (
                              <SelectItem value="1" key={index}>
                                Question {index + 1}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>{" "}
                        <div className="flex flex-row gap-6 text-[12px] font-[500]">
                          <p>
                            Attempt:{" "}
                            {currentIndex < answeredQuiz.length
                              ? answeredQuiz[currentIndex].attempts
                              : 0}
                            /40
                          </p>
                          <div className="flex flex-row gap-1">
                            <Check className="bg-[#2ECC71] text-white rounded-full w-4 h-4 border-[#2ECC71] border-2" />
                            Correct: {scores.corrects}
                          </div>
                          <div className="flex flex-row gap-1">
                            <X className="bg-[#E74C3C] text-white rounded-full w-4 h-4 border-[#E74C3C] border-2" />
                            Incorrect: {scores.incorrects}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row gap-0.5 justify-between items-center relative">
                        <div className="absolute w-full bg-[#F5F5F5] h-[6px] rounded-full overflow-hidden">
                          <div
                            className={cn("bg-primary rounded-full h-[6px] w-full")}
                            style={{ width: `${(currentIndex / 14) * 100}%` }}
                          ></div>
                        </div>
                        {quizData.map((quiz: QuizType, index: number) =>
                          index == currentIndex ? (
                            <div
                              key={index}
                              className="bg-[#FFE5E5] z-10 w-[30px] h-[30px] rounded-full p-1.5 text-center border-[0.47px] border-primary text-primary text-[12px] font-[500]"
                            >
                              {index + 1}
                            </div>
                          ) : index < answeredQuiz.length ? (
                            answeredQuiz[index].correctAnswer ==
                            answeredQuiz[index].selectedAnswer ? (
                              <Check
                                key={index}
                                className="bg-[#2ECC71] z-10 text-white rounded-full w-5 h-5 border-[#2ECC71] border-2"
                              />
                            ) : (
                              <X
                                key={index}
                                className="bg-[#E74C3C] z-10 text-white rounded-full w-5 h-5 border-[#E74C3C] border-2"
                              />
                            )
                          ) : (
                            <div
                              key={index}
                              className="bg-[#F5F5F5] z-10 w-5 h-5 rounded-full flex justify-center items-center text-center border-[0.47px] border-[#DDDDDD] text-[#B1B1B1] text-[9.8px] font-[500]"
                            >
                              <p>{index + 1}</p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div className="flex flex-row gap-2">
                      <Button
                        variant="secondary"
                        className="bg-white border h-14 rounded-[12px] w-[200px] text-[14px] font-[500]"
                        onClick={() => setCurrentIndex(currentIndex - 1)}
                        disabled={currentIndex == 0}
                      >
                        <ArrowLeft />
                        Previous
                      </Button>
                      <Button
                        className={cn(
                          "h-14 rounded-[12px] w-[200px] text-[14px] font-[500]"
                        )}
                        onClick={() => handleNext()}
                        disabled={currentIndex > answeredQuiz.length}
                      >
                        {currentIndex < answeredQuiz.length &&
                        answeredQuiz[currentIndex].isAnswered
                          ? "Next"
                          : isSubmit
                          ? "Submitting..."
                          : "Submit"}
                        {isSubmit ? (
                          <LoaderCircle className="animate-spin" />
                        ) : (
                          <ArrowRight />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="shadow-xl rounded-[8px] relative overflow-hidden flex flex-col p-6 gap-6 justify-between">
                    <div className="bg-primary h-1 rounded-[2px] absolute top-0 left-0 w-full"></div>
                    <div className="flex flex-col gap-2 justify-between">
                      <h4 className="text-primary font-bold text-[18px]">
                        {quizData[currentIndex].question}
                      </h4>
                      <p className="text-[14px] font-[500]">
                        Tap/click, or type A-E in the field below.
                      </p>
                    </div>
                    {/* <img
                      src="/assets/images/quiz_question_1.png"
                      alt=""
                      className="border-[#DDDDDD] border-1 rounded-[16px] max-w-3xl self-center"
                    /> */}
                    <div className="flex flex-col justify-between gap-2">
                      {quizData[currentIndex].answers.map(
                        (answer: string, index: number) => (
                          <div
                            key={index}
                            className={cn(
                              "cursor-pointer transition-all border-black hover:border-primary border-[1px] hover:bg-primary hover:text-white flex flex-row justify-between px-5 py-4 rounded-[12px]",
                              currentIndex < answeredQuiz.length &&
                                answeredQuiz[currentIndex].isAnswered &&
                                answeredQuiz[currentIndex].correctAnswer == index &&
                                "border-[#2ECC71] text-[#2ECC71]",
                              currentIndex < answeredQuiz.length &&
                                answeredQuiz[currentIndex].selectedAnswer == index &&
                                "bg-primary border-primary text-secondary",
                              currentIndex < answeredQuiz.length &&
                                answeredQuiz[currentIndex].isAnswered &&
                                answeredQuiz[currentIndex].selectedAnswer == index
                                ? answeredQuiz[currentIndex].correctAnswer == index
                                  ? "bg-[#2ECC71] border-[#2ECC71] text-secondary"
                                  : "bg-primary border-primary text-secondary"
                                : ""
                            )}
                            onClick={() => handleSelectAnswer(index)}
                          >
                            <p>
                              {String.fromCharCode(index + 65)}.) {answer}.
                            </p>
                            {currentIndex < answeredQuiz.length &&
                            answeredQuiz[currentIndex].isAnswered ? (
                              answeredQuiz[currentIndex].correctAnswer == index ? (
                                <Check />
                              ) : answeredQuiz[currentIndex].selectedAnswer == index ? (
                                <CircleX />
                              ) : (
                                <Circle />
                              )
                            ) : (
                              <Circle />
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  {currentIndex < answeredQuiz.length &&
                    answeredQuiz[currentIndex].isAnswered && (
                      <div className="shadow-xl rounded-[8px] relative overflow-hidden flex flex-col p-6 gap-6 justify-between">
                        <div className="bg-primary h-1 rounded-[2px] absolute top-0 left-0 w-full"></div>
                        <ReactMarkDown rehypePlugins={[rehypeRaw]}>
                          {answeredQuiz[currentIndex].reason}
                        </ReactMarkDown>
                      </div>
                    )}
                </div>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
        <ChatInput isOpen={isOpen} SetIsOpen={SetIsOpen} />
      </div>
    </div>
  );
}
