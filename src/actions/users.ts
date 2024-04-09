"use server";
import { createSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { findUser } from "@/services/users";
import bcrypt from "bcrypt";
import { z } from "zod";

type IdleState = {
  status: "idle";
};

type SuccessState = {
  status: "success";
};

type ErrorState = {
  status: "error";
  fieldErrors: { [K in "username" | "password" | "email"]?: string[] };
};

type FormState = SuccessState | ErrorState | IdleState;

const registerSchema = z.object({
  username: z.string().min(5, "Username must be at least 5 characters long"),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(12, "Password must be atleast 5 characters long"),
});

export async function getAllUsers() {
  const users = await db({ query: "SELECT * FROM USER" });
  console.log(users);
  return users;
}

export async function loginUser(formData: FormData) {
  const { email, password } = Object.fromEntries(formData);
  const user = await findUser(email as string);
}

export async function registerUser(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
    username: formData.get("username"),
  };
  const validatedFormData = registerSchema.safeParse(rawFormData);
  if (validatedFormData.success) {
    const { username, password, email } = validatedFormData.data;
    const hashedPassword = bcrypt.hashSync(password as string, 10);
    const [user] = (await db({
      query: "SELECT * FROM User WHERE username=? OR email=?",
      values: [username, email],
    })) as any;

    if (user) {
      const fieldErrors: ErrorState["fieldErrors"] = {};
      if (user.email === email) {
        fieldErrors.email = ["This email is already taken"];
      }
      if (user.username === username) {
        fieldErrors.username = ["This username is already taken"];
      }
      return { status: "error", fieldErrors };
    }

    const createdUser = (await db({
      query: `
      INSERT INTO USER (username, email, password)
      VALUES(?,?,?)
    `,
      values: [username, email, hashedPassword],
    })) as any;

    createSession({ userId: createdUser.insertId, email, username });

    return { status: "success" };
  }
  return {
    status: "error",
    fieldErrors: validatedFormData.error.formErrors.fieldErrors,
  };
}
