"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

export default function SocialButtons() {
  return (
    <div className="flex flex-col gap-4 mb-4">
      <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0B0E1A] hover:shadow-lg transition">
        <FcGoogle size={20} /> Continue with Google
      </button>
      <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-blue-600 text-white hover:shadow-lg transition">
        <FaFacebookF size={18} /> Continue with Facebook
      </button>
    </div>
  );
}
