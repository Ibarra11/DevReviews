import { Cross2Icon } from "@radix-ui/react-icons";
import FileUpload from "../FileUpload";
import NewProjectSectionLayout from "./NewProjectSectionLayout";

export default function ProjectMedia({
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
    <NewProjectSectionLayout>
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
    </NewProjectSectionLayout>
  );
}
