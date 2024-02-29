import { PROJECT_DATA } from "@/lib/constants";
import { redirect } from "next/navigation";
export default async function ProjectPage({
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
  return <p>{project.title}</p>;
}
