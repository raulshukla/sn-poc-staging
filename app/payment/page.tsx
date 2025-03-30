"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import AuthCard from "@/components/ui/authcard";

export default function PaymentPageWrapper() {
  return (
    <Suspense fallback={<div className="text-center py-12">Loading payment...</div>}>
      <PaymentPage />
    </Suspense>
  );
}

function PaymentPage() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "semester";

  return (
    <>
      <Header />
      <main className="py-12">
        <AuthCard>
          <h2 className="text-xl font-semibold mb-4">Confirm Your Payment</h2>
          <p className="text-sm text-gray-600 mb-6">
            You’re purchasing the{" "}
            <strong>{plan === "monthly" ? "Monthly Plan" : "Semester Plan"}</strong> for{" "}
            <span className="text-red-700 font-semibold">
              {plan === "monthly" ? "$9.99 / month" : "$24.99 / semester"}
            </span>
          </p>

          <button
            onClick={() => alert("Payment simulated.")}
            className="w-full bg-red-700 text-white py-3 rounded font-semibold hover:bg-red-800 transition"
          >
            Pay Now
          </button>
        </AuthCard>
      </main>
      <Footer />
    </>
  );
}
