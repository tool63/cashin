"use client";

import Link from "next/link";
import SocialButtons from "@/components/auth/SocialButtons";

export default function SignupPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white text-center mb-2">Sign Up</h2>
      <p className="text-gray-400 text-center mb-6">Create your account</p>
      
      <SocialButtons />
      
      <p className="text-center text-gray-400 text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-green-500 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
