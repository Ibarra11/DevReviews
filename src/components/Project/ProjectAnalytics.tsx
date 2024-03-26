import {
  BarChartIcon,
  ChatBubbleIcon,
  EyeOpenIcon,
} from "@radix-ui/react-icons";

export default function ProjectAnalytics() {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-white rounded flex items-center gap-4">
        <div className="grid place-content-center size-8 bg-gray-400 rounded-full shrink-0">
          <EyeOpenIcon className="text-gray-300 size-4" />
        </div>
        <div className="space-y-1 text-gray-700">
          <p className="text-3xl leading-5 font-bold">22</p>
          <p className="text-sm">Views</p>
        </div>
      </div>
      <div className="p-4 bg-white rounded flex items-center gap-4">
        <div className="grid place-content-center size-8 bg-gray-400 rounded-full shrink-0">
          <EyeOpenIcon className="text-gray-300 size-4" />
        </div>
        <div className="space-y-1 text-gray-700">
          <p className="text-3xl leading-5 font-bold">100</p>
          <p className="text-sm">Likes</p>
        </div>
      </div>
      <div className="p-4 bg-white rounded flex items-center gap-4">
        <div className="grid place-content-center size-8 bg-gray-400 rounded-full shrink-0">
          <ChatBubbleIcon className="text-gray-300 size-4" />
        </div>
        <div className="space-y-1 text-gray-700">
          <p className="text-3xl leading-5 font-bold">22</p>
          <p className="text-sm">Comments</p>
        </div>
      </div>
      <div className="p-4 bg-white rounded flex items-center gap-4">
        <div className="grid place-content-center size-8 bg-gray-400 rounded-full shrink-0">
          <BarChartIcon className="text-gray-300 size-4" />
        </div>
        <div className="space-y-1 text-gray-700">
          <p className="text-3xl leading-5 font-bold">22</p>
          <p className="text-sm">Rating</p>
        </div>
      </div>
    </div>
  );
}
