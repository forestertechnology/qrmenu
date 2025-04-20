import { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/forms/AuthForm";

export const metadata: Metadata = {
  title: "Register - On Our Menu",
  description: "Create your On Our Menu account to start managing your restaurant&apos;s digital menu.",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Start managing your restaurant&apos;s digital menu with QR codes
        </p>
      </div>

      <AuthForm mode="register" />

      <p className="mt-10 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Sign in here
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
