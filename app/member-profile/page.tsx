"use client";

import { useState } from "react";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import AuthCard from "@/components/ui/authcard";

export default function MemberProfilePage() {
  const [name, setName] = useState("Rahul Shukla");
  const [email] = useState("rahul@ufl.edu"); // read-only
  const [gradYear, setGradYear] = useState("2026");
  const [major, setMajor] = useState("Computer Science");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    console.log("Pseudo API: POST /api/profile/update", {
      name,
      email,
      gradYear,
      major,
    });
    await new Promise((res) => setTimeout(res, 1000));
    alert("Profile updated!");
    setSaving(false);
  };

  return (
    <>
      <Header />
      <main className="py-12">
        <AuthCard>
          <h2 className="text-xl font-semibold mb-4">Your Profile</h2>

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
            onClick={handleSave}
            disabled={saving}
            className="mt-6 w-full bg-red-700 text-white py-3 rounded font-semibold hover:bg-red-800 transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </AuthCard>
      </main>
      <Footer />
    </>
  );
}
