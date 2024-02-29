"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const ITEMS_PER_PAGE = 20;
export default function Pagination({
  page,
  total,
}: {
  page: number;
  total: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    if (pageNumber === 1) {
      params.delete("page");
    } else {
      params.set("page", pageNumber.toString());
    }

    return `${pathname}?${params.toString()}`;
  };
  return (
    <div className="flex justify-between items-center h-full">
      <p className="text-gray-600 text-base">
        Displaying{" "}
        <span className="font-semibold">
          {total === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1}
        </span>{" "}
        to{" "}
        <span className="font-semibold">
          {Math.min(page * ITEMS_PER_PAGE, total)}
        </span>{" "}
        out of <span className="font-semibold">{total}</span>
      </p>
      <div className="flex gap-2">
        <button
          disabled={page === 1}
          onClick={() => {
            const nextUrl = createPageURL(page - 1);
            router.push(nextUrl);
          }}
          className="grid place-content-center bg-gray-300 size-7"
        >
          <ChevronLeftIcon className="size-4 text-gray-600" />
        </button>
        <button
          disabled={page * ITEMS_PER_PAGE > total}
          onClick={() => {
            const nextUrl = createPageURL(page + 1);
            router.push(nextUrl);
          }}
          className="grid place-content-center bg-gray-300 size-7"
        >
          <ChevronRightIcon className="size-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
