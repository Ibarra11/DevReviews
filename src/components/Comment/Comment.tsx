import CommentContent from "./CommentContent";
import CommentFooter from "./CommentFooter";
import CommentHeader from "./CommentHeader";

export default function Comment(comment: { comment: any }) {
  return (
    <li className="bg-white space-y-4 px-4 py-6 rounded-lg">
      <CommentHeader
        username={comment.username}
        created_at={comment.created_at}
      />
      <CommentContent content={comment.content} />
      <CommentFooter liked={false} likes={comment.likes} />
    </li>
  );
}
