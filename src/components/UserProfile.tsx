import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function UserProfile() {
  const user = await getUser();
  if (!user) {
    redirect("/auth/login");
  }
  return (
    <div className="flex items-center gap-4 ">
      <div className="h-8 w-8 bg-gray-500 rounded-full"></div>
      <div className="flex flex-col gap-1 text-gray-500">
        <h4 className="text-lg">{user.username}</h4>
        <Link href="/account" className="text-sm">
          View Account
        </Link>
      </div>
    </div>
  );
}
