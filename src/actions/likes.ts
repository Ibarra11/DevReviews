"use server";

import { db } from "@/lib/db";

export default async function createLike(commentId: number, userId: number) {
  const createLikesQuery = await db({
    query: `INSERT INTO Likes (comment_id, user_id)
            VALUES (?,?)`,
    values: [commentId, userId],
  });
  console.log(createLikesQuery);
}
