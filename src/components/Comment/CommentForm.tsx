"use client";

import { createComment } from "@/actions/comments";
import { FormEvent } from "react";

export default function CommentForm({
  projectId,
  userId,
  commentCount,
  children,
}: React.PropsWithChildren<{
  projectId: number;
  userId: number;
  commentCount: number;
}>) {
  async function handleCreateComment(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const createCommentAction = createComment.bind(null, userId, projectId);
    await createCommentAction(new FormData(e.target as HTMLFormElement));
    e.target.reset();
  }
  return (
    <div className="space-y-6 flex-1 bg-white rounded-lg p-6">
      <form className="space-y-4" onSubmit={handleCreateComment}>
        <h3 className="text-xl font-semibold">Leave A Comment</h3>
        <textarea
          aria-label="comment"
          rows={6}
          name="content"
          className="p-2.5 w-full text-sm text-gray-700 bg-gray-100 rounded-lg border-gray-300"
          placeholder="Write your thoughts here..."
        ></textarea>
        <button className="px-3 h-10 font-medium text-base rounded bg-pink-500 text-white">
          Post comment
        </button>
      </form>
    </div>
  );
}
