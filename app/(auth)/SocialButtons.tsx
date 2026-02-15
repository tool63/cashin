"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

interface SocialButtonsProps {
  className?: string; // allow optional className
}

export default function SocialButtons({ className }: SocialButtonsProps) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl shadow-md hover:shadow-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold transition">
        <FcGoogle size={20} />
        Continue with Google
      </button>
      <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl shadow-md hover:shadow-lg bg-blue-600 text-white font-semibold transition">
        <FaFacebook size={20} />
        Continue with Facebook
      </button>
    </div>
  );
}
