"use client";

import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";
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
