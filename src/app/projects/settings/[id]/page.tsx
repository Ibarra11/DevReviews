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
    <div className="grid gap-8 grid-cols-[1fr_240px] items-start">
      <div className="space-y-8">
        <ProjectMetadata title={project.title} headline={project.headline} />
        <ProjectImages />
        <ProjectSection />
        <ProjectSection />
        <ProjectSection />
        <ProjectSection />
      </div>
      <div className="space-y-8">
        <ProjectSettingsControls />
        <ProjectAnalytics />
      </div>
    </div>
  );
}

function ProjectMetadata({
  title,
  headline,
}: Pick<Project, "title" | "headline">) {
  return (
    <div className="bg-white shadow relative space-y-2 rounded  p-4">
      <h1 className="text-4xl text-gray-900 font-bold">{title}</h1>
      <h2 className="text-xl text-gray-700">{headline}</h2>
      <button className=" cursor-pointer absolute p-2 bg-gray-300 top-1 rounded-full right-4">
        <Pencil1Icon className="size-4 text-gray-500" />
      </button>
    </div>
  );
}

function ProjectSettingsControls() {
  return (
    <div className="space-y-4">
      <div className="bg-white shadow rounded p-2">
        <h4 className="text-gray-600 text-base leading-5 mb-1">Visibility</h4>
        <p className="text-gray-500 text-sm mb-3">
          You can change who has permissions to see your project
        </p>
        <button className=" h-8 w-full rounded bg-gray-300 text-gray-600 text-sm">
          Public/Private
        </button>
      </div>
      <div className="bg-white shadow rounded p-2">
        <h4 className="text-gray-600 text-base leading-5 mb-1">
          Delete Project
        </h4>
        <p className="text-gray-500 text-sm mb-3">
          Once you delete your project, it can't be undone!
        </p>
        <button className=" h-8 w-full rounded bg-red-300 text-white text-sm">
          Delete
        </button>
      </div>
    </div>
  );
}

function ProjectImages() {
  return (
    <div className="relative bg-white shadow rounded px-4 pt-12 pb-8 space-y-6">
      <div className="bg-gray-300 h-[400px] rounded"></div>
      <div className="flex justify-center gap-2">
        <div className=" w-16 aspect-square bg-gray-500 rounded"></div>
        <div className=" w-16 aspect-square bg-gray-500 rounded"></div>
        <div className=" w-16 aspect-square bg-gray-500 rounded"></div>
        <div className=" w-16 aspect-square bg-gray-500 rounded"></div>
      </div>
      <button className=" cursor-pointer absolute p-2 bg-gray-300 -top-4 rounded-full right-4">
        <Pencil1Icon className="size-4 text-gray-500" />
      </button>
    </div>
  );
}

function ProjectSection() {
  return (
    <div className="relative rounded bg-white shadow pt-12 pb-8 px-4 space-y-4 text-gray-700">
      <h3 className="text-xl font-semibold ">Authentication</h3>
      <div className="h-[400px] bg-gray-400 rounded"></div>
      <p className="text-base">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae
        vitae asperiores, laborum doloribus incidunt dolorem error alias, a
        temporibus vero facilis et, blanditiis assumenda. Aliquid mollitia,
        porro itaque iusto, veniam dolore pariatur molestiae quae dignissimos
        soluta eos natus, vero voluptas.
      </p>
      <button className=" cursor-pointer absolute  size-8 grid place-content-center bg-gray-300 top-2 rounded-full right-4">
        <Pencil1Icon className="size-4 text-gray-500" />
      </button>
    </div>
  );
}

function ProjectReviews() {}

function ProjectAnalytics() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="bg-gray-200 rounded p-2">
        20
        <p className="text-lg">Views</p>
      </div>
      <div className="bg-gray-200 rounded p-1">
        20
        <p className="text-lg">Views</p>
      </div>
      <div className="bg-gray-200 rounded p-1">
        20
        <p className="text-lg">Views</p>
      </div>
      <div className="bg-gray-200 rounded p-1">
        20
        <p className="text-lg">Views</p>
      </div>
    </div>
  );
}
