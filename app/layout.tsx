import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import { AppProviders } from "@/components/providers"; // ✅ updated wrapper

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smokin'Notes",
  description: "Educational Platform",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Toaster />
        <AppProviders>
          <div className="min-h-screen">
            {children}
          </div>
        </AppProviders>
        {/* <SpeedInsights />
        <Analytics /> */}
      </body>
    </html>
  );
}
