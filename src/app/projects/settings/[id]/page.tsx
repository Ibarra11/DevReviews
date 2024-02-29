import { PROJECT_DATA } from "@/lib/constants";
import { Project } from "@/types";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { redirect } from "next/navigation";

export default async function ProjectSettings({
  params,
}: {
  params: { id: string };
}) {
  const project = await PROJECT_DATA.find(
    (project) => project.id === params.id
  );
  if (!project) {
    redirect("/");
  }
  return (
    <div className="grid gap-8 grid-cols-[1fr_340px]">
      <ProjectMetadata title={project.title} headline={project.headline} />
      {/* <ProjectImages />
      <ProjectTitle />
      <ProjectAnalytics /> */}
    </div>
  );
}

function ProjectMetadata({
  title,
  headline,
}: Pick<Project, "title" | "headline">) {
  return (
    <div className="relative space-y-2 border border-gray-200">
      <h1 className="text-4xl text-gray-900 font-bold">{title}</h1>
      <h2 className="text-xl text-gray-700">{headline}</h2>
      <div className="p-4 absolute top-0 right-0">
        <Pencil1Icon className="size-4" />
      </div>
    </div>
  );
}

function ProjectImages() {}

function ProjectReviews() {}

function ProjectAnalytics() {}
