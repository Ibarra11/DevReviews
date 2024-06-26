import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

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
        {children}
      </body>
    </html>
  );
}
