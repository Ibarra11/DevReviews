"use client";
import { Pencil1Icon, Cross2Icon } from "@radix-ui/react-icons";
import * as Dialog from "@radix-ui/react-dialog";
export default function ProjectEditModal({
  children,
  title,
  onOpenChange,
  open,
}: React.PropsWithChildren<{
  title: string;
  onOpenChange: (open: boolean) => void;
  open: boolean;
}>) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger className="cursor-pointer absolute  size-8 grid place-content-center bg-gray-300 top-2 rounded-full right-4">
        <Pencil1Icon className="size-4 text-gray-500" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
        <Dialog.Content asChild>
          <div className="fixed inset-0 m-auto bg-white max-w-lg  w-full  max-h-[75vh] h-fit rounded-md">
            <div className="flex justify-between items-center border-b border-gray-500 p-4">
              <h2 className="text-gray-700 font-bold text-xl">Edit {title}</h2>
              <Dialog.Close className="grid place-content-center size-8 text-gray-500 outline-none rounded-sm  hover:text-gray-600">
                <span className="sr-only">Close Navigation</span>
                <Cross2Icon className="size-4 stroke-2 text-gray-600" />
              </Dialog.Close>
            </div>
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
