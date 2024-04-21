import LikeButton from "./LikeButton";
interface Props {
  userId: number;
  commentId: number;
  likes: number;
  liked: boolean;
}
export default function CommentFooter({ likes = 5, userId, commentId }: Props) {
  return (
    <div className="flex items-center gap-2">
      <LikeButton userId={userId} commentId={commentId} />
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
