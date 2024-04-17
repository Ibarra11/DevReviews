import { cn } from "@/lib/utils";
import { Project } from "@/types";
import moment from "moment";
import * as Icons from "@radix-ui/react-icons";
type Icons = keyof typeof Icons;

export default function ProjectCard({
  id,
  date_created,
  headline,
  title,
  views,
  likes,
}: Project) {
  return (
    <a
      href={`/projects/settings/${id}`}
      className="relative flex flex-col justify-between group rounded-lg shadow bg-white px-6 py-4 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-500 hover:outline  hover:outline-2 hover:outline-pink-500 "
    >
      <div className="absolute right-4 top-2 flex gap-2 items-center">
        <Icons.CalendarIcon className="text-gray-400 size-4" />
        <time className="text-gray-600 text-sm">
          {date_created.toLocaleDateString("en-US")}
        </time>
      </div>
      <div className="space-y-1 mt-2 mb-3">
        <h2 className="text-gray-900 font-bold text-lg leading-5">{title}</h2>
        <p className="text-gray-700 text-base">{headline}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <IconWithStats icon="EyeOpenIcon" stat={views} />
        <IconWithStats
          className="justify-self-end"
          icon="HeartFilledIcon"
          stat={likes}
        />
        {/* <IconWithStats icon="ChatBubbleIcon" stat={comments} /> */}
        {/* <IconWithStats
          className="justify-self-end"
          icon="BarChartIcon"
          stat={avgRating}
        /> */}
      </div>
    </a>
  );
}

function IconWithStats({
  icon,
  stat,
  className,
}: {
  icon: Icons;
  stat: number;
  className?: string;
}) {
  const Icon = Icons[icon];
  return (
    <div className={cn("flex gap-2 items-center", className)}>
      <Icon className="text-gray-400 size-4" />
      <p className="text-gray-700 font-semibold text-base">{stat}</p>
    </div>
  );
}
