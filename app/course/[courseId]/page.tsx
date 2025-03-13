"use client";
import { use, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { api } from "@/lib/api";
import ChatInput from "@/components/chat/chat";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw';


type ResponseData = {
  id: string;
  courseId: string;
  title: string;
  summary: string;
  description: string;
};

export default function Page({ params }: { params: Promise<{ courseId: string }> }) {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const { courseId } = use(params);
  const [courseInfo, setCourseInfo] = useState<ResponseData>({
    id: "",
    courseId: "",
    title: "",
    summary: "",
    description: "",
  });
  const type = searchParams.get("type");

  const getCourseInfo = useCallback(async () => {
    try {
      const { data: response } = await api.post<ResponseData>("/course/", {
        courseId: courseId,
      });
      setCourseInfo(response);
    } catch (ex) {
      console.log(ex);
    }
  }, [courseId]);

  useEffect(() => {
    getCourseInfo();
  }, []);

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
                    <img
                      src="/assets/images/leading_1.png"
                      alt=""
                      className="w-full object-cover rounded-[24px]"
                    />
                    <h1 className="text-primary text-[32px] font-bold">
                      {courseInfo.title}
                    </h1>
                    <div className="flex flex-col gap-4 justify-between">
                      <div className="relative flex bg-white rounded-[8px] overflow-hidden w-full">
                        <div className="absolute top-0 left-0 h-1 w-full rounded-[2px] bg-primary"></div>
                        <div className="p-6">
                          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{courseInfo.description}</ReactMarkdown>
                        </div>
                      </div>
                      <div className="h-1 w-full rounded-[2px] bg-primary"></div>
                      <div className="relative flex bg-white rounded-[8px] overflow-hidden w-full">
                        <div className="absolute top-0 left-0 h-1 w-full rounded-[2px] bg-primary"></div>
                        <div className="p-6">content</div>
                      </div>
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
