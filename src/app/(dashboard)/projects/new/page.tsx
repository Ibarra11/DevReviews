"use client";

import React, { FormEvent } from "react";
import { Cross2Icon, PlusIcon, UploadIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export default function NewProjectPage() {
  return (
    <div className="border border-red-500 space-y-8">
      <h2 className="text-3xl text-gray-800 font-bold">New Project</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="space-y-8 text-gray-700 border border-green-500"
      >
        <ProjectInfo />
        <ProjectMedia />
        <ProjectHighlights />
        <div className="flex justify-end">
          <button className="py-2 px-6 bg-pink-500 rounded text-white">
            Create Project
          </button>
          <button className="py-2 px-6  rounded text-gray-500 underline">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function ProjectSectionContainer({ children }: React.PropsWithChildren) {
  return <div className="flex flex-col gap-6">{children}</div>;
}

function ProjectMedia() {
  const [mediaPreview, setMediaPreview] = React.useState<(string | null)[]>(
    new Array(6).fill(null)
  );
  function handleMediaUpload(media: string) {
    const index = mediaPreview.indexOf(null);
    const nextMediaPreview = [...mediaPreview];
    nextMediaPreview[index] = media;
    setMediaPreview(nextMediaPreview);
  }

  function handleDeleteMedia(index: number) {
    const nextMediaPreview = [...mediaPreview];
    const shouldShiftMedia = mediaPreview.findLastIndex(Boolean) !== index;
    if (!shouldShiftMedia) {
      nextMediaPreview[index] = null;
      setMediaPreview(nextMediaPreview);
      return;
    }
    for (let i = index; i < nextMediaPreview.length - 1; i++) {
      nextMediaPreview[i] = nextMediaPreview[i + 1];
    }
    nextMediaPreview[nextMediaPreview.length - 1] = null;
    setMediaPreview(nextMediaPreview);
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
            disabled={
              mediaPreview.filter(Boolean).length === mediaPreview.length
            }
            onMediaUpload={handleMediaUpload}
          />
        </div>
        <div className="flex-1 w-full pr-2 h-full overflow-y-auto grid grid-cols-2  gap-x-2 gap-y-4">
          {mediaPreview.map((media, idx) => {
            return (
              <div className="relative h-64 bg-white shadow rounded overflow-hidden p-1 border border-gray-200 ">
                <img
                  className="w-full h-full  object-cover rounded-sm"
                  src={media ?? "/empty_media.avif"}
                />
                {media && (
                  <button
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

interface ProjectHighlight {
  media: string;
  description: string;
  title: string;
}

function ProjectHighlights() {
  const [isCreating, setIsCreating] = React.useState(false);
  const [highlights, setHighlights] = React.useState<ProjectHighlight[]>([]);
  function handleAddProjectHighlight(highlight: ProjectHighlight) {
    const nextHighlights = [highlight, ...highlights];
    setHighlights(nextHighlights);
    setIsCreating(false);
  }
  return (
    <ProjectSectionContainer>
      <div className="w-full flex flex-col  border border-red-500 space-y-6">
        <div className="flex justify-end">
          <button
            className="size-10 bg-gray-500 grid place-content-center text-gray-50 rounded-full"
            type="button"
            onClick={() => setIsCreating(true)}
          >
            <PlusIcon className="size-6" />
          </button>
        </div>
        <div className="space-y-8">
          {isCreating && (
            <CreateProjectHighlight
              handleAddProjectHighlight={handleAddProjectHighlight}
            />
          )}
          {highlights.length === 0 && !isCreating && (
            <EmptyHighlight handleClick={() => setIsCreating(true)} />
          )}
          {highlights.map(({ title, media, description }) => (
            <ProjectHighlight
              title={title}
              media={media}
              description={description}
            />
          ))}
        </div>
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
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    var file = new FileReader();
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
        htmlFor="dropzone-file"
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
          id="dropzone-file"
          type="file"
          className="hidden"
          accept="image/png, image/jpeg"
        />
      </label>
    </div>
  );
}

function ProjectHighlight({ title, media, description }: ProjectHighlight) {
  return (
    <div className="w-full flex gap-8">
      <div className="flex-1 w-full border border-red-500">
        <div className="w-full outline-dashed outline-1 outline-gray-300 h-[400px]">
          {media}
        </div>
      </div>
      <div className="flex-1">
        <p className="text-xl">{title}</p>
        <p className="text-base">{description}</p>
      </div>
    </div>
  );
}

function CreateProjectHighlight({
  handleAddProjectHighlight,
}: {
  handleAddProjectHighlight: (detail: ProjectHighlight) => void;
}) {
  const [description, setDescription] = React.useState("");
  const [media, setMedia] = React.useState("");
  const [title, setTitle] = React.useState("");
  function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    handleAddProjectHighlight({
      media: media || "placeholder",
      description,
      title,
    });
  }
  return (
    <div className="w-full flex gap-8">
      <div className="flex-1 w-full border border-red-500">
        {/* <FileUpload /> */}
      </div>
      <div className="flex-1">
        <div className="flex flex-col gap-4 border border-green-500">
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
          <div>
            <label
              htmlFor="description"
              className="block mb-1 text-sm font-medium"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="block p-2.5 w-full text-sm  bg-gray-200 rounded-lg border border-gray-300"
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center mt-8 border border-red-500">
          <button
            onClick={handleSubmit}
            className="bg-gray-300 py-2 w-1/3 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyHighlight({ handleClick }: { handleClick: () => void }) {
  return (
    <div className="relative flex gap-8 items-center justify-center border border-gray-300">
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

function ProjectInfo() {
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
            type="text"
            id="github"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
      </div>
    </ProjectSectionContainer>
  );
}
