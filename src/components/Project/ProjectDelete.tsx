"use client";
import { deleteProjectSection } from "@/actions/project";
import * as Dialog from "@radix-ui/react-dialog";

import React from "react";
export default function ProjectDelete({
  projectId,
  userId,
}: {
  projectId: number;
  userId: number;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="bg-white shadow rounded p-2">
      <h4 className="text-gray-600 text-base leading-5 mb-1">Delete Project</h4>
      <p className="text-gray-500 text-sm mb-3">
        Once you delete your project, it can't be undone!
      </p>
      <ProjectDeleteModal
        projectId={projectId}
        open={isOpen}
        handleOpenChange={setIsOpen}
        userId={userId}
      />
    </div>
  );
}

function ProjectDeleteModal({
  open,
  handleOpenChange,
  projectId,
  userId,
}: React.PropsWithChildren<{
  open: boolean;
  handleOpenChange: (open: boolean) => void;
  projectId: number;
  userId: number;
}>) {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // await deleteProjectSection(projectId, userId);
    handleOpenChange(false);
  }
  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger className="h-8 w-full rounded bg-red-500 text-white text-sm hover:bg-red-600 transition-colors">
        Delete
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-0 m-auto w-96 max-h-[75vh] h-fit rounded-xl overflow-hidden bg-white text-gray-700">
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <h3 className=" text-xl font-bold">Delete Project</h3>
            <div className="space-y-6">
              <div className="space-y-1">
                <label htmlFor="delete" className="text-sm">
                  Type "delete project" to confirm:
                </label>
                <input
                  id="delete"
                  className="inline-block h-10 px-3 bg-gray-200 w-full rounded"
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => handleOpenChange(false)}
                  className="bg-gray-300 px-4 h-10 text-sm font-medium rounded-md"
                >
                  Cancel
                </button>
                <button className="bg-red-700 text-white px-4 h-10 text-sm font-medium rounded-md">
                  Delete
                </button>
              </div>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
