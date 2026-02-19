"use client";

import { useState } from "react";
import AuthModal from "@/components/modals/AuthModal";
import AuthPageWrapper from "@/components/auth/AuthPageWrapper";
import SocialButtons from "@/components/auth/SocialButtons";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

const AUTH_BASE =
  process.env.NEXT_PUBLIC_AUTH_URL || "https://auth.cashog.com";

const useExternalAuth =
  process.env.NEXT_PUBLIC_USE_EXTERNAL_AUTH === "true";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  if (useExternalAuth) {
    return (
      <AuthModal>
        <iframe
          src={`${AUTH_BASE}/signup?redirect_back=https://cashog.com`}
          className="w-full h-[650px] rounded-3xl border border-neutral-800 shadow-2xl"
          frameBorder="0"
        />
      </AuthModal>
    );
  }

  return (
    <AuthModal>
      <AuthPageWrapper
        title="Create your account"
        subtitle="Sign up and start earning rewards"
      >
        {/* Social Login */}
        <SocialButtons />

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-neutral-700"></div>
          <span className="px-3 text-sm text-neutral-500">OR</span>
          <div className="flex-grow border-t border-neutral-700"></div>
        </div>

        {/* Full Name */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-4 rounded-xl bg-neutral-900/80 border border-neutral-700 
                       text-white placeholder-neutral-500
                       focus:outline-none focus:ring-2 focus:ring-green-400 
                       transition-all duration-300"
          />
        </div>

        {/* Email */}
        <div className="relative mb-4">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-4 rounded-xl bg-neutral-900/80 border border-neutral-700 
                       text-white placeholder-neutral-500
                       focus:outline-none focus:ring-2 focus:ring-green-400 
                       transition-all duration-300"
          />
        </div>

        {/* Password */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-4 pr-12 rounded-xl bg-neutral-900/80 border border-neutral-700 
                       text-white placeholder-neutral-500
                       focus:outline-none focus:ring-2 focus:ring-green-400 
                       transition-all duration-300"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 
                       text-neutral-400 hover:text-green-400 transition"
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>

        {/* Premium CTA */}
        <button
          className="w-full py-4 rounded-xl font-bold text-black 
                     bg-gradient-to-r from-yellow-400 via-green-400 to-green-500
                     hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/30
                     active:scale-[0.98]
                     transition-all duration-300"
        >
          🎁 Start Earning Now
        </button>

        {/* Trust Microcopy */}
        <p className="text-xs text-neutral-500 mt-4 text-center">
          🔒 Secure signup • No credit card required • Instant access
        </p>

        {/* Footer */}
        <p className="text-sm text-neutral-400 mt-6 text-center">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-green-400 hover:text-green-300 transition"
          >
            Log In
          </Link>
        </p>
      </AuthPageWrapper>
    </AuthModal>
  );
}
