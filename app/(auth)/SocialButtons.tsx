// app/(auth)/SocialButtons.tsx
"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

interface SocialButtonsProps {
  className?: string;
}

export default function SocialButtons({ className = "" }: SocialButtonsProps) {
  const handleSocialLogin = (provider: string) => {
    window.location.href = `/api/auth/${provider}`;
  };

  return (
    <div className={`flex flex-col gap-3 w-full ${className}`}>
      {/* Google Button */}
      <button
        onClick={() => handleSocialLogin("google")}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0b0e1a] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
      >
        <FcGoogle size={18} />
        <span className="font-medium text-gray-700 dark:text-gray-300">
          Continue with Google
        </span>
      </button>

      {/* Facebook Button */}
      <button
        onClick={() => handleSocialLogin("facebook")}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#1877F2] hover:bg-[#1666d9] dark:bg-[#1877F2] dark:hover:bg-[#1666d9] transition-colors text-sm"
      >
        <FaFacebook size={18} className="text-white" />
        <span className="font-medium text-white">
          Continue with Facebook
        </span>
      </button>
    </div>
  );
}
