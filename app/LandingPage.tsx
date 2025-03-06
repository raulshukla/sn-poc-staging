"use client";

import {
  generateObituaries,
  generateObituariesWithGraphName,
} from "@/api/generate-obituaries";
import { Footer } from "@/components/footer/footer";
import { GeneratedObituaries } from "@/components/generated-obituaries/generated-obituaries";
import { Header } from "@/components/header/header";
import { GetStarted } from "@/components/life-story-form/get-started";
import { BasicInformation } from "@/components/life-story-form/basic-information";
import { Personality } from "@/components/life-story-form/personality";
import { Family } from "@/components/life-story-form/family";
import { Moments } from "@/components/life-story-form/moments";
import { Interests } from "@/components/life-story-form/interests";
import { Honoring } from "@/components/life-story-form/honoring";
import { FORM_STEPS } from "@/constants/life-story-form";
import type { LifeStoryFormState, Obituaries } from "@/types/typings";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ElevateSection from "@/components/forms/landing/ElevateSection";
import UltimateSection from "@/components/forms/landing/UltimateSection";
import SmarterFindSection from "@/components/forms/landing/SmarterFindSection";
import StudyPlan from "@/components/forms/landing/StudyPlan";
import RealStuSection from "@/components/forms/landing/RealStuSection";
import InvestSection from "@/components/forms/landing/InvestSection";
import GetInTouch from "@/components/forms/landing/GetInTouch";

export default function LandingPage({ user = "" }) {
  return (
    // <PerfectScrollbar style={{ right: 0 }}>
    <>
      <Header />
      <div className="container mx-auto">
        <ElevateSection />
        <UltimateSection />
        <SmarterFindSection />
        <StudyPlan />
        <RealStuSection />
        <InvestSection />
        <GetInTouch />
      </div>
      <Footer />
    </>
    // </PerfectScrollbar>
  );
}
