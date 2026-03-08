"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Shield,
  Zap,
  Heart,
  ArrowRight,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff
} from "lucide-react";

// SEO Imports
import { buildSEO, SEOOutput } from "@/components/SEO/seoEngine";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";
import SeoRenderer from "@/components/SEO/SeoRenderer";

// Animation Components
import OpeningStyle from "@/components/animations/openingstyle";
import RevealWithBorder from "@/components/animations/RevealWithBorder";

// Background
import Background from "@/components/Background";

// Modal Wrapper
import AuthPageWrapper from "@/components/auth/AuthPageWrapper";

const AUTH_BASE = process.env.NEXT_PUBLIC_AUTH_URL || "https://auth.cashog.com";
const useExternalAuth = process.env.NEXT_PUBLIC_USE_EXTERNAL_AUTH === "true";

export default function ResetPasswordPage() {
  const [step, setStep] = useState<"email" | "code" | "newPassword">("email");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [seo, setSeo] = useState<SEOOutput | null>(null);
  
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    number: false,
    uppercase: false,
    lowercase: false,
    special: false
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  useEffect(() => {
    setMounted(true);
    let mounted = true;

    buildSEO({
      route: "/reset",
      locale: SEO_CONFIG.defaultLocale
    })
      .then((result) => {
        if (mounted) setSeo(result);
      })
      .catch((err) => console.error("SEO hydration failed:", err));

    return () => {
      mounted = false;
    };
  }, []);

  // Password strength checker
  useEffect(() => {
    if (!newPassword) {
      setPasswordStrength(0);
      setPasswordRequirements({
        length: false,
        number: false,
        uppercase: false,
        lowercase: false,
        special: false
      });
      return;
    }

    const requirements = {
      length: newPassword.length >= 8,
      number: /\d/.test(newPassword),
      uppercase: /[A-Z]/.test(newPassword),
      lowercase: /[a-z]/.test(newPassword),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
    };

    setPasswordRequirements(requirements);

    const metCount = Object.values(requirements).filter(Boolean).length;
    setPasswordStrength(metCount);
  }, [newPassword]);

  // Check if passwords match
  useEffect(() => {
    if (confirmPassword) {
      setPasswordsMatch(newPassword === confirmPassword);
    } else {
      setPasswordsMatch(true);
    }
  }, [newPassword, confirmPassword]);

  const handleSendResetCode = () => {
    // API call to send reset code
    console.log("Send reset code to:", email);
    setStep("code");
  };

  const handleVerifyCode = () => {
    // API call to verify code
    console.log("Verify code:", resetCode);
    setStep("newPassword");
  };

  const handleResetPassword = () => {
    // API call to reset password
    console.log("Reset password");
    // Redirect to login
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-orange-500";
      case 3:
        return "bg-yellow-500";
      case 4:
        return "bg-green-500";
      default:
        return "bg-gray-700";
    }
  };

  const getStrengthText = () => {
    switch (passwordStrength) {
      case 0:
        return "Very Weak";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "";
    }
  };

  if (!mounted) {
    return (
      <>
        <Background />
        <main className="relative min-h-screen bg-[#0E111B] text-white">
          <div className="animate-pulse p-8 max-w-md mx-auto">
            <div className="h-96 bg-gray-800 rounded-lg mb-4"></div>
          </div>
        </main>
      </>
    );
  }

  if (useExternalAuth) {
    return (
      <>
        {seo && <SeoRenderer seo={seo} />}
        <Background />
        <iframe
          src={`${AUTH_BASE}/reset?redirect_back=https://cashog.com`}
          className="w-full h-[650px] rounded-3xl border border-neutral-800 shadow-2xl"
          frameBorder="0"
        />
      </>
    );
  }

  return (
    <>
      {seo && <SeoRenderer seo={seo} />}
      <Background />
      <main className="relative min-h-screen bg-[#0E111B] text-white">
        <OpeningStyle>
          <RevealWithBorder borderColor="border-gradient-rainbow">
            <AuthPageWrapper title="" subtitle="">
              {/* Header */}
              <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold text-white">
                  Reset Password
                </h1>
                <p className="text-gray-400 mt-2">
                  {step === "email" && "Enter your email to receive a reset code"}
                  {step === "code" && "Enter the verification code sent to your email"}
                  {step === "newPassword" && "Create your new password"}
                </p>
              </div>

              {/* Step Indicator */}
              <div className="flex items-center justify-center gap-2 mb-8">
                <div className={`w-2 h-2 rounded-full ${step === "email" ? "bg-green-500 w-4" : "bg-gray-700"}`} />
                <div className={`w-2 h-2 rounded-full ${step === "code" ? "bg-green-500 w-4" : "bg-gray-700"}`} />
                <div className={`w-2 h-2 rounded-full ${step === "newPassword" ? "bg-green-500 w-4" : "bg-gray-700"}`} />
              </div>

              {/* Step 1: Email Input */}
              {step === "email" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      className="w-full p-4 pl-12 rounded-xl bg-[#1A1F2E] border-2 border-[#2A2F3E] text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors duration-200"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSendResetCode}
                    disabled={!email}
                    className="relative w-full py-4 px-6 rounded-xl font-bold text-black bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                  >
                    Send Reset Code
                  </motion.button>
                </motion.div>
              )}

              {/* Step 2: Verification Code */}
              {step === "code" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="relative">
                    <input
                      type="text"
                      value={resetCode}
                      onChange={(e) => setResetCode(e.target.value)}
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                      className="w-full p-4 text-center text-2xl tracking-[0.5em] rounded-xl bg-[#1A1F2E] border-2 border-[#2A2F3E] text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors duration-200"
                    />
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep("email")}
                      className="w-1/3 py-4 rounded-xl font-medium text-white bg-[#2A2F3E] hover:bg-[#3A3F4E] transition-colors duration-200"
                    >
                      Back
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleVerifyCode}
                      disabled={resetCode.length !== 6}
                      className="w-2/3 py-4 rounded-xl font-bold text-black bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                    >
                      Verify Code
                    </motion.button>
                  </div>

                  <p className="text-center text-sm text-gray-400">
                    Didn't receive code?{" "}
                    <button 
                      onClick={handleSendResetCode}
                      className="text-green-500 font-medium hover:underline"
                    >
                      Resend
                    </button>
                  </p>
                </motion.div>
              )}

              {/* Step 3: New Password */}
              {step === "newPassword" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  {/* New Password Field */}
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New Password"
                      className="w-full p-4 pl-12 pr-12 rounded-xl bg-[#1A1F2E] border-2 border-[#2A2F3E] text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-500 transition-colors duration-200"
                    >
                      {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm Password"
                      className="w-full p-4 pl-12 pr-12 rounded-xl bg-[#1A1F2E] border-2 border-[#2A2F3E] text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-500 transition-colors duration-200"
                    >
                      {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                  </div>

                  {/* Password Mismatch Warning */}
                  {!passwordsMatch && confirmPassword && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-red-500 mt-1"
                    >
                      Passwords do not match
                    </motion.p>
                  )}

                  {/* Password Strength Indicator */}
                  {newPassword && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-3 overflow-hidden"
                    >
                      {/* Strength Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-400">Password strength:</span>
                          <span className="text-xs font-medium" style={{ 
                            color: passwordStrength <= 1 ? '#ef4444' : 
                                   passwordStrength === 2 ? '#f97316' : 
                                   passwordStrength === 3 ? '#eab308' : '#22c55e' 
                          }}>
                            {getStrengthText()}
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(passwordStrength / 4) * 100}%` }}
                            transition={{ duration: 0.3 }}
                            className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                          />
                        </div>
                      </div>

                      {/* Password Requirements */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-1.5">
                          {passwordRequirements.length ? (
                            <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5 text-gray-600" />
                          )}
                          <span className={passwordRequirements.length ? "text-green-500" : "text-gray-400"}>
                            8+ characters
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {passwordRequirements.number ? (
                            <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5 text-gray-600" />
                          )}
                          <span className={passwordRequirements.number ? "text-green-500" : "text-gray-400"}>
                            Number
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {passwordRequirements.uppercase ? (
                            <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5 text-gray-600" />
                          )}
                          <span className={passwordRequirements.uppercase ? "text-green-500" : "text-gray-400"}>
                            Uppercase
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {passwordRequirements.lowercase ? (
                            <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5 text-gray-600" />
                          )}
                          <span className={passwordRequirements.lowercase ? "text-green-500" : "text-gray-400"}>
                            Lowercase
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 col-span-2">
                          {passwordRequirements.special ? (
                            <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5 text-gray-600" />
                          )}
                          <span className={passwordRequirements.special ? "text-green-500" : "text-gray-400"}>
                            Special character
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Reset Password Button */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative pt-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleResetPassword}
                      disabled={!newPassword || !confirmPassword || !passwordsMatch || passwordStrength < 3}
                      className="group relative w-full rounded-xl px-6 py-4 flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none cursor-pointer"
                    >
                      <span className="text-lg md:text-xl font-bold text-black">Reset Password</span>
                      <ArrowRight className="text-black group-hover:translate-x-1 transition-transform duration-300" />
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1 text-green-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition whitespace-nowrap disabled:group-hover:opacity-0">
                        Secure your account <ArrowRight size={16} />
                      </div>
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="flex items-center justify-center gap-4 mt-8 text-sm"
              >
                <div className="flex items-center gap-1.5 text-gray-300">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span>Secured</span>
                </div>
                <span className="text-gray-600">•</span>
                <div className="flex items-center gap-1.5 text-gray-300">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Instant access</span>
                </div>
                <span className="text-gray-600">•</span>
                <div className="flex items-center gap-1.5 text-gray-300">
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>24/7 support</span>
                </div>
              </motion.div>

              {/* Footer */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="text-sm text-gray-300 mt-6 text-center"
              >
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="text-green-500 font-medium hover:underline"
                >
                  Sign in
                </Link>
              </motion.p>

              {/* Terms */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.7 }}
                className="text-xs text-center mt-6 text-gray-500"
              >
                By continuing, you agree to our{" "}
                <Link href="/terms" className="text-green-500 font-medium hover:underline">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-green-500 font-medium hover:underline">
                  Privacy Policy
                </Link>
              </motion.p>
            </AuthPageWrapper>
          </RevealWithBorder>
        </OpeningStyle>
        <div className="h-12"></div>
      </main>
    </>
  );
}
