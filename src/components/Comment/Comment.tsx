import CommentContent from "./CommentContent";
import CommentFooter from "./CommentFooter";
import CommentHeader from "./CommentHeader";

export default function Comment({
  userId,
  comment_id,
  like_id,
  comment_content,
  commenter_username,
  comment_date,
  num_likes,
  user_liked,
}: {
  userId: number;
  like_id: number | null;
  comment_id: number;
  comment_content: string;
  commenter_username: string;
  comment_date: Date;
  num_likes: number;
  user_liked: number;
}) {
  return (
    <li className="bg-white space-y-4 px-4 py-6 rounded-lg">
      <CommentHeader username={commenter_username} date={comment_date} />
      <CommentContent content={comment_content} />
      <CommentFooter
        commentId={comment_id}
        userId={userId}
        liked={Boolean(user_liked)}
        likes={num_likes}
        like_id={like_id}
      />
    </li>
  );
}
