"use client";

import { createLike, deleteLike } from "@/actions/likes";
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";

interface Props {
  userId: number;
  commentId: number;
  liked: boolean;
  like_id: number | null;
}

export default function LikeButton({
  userId,
  commentId,
  liked,
  like_id,
}: Props) {
  return (
    <button
      type="button"
      onClick={async () => {
        if (liked && like_id) {
          await deleteLike(like_id);
          return;
        }
        await createLike(commentId, userId);
      }}
    >
      {liked ? (
        <HeartFilledIcon className="block size-4 stroke-2 text-red-400" />
      ) : (
        <HeartIcon className="block size-4 text-gray-500 stroke-2" />
      )}

      <span className="sr-only">{liked ? "Unlike" : "Like"} comment</span>
    </button>
  );
}
