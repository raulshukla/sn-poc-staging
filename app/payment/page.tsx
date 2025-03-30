"use client";

import { useState } from "react";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import AuthCard from "@/components/ui/authcard";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function PaymentPage() {

  const [loading, setLoading] = useState(false);
  const router = useRouter();
    const searchParams = useSearchParams();
    const selectedPlan = searchParams.get("plan") || "semester";

  const handlePayment = async () => {
    setLoading(true);
    console.log("Pseudo API: POST /api/payment", { plan: "semester" });
    await new Promise((res) => setTimeout(res, 1000));
    alert("Payment successful! Redirecting...");
    router.push("/profile");
  };

  return (
    <>
      <Header />
      <main className="py-12">
        <AuthCard>
          <h2 className="text-xl font-semibold mb-4">Confirm Your Payment</h2>
          <p className="text-sm text-gray-600 mb-6">
  You’re purchasing the{" "}
  <strong>{selectedPlan === "monthly" ? "Monthly Plan" : "Semester Plan"}</strong> for{" "}
  <span className="text-red-700 font-semibold">
    {selectedPlan === "monthly" ? "$9.99 / month" : "$24.99 / semester"}
  </span>
</p>

          <ul className="text-left text-sm text-gray-700 mb-6 space-y-2">
            <li>✅ Unlimited access to all notes</li>
            <li>✅ 24/7 email and chat support</li>
            <li>✅ Cancel anytime</li>
          </ul>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-red-700 text-white py-3 rounded font-semibold hover:bg-red-800 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Pay $24.99"}
          </button>

          <p className="mt-6 text-xs text-gray-500 text-center">
            Your payment is securely processed via Stripe.
          </p>
        </AuthCard>
      </main>
      <Footer />
    </>
  );
}
