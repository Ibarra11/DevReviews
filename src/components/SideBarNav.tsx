import Link from "next/link";
import UserProfile from "./UserProfile";
import * as Icons from "@radix-ui/react-icons";
import { logout } from "@/lib/auth";
import { revalidatePath } from "next/cache";

type Icon = keyof typeof Icons;

const LINKS: { href: string; label: string; icon: Icon }[] = [
  {
    href: "/home",
    label: "Home",
    icon: "DashboardIcon",
  },
  {
    href: "/projects",
    label: "Projects",
    icon: "FileIcon",
  },
  {
    href: "/community",
    label: "Community",
    icon: "PersonIcon",
  },
];

export default function SideBarNav() {
  return (
    <div className="flex flex-col h-full bg-gray-300  px-6 py-12">
      <h1 className="text-gray-900 font-bold text-2xl mb-8">DevReviews</h1>
      <nav>
        <ul
          className="space-y-4
         text-gray-700"
        >
          {LINKS.map((link) => (
            <SideBarLink href={link.href} label={link.label} icon={link.icon} />
          ))}
        </ul>
      </nav>
      <form
        className="mt-auto"
        action={async () => {
          "use server";
          await logout();
          revalidatePath("/");
        }}
      >
        <button className="w-full bg-gray-600 h-12 text-base font-semibold text-gray-100 rounded">
          Logout
        </button>
      </form>
      <div className="bg-gray-200 h-px my-12"></div>
      <UserProfile />
    </div>
  );
}

function SideBarLink({
  href,
  label,
  icon,
}: {
  href: string;
  icon: Icon;
  label: string;
}) {
  const Icon = Icons[icon];
  return (
    <Link
      className="group flex h-12 items-center gap-2 px-2 rounded-sm hover:bg-gray-500 hover:text-gray-100  transition-colors"
      href={href}
    >
      <Icon className="size-4 text-gray-400 group-hover:text-gray-200" />
      {label}
    </Link>
  );
}
