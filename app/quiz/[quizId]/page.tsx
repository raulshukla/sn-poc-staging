"use client";

import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  Circle,
  EllipsisVertical,
  Lightbulb,
  SendIcon,
  X,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ChatInput, { AIMessage, ChatProps, UserMessage } from "@/components/chat/chat";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

let quizScores = [
  {
    quizId: 1,
    isAnswered: true,
    isCorrect: true,
  },
  {
    quizId: 2,
    isAnswered: true,
    isCorrect: false,
  },
  {
    quizId: 3,
    isAnswered: true,
    isCorrect: true,
  },
  {
    quizId: 4,
    isAnswered: true,
    isCorrect: false,
  },
  {
    quizId: 5,
    isAnswered: true,
    isCorrect: true,
  },
  {
    quizId: 6,
    isAnswered: false,
    isCorrect: false,
  },
  {
    quizId: 7,
    isAnswered: false,
    isCorrect: false,
  },
  {
    quizId: 8,
    isAnswered: false,
    isCorrect: false,
  },
  {
    quizId: 9,
    isAnswered: false,
    isCorrect: false,
  },
  {
    quizId: 10,
    isAnswered: false,
    isCorrect: false,
  },
  {
    quizId: 11,
    isAnswered: false,
    isCorrect: false,
  },
  {
    quizId: 12,
    isAnswered: false,
    isCorrect: false,
  },
  {
    quizId: 13,
    isAnswered: false,
    isCorrect: false,
  },
  {
    quizId: 14,
    isAnswered: false,
    isCorrect: false,
  },
  {
    quizId: 15,
    isAnswered: false,
    isCorrect: false,
  },
];

