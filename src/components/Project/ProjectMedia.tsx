import ProjectEditButton from "./ProjectEditButton";

export default function ProjectMedia({
  edit,
  media,
}: {
  edit?: boolean;
  media: any;
}) {
  return (
    <div className="relative bg-white shadow rounded px-4 pt-12 pb-8 space-y-6">
      <h3 className="text-xl font-semibold ">Media</h3>
      <img className="h-[400px] rounded object-cover" src={media[0].src} />
      {/* <div className="bg-gray-300 h-[400px] rounded"></div> */}
      <div className="flex justify-center gap-2">
        {media.slice(1).map(({ id, src }) => (
          <img
            className="size-[100px] w-full object-cover"
            key={id}
            src={src}
          />
        ))}
        {/* <div className=" w-16 aspect-square bg-gray-500 rounded"></div>
        <div className=" w-16 aspect-square bg-gray-500 rounded"></div>
        <div className=" w-16 aspect-square bg-gray-500 rounded"></div>
        <div className=" w-16 aspect-square bg-gray-500 rounded"></div> */}
      </div>
      {edit && <ProjectEditButton />}
    </div>
  );
}
