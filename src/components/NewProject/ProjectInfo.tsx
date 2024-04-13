import { CreateProject } from "@/types";
import NewProjectSectionLayout from "./NewProjectSectionLayout";

type Fn = <TKey extends keyof CreateProject["projectInfo"]>({
  field,
  value,
}: {
  field: TKey;
  value: CreateProject["projectInfo"][TKey];
}) => void;

export default function ProjectInfo({
  onFieldChange,
  values,
}: {
  onFieldChange: Fn;
  values: CreateProject["projectInfo"];
}) {
  return (
    <NewProjectSectionLayout>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 flex-1">
        <div className="flex flex-col gap-1">
          <div>
            <label
              htmlFor="title"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              onChange={(e) => {
                onFieldChange({ field: "title", value: e.target.value });
              }}
              name="title"
              type="text"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="headline"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Headline
          </label>
          <input
            onChange={(e) => {
              onFieldChange({ field: "headline", value: e.target.value });
            }}
            value={values.headline}
            type="text"
            id="headline"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div>
          <label
            htmlFor="url"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            URL
          </label>
          <input
            onChange={(e) => {
              onFieldChange({ field: "url", value: e.target.value });
            }}
            value={values.url}
            type="text"
            id="url"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div>
          <label
            htmlFor="github"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Github
          </label>
          <input
            onChange={(e) => {
              onFieldChange({ field: "github", value: e.target.value });
            }}
            value={values.github}
            type="text"
            id="github"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
      </div>
    </NewProjectSectionLayout>
  );
}
