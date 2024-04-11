import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

interface Payload {
  userId: number;
  email: string;
  username: string;
}

interface Session {
  payload: Payload;
  expires: string;
  iat: number;
}

export function encrypt(payload: any) {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string);
  return token;
}

export async function decrypt(input: string): Promise<any> {
  const payload = (await jwt.verify(
    input,
    process.env.JWT_SECRET as string
  )) as any;
  return payload;
}

export async function createSession(payload: {
  userId: number;
  email: string;
  username: string;
}) {
  // Create the session
  // Expires in 1hr
  const expires = new Date(Date.now() + 1 * 60 * 60 * 1000);
  const session = encrypt({ payload, expires });

  // Save the session in a cookie
  cookies().set("session", session, {
    expires,
    httpOnly: true,
  });
  return true;
}

export async function getUser() {
  const session = await getSession();
  if (!session) {
    return null;
  }
  return session.payload;
}

export async function clearSession() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession(): Promise<Session | null> {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
