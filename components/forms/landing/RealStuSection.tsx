import { Button } from "@/components/ui/button";
import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Image from "next/image";

export default function RealStuSection() {
  return (
    <div className="flex flex-col gap-6 mt-20 py-10">
      <h1 className="text-[40px] font-bold leading-snug relative text-center">
        Real Students. Real Results.
      </h1>
      <p className="text-[16px] font-[400] text-center">
        See how Smokin’Notes has helped thousands of UF students ace their exams with
        <br />
        confidence! Whether it’s study guides, practice exams, or flashcards, our members
        achieve
        <br />
        better grades—faster.
      </p>
      <div className="flex flex-row justify-evenly">
        <div className="text-center flex flex-col gap-6 justify-between">
            <div className="w-[320px] h-[320px] overflow-hidden rounded-full">
                <img src="/assets/images/real_student.png" alt="" width={320} height={320} />
            </div>
            <div className="flex flex-col gap-4 justify-between">
                <h3 className="text-[24px] font-bold">
                Caroline G.
                </h3>
                <p className="text-[16px] font-[400]">Engineering Major</p>
                <div className="flex flex-row gap-4 justify-center">
                <Button className="h-[51px] rounded-2xl px-6 border-2 border-gray-500" variant="secondary"><FaArrowLeft /></Button>
                <Button className="h-[51px] rounded-2xl px-6 border-2 border-gray-500" variant="secondary"><FaArrowRight /></Button>
                </div>
            </div>
        </div>
        <div className="py-20 relative">
            <div className="w-[800px] p-20 text-[24px] font-bold text-white bg-primary rounded-[120px]">
            Smokin’Notes is a really great tool when it comes to studying for your exams and grasping the material. I used it for APK2100, APK2105 and PSY2012. In addition to your own notes, it’s great to have an extra resource to really help you study and prepare.
            </div>
            <div className="absolute -left-[70px] bottom-[70px]">
                <img src="/assets/images/guide_pitch.png" alt="" width={155} height={155} />
            </div>
        </div>
      </div>
    </div>
  );
}
