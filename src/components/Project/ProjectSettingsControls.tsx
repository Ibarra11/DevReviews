import ProjectVisibilityToggle from "./ProjectVisibilityToggle";

export default function ProjectSettingsControls() {
  return (
    <div className="space-y-4">
      <div className="bg-white shadow rounded p-2">
        <h4 className="text-gray-600 text-base leading-5 mb-1">Visibility</h4>
        <p className="text-gray-500 text-sm mb-3">
          You can change who has permissions to see your project
        </p>
        <ProjectVisibilityToggle />
      </div>
      <div className="bg-white shadow rounded p-2">
        <h4 className="text-gray-600 text-base leading-5 mb-1">
          Delete Project
        </h4>
        <p className="text-gray-500 text-sm mb-3">
          Once you delete your project, it can't be undone!
        </p>
        <button className=" h-8 w-full rounded bg-red-300 text-white text-sm">
          Delete
        </button>
      </div>
    </div>
  );
}
