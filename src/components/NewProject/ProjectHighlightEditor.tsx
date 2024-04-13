import { Cross2Icon } from "@radix-ui/react-icons";
import FileUpload from "../FileUpload";
import { ProjectHighlight, ProjectHighlightUpdate } from "@/types";
import React from "react";

type Props = Pick<ProjectHighlightUpdate, "handleUpdateProjectHighlight"> &
  Partial<ProjectHighlight> & { close: () => void };

export default function ProjectHighlightEditor({
  handleUpdateProjectHighlight,
  close,
  ...props
}: Props) {
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
