"use client";

import React from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";

function SocialButtons() {
  return (
    <div className="flex gap-4 justify-center mb-6">
      <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow hover:shadow-lg transition">
        <FcGoogle size={24} /> Continue with Google
      </button>
      <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:shadow-lg transition">
        <FaFacebook size={24} /> Continue with Facebook
      </button>
    </div>
  );
}

export default function LoginPage() {
  return (
    <>
      <Meta title="Login - Cashog" description="Login to your Cashog account to start earning rewards." />

      <main className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 px-4">
        <h1 className="text-3xl font-bold mb-2 text-center">Welcome Back</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Login to access your rewards
        </p>

        <SocialButtons />

        <div className="flex items-center my-4 w-full max-w-sm">
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          <span className="mx-2 text-gray-500 dark:text-gray-400">OR</span>
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
        </div>

        <form className="flex flex-col gap-4 w-full max-w-sm">
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black font-bold py-3 rounded-lg shadow-lg hover:scale-105 transition"
          >
            Login
          </button>
        </form>

        <div className="flex justify-between mt-4 w-full max-w-sm text-sm text-gray-600 dark:text-gray-400">
          <Link href="/auth/reset" className="hover:underline">
            Forgot Password?
          </Link>
          <Link href="/auth/signup" className="hover:underline">
            Create Account
          </Link>
        </div>
      </main>
    </>
  );
}
