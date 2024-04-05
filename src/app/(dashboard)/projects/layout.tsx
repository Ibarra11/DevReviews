import { ReactNode } from "react";

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return <main className="flex flex-col min-h-screen">{children}</main>;
}
