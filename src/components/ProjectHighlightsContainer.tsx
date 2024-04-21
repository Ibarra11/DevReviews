"use client";

import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import React from "react";
import ProjectHighlightEditor from "./NewProject/ProjectHighlightEditor";
import { ProjectHighlight } from "@/types";
import { getSignature } from "@/actions/cloudinary";
import { generateCloudinaryFormData } from "@/lib/utils";
import { createProjectHighlight } from "@/actions/project";

export default function ProjectHighlihtsContainer({
  children,
  projectId,
  userId,
}: React.PropsWithChildren<{ projectId: number; userId: number }>) {
  const [isCreating, setIsCreating] = React.useState(false);

  async function handleAddHighlight({
    media,
    title,
    description,
  }: ProjectHighlight) {
    const { signature, timestamp } = await getSignature();
    const formData = generateCloudinaryFormData({
      media,
      signature,
      timestamp,
    });
    const req = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL as string, {
      method: "POST",
      body: formData,
    });
    const res = await req.json();
    await createProjectHighlight(
      projectId,
      userId,
      res.secure_url,
      title,
      description
    );

    setIsCreating(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-2 border-b border-gray-500">
        <h3 className="font-semibold text-xl">Project Highlights</h3>
        <button
          className="size-10 ml-8 bg-gray-500 grid place-content-center text-gray-50 rounded-full"
          type="button"
          onClick={() => setIsCreating(!isCreating)}
        >
          {!isCreating && <PlusIcon className="size-6" />}
          {isCreating && <MinusIcon className="size-6" />}
        </button>
      </div>
      {isCreating && (
        <ProjectHighlightEditor
          handleUpdateProjectHighlight={handleAddHighlight}
          close={() => setIsCreating(false)}
        />
      )}
      {children}
    </div>
  );
}
