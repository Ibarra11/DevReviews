import Pagination from "@/components/Pagination";
import ProjectCard from "@/components/ProjectCard";
import SearchBar from "@/components/SearchBar";
import { DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { PROJECT_DATA, ITEMS_PER_PAGE } from "@/lib/constants";

export default function Projects({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query ?? "";
  const page = searchParams?.page
    ? !Number.isNaN(Number(searchParams.page))
      ? Number(searchParams.page) * ITEMS_PER_PAGE < PROJECT_DATA.length
        ? Number(searchParams.page)
        : Math.ceil(PROJECT_DATA.length / ITEMS_PER_PAGE)
      : 1
    : 1;

  const totalProjects = PROJECT_DATA.filter((project) =>
    project.title.toLowerCase().startsWith(query.toLowerCase())
  );

  const currentProjects = totalProjects.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-4xl text-gray-800 font-bold">Projects</h2>
          {query && (
            <div className="relative top-[2px] flex items-center gap-2">
              <DoubleArrowRightIcon className="size-5 text-gray-500" />
              <p className="text-gray-600 text-base font-semibold">{query}</p>
            </div>
          )}
        </div>

        <SearchBar query={query} />
      </div>
      <div className="flex-1 mt-12 mb-2 py-2  overflow-y-auto">
        {/* the px-0.5 is because the projects is within a overflow-y: auto
        contianer, which sets overlflow x: hidden. So, it cuts off the outline
        of the projects. To account for this I add padding so the outline is not
        overflowing and getting cropped out. */}
        <div className="grid grid-cols-4 gap-6 px-0.5">
          {currentProjects.map((project, index) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
      <div className="h-12">
        <Pagination total={totalProjects.length} page={page} />
      </div>
    </>
  );
}
