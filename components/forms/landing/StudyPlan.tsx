import { Button } from "@/components/ui/button";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

export default function StudyPlan() {
  return (
    <div className="mt-20 flex flex-col gap-6 py-10 justify-center items-center">
      <h1 className="text-[40px] font-bold leading-snug relative text-center">
        Find the Right Study Plan for You
      </h1>
      <p className="text-[16px] font-[400] text-center">
        Flexible membership options to match your study needs. Choose your plan and get
        access to
        <br />
        top-quality study materials today!
      </p>
      <div className="flex flex-row gap-4">
        <div className="w-[280px] flex flex-col gap-4 justify-between bg-white p-4 rounded-2xl">
          <h1 className="text-[40px] font-bold text-primary">
            $39<span className="text-[18px]">/month</span>
          </h1>
          <h3 className="text-[24px] font-bold">1 class</h3>
          <p className="text-[16px] font-[400]">
            Perfect for students focused on one subject.
          </p>
          <Button className="h-[51px] rounded-2xl px-6 w-[112px]">Subscribe</Button>
        </div>
        <div className="w-[280px] flex flex-col gap-4 justify-between bg-white p-4 rounded-2xl">
          <h1 className="text-[40px] font-bold text-primary">
            $69<span className="text-[18px]">/month</span>
          </h1>
          <h3 className="text-[24px] font-bold">2 classes</h3>
          <p className="text-[16px] font-[400]">
            Ideal for students managing multiple courses.
          </p>
          <Button className="h-[51px] rounded-2xl px-6 w-[112px]">Subscribe</Button>
        </div>
        <div className="w-[280px] flex flex-col gap-4 justify-between bg-white p-4 rounded-2xl">
          <h1 className="text-[40px] font-bold text-primary">
            $99<span className="text-[18px]">/month</span>
          </h1>
          <h3 className="text-[24px] font-bold">1 class</h3>
          <p className="text-[16px] font-[400]">
            The best value for those juggling a full workload.
          </p>
          <Button className="h-[51px] rounded-2xl px-6 w-[112px]">Subscribe</Button>
        </div>
      </div>
      <Button className="h-[51px] rounded-2xl px-6 border-2 border-gray-500" variant="secondary">View All Membership Plans <FaArrowRight /></Button>
    </div>
  );
}
