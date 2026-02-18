"use client";

import { useState } from "react";
import ModalRoot from "@/components/modals/ModalRoot";
import AuthModal from "@/components/modals/AuthModal";
import AuthPageWrapper from "@/components/auth/AuthPageWrapper";
import SocialButtons from "@/components/auth/SocialButtons";
import Link from "next/link";

export default function LoginPage() {
  // Flag to toggle external auth in future
  const [useExternalAuth] = useState(false); // set true in future

  return (
    <ModalRoot>
      <AuthModal>
        {useExternalAuth ? (
          // External Auth iframe (hidden now)
          <iframe
            src="https://auth.cashog.com/login?redirect_back=https://cashog.com"
            className="w-full h-[600px] rounded-2xl"
            frameBorder="0"
          />
        ) : (
          // Internal auth form (visible now)
          <AuthPageWrapper title="Welcome back" subtitle="Log in to continue">
            <SocialButtons />

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 mb-3 rounded-lg bg-neutral-800 border border-neutral-700"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 mb-4 rounded-lg bg-neutral-800 border border-neutral-700"
            />

            <button className="w-full py-3 bg-green-500 text-black font-bold rounded-lg hover:bg-green-600 transition">
              Log In
            </button>

            <p className="text-sm text-neutral-400 mt-6 text-center">
              Don’t have an account?{" "}
              <Link href="/signup" className="text-green-400">
                Sign Up
              </Link>
            </p>
          </AuthPageWrapper>
        )}
      </AuthModal>
    </ModalRoot>
  );
}
