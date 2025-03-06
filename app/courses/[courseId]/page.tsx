"use client";
import { use } from "react";

export default function Page({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);

  return courseId;
}
