import ProjectDelete from "./ProjectDelete";
import ProjectVisibilityToggle from "./ProjectVisibilityToggle";

export default function ProjectSettingsControls({
  projectId,
  userId,
}: {
  projectId: number;
  userId: number;
}) {
  return (
    <div className="space-y-4">
      <div className="bg-white shadow rounded p-2">
        <h4 className="text-gray-600 text-base leading-5 mb-1">Visibility</h4>
        <p className="text-gray-500 text-sm mb-3">
          You can change who has permissions to see your project
        </p>
        <ProjectVisibilityToggle />
      </div>
      <ProjectDelete userId={userId} projectId={projectId} />
    </div>
  );
}
