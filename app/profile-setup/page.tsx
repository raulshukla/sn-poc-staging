"use client";

import { useState } from "react";
import AuthCard from "@/components/ui/authcard";
import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";

import Link from "next/link";

export default function ProfileSetupPage() {
  const [name, setName] = useState("");
  const [email] = useState("student@ufl.edu"); // pre-filled
  const [gradYear, setGradYear] = useState("");
  const [major, setMajor] = useState("");

  const handleSubmit = async () => {
    console.log("Pseudo API: POST /api/profile", {
      name,
      email,
      gradYear,
      major,
    });
    alert("Profile saved! Redirecting...");
    // Simulate redirect to next step
  };

  return (
    <>
      <Header />
    <AuthCard>
      <h2 className="text-xl font-semibold mb-4">Complete Your Profile</h2>
      <div className="space-y-4 text-left">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            UF Email
          </label>
          <input
            type="email"
            value={email}
            readOnly
            className="w-full px-4 py-2 border border-gray-200 bg-gray-100 text-gray-500 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Graduation Year
          </label>
          <input
            type="text"
            value={gradYear}
            onChange={(e) => setGradYear(e.target.value)}
            placeholder="e.g., 2026"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Major
          </label>
          <input
            type="text"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-3 rounded transition"
      >
        Save and Continue
      </button>

      <p className="mt-6 text-center text-sm text-gray-500">
        Not the right email? <Link href="/signup" className="underline text-red-700">Go back</Link>
      </p>
    </AuthCard>
    <Footer />
    </>
  );
}
