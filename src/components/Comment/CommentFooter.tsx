import { HeartIcon } from "@radix-ui/react-icons";
interface Props {
  likes: number;
  liked: boolean;
}
export default function CommentFooter({ likes = 5 }: Props) {
  return (
    <div className="flex items-center gap-2">
      <button type="button">
        <HeartIcon className="size-4 text-gray-500 stroke-2" />
        <span className="sr-only">Like comment</span>
      </button>
      <div className="flex gap-1 items-center text-gray-600 font-medium">
        <span className="inline-block -translate-y-[1px] text-sm align-to leading-3">
          {likes}
        </span>
        <span className="inline-block  align-top text-sm leading-none">
          Likes
        </span>
      </div>
    </div>
  );
}
