"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import "server-only";

export async function createComment(
  userId: number,
  projectId: number,
  formData: FormData
) {
  console.log("test");
  const content = formData.get("content");
  const res = await db({
    query: `INSERT INTO Comments (user_id, project_id, content)
                VALUES (?,?,?)`,
    values: [userId, projectId, content],
  });
  console.log(res);
  revalidatePath(`/projects/${projectId}`);
}
