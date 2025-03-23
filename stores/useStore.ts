import { CourseInfoType } from "@/types/course";
import { create } from "zustand";

type Store = {
  course: CourseInfoType;
  setCourse: (courseInfo: CourseInfoType) => void;
};

const useStore = create<Store>((set) => ({
  course: {
    courseId: "",
    totalChapters: 0,
    currentChapter: 0,
  },
  setCourse: (course: CourseInfoType) => {
    set({ course });
    localStorage.setItem("courseInfo", JSON.stringify(course));
  },
}));

export default useStore;
