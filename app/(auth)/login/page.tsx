"use client";

import React from "react";
import Link from "next/link";
import SocialButtons from "../SocialButtons"; // Make sure this exists
import AuthLayout from "../layout";

export default function LoginPage() {
  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold mb-2 text-center">Welcome Back</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
        Login to access your rewards
      </p>

      {/* Social login */}
      <SocialButtons className="mb-6" />

      {/* Email login form */}
      <form className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="p-3 rounded-lg border border-gray-300 dark:border-gray-600"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 rounded-lg border border-gray-300 dark:border-gray-600"
        />
        <button className="bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black py-3 rounded-lg font-bold">
          Login
        </button>
      </form>

      {/* Links */}
      <div className="flex justify-between mt-4 w-full max-w-sm text-sm text-gray-600 dark:text-gray-400 mx-auto">
        <Link href="/signup" className="hover:underline">
          Don't have an account? Sign Up
        </Link>
        <Link href="/reset" className="hover:underline">
          Forgot Password?
        </Link>
      </div>
    </AuthLayout>
  );
}
