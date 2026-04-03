// app/[country]/(auth)/forgot-password/page.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  ArrowRight,
  X,
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

// Background component
const Background = () => (
  <div className="fixed inset-0 -z-10">
    <div className="absolute inset-0 bg-gradient-to-br from-[#0A0D14] via-[#0E111B] to-[#121826]" />
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
  </div>
);

export default function ForgotPasswordPage() {
  const params = useParams();
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    window.history.back();
  };

  const handleResendEmail = () => {
    setIsSubmitted(false);
    setEmail("");
    setError("");
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

  if (!isModalOpen) return null;

  return (
    <>
      <Background />
      <main className="relative min-h-screen bg-[#0E111B] text-white flex items-center justify-center py-12 px-4">
        <OpeningStyle>
          <CircleBorder>
            <div className="w-full max-w-md mx-auto relative">
              {/* Close Button - Cross to cancel modal */}
              <button
                onClick={handleCloseModal}
                className="absolute -top-12 right-0 z-20 bg-[#0E111B] border border-[#2A2F3E] rounded-full p-2.5 text-gray-400 hover:text-white hover:bg-[#1A1F2E] transition-all duration-200 group"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>

              <AuthPageWrapper title="" subtitle="">
                {/* Header */}
                <div className="relative mb-8 text-center">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Forgot Password?
                  </h1>
                  <p className="text-gray-400 text-sm">
                    Enter your email address and we'll send you a link to reset your password
                  </p>
                  <div className="absolute -top-2 right-0 mt-2 group">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full shadow-lg shadow-yellow-500/30 border border-white/20 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-yellow-500/40 transition-all duration-300">
                      <Gift className="w-3.5 h-3.5 text-white" />
                      <span className="font-bold text-white text-sm">Help!</span>
                      <Sparkles className="w-3 h-3 text-white/80" />
                    </div>
                  </div>
                </div>

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
                      <p className="text-gray-400 text-sm mb-6">
                        We've sent a password reset link to{" "}
                        <span className="text-green-500 font-medium">{email}</span>
                      </p>
                      <p className="text-gray-500 text-xs mb-6">
                        Didn't receive the email? Check your spam folder or try again.
                      </p>
                      <button
                        onClick={handleResendEmail}
                        className="text-green-500 hover:text-green-400 text-sm font-medium transition-colors"
                      >
                        Try another email address →
                      </button>

                      {/* Back to Login Link */}
                      <div className="mt-8 pt-6 border-t border-[#2A2F3E]">
                        <Link
                          href={`/${country}/login`}
                          className="text-green-500 hover:text-green-400 text-sm font-medium transition-colors"
                        >
                          Back to Log in
                        </Link>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      onSubmit={handleSubmit}
                    >
                      {/* Email Field */}
                      <div className="relative mb-6">
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
                      <div className="mt-6 text-center">
                        <Link
                          href={`/${country}/login`}
                          className="text-gray-400 hover:text-green-500 text-sm transition-colors"
                        >
                          ← Back to Log in
                        </Link>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>

                {/* Warning Notice */}
                <div className="mt-6 p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
                  <p className="text-xs text-yellow-500 text-center leading-relaxed">
                    For security reasons, the reset link will expire in 1 hour.
                    If you didn't request this, please ignore this email.
                  </p>
                </div>
              </AuthPageWrapper>
            </div>
          </CircleBorder>
        </OpeningStyle>
      </main>
    </>
  );
}
