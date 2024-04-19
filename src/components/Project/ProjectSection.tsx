"use client";
import React, { FormEvent } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import FileUpload from "../FileUpload";
import {
  FormInput,
  FormRoot,
  FormRow,
  FormSubmitButton,
  FormTextArea,
} from "../Form";
import ProjectEditModal from "./ProjectEditModal";
import { deleteProjectSection, editProjectSection } from "@/actions/project";
import { deleteImgFromCloudinary, getSignature } from "@/actions/cloudinary";
import { generateCloudinaryFormData } from "@/lib/utils";

export default function ProjectSection({
  edit,
  id,
  projectId,
  title,
  description,
  img,
}: {
  edit?: boolean;
  id: any;
  projectId: any;
  title: any;
  description: any;
  img: any;
}) {
  const [media, setMedia] = React.useState(img);
  const [isOpen, setIsOpen] = React.useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const { title, description } = Object.fromEntries(formData) as any;
    let newMedia;
    // either we changed the img or removed it
    if (media !== img) {
      if (img) {
        await deleteImgFromCloudinary(img);
      }
      if (media) {
        const { signature, timestamp } = await getSignature();
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
        console.log(res);
        newMedia = res.secure_url;
      }
    }
    await editProjectSection({
      projectId,
      sectionId: id,
      title,
      description,
      media: newMedia ?? media,
    });

    await new Promise((res, rej) => {
      setTimeout(res, 1000);
    });
    setIsOpen(false);
  }
  return (
    <div className="relative rounded bg-white shadow pt-12 pb-8 px-4 space-y-4 text-gray-700">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold ">{title}</h3>
        <div className="flex gap-8">
          <img
            src={img}
            className="h-[400px] object-cover bg-gray-400 rounded"
          />
          <p className="text-base">{description}</p>
        </div>
      </div>
      {edit && (
        <ProjectEditModal
          open={isOpen}
          onOpenChange={setIsOpen}
          title={"Section"}
        >
          <FormRoot onSubmit={handleSubmit}>
            <div className="space-y-4">
              <FormRow>
                <FormInput
                  label="Title"
                  id={"title"}
                  name={"title"}
                  type="text"
                  defaultValue={title}
                />
              </FormRow>
              <FormRow>
                <FormTextArea
                  label="Description"
                  id="description"
                  name="description"
                  defaultValue={description}
                />
              </FormRow>
            </div>
            <div className="flex-1 w-full  h-[300px] shadow">
              {media ? (
                <div className="relative h-full w-full rounded overflow-hidden">
                  <img src={media} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setMedia(null)}
                    className="absolute grid place-content-center size-8 rounded-full bg-black/50 top-2 right-2"
                  >
                    <Cross2Icon className="text-white size-4" />
                  </button>
                </div>
              ) : (
                <FileUpload
                  onMediaUpload={(newMedia) => setMedia(newMedia)}
                  disabled={false}
                />
              )}
            </div>
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => deleteProjectSection(id, img)}
                className="text-base hover:underline"
              >
                Delete Section
              </button>
              <FormSubmitButton />
            </div>
          </FormRoot>
        </ProjectEditModal>
      )}
    </div>
  );
}
