import { findProject } from "@/actions/project";
import ProjectMedia from "@/components/Project/ProjectMedia";
import ProjectMetadata from "@/components/Project/ProjectMetadata";
import ProjectSection from "@/components/Project/ProjectSection";
import { getUser } from "@/lib/auth";
import { PROJECT_DATA } from "@/lib/constants";
import { redirect } from "next/navigation";
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
  console.log(project);
  if (!project) {
    redirect("/");
  }
  return (
    <div className=" space-y-12">
      {/* <div className="space-y-8">
        <ProjectMetadata title={project.title} headline={project.headline} />
        <ProjectMedia />
        <ProjectSection />
        <ProjectSection />
        <ProjectSection />
        <ProjectSection />
      </div>
      <ProjectComments /> */}
    </div>
  );
}

function ProjectComments() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Discussion (20)</h3>
      <textarea
        aria-label="comment"
        rows={6}
        className="p-2.5 w-full text-sm text-gray-700 bg-gray-200 rounded-lg border-gray-300"
        placeholder="Write your thoughts here..."
      ></textarea>
    </div>
  );
}
