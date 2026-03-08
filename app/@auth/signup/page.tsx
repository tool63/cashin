"use client";

import Link from "next/link";
import SocialButtons from "@/components/auth/SocialButtons";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#0E111B] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0E111B] border border-[#2A2F3E] rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-white text-center mb-2">Sign Up</h1>
        <p className="text-gray-400 text-center mb-8">Create your account</p>

        {/* Social Buttons */}
        <SocialButtons />

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-green-500 hover:underline">
            Log in
          </Link>
        </p>

        <p className="text-xs text-center text-gray-500 mt-6">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="text-green-500 hover:underline">Terms</Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-green-500 hover:underline">Privacy Policy</Link>
        </p>

        <p className="text-xs text-gray-500 text-center mt-4">
          Users are prohibited from using multiple accounts, completing offers on another user's account, 
          or using any type of VPN, VPS, or Emulator software.
        </p>
      </div>
    </div>
  );
}
