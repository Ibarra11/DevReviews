"use client";
import { FormEvent } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
export default function SearchBar({ query }: { query: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    const formData = new FormData(e.target as HTMLFormElement);
    const search = formData.get("search") as string;
    if (search) {
      params.set("query", search);
    } else {
      params.delete("query");
    }
    router.push(`${pathname}?${params.toString()}`);
    (e.target as HTMLFormElement).reset();
  }
  return (
    <form
      onSubmit={handleSearch}
      className="relative rounded-2xl h-12 w-[576px] overflow-hidden focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-pink-500"
    >
      <div className="absolute pointer-events-none grid place-content-center left-0 top-0 bottom-0 w-12">
        <MagnifyingGlassIcon className="size-6 text-gray-500" />
      </div>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="pl-12 bg-gray-200 shadow h-full w-full outline-none"
        type="search"
        id={"search"}
        name="search"
      />
      <button className="absolute right-0 top-0 bottom-0  min-w-20 bg-gray-300 w-auto">
        Search
      </button>
    </form>
  );
}
