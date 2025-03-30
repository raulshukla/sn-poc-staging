"use client";

import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import AuthCard from "@/components/ui/authcard";

export default function CancelMembershipPage() {
  const handleCancel = () => {
    console.log("Pseudo API: POST /api/membership/cancel");
    alert("Your membership has been cancelled.");
  };

  return (
    <>
      <Header />
      <main className="py-12">
        <AuthCard>
          <h2 className="text-xl font-semibold mb-4 text-red-700">Cancel Membership</h2>
          <p className="text-sm text-gray-600 mb-6">
            We’re sad to see you go. By cancelling, your access will end immediately and you will
            not be billed again.
          </p>

          <button
            onClick={handleCancel}
            className="w-full bg-red-700 text-white py-3 rounded font-semibold hover:bg-red-800 transition"
          >
            Cancel My Membership
          </button>
        </AuthCard>
      </main>
      <Footer />
    </>
  );
}
