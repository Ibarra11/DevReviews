import Comment from "./Comment";

export default function CommentList({
  comments,
  userId,
}: {
  comments: any;
  userId: number;
}) {
  return (
    <ul className="flex-1 space-y-4">
      {comments.map((comment) => (
        <Comment key={comment.id} userId={userId} {...comment} />
      ))}
    </ul>
  );
}
