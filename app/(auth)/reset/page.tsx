"use client";

import React from "react";
import Link from "next/link";
import AuthLayout from "../layout";

export default function ResetPage() {
  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold mb-2 text-center">Reset Your Password</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
        Enter your email to receive a secure reset link
      </p>

      {/* Reset form */}
      <form className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="p-3 rounded-lg border border-gray-300 dark:border-gray-600"
        />
        <button className="bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black py-3 rounded-lg font-bold">
          Send Reset Link
        </button>
      </form>

      {/* Links */}
      <div className="flex justify-between mt-4 w-full max-w-sm text-sm text-gray-600 dark:text-gray-400 mx-auto">
        <Link href="/login" className="hover:underline">
          Back to Login
        </Link>
        <Link href="/signup" className="hover:underline">
          Create Account
        </Link>
      </div>
    </AuthLayout>
  );
}
