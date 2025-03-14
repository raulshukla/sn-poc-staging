// import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
// import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import SideBar from "@/components/sidebar/sidebar";
import { Header } from "@/components/header/header";
import './global.css';
import ChatInput from "@/components/chat/chat";
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
    <div className="min-h-screen h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex flex-row h-full">
        <SideBar />
        {children}
      </div>
      {/* <SpeedInsights />
      <Analytics /> */}
    </div>
  );
}
