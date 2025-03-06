import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function UltimateSection() {
  return (
    <div className="flex flex-col gap-9 justify-between items-center text-center mt-20 py-10">
      <h1 className="text-[40px] font-bold leading-snug relative">
        Your Ultimate Study
        <br />
        Companion
      </h1>
      <p>
        Master your courses with expertly crafted study materials designed
        <br />
        to boost your grades and confidence.
      </p>
      <div className="flex flex-row justify-between px-4 gap-4">
        <div className="bg-white flex flex-col gap-4 text-center items-center justify-center p-4 rounded-[16px]">
          <Image src="/assets/images/class_notes.gif" alt="" width={140} height={140} />
          <h3 className="text-primary text-[20px] font-bold">Class Notes</h3>
          <h5 className="text-[16px] font-[400]">Concise & Comprehensive</h5>
          <p className="text-[12px] font-[300] text-[#333333] line-clamp-2">
            Get well-organized, easy-to-read class notes tailored for your UF courses.
          </p>
        </div>
        <div className="bg-white flex flex-col gap-4 text-center items-center justify-center p-4 rounded-[16px]">
          <Image
            src="/assets/images/practice_exams.gif"
            alt=""
            width={140}
            height={140}
          />
          <h3 className="text-primary text-[20px] font-bold">Practice Exams</h3>
          <h5 className="text-[16px] font-[400]">Test Your Knowledge</h5>
          <p className="text-[12px] font-[300] text-[#333333] line-clamp-2">
            Real exam-style questions and timed assessments to improve performance.
          </p>
        </div>
        <div className="bg-white flex flex-col gap-4 text-center items-center justify-center p-4 rounded-[16px]">
          <Image
            src="/assets/images/chapter_summaries.gif"
            alt=""
            width={140}
            height={140}
          />
          <h3 className="text-primary text-[20px] font-bold">Chapter Summaries</h3>
          <h5 className="text-[16px] font-[400]">Key Concepts Simplified</h5>
          <p className="text-[12px] font-[300] text-[#333333] line-clamp-2">
            Quickly review important topics with structured summaries for better
            retention.
          </p>
        </div>
        <div className="bg-white flex flex-col gap-4 text-center items-center justify-center p-4 rounded-[16px]">
          <Image src="/assets/images/flash_cards.gif" alt="" width={140} height={140} />
          <h3 className="text-primary text-[20px] font-bold">Flash Cards</h3>
          <h5 className="text-[16px] font-[400]">Quick & Effective Learning</h5>
          <p className="text-[12px] font-[300] text-[#333333] line-clamp-2">
            Memorize key terms and concepts faster with interactive flashcards.
          </p>
        </div>
        <div className="bg-white flex flex-col gap-4 text-center items-center justify-center p-4 rounded-[16px]">
          <Image
            src="/assets/images/video_solutions.gif"
            alt=""
            width={140}
            height={140}
          />
          <h3 className="text-primary text-[20px] font-bold">Video Solutions</h3>
          <h5 className="text-[16px] font-[400]">Learn from Experts</h5>
          <p className="text-[12px] font-[300] text-[#333333] line-clamp-2">
            Step-by-step video explanations to help you understand complex problems.
          </p>
        </div>
      </div>
    </div>
  );
}
