"use client";

import { useState } from "react";
import ModalRoot from "@/components/modals/ModalRoot";
import AuthModal from "@/components/modals/AuthModal";
import AuthPageWrapper from "@/app/auth/AuthPageWrapper";
import Link from "next/link";

export default function ResetPage() {
  // Toggle external auth in future
  const [useExternalAuth] = useState(false); // set true when external auth is ready

  return (
    <ModalRoot>
      <AuthModal>
        {useExternalAuth ? (
          // External auth iframe (hidden now)
          <iframe
            src="https://auth.cashog.com/reset?redirect_back=https://cashog.com"
            className="w-full h-[550px] rounded-2xl"
            frameBorder="0"
          />
        ) : (
          // Internal reset password form (visible now)
          <AuthPageWrapper
            title="Reset your password"
            subtitle="Enter your email to receive reset instructions"
          >
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 mb-4 rounded-lg bg-neutral-800 border border-neutral-700"
            />

            <button className="w-full py-3 bg-green-500 text-black font-bold rounded-lg hover:bg-green-600 transition">
              Send Reset Link
            </button>

            <p className="text-sm text-neutral-400 mt-6 text-center">
              Remembered your password?{" "}
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
