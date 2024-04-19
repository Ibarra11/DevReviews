import { findProject } from "@/actions/project";
import ProjectAnalytics from "@/components/Project/ProjectAnalytics";
import ProjectMedia from "@/components/Project/ProjectMedia";
import ProjectSection from "@/components/Project/ProjectSection";
import ProjectSettingsControls from "@/components/Project/ProjectSettingsControls";
import { getUser } from "@/lib/auth";

import { redirect } from "next/navigation";
import ProjectInfo from "@/components/Project/ProjectInfo";

export default async function ProjectSettings({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUser();
  if (!user) {
    redirect("/auth/login");
  }
  const project = await findProject({
    projectId: +params.id,
    userId: user.userId,
  });
  // console.log(project);
  if (!project) {
    redirect("/");
  }
  return (
    <div className="grid gap-8 grid-cols-[1fr_240px] items-start">
      <div className="space-y-8">
        <ProjectInfo
          id={project.id}
          edit={true}
          title={project.title}
          headline={project.headline}
        />
        {/* <ProjectMedia media={project.media} edit={true} /> */}
        {project.highlights.map((highlight) => (
          <ProjectSection
            projectId={project.id}
            id={highlight.id}
            title={highlight.title}
            description={highlight.description}
            img={highlight.img}
            edit={true}
          />
        ))}
      </div>
      <div className="space-y-8">
        <ProjectSettingsControls />
        <ProjectAnalytics />
      </div>
    </div>
  );
}
