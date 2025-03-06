import { Button } from "@/components/ui/button";
import React from "react";

export default function InvestSection() {
  return (
    <div className="py-10 flex flex-row justify-center items-center">
        <div className="w-[520px] relative z-10 ">

      <div className="w-[600px] rounded-[40px] flex flex-col gap-6 p-10 bg-white border-[10px] border-secondary z-10">
        <h1 className="text-[40px] font-bold leading-snug relative">
          Invest in Your Future with
          <br />
          the Smokin&apos;Notes Job
        </h1>
        <p className="text-[16px] font-[400]">
          Helping UF students succeed beyond the classroom. Apply today for a<br />
          chance to earn financial support for your education!
        </p>
        <Button className="h-[51px] rounded-2xl px-6 w-[138px] text-[14px]">Apply For Job</Button>
      </div>
        </div>
      <div className="w-[824px] h-[520px] overflow-hidden rounded-[40px]">
        <img src="/assets/images/land3.png" className="-translate-y-[15%]" alt="" />
      </div>
    </div>
  );
}
