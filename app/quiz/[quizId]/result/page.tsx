"use client";
import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
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
import { AIMessage, UserMessage } from "@/components/chat/chat";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Toggle from "@/components/ui/toggle";

export default function Page({ params }: { params: Promise<{ quizId: string }> }) {
  const searchParams = useSearchParams();

  // Get the status from api - Update later
  const [currentIndex, setCurrentIndex] = useState(5);
  const [isAllQuestions, setIsAllQuestions] = useState<boolean>(true);

  const { quizId } = use(params);

  const type = searchParams.get("type");

  useEffect(() => {
    console.log(quizId);
    console.log(type);
  }, []);

  return (
    <div className={`w-full h-full max-h-full flex flex-col justify-between`}>
      <div className="flex-grow h-full bg-white">
        <div className="flex flex-col p-6 gap-12">
          <div className="flex flex-row gap-2 justify-between items-center">
            <div className="flex flex-col">
              <h4 className="text-[16px] font-[500]">Progress Quiz</h4>
              <h1 className="text-[32px] font-bold text-primary">
                Intro to Law and Ethics
              </h1>
            </div>
            <div className="flex flex-row gap-2">
              <Button
                className="h-[51px] text-[14px] font-[500] rounded-[12px] py-4 w-[160px] bg-white border border-gray-300"
                variant="secondary"
              >
                Strengthen
              </Button>
              <Button className="h-[51px] text-[14px] font-[500] rounded-[12px] py-4 w-[160px] bg-[#2ECC71] text-white hover:bg-[#2ab463]">
                Take Another
              </Button>
            </div>
          </div>
          <div className="flex flex-row gap-6">
            <div className="p-6 flex flex-col gap-5 border border-[#DDDDDD] rounded-[16px]">
              <div className="w-[250px] h-[250px] relative">
                <CircularProgressbar
                  value={75}
                  strokeWidth={12}
                  styles={buildStyles({
                    trailColor: "#FFE5E5",
                    pathColor: "#2ECC71",
                  })}
                  className="w-[250px] h-[250px] absolute top-0 left-0"
                />
                <CircularProgressbar
                  value={50}
                  strokeWidth={17}
                  styles={buildStyles({
                    trailColor: "#FFE5E5",
                    pathColor: "#FF8A00",
                  })}
                  className="w-[175px] h-[175px] absolute top-[37px] left-0"
                />
                <CircularProgressbar
                  value={64}
                  strokeWidth={30}
                  styles={buildStyles({
                    trailColor: "#FFE5E5",
                    pathColor: "#1188FF",
                  })}
                  className="w-[100px] h-[100px] absolute top-[75px] left-0"
                />
              </div>
              <div className="flex flex-row gap-2 justify-evenly">
                <div className="flex flex-col gap-0.5 justify-center items-center text-center">
                  <p className="text-[10px] font-bold">Your Score</p>
                  <h3 className="text-[24px] font-bold text-[#2ECC71]">75%</h3>
                </div>
                <div className="flex flex-col gap-0.5 justify-center items-center text-center">
                  <p className="text-[10px] font-bold">Percentile</p>
                  <h3 className="text-[24px] font-bold text-[#FF8A00]">14th</h3>
                </div>
                <div className="flex flex-col gap-0.5 justify-center items-center text-center">
                  <p className="text-[10px] font-bold">Class Avg.</p>
                  <h3 className="text-[24px] font-bold text-[#1188FF]">64%</h3>
                </div>
              </div>
            </div>
            <div className="p-6 flex border border-[#DDDDDD] rounded-[16px]">
              
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-row justify-between">
              <h2 className="text-[24px] font-bold">Questions</h2>
              <Toggle
                className="h-[40px]"
                checked={isAllQuestions}
                onCheckedChange={setIsAllQuestions}
                labels={["Missed", "All"]}
              />
            </div>
            <div className="shadow-xl rounded-[8px] relative overflow-hidden flex flex-col p-6 gap-6 justify-between">
              <div className="bg-primary h-1 rounded-[2px] absolute top-0 left-0 w-full"></div>
            </div>
          </div>
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
  );
}
