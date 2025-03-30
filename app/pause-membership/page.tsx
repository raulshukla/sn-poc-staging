"use client";

import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import AuthCard from "@/components/ui/authcard";

export default function PauseMembershipPage() {
  const handlePause = () => {
    console.log("Pseudo API: POST /api/membership/pause");
    alert("Membership paused until next login.");
  };

  return (
    <>
      <Header />
      <main className="py-12">
        <AuthCard>
          <h2 className="text-xl font-semibold mb-4">Pause Membership</h2>
          <p className="text-sm text-gray-600 mb-6">
            You can pause your membership temporarily. You won’t be charged during the paused
            period, and can resume at any time.
          </p>

          <button
            onClick={handlePause}
            className="w-full bg-gray-700 text-white py-3 rounded font-semibold hover:bg-gray-800 transition"
          >
            Pause My Membership
          </button>
        </AuthCard>
      </main>
      <Footer />
    </>
  );
}