export default function Page({ params }: { params: Promise<{ quizId: string }> }) {
  const searchParams = useSearchParams();

  // Get the status from api - Update later
  const [currentIndex, setCurrentIndex] = useState(5);

  const [messages, setMessages] = useState<ChatProps[]>([]);

  const { quizId } = use(params);

  const type = searchParams.get("type");

  useEffect(() => {
    console.log(quizId);
    console.log(type);
  }, []);

  return currentIndex == 0 ? (
    <div className={`w-full h-full max-h-full flex flex-col justify-between`}>
      <div className="flex-grow h-full bg-white">
        <div className="flex flex-col h-full justify-center items-center py-3 gap-12">
          <div className="flex flex-col gap-2 text-center">
            <h4 className="text-[18px] font-bold">Progress Quiz</h4>
            <h1 className="text-[40px] font-bold text-primary">
              Intro to Law and Ethics
            </h1>
          </div>
          <img
            src="/assets/images/quiz_1.png"
            alt=""
            className="w-[640px] h-[360px] object-cover rounded-[24px]"
          />
          <Button className="h-[56px] text-[14px] font-[500] rounded-[8px] px-6 w-[200px]">
            Start Quiz
            <ArrowRight />
          </Button>
        </div>
      </div>
      <div className="bg-white bottom-0 w-full flex flex-row justify-between gap-4 p-6 items-end border-t">
        <div className="w-full">
          <Label className="text-[12px] px-3">
            Ask a question or provide a prompt...
          </Label>
          <Input
            className="rounded-[24px] h-[59px] text-[14px] px-5"
            placeholder="Type here..."
          />
        </div>
        <Button className="h-[59px] rounded-[12px] px-6 w-[126px] text-[14px]">
          Submit <SendIcon />
        </Button>
      </div>
    </div>
  ) : (
    <div className="h-full w-full overflow-hidden">
      <div
        className={cn(
          `h-full max-h-full flex justify-between`,
          messages.length > 0 ? "flex-row" : "flex-col"
        )}
      >
        <div className={cn("flex-grow", messages.length > 0 ? "h-full" : "h-0")}>
          <div className="flex flex-col h-full bg-white justify-start">
            <div
              className={cn(
                "flex-grow overflow-hidden",
                messages.length > 0 ? "h-0" : "h-full"
              )}
            >
              <PerfectScrollbar
                options={{ suppressScrollX: true }}
                style={{ paddingRight: 0 }}
              >
                <div className="flex flex-col gap-8 p-6">
                  <div className="flex flex-row gap-4 justify-between">
                    <Button
                      variant="secondary"
                      className="h-9 rounded-[8px] px-3 text-[12px] font-[500]"
                    >
                      <ChevronLeft />
                      Back to Class
                    </Button>
                    <h1 className="text-[20px] font-bold">
                      Progress Quiz - Intro to Law and Ethics
                    </h1>
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
                    <div className="flex flex-col py-1 justify-between">
                      <div className="flex flex-row gap-6 items-center">
                        <div className="text-[12px] font-[500] flex flex-row justify-center items-center">
                          <Select>
                            <SelectTrigger
                              className={cn(
                                "px-2 outline-none border-none shadow-none focus:ring-0 text-[12px] font-[500 ] w-[120px]"
                              )}
                            >
                              <SelectValue placeholder="Questions" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                            </SelectContent>
                          </Select>{" "}
                          <p>Attempt: 3/40</p>
                        </div>
                        <div className="flex flex-row gap-1 text-[12px] font-[500]">
                          <Check className="bg-[#2ECC71] text-white rounded-full w-4 h-4 border-[#2ECC71] border-2" />
                          Correct: 2
                        </div>
                        <div className="flex flex-row gap-1 text-[12px] font-[500]">
                          <X className="bg-[#E74C3C] text-white rounded-full w-4 h-4 border-[#E74C3C] border-2" />
                          Incorrect: 1
                        </div>
                      </div>
                      <div className="flex flex-row gap-0.5 justify-between items-center relative">
                        <div className="absolute w-full bg-[#F5F5F5] h-[6px] rounded-full overflow-hidden">
                          <div
                            className={cn("bg-primary rounded-full h-[6px]")}
                            style={{ width: `${Math.round((currentIndex / 15) * 100)}%` }}
                          ></div>
                        </div>
                        {quizScores.map((quiz) =>
                          quiz.quizId == currentIndex ? (
                            <div
                              key={quiz.quizId}
                              className="bg-[#FFE5E5] z-10 w-[30px] h-[30px] rounded-full p-1.5 text-center border-[0.47px] border-primary text-primary text-[12px] font-[500]"
                            >
                              {quiz.quizId}
                            </div>
                          ) : quiz.isAnswered ? (
                            quiz.isCorrect ? (
                              <Check
                                key={quiz.quizId}
                                className="bg-[#2ECC71] z-10 text-white rounded-full w-5 h-5 border-[#2ECC71] border-2"
                              />
                            ) : (
                              <X
                                key={quiz.quizId}
                                className="bg-[#E74C3C] z-10 text-white rounded-full w-5 h-5 border-[#E74C3C] border-2"
                              />
                            )
                          ) : (
                            <div
                              key={quiz.quizId}
                              className="bg-[#F5F5F5] z-10 w-5 h-5 rounded-full flex justify-center items-center text-center border-[0.47px] border-[#DDDDDD] text-[#B1B1B1] text-[9.8px] font-[500]"
                            >
                              <p>{quiz.quizId}</p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div className="flex flex-row gap-2">
                      <Button
                        variant="secondary"
                        className="bg-white border h-14 rounded-[12px] w-[200px] text-[14px] font-[500]"
                      >
                        <ArrowLeft />
                        Back to Class
                      </Button>
                      <Button className="h-14 rounded-[12px] w-[200px] text-[14px] font-[500]">
                        Next
                        <ArrowRight />
                      </Button>
                    </div>
                  </div>
                  <div className="shadow-xl rounded-[8px] relative overflow-hidden flex flex-col p-6 gap-6 justify-between">
                    <div className="bg-primary h-1 rounded-[2px] absolute top-0 left-0 w-full"></div>
                    <div className="flex flex-col gap-2 justify-between">
                      <h4 className="text-primary font-bold text-[18px]">
                        The Environmental Protection Agency (EPA) has established rules
                        limiting emissions of pollutants like carbon dioxide, sulfur
                        dioxide, and nitrogen oxides from power plants. The EPA's power to
                        make these rules was delegated by ______________, and
                        ______________ governs how these rules are made and challenged.
                      </h4>
                      <p className="text-[14px] font-[500]">
                        Tap/click, or type A-E in the field below.
                      </p>
                    </div>
                    <img
                      src="/assets/images/quiz_question_1.png"
                      alt=""
                      className="border-[#DDDDDD] border-1 rounded-[16px] max-w-3xl self-center"
                    />
                    <div className="flex flex-col justify-between gap-2">
                      <div className="cursor-pointer transition-all border-black hover:border-primary border-[1px] hover:bg-primary hover:text-white flex flex-row justify-between px-5 py-4 rounded-[12px]">
                        <p>a.) The President; the restatement of the law.</p>
                        <Circle />
                      </div>
                    </div>
                  </div>
                  <div className="shadow-xl rounded-[8px] relative overflow-hidden flex flex-col p-6 gap-6 justify-between">
                    <div className="bg-primary h-1 rounded-[2px] absolute top-0 left-0 w-full"></div>
                  </div>
                </div>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
        <ChatInput messages={messages} setMessages={setMessages} />
      </div>
    </div>
  );
}
