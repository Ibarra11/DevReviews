"use client";
import { PROJECT_DATA } from "@/lib/constants";
import { Project } from "@/types";
import {
  BarChartIcon,
  ChatBubbleIcon,
  EyeOpenIcon,
  HeartFilledIcon,
  Pencil1Icon,
} from "@radix-ui/react-icons";
import { redirect } from "next/navigation";
import * as Switch from "@radix-ui/react-switch";

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

function ProjectVisibilityToggle() {
  return (
    <Switch.Root className="relative w-full h-8 bg-gray-200 rounded text-gray-600 outline-none focus-visible:outline-2 focus-visible:outline-pink-500">
      <Switch.Thumb className="peer absolute block top-0 h-full w-1/2 bg-gray-700 rounded transition-transform  data-[state=checked]:translate-x-full" />
      <span className="flex justify-center items-center absolute w-1/2 top-0 left-0 h-full  text-sm text-white peer-data-[state=checked]:text-gray-600 transition-colors">
        Public
      </span>
      <span className="flex justify-center items-center absolute w-1/2 top-0 right-0 h-full  text-sm text-gray-600 peer-data-[state=checked]:text-white transition-colors">
        Private
      </span>
    </Switch.Root>
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
        <ProjectVisibilityToggle />
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
    <div className="space-y-4">
      <div className="p-4 bg-white rounded flex items-center gap-4">
        <div className="grid place-content-center size-8 bg-gray-400 rounded-full shrink-0">
          <EyeOpenIcon className="text-gray-300 size-4" />
        </div>
        <div className="space-y-1 text-gray-700">
          <p className="text-3xl leading-5 font-bold">22</p>
          <p className="text-sm">Views</p>
        </div>
      </div>
      <div className="p-4 bg-white rounded flex items-center gap-4">
        <div className="grid place-content-center size-8 bg-gray-400 rounded-full shrink-0">
          <EyeOpenIcon className="text-gray-300 size-4" />
        </div>
        <div className="space-y-1 text-gray-700">
          <p className="text-3xl leading-5 font-bold">100</p>
          <p className="text-sm">Likes</p>
        </div>
      </div>
      <div className="p-4 bg-white rounded flex items-center gap-4">
        <div className="grid place-content-center size-8 bg-gray-400 rounded-full shrink-0">
          <ChatBubbleIcon className="text-gray-300 size-4" />
        </div>
        <div className="space-y-1 text-gray-700">
          <p className="text-3xl leading-5 font-bold">22</p>
          <p className="text-sm">Comments</p>
        </div>
      </div>
      <div className="p-4 bg-white rounded flex items-center gap-4">
        <div className="grid place-content-center size-8 bg-gray-400 rounded-full shrink-0">
          <BarChartIcon className="text-gray-300 size-4" />
        </div>
        <div className="space-y-1 text-gray-700">
          <p className="text-3xl leading-5 font-bold">22</p>
          <p className="text-sm">Rating</p>
        </div>
      </div>
    </div>
  );
}
