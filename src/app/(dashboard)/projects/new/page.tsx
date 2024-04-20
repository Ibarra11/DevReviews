"use client";

import React from "react";

import { z } from "zod";
import ProjectMedia from "@/components/NewProject/ProjectMedia";
import ProjectHighlights from "@/components/NewProject/ProjectHighlights";
import { CreateProject, ProjectHighlight } from "@/types";
import ProjectInfo from "@/components/NewProject/ProjectInfo";
import { createProject } from "@/actions/project";
import { generateCloudinaryFormData } from "@/lib/utils";
import { getSignature } from "@/actions/cloudinary";

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { signature, timestamp } = await getSignature();

    const projectMediaPromise = Promise.all(
      projectMedia
        .filter((media): media is string => Boolean(media))
        .map(async (media) => {
          const formData = generateCloudinaryFormData({
            media,
            signature,
            timestamp,
          });

          const req = await fetch(
            process.env.NEXT_PUBLIC_CLOUDINARY_URL as string,
            {
              method: "POST",
              body: formData,
            }
          );
          const res = await req.json();
          return res.secure_url as string;
        })
    );

    const projectHighlightsPromise = Promise.all(
      projectHighlights.map(async (highlight) => {
        const formData = generateCloudinaryFormData({
          media: highlight.media,
          signature,
          timestamp,
        });

        const req = await fetch(
          process.env.NEXT_PUBLIC_CLOUDINARY_URL as string,
          {
            method: "POST",
            body: formData,
          }
        );
        const res = await req.json();
        return { ...highlight, media: res.secure_url as string };
      })
    );

    const [uploadedProjectMedia, uploadedProjectHighlights] = await Promise.all(
      [projectMediaPromise, projectHighlightsPromise]
    );

    createProject({
      projectHighlights: uploadedProjectHighlights,
      projectInfo,
      projectMedia: uploadedProjectMedia,
    });
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
