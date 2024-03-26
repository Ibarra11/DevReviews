import ProjectEditButton from "./ProjectEditButton";

export default function ProjectSection({ edit }: { edit?: boolean }) {
  return (
    <div className="relative rounded bg-white shadow pt-12 pb-8 px-4 space-y-4 text-gray-700">
      <h3 className="text-xl font-semibold ">Authentication</h3>
      <div className="h-[400px] bg-gray-400 rounded"></div>
      <p className="text-base">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae
        vitae asperiores, laborum doloribus incidunt dolorem error alias, a
        temporibus vero facilis et, blanditiis assumenda. Aliquid mollitia,
        porro itaque iusto, veniam dolore pariatur molestiae quae dignissimos
        soluta eos natus, vero voluptas.
      </p>
      {edit && <ProjectEditButton />}
    </div>
  );
}
