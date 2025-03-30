"use client";

import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import AuthCard from "@/components/ui/authcard";
import Link from "next/link";

export default function MySubscriptionsPage() {
  const currentPlan = "Semester Plan";
  const renewalDate = "August 15, 2025";
  const price = "$24.99";

  return (
    <>
      <Header />
      <main className="py-12">
        <AuthCard>
          <h2 className="text-xl font-semibold mb-4">My Subscription</h2>

          <div className="text-left space-y-3 mb-6">
            <p>
              <span className="font-medium text-gray-700">Current Plan:</span>{" "}
              {currentPlan}
            </p>
            <p>
              <span className="font-medium text-gray-700">Renews On:</span>{" "}
              {renewalDate}
            </p>
            <p>
              <span className="font-medium text-gray-700">Price:</span> {price}
            </p>
          </div>

          <div className="grid gap-4">
            <Link
              href="/switch-plan"
              className="block w-full text-center bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
            >
              Switch Plan
            </Link>

            <Link
              href="/pause-membership"
              className="block w-full text-center bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition"
            >
              Pause Membership
            </Link>

            <Link
              href="/cancel-membership"
              className="block w-full text-center bg-red-700 text-white py-2 rounded hover:bg-red-800 transition"
            >
              Cancel Membership
            </Link>
          </div>

          <p className="mt-6 text-xs text-gray-500 text-center">
            Manage your plan, billing, and renewal options here.
          </p>
        </AuthCard>
      </main>
      <Footer />
    </>
  );
}
