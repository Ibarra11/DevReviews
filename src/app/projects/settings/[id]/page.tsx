"use client";
import ProjectAnalytics from "@/components/Project/ProjectAnalytics";
import ProjectMedia from "@/components/Project/ProjectMedia";
import ProjectMetadata from "@/components/Project/ProjectMetadata";
import ProjectSection from "@/components/Project/ProjectSection";
import ProjectSettingsControls from "@/components/Project/ProjectSettingsControls";
import { PROJECT_DATA } from "@/lib/constants";

import { redirect } from "next/navigation";

export default async function ProjectSettings({
  params,
}: {
  params: { id: string };
}) {
  const project = await PROJECT_DATA.find(
    (project) => project.id === +params.id
  );

  if (!project) {
    redirect("/");
  }
  return (
    <div className="grid gap-8 grid-cols-[1fr_240px] items-start">
      <div className="space-y-8">
        <ProjectMetadata
          edit={true}
          title={project.title}
          headline={project.headline}
        />
        <ProjectMedia edit={true} />
        <ProjectSection edit={true} />
        <ProjectSection edit={true} />
        <ProjectSection edit={true} />
        <ProjectSection edit={true} />
      </div>
      <div className="space-y-8">
        <ProjectSettingsControls />
        <ProjectAnalytics />
      </div>
    </div>
  );
}
