// app/verify-email/page.tsx
"use client";

import Link from "next/link";
import AuthCard from "@/components/ui/authcard";
import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";

export default function VerifyEmailPage() {
  return (
    <>
      <Header />
    <AuthCard>
      <h2 className="text-xl font-semibold text-gray-800 mb-3">
        Verify your email
      </h2>
      <p className="text-gray-600 text-sm mb-6">
        We&apos;ve sent a verification link to your email. Please check your inbox and click the link to continue.
      </p>

      <div className="flex flex-col items-center space-y-2 text-sm text-gray-600">
        <span>Didn&apos;t get the email?</span>
        <button
          onClick={() => alert("Simulated: Resend email")}
          className="text-red-700 underline hover:text-red-800 transition"
        >
          Resend verification email
        </button>
      </div>

      <div className="mt-8">
        <Link
          href="/signup"
          className="inline-block px-4 py-2 text-sm font-medium text-white bg-red-700 rounded hover:bg-red-800 transition"
        >
          Back to Signup
        </Link>
      </div>
    </AuthCard>
    <Footer />
    </>
  );
}
