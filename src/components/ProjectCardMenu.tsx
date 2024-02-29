"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { DotsHorizontalIcon, TrashIcon } from "@radix-ui/react-icons";
export default function ProjectCardMenu() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className=" p-1.5 hover:bg-gray-200 rounded">
        <DotsHorizontalIcon className="size-4 text-gray-500" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side="bottom"
          align="start"
          className="p-2 min-w-36 bg-white shadow-lg rounded "
        >
          <DropdownMenu.Item className="text-base rounded-sm h-8">
            Settings
          </DropdownMenu.Item>
          <DropdownMenu.Item className="text-base rounded-sm h-8">
            Github
          </DropdownMenu.Item>
          {/* <DropdownMenu.Item className="text-sm rounded-sm "></DropdownMenu.Item> */}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
