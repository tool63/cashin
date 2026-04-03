// app/[country]/(auth)/forgot-password/page.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Gift,
  Sparkles,
} from "lucide-react";

// Animation Components
import OpeningStyle from "@/components/animations/openingstyle";
import CircleBorder from "@/components/animations/CircleBorder";

// Auth Components
import AuthPageWrapper from "@/components/auth/AuthPageWrapper";
import AuthModal from "@/components/modals/AuthModal";

// Background component
const Background = () => (
  <div className="fixed inset-0 -z-10">
    <div className="absolute inset-0 bg-gradient-to-br from-[#0A0D14] via-[#0E111B] to-[#121826]" />
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
  </div>
);

export default function ForgotPasswordPage() {
  const params = useParams();
  const router = useRouter();
  const country = params?.country as string || "us";
  
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  // Mount effect
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Optionally redirect to home page after closing
    // router.push(`/${country}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, country }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Show success state
      setIsSubmitted(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to send reset email");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = () => {
    setIsSubmitted(false);
    setEmail("");
    setError("");
  };

  const handleBackToLogin = () => {
    router.push(`/${country}/login`);
  };

  if (!mounted) {
    return (
      <main className="relative min-h-screen bg-[#0E111B] text-white">
        <div className="animate-pulse p-8 max-w-md mx-auto">
          <div className="h-96 bg-gray-800 rounded-lg mb-4"></div>
        </div>
      </main>
    );
  }

  return (
    <>
      <Background />
      <AuthModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Forgot Password?"
        subtitle="Enter your email address and we'll send you a link to reset your password"
        showCloseButton={true}
        showCancelButton={true}
        cancelText="Cancel"
      >
        <div className="space-y-6">
          {/* Success State */}
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  Check Your Email
                </h2>
                <p className="text-gray-400 text-sm mb-4">
                  We've sent a password reset link to{" "}
                  <span className="text-green-500 font-medium">{email}</span>
                </p>
                <p className="text-gray-500 text-xs mb-6">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
                
                <div className="space-y-3">
                  <button
                    onClick={handleResendEmail}
                    className="w-full py-2.5 rounded-lg bg-[#1A1F2E] hover:bg-[#2A2F3E] text-green-500 hover:text-green-400 text-sm font-medium transition-colors"
                  >
                    Try another email address
                  </button>
                  
                  <button
                    onClick={handleBackToLogin}
                    className="w-full py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium transition-all duration-200 text-sm"
                  >
                    Back to Log in
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Email Field */}
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    placeholder="Email Address"
                    className={`w-full p-4 pl-12 rounded-xl bg-[#1A1F2E] border-2 ${
                      error ? "border-red-500" : "border-[#2A2F3E]"
                    } text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors duration-200`}
                  />
                  {error && (
                    <div className="flex items-center gap-2 mt-2">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <p className="text-xs text-red-500">{error}</p>
                    </div>
                  )}
                </div>

                {/* Reset Password Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full rounded-xl px-6 py-4 flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg shadow-green-500/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span className="text-lg md:text-xl font-bold text-white">
                        Send Reset Link
                      </span>
                      <ArrowRight className="text-white group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </motion.button>

                {/* Back to Login Link */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleBackToLogin}
                    className="text-gray-400 hover:text-green-500 text-sm transition-colors"
                  >
                    ← Back to Log in
                  </button>
                </div>

                {/* Warning Notice */}
                <div className="p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
                  <p className="text-xs text-yellow-500 text-center leading-relaxed">
                    For security reasons, the reset link will expire in 1 hour.
                    If you didn't request this, please ignore this email.
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </AuthModal>
    </>
  );
}
