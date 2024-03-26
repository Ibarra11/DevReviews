import { Project } from "@/types";
import ProjectEditButton from "./ProjectEditButton";
export default function ProjectMetadata({
  title,
  headline,
  edit,
}: Pick<Project, "title" | "headline"> & { edit?: boolean }) {
  return (
    <div className="bg-white shadow relative space-y-2 rounded  p-4">
      <h1 className="text-4xl text-gray-900 font-bold">{title}</h1>
      <h2 className="text-xl text-gray-700">{headline}</h2>
      {edit && <ProjectEditButton />}
    </div>
  );
}
