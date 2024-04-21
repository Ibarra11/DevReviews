"use server";
import "server-only";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createComment(
  userId: number,
  projectId: number,
  formData: FormData
) {
  const content = formData.get("content");
  const res = await db({
    query: `INSERT INTO Comments (user_id, project_id, content)
            VALUES (?,?,?)`,
    values: [userId, projectId, content],
  });
  console.log(res);
  revalidatePath("/project/[slug]", "page");
}
