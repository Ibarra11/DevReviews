import Comment from "./Comment";

export default function CommentList({ comments }: { comments: any }) {
  return (
    <ul className="flex-1 space-y-4">
      {comments.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </ul>
  );
}
