import { findProject } from "@/actions/project";
import ProjectMedia from "@/components/Project/ProjectMedia";
import ProjectMetadata from "@/components/Project/ProjectInfo";
import ProjectSection from "@/components/Project/ProjectSection";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Comments from "@/components/Comments";

// RSC: React Server Components
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

  if (!project) {
    // @todo not found not redirect
    redirect("/");
  }
  return (
    <div className=" space-y-12">
      <div className="space-y-8">
        <ProjectMetadata
          id={project.id}
          title={project.title}
          headline={project.headline}
        />
        {/* <ProjectMedia /> */}
        {project.highlights.map((highlight) => (
          <ProjectSection
            projectId={project.id}
            id={highlight.id}
            title={highlight.title}
            description={highlight.description}
            img={highlight.img}
          />
        ))}
      </div>

      <Comments
        userId={user.userId}
        projectId={project.id}
        comments={project.comments}
      />
    </div>
  );
}
