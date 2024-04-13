import { UploadIcon } from "@radix-ui/react-icons";
import React from "react";

export default function FileUpload({
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
