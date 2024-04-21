"use client";

import createLike from "@/actions/likes";
import { HeartIcon } from "@radix-ui/react-icons";

interface Props {
  userId: number;
  commentId: number;
}

export default function LikeButton({ userId, commentId }: Props) {
  return (
    <button
      className="group border-red-600"
      type="button"
      onClick={async () => {
        await createLike(commentId, userId);
      }}
    >
      <HeartIcon className="block size-4 text-gray-500 stroke-2 group-hover:fill-red-500" />
      <span className="sr-only">Like comment</span>
    </button>
  );
}
