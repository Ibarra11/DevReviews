import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
export default function Comments({
  projectId,
  userId,
  comments,
}: {
  projectId: number;
  userId: number;
  comments: any;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-gray-700">
        <h2 className="text-2xl font-bold">Comments</h2>
        <p className="text-gray-600 text-lg">({comments.length})</p>
      </div>
      <div className="flex items-start gap-8 text-gray-700">
        <CommentList userId={userId} comments={comments} />
        <CommentForm
          commentCount={comments.length}
          projectId={projectId}
          userId={userId}
        />
      </div>
    </div>
  );
}
