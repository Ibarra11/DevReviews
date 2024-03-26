import * as Switch from "@radix-ui/react-switch";
export default function ProjectVisibilityToggle() {
  return (
    <Switch.Root className="relative w-full h-8 bg-gray-200 rounded text-gray-600 outline-none focus-visible:outline-2 focus-visible:outline-pink-500">
      <Switch.Thumb className="peer absolute block top-0 h-full w-1/2 bg-gray-700 rounded transition-transform  data-[state=checked]:translate-x-full" />
      <span className="flex justify-center items-center absolute w-1/2 top-0 left-0 h-full  text-sm text-white peer-data-[state=checked]:text-gray-600 transition-colors">
        Public
      </span>
      <span className="flex justify-center items-center absolute w-1/2 top-0 right-0 h-full  text-sm text-gray-600 peer-data-[state=checked]:text-white transition-colors">
        Private
      </span>
    </Switch.Root>
  );
}
