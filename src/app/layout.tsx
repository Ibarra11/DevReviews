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
        className={cn(
          "min-h-screen antialiased bg-gray-100",
          raleway.className
        )}
      >
        <div>
          <aside className="fixed top-0 bottom-0 w-[280px]">
            <SideBarNav />
          </aside>
          <main className="ml-[280px] min-h-screen overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
