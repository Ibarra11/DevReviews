"use client";
import { Project } from "@/types";
import ProjectEditModal from "./ProjectEditModal";
import { FormInput, FormRoot, FormRow } from "../Form";
import { editProjectInfo } from "@/actions/project";
import React, { FormEvent } from "react";
export default function ProjectInfo({
  id,
  title,
  headline,
  edit,
}: Pick<Project, "title" | "headline" | "id"> & { edit?: boolean }) {
  const [isOpen, setIsOpen] = React.useState(false);
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    await editProjectInfo.bind(null, id)(formData);
    await new Promise((res, rej) => {
      setTimeout(res, 1000);
    });
    setIsOpen(false);
  }

  return (
    <div className="bg-white shadow relative space-y-2 rounded  p-4">
      <h1 className="text-4xl text-gray-900 font-bold">{title}</h1>
      <h2 className="text-xl text-gray-700">{headline}</h2>
      {edit && (
        <ProjectEditModal
          open={isOpen}
          onOpenChange={setIsOpen}
          title="Project Info"
        >
          <FormRoot onSubmit={handleSubmit}>
            <FormRow>
              <FormInput
                label="Title"
                id="title"
                name="title"
                type="text"
                defaultValue={title}
              />
            </FormRow>
            <FormRow>
              <FormInput
                label="Headline"
                id="headline"
                name="headline"
                type="text"
                defaultValue={headline}
              />
            </FormRow>
          </FormRoot>
        </ProjectEditModal>
      )}
    </div>
  );
}
