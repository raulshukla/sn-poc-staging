// app/signup/page.tsx
"use client";

import { useState } from "react";
import AuthCard from "@/components/ui/authcard";
import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000));
    console.log("Pseudo API: POST /api/signup", { email });
    setSuccess(true);
    setLoading(false);
  };

  return (
    <>
      <Header />
    <AuthCard>
      <h2 className="text-xl font-semibold mb-2">Get started for free</h2>
      <p className="text-sm text-gray-600 mb-6">
        Join over 100,000 UF students who've boosted their GPA with our study guides!
      </p>

      <div className="flex border border-gray-300 rounded-lg overflow-hidden mb-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 focus:outline-none"
        />
        <button
          onClick={handleSignup}
          disabled={loading || !email}
          className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 font-semibold transition disabled:opacity-50"
        >
          {loading ? "Sending..." : "Continue"}
        </button>
      </div>

      {success && (
        <p className="text-green-600 text-sm">
          Signup link sent to your email!
        </p>
      )}

      <ul className="mt-6 space-y-2 text-left text-sm text-gray-700">
        <li className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-700"></span>
          24/7 course access
        </li>
        <li className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-700"></span>
          Notes for major UF courses
        </li>
        <li className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-700"></span>
          Cancel anytime
        </li>
      </ul>

      <p className="mt-6 text-xs text-gray-500">
        By continuing, you agree to our{" "}
        <a href="/terms" className="text-red-700 underline">
          Terms
        </a>{" "}
        and{" "}
        <a href="/privacy" className="text-red-700 underline">
          Privacy Policy
        </a>.
      </p>
    </AuthCard>
    <Footer />
    </>
  );
}
