import ProjectEditButton from "./ProjectEditButton";

export default function ProjectSection({
  edit,
  id,
  title,
  description,
  img,
}: {
  edit?: boolean;
  id: any;
  title: any;
  description: any;
  img: any;
}) {
  return (
    <div className="relative rounded bg-white shadow pt-12 pb-8 px-4 space-y-4 text-gray-700">
      <h3 className="text-xl font-semibold ">{title}</h3>
      <img src={img} className="h-[400px] bg-gray-400 rounded" />
      <p className="text-base">{description}</p>
      {edit && <ProjectEditButton />}
    </div>
  );
}
