import ProjectEditButton from "./ProjectEditButton";

export default function ProjectMedia({ edit }: { edit?: boolean }) {
  return (
    <div className="relative bg-white shadow rounded px-4 pt-12 pb-8 space-y-6">
      <h3 className="text-xl font-semibold ">Media</h3>
      <div className="bg-gray-300 h-[400px] rounded"></div>
      <div className="flex justify-center gap-2">
        <div className=" w-16 aspect-square bg-gray-500 rounded"></div>
        <div className=" w-16 aspect-square bg-gray-500 rounded"></div>
        <div className=" w-16 aspect-square bg-gray-500 rounded"></div>
        <div className=" w-16 aspect-square bg-gray-500 rounded"></div>
      </div>
      {edit && <ProjectEditButton />}
    </div>
  );
}
