import React from "react";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";

const courses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

export default function SmarterFindSection() {
  return (
    <div className="flex flex-col items-center justify-between gap-9 mt-20">
      <div className="flex flex-row justify-evenly w-full">
        <div className="w-[500px] flex flex-col gap-6 justify-center">
          <h1 className="text-[40px] font-bold leading-snug relative">
            Find Your Course
            <br />& Study Smarter
          </h1>
          <p className="line-clamp-3">
            Smokin&apos;Notes provides expert-crafted study materials for a wide range of
            UF courses. Whether you need in-depth class notes, practice exams, or quick
            revision flashcards, we&apos;ve got you covered.
          </p>
          <div className="flex items-center border rounded-lg p-2 bg-white shadow">
            <FaSearch className="text-gray-500" size={24} />
            <input
              type="text"
              placeholder="Search"
              className="w-full ml-2 outline-none"
            />
          </div>
        </div>
        <div className="w-[600px] h-[432px] overflow-hidden relative -z-10">
          <img
            className="absolute rounded-[40px] inset-1/2 h-full w-full transform -translate-x-1/2 -translate-y-1/2 object-cover"
            src="/assets/images/land2.png"
            alt=""
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {courses.map((course) => (
          <div key={course} className="w-[318px] p-4 flex flex-col gap-2 justify-center rounded-2xl bg-white relative">
            <div className="absolute top-0 left-4 w-[40px] h-[2px] rounded-bl-full rounded-br-full bg-primary" />
            <h3 className="text-[18px] font-bold">Course Code</h3>
            <p className="text-[12px] font-[400]">Course Name</p>
          </div>
        ))}
      </div>
    </div>
  );
}
