"use client";
import { use, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Circle,
  CircleX,
  LoaderCircle,
} from "lucide-react";
import { api } from "@/lib/api";
import ChatInput from "@/components/chat/chat";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { QuizType, ScoreType } from "@/types/quiz";
// import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
// import { useRouter } from "next/navigation";
import useStore from "@/stores/useStore";
import { CourseInfoType, CourseType } from "@/types/course";

type ResponseData = {
  id: string;
  courseId: string;
  title: string;
  summary: string;
  description: string;
};

export default function Page({ params }: { params: Promise<{ courseId: string }> }) {
  const { course, setCourse } = useStore();
  // const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const [answerIndex, setAnswerIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const { courseId } = use(params);
  const [courseInfo, setCourseInfo] = useState<ResponseData>({
    id: "",
    courseId: "",
    title: "",
    summary: "",
    description: "",
  });
  const [score, setScore] = useState<ScoreType>({
    corrects: 0,
    incorrects: 0,
  });
  const [quizData, setQuizData] = useState<QuizType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentChapter, setCurrentChapter] = useState(-1);
  const [isNext, setIsNext] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSelectAnswer = async (index: number) => {
    setFeedback(null);
    if (index === -1) {
      if (
        currentIndex === 6 ||
        (score.corrects + score.incorrects > 2 &&
          score.corrects / (score.corrects + score.incorrects) > 0.49)
      ) {
        setCurrentIndex(0);
        setCurrentChapter(currentChapter + 1);
        setCourse({
          courseId: course.courseId,
          totalChapters: course.totalChapters,
          currentChapter: course.currentChapter + 1,
        });
      } else {
        setIsNext(true);
      }
      return;
    }
    if (answerIndex !== -1) return;
    setAnswerIndex(index);
    try {
      toast.success("Submitting...");
      const { data: response } = await api.post<string>("/quiz/get_reason", {
        question: quizData[currentIndex].question,
        correctAnswer:
          quizData[currentIndex].answers[quizData[currentIndex].correctAnswer],
        selectedAnswer: quizData[currentIndex].answers[index],
      });
      if (index === quizData[currentIndex].correctAnswer)
        setScore({
          ...score,
          corrects: score.corrects + 1,
        });
      else
        setScore({
          ...score,
          incorrects: score.incorrects + 1,
        });
      setFeedback(response);
      toast.success("Submitted...");
    } catch (e) {
      toast.error("Error on Server!");
      console.log(e);
    }

    // setTimeout(() => {
    //   if (currentIndex == 2) {
    //     router.push(`/quiz/${courseId}`);
    //   } else {
    //     setCurrentIndex(currentIndex + 1);
    //   }
    // }, 2000);
  };

  const handleNextQuiz = () => {
    if (currentIndex == 6) {
      setCurrentIndex(0);
      setCurrentChapter(currentChapter + 1);
      setCourse({
        courseId: course.courseId,
        totalChapters: course.totalChapters,
        currentChapter: course.currentChapter + 1,
      });
      setFeedback(null);
    } else {
      setIsNext(true);
    }
  };

  const getCourseInfo = useCallback(async () => {
    try {
      setIsLoading(true);
      const course = localStorage.getItem("courseInfo");
      let courseInfo: CourseInfoType | null = course ? JSON.parse(course) : null;
      if (!courseInfo) {
        const { data: responseCourse } = await api.post<CourseType[]>("/course/", {
          courseId: courseId,
        });
        courseInfo = {
          courseId: courseId,
          totalChapters: responseCourse.length,
          currentChapter: 1,
        };
        setCourse(courseInfo);
      } else {
        setCourse(courseInfo);
      }
      setCurrentChapter(courseInfo.currentChapter);
    } catch (ex) {
      console.log(ex);
    }
  }, [courseId, setCourse]);

  const getCourseByChapterId = useCallback(
    async (chapterId: number) => {
      if (chapterId === -1) return;
      try {
        setIsLoading(true);
        const { data: response } = await api.post<ResponseData>(`/course/${courseId}`, {
          chapterId: chapterId,
        });
        setCourseInfo(response);
        setIsLoading(false);
        const { data: responseQuiz } = await api.post<QuizType[]>(`/course/quiz`, {
          courseId: courseId,
          chapterId: chapterId,
        });
        setQuizData(responseQuiz);
      } catch (ex) {
        console.log(ex);
        console.log(isLoading);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [courseId]
  );

  useEffect(() => {
    getCourseInfo();
  }, [getCourseInfo]);

  useEffect(() => {
    getCourseByChapterId(currentChapter);
  }, [currentChapter, getCourseByChapterId]);

  useEffect(() => {
    if (isNext) {
      setAnswerIndex(-1);
      setCurrentIndex(currentIndex + 1);
      setFeedback(null);
      setIsNext(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNext]);

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
                {isLoading ? (
                  <div className="w-full h-full flex justify-center items-center">
                    <div className="flex flex-row gap-2 items-center text-primary">
                      <LoaderCircle className=" animate-spin" />
                      &nbsp;Loading...
                    </div>
                  </div>
                ) : (
                  <PerfectScrollbar>
                    <div className="flex flex-col p-6 justify-start gap-8">
                      <div className="h-96 relative rounded-[24px] overflow-hidden">
                        <div className="absolute bg-gradient-to-r from-red-500/70 via-red-500/5 to-transparent w-full h-full z-10"></div>
                        <div className="absolute top-16 left-10 flex flex-col gap-8 z-20">
                          <h1 className="text-3xl font-bold text-white">
                            {courseId.toUpperCase()}
                          </h1>
                          <p className="line-clamp-3 w-48">{courseInfo.summary}</p>
                          <div className="flex flex-row gap-4 justify-center items-center">
                            <Button className="bg-white rounded-xl text-primary text-[14px] font-[500] h-[52px] hover:bg-red-100 px-8">
                              Resume
                            </Button>
                            <Button
                              variant="link"
                              className="text-white text-[14px] font-[500]"
                            >
                              More Info
                            </Button>
                          </div>
                        </div>
                        <video
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full object-cover h-full rounded-[24px]"
                        >
                          <source
                            src="/assets/media/course_banner.mp4"
                            type="video/mp4"
                          />
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
                              <div className="p-6 w-full">
                                <div className="flex flex-col gap-2 justify-between mb-4">
                                  <h4 className="text-primary font-bold text-[18px]">
                                    {quizData[currentIndex].question}
                                  </h4>
                                  <p className="text-[14px] font-[500]">
                                    Tap/click, or type A-E in the field below.
                                  </p>
                                </div>
                                <div className="flex flex-col justify-between gap-2 w-full">
                                  {quizData[currentIndex].answers.map(
                                    (answer: string, index: number) => (
                                      <div
                                        key={index}
                                        className={cn(
                                          "cursor-pointer transition-all border-black hover:border-primary border-[1px] hover:bg-primary hover:text-white flex flex-row justify-between px-5 py-4 rounded-[12px]",
                                          answerIndex === index &&
                                            (quizData[currentIndex].correctAnswer ===
                                            answerIndex
                                              ? "bg-[#2ECC71] border-[#2ECC71] text-secondary"
                                              : "bg-primary border-primary text-secondary"),
                                          answerIndex !== -1 &&
                                            quizData[currentIndex].correctAnswer ===
                                              index &&
                                            "bg-[#2ECC71] border-[#2ECC71] text-secondary"
                                        )}
                                        onClick={() => {
                                          if (answerIndex == -1)
                                            handleSelectAnswer(index);
                                        }}
                                      >
                                        <p>
                                          {String.fromCharCode(index + 65)}.) {answer}.
                                        </p>
                                        {answerIndex === -1 ? (
                                          <Circle />
                                        ) : quizData[currentIndex].correctAnswer ===
                                          index ? (
                                          <Check />
                                        ) : answerIndex == index ? (
                                          <CircleX />
                                        ) : (
                                          <Circle />
                                        )}
                                      </div>
                                    )
                                  )}
                                  {quizData[currentIndex].answers.length > 0 && (
                                    <div
                                      className={cn(
                                        "cursor-pointer transition-all border-black hover:border-primary border-[1px] hover:bg-primary hover:text-white flex flex-row justify-between px-5 py-4 rounded-[12px]",
                                        isNext &&
                                          "bg-[#2ECC71] border-[#2ECC71] text-secondary"
                                      )}
                                      onClick={() => handleSelectAnswer(-1)}
                                    >
                                      <p>
                                        F.) Prefer not to answer. Move on to next content!
                                      </p>
                                      {isNext ? <Check /> : <Circle />}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                        {feedback && (
                          <div className="relative flex flex-col bg-white rounded-[8px] overflow-hidden w-full shadow-xl">
                            <div className="absolute top-0 left-0 h-1 w-full rounded-[2px] bg-primary"></div>
                            <div className="flex flex-row justify-between items-center w-full px-6 py-2 mt-4">
                              <h1 className="text-[18px] font-bold text-primary">
                                Feedback
                              </h1>
                              <Button
                                className="h-[44px] rounded-[8px] px-6 w-[140px]"
                                onClick={handleNextQuiz}
                              >
                                Next
                                <ArrowRight />
                              </Button>
                            </div>
                            <div className="px-6 pb-6">
                              <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                {feedback}
                              </ReactMarkdown>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </PerfectScrollbar>
                )}
              </div>
            )}
          </div>
        </div>
        <ChatInput isOpen={isOpen} SetIsOpen={setIsOpen} />
      </div>
    </div>
  );
}
