import { getSession } from "@/lib/auth";
import { getAllUsers } from "@/actions/users";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }
  return <main className=""></main>;
}
