"use client";

import { Chrome, Facebook, Apple } from "lucide-react";

export default function SocialButtons() {
  return (
    <div className="space-y-4 mb-6">
      {/* Google Login */}
      <button
        className="
          w-full flex items-center justify-center gap-3
          py-3 rounded-lg font-semibold
          bg-white text-black
          hover:bg-gray-100
          border border-gray-200
          transition-all duration-200 ease-in-out
        "
      >
        <Chrome size={20} />
        Continue with Google
      </button>

      {/* Apple Login */}
      <button
        className="
          w-full flex items-center justify-center gap-3
          py-3 rounded-lg font-semibold
          bg-black text-white
          hover:bg-neutral-800
          transition-all duration-200 ease-in-out
        "
      >
        <Apple size={20} />
        Continue with Apple
      </button>

      {/* Facebook Login */}
      <button
        className="
          w-full flex items-center justify-center gap-3
          py-3 rounded-lg font-semibold
          bg-[#1877F2] text-white
          hover:bg-[#155dcf]
          transition-all duration-200 ease-in-out
        "
      >
        <Facebook size={20} />
        Continue with Facebook
      </button>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-neutral-300 dark:bg-neutral-700" />
        <span className="px-3 text-neutral-500 text-sm">or</span>
        <div className="flex-1 h-px bg-neutral-300 dark:bg-neutral-700" />
      </div>
    </div>
  );
}
