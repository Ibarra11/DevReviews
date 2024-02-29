import { ReactNode } from "react";

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col h-full p-6  max-w-[1440px] mx-auto w-full border-2 border-green-500">
      {children}
    </main>
  );
}
