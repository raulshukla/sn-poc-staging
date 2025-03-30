"use client";

import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import AuthCard from "@/components/ui/authcard";
import { useState } from "react";

export default function SwitchPlanPage() {
  const [selectedPlan, setSelectedPlan] = useState("monthly");

  const handleSubmit = () => {
    console.log("Pseudo API: POST /api/switch-plan", { selectedPlan });
    alert(`Switched to: ${selectedPlan.toUpperCase()} Plan`);
  };

  return (
    <>
      <Header />
      <main className="py-12">
        <AuthCard>
          <h2 className="text-xl font-semibold mb-4">Switch Your Plan</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <label className="cursor-pointer border p-4 rounded transition hover:shadow-sm">
              <input
                type="radio"
                name="plan"
                value="monthly"
                checked={selectedPlan === "monthly"}
                onChange={() => setSelectedPlan("monthly")}
                className="mr-2"
              />
              Monthly Plan - $9.99
            </label>

            <label className="cursor-pointer border p-4 rounded transition hover:shadow-sm">
              <input
                type="radio"
                name="plan"
                value="semester"
                checked={selectedPlan === "semester"}
                onChange={() => setSelectedPlan("semester")}
                className="mr-2"
              />
              Semester Plan - $24.99
            </label>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-red-700 text-white py-3 rounded font-semibold hover:bg-red-800 transition"
          >
            Confirm Switch
          </button>
        </AuthCard>
      </main>
      <Footer />
    </>
  );
}
