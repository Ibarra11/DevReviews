"use client";

import React, { FormEvent } from "react";
import {
  Cross2Icon,
  MinusIcon,
  Pencil1Icon,
  PlusIcon,
  UploadIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import { z } from "zod";

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

interface ProjectState {
  projectInfo: {
    title: string;
    headline: string;
    url: string;
    github: string;
  };
  projectMedia: string[];
  projectHighlights: ProjectHighlight[];
}

const initialState: ProjectState = {
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
    TKey extends keyof ProjectState["projectInfo"]
  >({
    field,
    value,
  }: {
    field: TKey;
    value: ProjectState["projectInfo"][TKey];
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

type Fn = <TKey extends keyof ProjectState["projectInfo"]>({
  field,
  value,
}: {
  field: TKey;
  value: ProjectState["projectInfo"][TKey];
}) => void;

function ProjectInfo({
  onFieldChange,
  values,
}: {
  onFieldChange: Fn;
  values: ProjectState["projectInfo"];
}) {
  return (
    <ProjectSectionContainer>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 flex-1">
        <div className="flex flex-col gap-1">
          <div>
            <label
              htmlFor="title"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              onChange={(e) => {
                onFieldChange({ field: "title", value: e.target.value });
              }}
              name="title"
              type="text"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="headline"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Headline
          </label>
          <input
            onChange={(e) => {
              onFieldChange({ field: "headline", value: e.target.value });
            }}
            value={values.headline}
            type="text"
            id="headline"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div>
          <label
            htmlFor="url"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            URL
          </label>
          <input
            onChange={(e) => {
              onFieldChange({ field: "url", value: e.target.value });
            }}
            value={values.url}
            type="text"
            id="url"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div>
          <label
            htmlFor="github"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Github
          </label>
          <input
            onChange={(e) => {
              onFieldChange({ field: "github", value: e.target.value });
            }}
            value={values.github}
            type="text"
            id="github"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
      </div>
    </ProjectSectionContainer>
  );
}

function ProjectSectionContainer({ children }: React.PropsWithChildren) {
  return <div className="flex flex-col gap-6">{children}</div>;
}

function ProjectMedia({
  media,
  onMediaUpdate,
}: {
  media: (string | null)[];
  onMediaUpdate: (newProjectMedia: (string | null)[]) => void;
}) {
  function handleMediaUpload(newMedia: string) {
    const index = media.indexOf(null);
    const nextMediaPreview = [...media];
    nextMediaPreview[index] = newMedia;
    onMediaUpdate(nextMediaPreview);
  }

  function handleDeleteMedia(index: number) {
    const nextMediaPreview = [...media];
    const shouldShiftMedia = media.findLastIndex(Boolean) !== index;
    if (!shouldShiftMedia) {
      nextMediaPreview[index] = null;
      onMediaUpdate(nextMediaPreview);
      return;
    }
    for (let i = index; i < nextMediaPreview.length - 1; i++) {
      nextMediaPreview[i] = nextMediaPreview[i + 1];
    }
    nextMediaPreview[nextMediaPreview.length - 1] = null;
    onMediaUpdate(nextMediaPreview);
  }
  return (
    <ProjectSectionContainer>
      <div className="space-y-1">
        <h4 className="shrink-0 text-xl font-semibold w-60">Project Media</h4>
        <p className="text-sm">
          Upload up to 6 images to showcase your project!
        </p>
      </div>
      <div className="w-full flex gap-8 h-[400px]">
        <div className="flex-1 w-full h-full">
          <FileUpload
            disabled={media.filter(Boolean).length === media.length}
            onMediaUpload={handleMediaUpload}
          />
        </div>
        <div className="flex-1 w-full pr-2 h-full overflow-y-auto grid grid-cols-2  gap-x-2 gap-y-4">
          {media.map((media, idx) => {
            return (
              <div
                key={idx}
                className="relative h-64 bg-white shadow rounded overflow-hidden p-1 border border-gray-200 "
              >
                <img
                  className="w-full h-full  object-cover rounded-sm"
                  src={media ?? "/empty_media.avif"}
                />
                {media && (
                  <button
                    type="button"
                    onClick={() => handleDeleteMedia(idx)}
                    className="absolute grid place-content-center size-8 rounded-full bg-black/50 top-2 right-2"
                  >
                    <Cross2Icon className="text-white size-4" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </ProjectSectionContainer>
  );
}

function ProjectHighlights({
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
    <ProjectSectionContainer>
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
          <EmptyHighlight handleClick={() => setIsCreating(true)} />
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
    </ProjectSectionContainer>
  );
}

function FileUpload({
  onMediaUpload,
  disabled,
}: {
  onMediaUpload: (media: string) => void;
  disabled: boolean;
}) {
  const id = React.useId();
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    const file = new FileReader();
    file.onload = () => {
      if (file.result) {
        onMediaUpload(file.result as string);
      }
    };
    file.readAsDataURL(target.files[0]);
  }
  return (
    <div className="w-full h-full">
      <label
        htmlFor={`media-${id}`}
        className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-400 border-dashed rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 has-[:disabled]:bg-gray-50 has-[:disabled]:cursor-not-allowed"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <UploadIcon className="size-8 mb-4 text-gray-500" />
          <p className="mb-2 text-sm text-gray-500 ">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500">PNG, JPG (MAX. 800x400px)</p>
        </div>
        <input
          disabled={disabled}
          onChange={handleInputChange}
          id={`media-${id}`}
          type="file"
          className="hidden"
          accept="image/png, image/jpeg"
        />
      </label>
    </div>
  );
}

interface ProjectHighlight {
  media: string;
  description: string;
  title: string;
}

interface ProjectHighlightUpdate extends ProjectHighlight {
  handleUpdateProjectHighlight: (highlight: ProjectHighlight) => void;
  handleDeleteProjectHighlight: () => void;
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

function ProjectHighlightEditor({
  handleUpdateProjectHighlight,
  close,
  ...props
}: Pick<ProjectHighlightUpdate, "handleUpdateProjectHighlight"> &
  Partial<ProjectHighlight> & { close: () => void }) {
  const [description, setDescription] = React.useState(props.description ?? "");
  const [media, setMedia] = React.useState<null | string>(props.media ?? null);
  const [title, setTitle] = React.useState(props.title ?? "");
  function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    handleUpdateProjectHighlight({
      media: media || "placeholder",
      description,
      title,
    });
  }
  function handleMediaUpload(media: string) {
    setMedia(media);
  }
  return (
    <div className="w-full flex gap-8">
      <div className="flex-1 w-full  h-[400px]">
        {media ? (
          <div className="relative h-full w-full rounded overflow-hidden">
            <img src={media} className="w-full h-full object-cover" />
            <button
              onClick={() => setMedia(null)}
              className="absolute grid place-content-center size-8 rounded-full bg-black/50 top-2 right-2"
            >
              <Cross2Icon className="text-white size-4" />
            </button>
          </div>
        ) : (
          <FileUpload onMediaUpload={handleMediaUpload} disabled={false} />
        )}
      </div>
      <div className="flex-1 flex flex-col gap-4 ">
        <div>
          <label
            htmlFor="title"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div className="flex-1 h-full flex flex-col gap-1">
          <label htmlFor="description" className="block  text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block p-2.5 w-full flex-1 text-sm  bg-gray-200 rounded-lg border border-gray-300"
          ></textarea>
        </div>
        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-gray-300 py-2 px-6 rounded"
          >
            Save Changes
          </button>
          <button
            onClick={close}
            type="button"
            className=" underline underline-offset-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyHighlight({ handleClick }: { handleClick: () => void }) {
  return (
    <div className="relative flex gap-8 items-center justify-center">
      <Image
        aria-hidden="true"
        alt=""
        src={"/empty_highlight.svg"}
        width={400}
        height={400}
      />
      <div>
        <p className="text-lg font-bold mb-1">Nothing to see for now</p>
        <p className="mb-4 text-base">
          Add some interesting highlights of your project
        </p>
        <button onClick={handleClick} className="bg-gray-300 py-2 px-6 rounded">
          Add Highlight
        </button>
      </div>
    </div>
  );
}
