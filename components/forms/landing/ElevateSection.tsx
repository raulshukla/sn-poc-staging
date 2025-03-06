import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ElevateSection() {
  return (
    <div className="flex flex-row gap-40 justify-evenly py-6 mt-20">
      <div className="flex flex-col justify-evenly gap-9 py-20">
        <h1 className="text-[40px] font-bold leading-snug relative">
          Elevate Your UF Grades
          <br />
          <Image
            className="absolute bottom-0 left-24"
            src="/assets/svgs/ecllipse.svg"
            alt=""
            width={267}
            height={4}
          />
          with Smokin&apos;Notes
        </h1>
        <p>
          Access expert-crafted study guides, practice exams, and more to
          <br />
          excel in your courses today!
        </p>
        <div className="inline-flex">
          <Button className="h-[51px] rounded-2xl px-6">Access Study Materials</Button>
          <Image src="/assets/images/ro-arrow.png" alt="" width={92} height={92} />
        </div>
        <div>
          Trusted by 150,000 UF students
          <div className="flex flex-row">
            <Image
              className="rounded-full outline-2 outline-white outline"
              src="/assets/students/1.png"
              alt=""
              width={40}
              height={40}
            />
            <Image
              className="rounded-full outline-2 outline-white outline -ml-2"
              src="/assets/students/1.png"
              alt=""
              width={40}
              height={40}
            />
            <Image
              className="rounded-full outline-2 outline-white outline -ml-2"
              src="/assets/students/1.png"
              alt=""
              width={40}
              height={40}
            />
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="w-[500px] h-[500px] overflow-hidden relative -z-10">
          <img
            className="absolute rounded-[40px] inset-1/2 h-full w-full transform -translate-x-1/2 -translate-y-1/2 object-cover"
            src="/assets/images/land1.png"
            alt=""
          />
        </div>
        <div className="absolute -top-10 -right-10 w-[220px] h-[120px] text-white bg-primary flex flex-col gap-4 p-4 rounded-2xl outline outline-[10px] outline-white">
          <div className="flex flex-row gap-4">
            <Image
              className="bg-white rounded-full p-1"
              src="/assets/images/ico1.png"
              alt=""
              width={36}
              height={24}
            />
            <h2 className="text-[24px] font-bold">150,000+</h2>
          </div>
          <p className="text-[12px] font-[300]">
            UF students improved their grades using Smokin&apos;Notes.
          </p>
        </div>
        <div className="absolute top-16 -left-16 w-[220px] h-[120px] text-white bg-primary flex flex-col gap-4 p-4 rounded-2xl outline outline-[10px] outline-white">
          <div className="flex flex-row gap-4">
            <Image
              className="bg-white rounded-full p-1"
              src="/assets/images/ico2.png"
              alt=""
              width={36}
              height={24}
            />
            <h2 className="text-[24px] font-bold">20+ Years</h2>
          </div>
          <p className="text-[12px] font-[300]">
            Providing top-tier study guides and test prep materials since 2001.
          </p>
        </div>
        <div className="absolute bottom-4 right-[140px] w-[220px] h-[120px] text-white bg-primary flex flex-col gap-4 p-4 rounded-2xl outline outline-[10px] outline-white">
          <div className="flex flex-row gap-4">
            <Image
              className="bg-white rounded-full p-1"
              src="/assets/images/ico3.png"
              alt=""
              width={36}
              height={24}
            />
            <h2 className="text-[24px] font-bold">30 Million+</h2>
          </div>
          <p className="text-[12px] font-[300]">
            Online practice exam questions completed by our users.
          </p>
        </div>
      </div>
    </div>
  );
}
