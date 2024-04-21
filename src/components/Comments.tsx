import CommentForm from "./CommentForm";
import moment from "moment";
export default function Comments({
  projectId,
  userId,
  comments,
}: {
  projectId: number;
  userId: number;
  comments: any;
}) {
  console.log(userId);
  console.log(projectId);
  return (
    <div>
      <div className="flex items-start gap-8">
        <CommentList comments={comments} />
        <CommentForm projectId={projectId} userId={userId} />
      </div>
    </div>
  );
}

function CommentList({ comments }: { comments: any }) {
  return (
    <ul className="flex-1 space-y-4">
      {comments.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </ul>
  );
}

function Comment(comment: { comment: any }) {
  const formattedTime = moment(comment.created_at).fromNow();
  return (
    <li className=" bg-white p-4 rounded-lg">
      <div className="flex">
        <div className="size-8 bg-gray-300 rounded-full"></div>
        <p>{comment.username}</p>
        <time>{formattedTime}</time>
      </div>
      <p className="text-gray-700">{comment.content}</p>
    </li>
  );
}
