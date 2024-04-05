"use client";
import React from "react";
import * as Icons from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
type Icons = keyof typeof Icons;

type Props = React.ComponentProps<"input"> & {
  label: string;
  type: string;
  name: string;
  icon: Icons;
  error: string[] | undefined;
};
export default function AuthInput({ type, name, label, icon, error }: Props) {
  const id = React.useId();
  const Icon = Icons[icon];
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold" htmlFor={id}>
        {label}
      </label>
      <div className="space-y-2">
        <div className="relative">
          <span className="absolute grid place-content-center h-full size-12 items-center pointer-events-none">
            <Icon className="size-4" />
          </span>
          <input
            name={name}
            className={cn(
              "appearance-none w-full py-2 pl-12 pr-4 min-h-12 rounded bg-gray-100 border border-gray-300 outline-none focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-0 focus-visible:border-transparent",
              error && "border-red-500 "
            )}
            id={id}
            type={type}
          />
        </div>

        {error && <div className="text-xs text-red-500 mt-2">{error[0]}</div>}
      </div>
    </div>
  );
}
