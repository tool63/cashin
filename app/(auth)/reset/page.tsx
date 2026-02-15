"use client";

import React from "react";
import Link from "next/link";
import Meta from "@/components/seo/SeoEngine";

export default function ResetPage() {
  return (
    <>
      <Meta title="Reset Password - Cashog" description="Reset your Cashog account password securely and easily." />

      <main className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 px-4">
        <h1 className="text-3xl font-bold mb-2 text-center">Reset Your Password</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Enter your email to receive a secure reset link
        </p>

        <form className="flex flex-col gap-4 w-full max-w-sm">
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black font-bold py-3 rounded-lg shadow-lg hover:scale-105 transition"
          >
            Send Reset Link
          </button>
        </form>

        <div className="flex justify-between mt-4 w-full max-w-sm text-sm text-gray-600 dark:text-gray-400">
          <Link href="/auth/login" className="hover:underline">
            Back to Login
          </Link>
          <Link href="/auth/signup" className="hover:underline">
            Create Account
          </Link>
        </div>
      </main>
    </>
  );
}
