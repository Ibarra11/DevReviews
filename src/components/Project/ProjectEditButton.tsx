import { Pencil1Icon } from "@radix-ui/react-icons";

export default function ProjectEditButton() {
  return (
    <button className="cursor-pointer absolute  size-8 grid place-content-center bg-gray-300 top-2 rounded-full right-4">
      <Pencil1Icon className="size-4 text-gray-500" />
    </button>
  );
}
