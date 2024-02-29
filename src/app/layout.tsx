import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { cn } from "../lib/utils";
import "./globals.css";
import SideBarNav from "@/components/SideBarNav";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevReviews",
  description:
    "Elevate Your Projects: Get Tailored Feedback and Insights on DevReviews - Your Go-To Platform for Project Enhancement!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("h-screen antialiased bg-gray-100", raleway.className)}
      >
        <div className="h-full flex">
          <aside className="w-[280px]">
            <SideBarNav />
          </aside>
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
