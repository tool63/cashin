"use client";

import { useState } from "react";
import ModalRoot from "@/components/modals/ModalRoot";
import AuthModal from "@/components/modals/AuthModal";
import AuthPageWrapper from "./AuthPageWrapper";
import SocialButtons from "./SocialButtons";
import Link from "next/link";

export default function SignupPage() {
  // Toggle external auth in future
  const [useExternalAuth] = useState(false); // set true when external auth is ready

  return (
    <ModalRoot>
      <AuthModal>
        {useExternalAuth ? (
          // External auth iframe (hidden now)
          <iframe
            src="https://auth.cashog.com/signup?redirect_back=https://cashog.com"
            className="w-full h-[650px] rounded-2xl"
            frameBorder="0"
          />
        ) : (
          // Internal signup form (visible now)
          <AuthPageWrapper
            title="Create your account"
            subtitle="Sign up and start earning rewards"
          >
            <SocialButtons />

            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 mb-3 rounded-lg bg-neutral-800 border border-neutral-700"
            />

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
              Sign Up
            </button>

            <p className="text-sm text-neutral-400 mt-6 text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-green-400">
                Log In
              </Link>
            </p>
          </AuthPageWrapper>
        )}
      </AuthModal>
    </ModalRoot>
  );
}
