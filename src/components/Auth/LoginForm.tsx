"use client";
import React from "react";
import AuthInput from "./AuthInput";
import AuthPassword from "./AuthPassword";
import AuthButton from "./AuthButton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFormState } from "react-dom";
import { loginUser } from "@/actions/users";

export default function LoginForm() {
  const [formState, formAction] = useFormState(loginUser, {
    status: "idle",
  });
  const router = useRouter();
  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (formState.status === "success") {
      if (formRef.current) {
        formRef.current.reset();
        router.push("/");
      }
    }
  }, [formState]);
  return (
    <form ref={formRef} action={formAction} className="w-full">
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
          error={undefined}
        />
        <AuthPassword
          name="password"
          icon="LockClosedIcon"
          label="Password"
          error={undefined}
        />
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
