"use client";

import { redirect } from "next/navigation";
import React, { useRef } from "react";
import AuthInput from "./AuthInput";
import AuthPassword from "./AuthPassword";
import AuthButton from "./AuthButton";
import Link from "next/link";

export default function LoginForm({ login }: { login: any }) {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={ref}
      action={async (formData) => {
        const res = await login(formData);
        if (res) {
          ref.current?.reset();
          redirect("/");
        }
      }}
      className="w-full"
    >
      <div className="text-gray-700 space-y-1 text-center mb-8">
        <p className="text-lg font-bold">Welcome back</p>
        <p className="text-sm">Please enter your details.</p>
      </div>
      <div className="space-y-4 mb-8">
        <AuthInput
          type="email"
          name="email"
          icon="EnvelopeClosedIcon"
          label="Email"
        />
        <AuthPassword name="password" icon="LockClosedIcon" label="Password" />
      </div>
      <div className="max-w-xs mx-auto mb-4">
        <AuthButton>Login</AuthButton>
      </div>
      <div className="flex justify-center">
        <Link
          className="text-xs  underline underline-offset-2"
          href="/auth/register"
        >
          Need an account?
        </Link>
      </div>
    </form>
  );
}
