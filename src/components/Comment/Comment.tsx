import CommentContent from "./CommentContent";
import CommentFooter from "./CommentFooter";
import CommentHeader from "./CommentHeader";

export default function Comment({
  id,
  username,
  created_at,
  content,
  likes,
  userId,
}: {
  id: number;
  username: string;
  created_at: Date;
  content: string;
  likes: number;
  userId: number;
}) {
  return (
    <li className="bg-white space-y-4 px-4 py-6 rounded-lg">
      <CommentHeader username={username} created_at={created_at} />
      <CommentContent content={content} />
      <CommentFooter
        commentId={id}
        userId={userId}
        liked={false}
        likes={likes}
      />
    </li>
  );
}
