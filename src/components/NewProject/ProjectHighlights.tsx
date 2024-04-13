import {
  MinusIcon,
  Pencil1Icon,
  PlusIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import NewProjectSectionLayout from "./NewProjectSectionLayout";
import EmptyHighlights from "./EmptyHighlights";
import React from "react";

import { ProjectHighlight, ProjectHighlightUpdate } from "@/types";
import ProjectHighlightEditor from "./ProjectHighlightEditor";

export default function ProjectHighlights({
  onHighlightUpdate,
  projectHighlights,
}: {
  onHighlightUpdate: (highlight: ProjectHighlight[]) => void;
  projectHighlights: ProjectHighlight[];
}) {
  const [isCreating, setIsCreating] = React.useState(false);

  function handleAddHighlight(highlight: ProjectHighlight) {
    const nextHighlights = [highlight, ...projectHighlights];
    onHighlightUpdate(nextHighlights);
    setIsCreating(false);
  }

  function handleDeleteHighlight(deleteIdx: number) {
    const nextHighlights = projectHighlights.filter((highlight, idx) => {
      if (idx === deleteIdx) return false;
      return true;
    });
    onHighlightUpdate(nextHighlights);
  }
  function handleEditHighlight(
    editedHighlight: ProjectHighlight,
    editIdx: number
  ) {
    const nextHighlights = projectHighlights.map((highlight, idx) => {
      if (idx === editIdx) {
        return editedHighlight;
      }
      return highlight;
    });
    onHighlightUpdate(nextHighlights);
  }
  return (
    <NewProjectSectionLayout>
      <div className="flex justify-between ">
        <div className="space-y-1">
          <h4 className="shrink-0 text-xl font-semibold w-60">
            Project Highlights
          </h4>
          <p className="text-sm">
            Feature the standout moments and achievements for your project,
            allow visitors to quickly grasp the project's significance and
            accomplishments.
          </p>
        </div>
        <button
          className="size-10 ml-8 bg-gray-500 grid place-content-center text-gray-50 rounded-full"
          type="button"
          onClick={() => setIsCreating(!isCreating)}
        >
          {!isCreating && <PlusIcon className="size-6" />}
          {isCreating && <MinusIcon className="size-6" />}
        </button>
      </div>
      <div className="space-y-8">
        {isCreating && (
          <ProjectHighlightEditor
            handleUpdateProjectHighlight={handleAddHighlight}
            close={() => setIsCreating(false)}
          />
        )}
        {projectHighlights.length === 0 && !isCreating && (
          <EmptyHighlights handleClick={() => setIsCreating(true)} />
        )}
        {projectHighlights.map(({ title, media, description }, idx) => (
          <ProjectHighlight
            handleUpdateProjectHighlight={(highlight: ProjectHighlight) =>
              handleEditHighlight(highlight, idx)
            }
            handleDeleteProjectHighlight={() => handleDeleteHighlight(idx)}
            title={title}
            media={media}
            description={description}
          />
        ))}
      </div>
    </NewProjectSectionLayout>
  );
}

function ProjectHighlight({
  title,
  media,
  description,
  handleUpdateProjectHighlight,
  handleDeleteProjectHighlight,
}: ProjectHighlightUpdate) {
  const [isEditing, setIsEditing] = React.useState(false);
  return isEditing ? (
    <ProjectHighlightEditor
      handleUpdateProjectHighlight={(...args) => {
        handleUpdateProjectHighlight(...args);
        setIsEditing(false);
      }}
      title={title}
      media={media}
      description={description}
      close={() => setIsEditing(false)}
    />
  ) : (
    <div className="relative w-full flex bg-white rounded overflow-hidden gap-8">
      <div className="flex-1 w-full">
        <img src={media} className="w-full h-[400px] object-cover" />
      </div>
      <div className="flex-1 py-6">
        <p className="text-xl">{title}</p>
        <p className="text-base">{description}</p>
      </div>
      <div className="absolute top-2 right-2 flex gap-1">
        <button
          type="button"
          className="size-8 grid place-content-center rounded-full  text-gray-500  hover:bg-gray-200 transition-colors"
          onClick={() => setIsEditing(true)}
        >
          <Pencil1Icon className="size-4" />
        </button>
        <button
          type="button"
          className="size-8 grid place-content-center rounded-full  text-gray-500 hover:bg-gray-200 transition-colors"
          onClick={handleDeleteProjectHighlight}
        >
          <TrashIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}
