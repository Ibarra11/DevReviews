"use client";

import React, { FormEvent } from "react";
import { z } from "zod";
import ProjectMedia from "@/components/NewProject/ProjectMedia";
import ProjectHighlights from "@/components/NewProject/ProjectHighlights";
import { CreateProject, ProjectHighlight } from "@/types";
import ProjectInfo from "@/components/NewProject/ProjectInfo";

const projectSchema = z.object({
  projectInfo: z.object({
    title: z.string(),
    headline: z.string(),
    url: z.string(),
    github: z.string(),
  }),
  ProjectMedia: z.array(z.string()),
  ProjectHighlight: z.array(
    z.object({
      media: z.string(),
      description: z.string(),
      title: z.string(),
    })
  ),
});

const initialState: CreateProject = {
  projectInfo: {
    title: "",
    headline: "",
    url: "",
    github: "",
  },
  projectMedia: [],
  projectHighlights: [],
};

export default function NewProjectPage() {
  const [projectInfo, setProjectInfo] = React.useState(
    initialState.projectInfo
  );
  const [projectMedia, setProjectMedia] = React.useState<(string | null)[]>(
    new Array(6).fill(null)
  );
  const [projectHighlights, setProjectHiglights] = React.useState<
    ProjectHighlight[]
  >([]);

  function handleProjectInfoUpdate<
    TKey extends keyof CreateProject["projectInfo"]
  >({
    field,
    value,
  }: {
    field: TKey;
    value: CreateProject["projectInfo"][TKey];
  }) {
    const nextProjectInfo = { ...projectInfo, [field]: value };
    setProjectInfo(nextProjectInfo);
  }

  function handleProjectMediaUpdate(newProjectMedia: (string | null)[]) {
    setProjectMedia(newProjectMedia);
  }

  function handleProjectHiglightUpdate(
    nextProjectHighlights: ProjectHighlight[]
  ) {
    setProjectHiglights(nextProjectHighlights);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("projectInfo: ", projectInfo);
    console.log("projectMedia: ", projectMedia);
    console.log("projectHighlights: ", projectHighlights);
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl text-gray-800 font-bold">New Project</h2>
      <form onSubmit={handleSubmit} className="space-y-12 text-gray-700">
        <div className="space-y-8">
          <ProjectInfo
            values={projectInfo}
            onFieldChange={handleProjectInfoUpdate}
          />
          <ProjectMedia
            media={projectMedia}
            onMediaUpdate={handleProjectMediaUpdate}
          />
          <ProjectHighlights
            projectHighlights={projectHighlights}
            onHighlightUpdate={handleProjectHiglightUpdate}
          />
        </div>
        <div className="flex justify-end ">
          <button className="py-2 px-6 bg-pink-500 rounded text-white">
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
}

