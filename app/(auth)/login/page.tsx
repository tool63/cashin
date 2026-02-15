"use client";

import React from "react";
import AuthLayout from "../layout";
import SocialButtons from "../SocialButtons";
import Link from "next/link";
import Meta from "@/components/seo/SeoEngine"; // For SEO

export default function LoginPage() {
  return (
    <AuthLayout>
      <Meta title="Login - Cashog" description="Login to access Cashog and start earning rewards today." />

      <div className="w-full max-w-md bg-gray-100 dark:bg-[#1A1F2B] rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-2 text-center">Welcome Back</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Login to access your rewards
        </p>

        <SocialButtons className="mb-6" />

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          <span className="px-2 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
        </div>

        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <button className="bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all">
            Login
          </button>
        </form>

        <div className="flex justify-between mt-4 text-sm">
          <Link href="/reset" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>
          <Link href="/signup" className="text-blue-500 hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
