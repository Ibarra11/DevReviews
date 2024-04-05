import { db } from "@/lib/db";

export async function findUser(email: string) {
  try {
    const user = await db({
      query: `SELECT * FROM user WHERE email=?`,
      values: [email],
    });
    console.log(user);
    return user;
  } catch (e) {
    return false;
  }
}
