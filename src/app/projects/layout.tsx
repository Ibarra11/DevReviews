import { ReactNode } from "react";

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col min-h-screen  py-12 px-6 max-w-[1440px] mx-auto w-full">
      {children}
    </main>
  );
}
