import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "../globals.css";
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
    <div>
      <aside className="fixed top-0 bottom-0 w-[280px]">
        <SideBarNav />
      </aside>
      <main className="ml-[280px] min-h-screen overflow-y-auto">
        <div className="py-12 px-6  max-w-7xl mx-auto w-full">{children}</div>
      </main>
    </div>
  );
}
