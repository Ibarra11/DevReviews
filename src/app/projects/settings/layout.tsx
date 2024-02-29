import { ReactNode } from "react";

export default function ProjectSettingsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="border-2 border-red-500 h-full">{children}</div>;
}
