"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

interface SocialButtonsProps {
  className?: string;
}

export default function SocialButtons({ className }: SocialButtonsProps) {
  const handleSocialLogin = (provider: string) => {
    window.location.href = `/api/auth/${provider}`;
  };

  return (
    <div className={`flex flex-col gap-3 w-full ${className}`}>
      {/* Google Button */}
      <button
        onClick={() => handleSocialLogin("google")}
        className="flex items-center justify-center gap-3 p-3 sm:p-4 rounded-xl bg-white/80 dark:bg-[#0B0E1A]/80 border border-gray-200 dark:border-gray-700 backdrop-blur-md shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
      >
        <FcGoogle size={24} />
        <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
          Continue with Google
        </span>
      </button>

      {/* Facebook Button */}
      <button
        onClick={() => handleSocialLogin("facebook")}
        className="flex items-center justify-center gap-3 p-3 sm:p-4 rounded-xl bg-blue-600 border border-blue-600 shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
      >
        <FaFacebook size={20} className="text-white" />
        <span className="font-semibold text-white text-sm sm:text-base">
          Continue with Facebook
        </span>
      </button>
    </div>
  );
}
