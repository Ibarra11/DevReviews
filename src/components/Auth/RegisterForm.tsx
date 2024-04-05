"use client";

import React, { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import AuthInput from "./AuthInput";
import AuthPassword from "./AuthPassword";
import AuthButton from "./AuthButton";
import Link from "next/link";

import { registerUser } from "@/actions/users";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [formState, formAction] = useFormState(registerUser, {
    status: "idle",
  });
  const router = useRouter();
  const formRef = React.useRef<HTMLFormElement>(null);

  console.log(formState);

  useEffect(() => {
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
        <p className="text-lg font-bold">Get Started!</p>
        <p className="text-sm">Please enter your details.</p>
      </div>
      <div className="space-y-4 mb-8">
        <AuthInput
          type="email"
          name="email"
          icon="EnvelopeClosedIcon"
          label="Email"
          error={
            formState.status === "error" && formState.fieldErrors.email
              ? formState.fieldErrors.email
              : undefined
          }
        />
        <AuthInput
          type="text"
          name="username"
          icon="PersonIcon"
          label="Username"
          error={
            formState.status === "error" && formState.fieldErrors.username
              ? formState.fieldErrors.username
              : undefined
          }
        />
        <AuthPassword
          name="password"
          icon="LockClosedIcon"
          label="Password"
          error={
            formState.status === "error" && formState.fieldErrors.password
              ? formState.fieldErrors.password
              : undefined
          }
        />
      </div>
      <div className="max-w-xs mx-auto mb-4">
        <AuthButton>Register</AuthButton>
      </div>
      <div className="flex justify-center">
        <Link
          className="text-xs  underline underline-offset-2"
          href="/auth/login"
        >
          Already have an account?
        </Link>
      </div>
    </form>
  );
}
