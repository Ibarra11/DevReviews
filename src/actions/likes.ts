"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createLike(commentId: number, userId: number) {
  const createLikesQuery = await db({
    query: `INSERT INTO Likes (comment_id, user_id)
            VALUES (?,?)`,
    values: [commentId, userId],
  });
  revalidatePath("/project/[slug]", "page");
}

export async function deleteLike(like_id: number) {
  const createLikesQuery = await db({
    query: `DELETE FROM Likes
            WHERE id=?`,
    values: [like_id],
  });
  revalidatePath("/project/[slug]", "page");
}
