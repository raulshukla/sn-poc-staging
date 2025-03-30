"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import AuthCard from "@/components/ui/authcard";

export default function MembershipPage() {
  const [selectedPlan, setSelectedPlan] = useState("semester");
  const router = useRouter();
  const handleSelect = (plan: string) => {
    setSelectedPlan(plan);
  };

  const handleContinue = () => {
    console.log("Pseudo API: POST /api/membership", { selectedPlan });
    alert(`Plan selected: ${selectedPlan.toUpperCase()}`);
    
    router.push(`/payment?plan=${selectedPlan}`);

  };

  

  return (
    <>
      <Header />
      <main className="py-12">
        <AuthCard>
          <h2 className="text-xl font-semibold mb-4">Choose Your Membership</h2>
          <p className="text-sm text-gray-600 mb-6">
            Unlock access to all course materials, 24/7 support, and expert-reviewed guides.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
            <div
              onClick={() => handleSelect("semester")}
              className={`cursor-pointer rounded border p-4 ${
                selectedPlan === "semester"
                  ? "border-red-700 bg-red-50"
                  : "border-gray-300 bg-white"
              } transition`}
            >
              <h3 className="text-lg font-semibold mb-1">Semester Plan</h3>
              <p className="text-gray-600 text-sm">$24.99 / semester</p>
            </div>

            <div
              onClick={() => handleSelect("monthly")}
              className={`cursor-pointer rounded border p-4 ${
                selectedPlan === "monthly"
                  ? "border-red-700 bg-red-50"
                  : "border-gray-300 bg-white"
              } transition`}
            >
              <h3 className="text-lg font-semibold mb-1">Monthly Plan</h3>
              <p className="text-gray-600 text-sm">$9.99 / month</p>
            </div>
          </div>

          <button
            onClick={handleContinue}
            className="w-full bg-red-700 text-white py-3 rounded font-semibold hover:bg-red-800 transition"
          >
            Continue to Payment
          </button>

          <p className="mt-6 text-xs text-gray-500 text-center">
            You’ll be charged only after you confirm on the next screen.
          </p>
        </AuthCard>
      </main>
      <Footer />
    </>
  );
}
