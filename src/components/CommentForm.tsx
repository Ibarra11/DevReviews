"use client";

import { createComment } from "@/actions/comments";
import { FormEvent } from "react";

export default function CommentForm({
  projectId,
  userId,
  children,
}: React.PropsWithChildren<{
  projectId: number;
  userId: number;
}>) {
  async function handleCreateComment(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const createCommentAction = createComment.bind(null, userId, projectId);
    await createCommentAction(new FormData(e.target as HTMLFormElement));
    e.target.reset();
  }
  return (
    <div className="space-y-6 w-[500px]">
      <form onSubmit={handleCreateComment}>
        <h3 className="text-xl font-semibold">Discussion (20)</h3>
        <textarea
          aria-label="comment"
          rows={6}
          name="content"
          className="p-2.5 w-full text-sm text-gray-700 bg-gray-200 rounded-lg border-gray-300"
          placeholder="Write your thoughts here..."
        ></textarea>
        <button>Post Comment</button>
      </form>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
