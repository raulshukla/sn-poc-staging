"use client";
import { use, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, Circle, CircleX } from "lucide-react";
import { api } from "@/lib/api";
import ChatInput from "@/components/chat/chat";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { QuizType, SolvedQuiz } from "@/types/quiz";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

type ResponseData = {
  id: string;
  courseId: string;
  title: string;
  summary: string;
  description: string;
};

export default function Page({ params }: { params: Promise<{ courseId: string }> }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const [isLock, setIsLock] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { courseId } = use(params);
  const [courseInfo, setCourseInfo] = useState<ResponseData>({
    id: "",
    courseId: "",
    title: "",
    summary: "",
    description: "",
  });
  const [answeredQuiz, setAnsweredQuiz] = useState<SolvedQuiz[]>([]);
  const [quizData, setQuizData] = useState<QuizType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSelectAnswer = (index: number) => {
    if (isLock) return;
    setIsLock(true);
    let newData: SolvedQuiz = {
      quizId: currentIndex,
      correctAnswer: quizData[currentIndex].correctAnswer,
      selectedAnswer: index,
      reason: "",
      isAnswered: true,
      attempts: 1,
    };
    setAnsweredQuiz([...answeredQuiz, newData]);

    setTimeout(() => {
      if (currentIndex == 2) {
        router.push(`/quiz/${courseId}`);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }, 2000);
  };

  const getCourseInfo = useCallback(async () => {
    try {
      const { data: response } = await api.post<ResponseData>("/course/", {
        courseId: courseId,
        chapterId: 1
      });
      setCourseInfo(response);
      const { data: responseQuiz } = await api.post<QuizType[]>("/course/quiz", {
        courseId: courseId,
      });
      setQuizData(responseQuiz);
    } catch (ex) {
      console.log(ex);
    }
  }, [courseId]);

  useEffect(() => {
    getCourseInfo();
  }, []);

  useEffect(() => {
    setIsLock(false);
  }, [currentIndex]);

  return (
    <div className="h-full w-full overflow-hidden">
      <div
        className={cn(
          `h-full max-h-full flex justify-between`,
          isOpen ? "flex-row" : "flex-col"
        )}
      >
        <div className={cn("flex-grow", isOpen ? "h-full" : "h-0")}>
          <div className="flex flex-col h-full bg-white justify-start">
            {type == "video" ? (
              <div className="flex p-6 justify-center items-center">
                <div className="flex flex-col p-6 justify-center gap-6 bg-white rounded-[8px]">
                  <h1 className="text-[20px] font-bold">Video Lectures</h1>
                  <div className="flex flex-row gap-6">
                    <div className="flex flex-col gap-6 justify-between max-w-3xl">
                      <img
                        src="/assets/images/video_1.png"
                        alt=""
                        className="w-full object-cover rounded-[24px]"
                      />
                      <div className="flex flex-col gap-1">
                        <p className="text-[12px] font-[500]">Chapter # 1 | 30 minutes</p>
                        <h1 className="text-[20px] text-primary font-bold">
                          Introduction to Cell Structure & Function
                        </h1>
                        <p className="text-[16px] font-[400] leading-5">
                          This video you will learn that the how cells are the basic
                          building blocks of life. All living organisms are composed of
                          one or more cells, which carry out vital functions necessary for
                          survival.
                        </p>
                      </div>
                      <div className="flex flex-row gap-2">
                        <Button
                          variant="secondary"
                          className="h-[44px] text-[12px] rounded-[8px] px-6 mr-2 w-[140px]"
                        >
                          <ArrowLeft />
                          Previous Lecture
                        </Button>
                        <Button className="h-[44px] text-[12px] rounded-[8px] px-6 w-[140px]">
                          Next Lecture
                          <ArrowRight />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col border rounded-[20px] w-[400px] p-4 gap-2">
                      <p className="text-[12px] font-[500]">More videos like this</p>
                      <div className="flex flex-row gap-3">
                        <img
                          src="/assets/images/like_video_1.png"
                          alt=""
                          className="w-[180px] h-[110px] object-cover rounded-[16px]"
                        />
                        <div className="flex flex-col gap-0.5 justify-center">
                          <p className="text-[12px] font-[500]">
                            Chapter # 1 | 30 minutes
                          </p>
                          <h4 className="text-[14px] text-primary font-bold">
                            Introduction to Cell Structure & Function
                          </h4>
                          <p className="text-[12px] font-[400] line-clamp-2">
                            This video you will learn that the how cells are the basic
                            building blocks of life. All living organisms are composed of
                            one or more cells, which carry out vital functions necessary
                            for survival.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={cn("flex-grow overflow-hidden", isOpen ? "h-0" : "h-full")}>
                <PerfectScrollbar>
                  <div className="flex flex-col p-6 justify-start gap-8">
                    <div className="h-96 relative rounded-[24px] overflow-hidden">
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full object-cover rounded-[24px] -translate-y-80"
                      >
                        <source src="/assets/media/course_banner.mp4" type="video/mp4" />
                      </video>
                    </div>
                    <h1 className="text-primary text-[32px] font-bold">
                      {courseInfo.title}
                    </h1>
                    <div className="flex flex-col gap-4 justify-between">
                      <div className="relative flex bg-white rounded-[8px] overflow-hidden w-full shadow-xl">
                        <div className="absolute top-0 left-0 h-1 w-full rounded-[2px] bg-primary"></div>
                        <div className="p-6">
                          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                            {courseInfo.description}
                          </ReactMarkdown>
                        </div>
                      </div>
                      {quizData.length > 0 && (
                        <>
                          <div className="h-1 w-full rounded-[2px] bg-primary"></div>
                          <div className="relative flex bg-white rounded-[8px] overflow-hidden w-full shadow-xl">
                            <div className="absolute top-0 left-0 h-1 w-full rounded-[2px] bg-primary"></div>
                            <AnimatePresence mode="wait">
                              <motion.div
                                className="w-full"
                                key={currentIndex}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                              >
                                <div className="p-6 w-full">
                                  <div className="flex flex-col gap-2 justify-between mb-4">
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
                                  <div className="flex flex-col justify-between gap-2 w-full">
                                    {quizData[currentIndex].answers.map(
                                      (answer: string, index: number) => (
                                        <div
                                          key={index}
                                          className={cn(
                                            "cursor-pointer transition-all border-black hover:border-primary border-[1px] hover:bg-primary hover:text-white flex flex-row justify-between px-5 py-4 rounded-[12px]",
                                            currentIndex < answeredQuiz.length &&
                                              answeredQuiz[currentIndex].isAnswered &&
                                              answeredQuiz[currentIndex].correctAnswer ==
                                                index &&
                                              "border-[#2ECC71] text-[#2ECC71]",
                                            currentIndex < answeredQuiz.length &&
                                              answeredQuiz[currentIndex].selectedAnswer ==
                                                index &&
                                              "bg-primary border-primary text-secondary",
                                            currentIndex < answeredQuiz.length &&
                                              answeredQuiz[currentIndex].isAnswered &&
                                              answeredQuiz[currentIndex].selectedAnswer ==
                                                index
                                              ? answeredQuiz[currentIndex]
                                                  .correctAnswer == index
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
                                            answeredQuiz[currentIndex].correctAnswer ==
                                            index ? (
                                              <Check />
                                            ) : answeredQuiz[currentIndex]
                                                .selectedAnswer == index ? (
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
                              </motion.div>
                            </AnimatePresence>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </PerfectScrollbar>
              </div>
            )}
          </div>
        </div>
        <ChatInput isOpen={isOpen} SetIsOpen={setIsOpen} />
      </div>
    </div>
  );
}
