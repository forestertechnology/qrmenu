import { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/forms/AuthForm";

export const metadata: Metadata = {
  title: "Login - On Our Menu",
  description: "Log in to your On Our Menu account to manage your restaurant's digital menu.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <AuthForm mode="login" />

      <p className="mt-10 text-center text-sm text-gray-500">
        Not a member?{" "}
        <Link
          href="/register"
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Create your account now
        </Link>
      </p>

      <div className="mt-4 text-center">
        <Link
          href="/"
          className="text-sm font-semibold text-gray-500 hover:text-gray-600"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
