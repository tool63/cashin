// app/[country]/(auth)/signup/page.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  User,
  Lock,
  CheckCircle,
  XCircle,
  Gift,
  Sparkles,
  ArrowRight,
  X,
} from "lucide-react";

// Animation Components - Using existing components from your project
import OpeningStyle from "@/components/animations/openingstyle";
import CircleBorder from "@/components/animations/CircleBorder";

// Auth Components
import AuthPageWrapper from "@/components/auth/AuthPageWrapper";
import PrimaryCTA from "@/components/cta/PrimaryCTA";

// Background component inline to avoid missing import
const Background = () => (
  <div className="fixed inset-0 -z-10">
    <div className="absolute inset-0 bg-gradient-to-br from-[#0A0D14] via-[#0E111B] to-[#121826]" />
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
  </div>
);

// Apple Icon Component
function AppleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78.99-.14 2.01-.78 3.14-.78 1.15 0 2.16.54 2.95 1.32-1.17.94-1.78 2.11-1.65 3.69.15 1.98 1.62 2.94 1.62 2.94-.25.62-.88 1.35-1.57 2.02-1.01 1.02-1.64 1.24-2.65.24-.06-.06-.1-.1-.14-.14zM14.25 5.19c.47-.56.78-1.34.7-2.19-.68.05-1.5.46-2 1.02-.46.51-.84 1.25-.73 2 .76.04 1.53-.38 2.03-.83z" />
    </svg>
  );
}

// Google Icon
function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

// Facebook Icon
function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.95.93-1.95 1.89v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z" />
    </svg>
  );
}

const AUTH_BASE = process.env.NEXT_PUBLIC_AUTH_URL || "https://auth.cashog.com";
const useExternalAuth = process.env.NEXT_PUBLIC_USE_EXTERNAL_AUTH === "true";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [showStrength, setShowStrength] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    number: false,
    uppercase: false,
    lowercase: false,
    special: false
  });

  // Mount effect
  useEffect(() => {
    setMounted(true);
  }, []);

  // Password strength calculation
  useEffect(() => {
    if (!formData.password) {
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
      length: formData.password.length >= 8,
      number: /\d/.test(formData.password),
      uppercase: /[A-Z]/.test(formData.password),
      lowercase: /[a-z]/.test(formData.password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
    };

    setPasswordRequirements(requirements);
    const metCount = Object.values(requirements).filter(Boolean).length;
    setPasswordStrength(metCount);
  }, [formData.password]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContinueWithEmail = () => {
    setFormVisible(true);
  };

  const handlePasswordFocus = () => {
    setShowStrength(true);
  };

  const handleSocialSignup = async (provider: string) => {
    setIsLoading(true);
    try {
      window.location.href = `/api/auth/${provider}?action=signup`;
    } catch (error) {
      console.error(`Error signing up with ${provider}:`, error);
      setIsLoading(false);
    }
  };

  const handleCreateAccount = async () => {
    // Validation
    if (!formData.fullName.trim()) {
      alert("Please enter your full name");
      return;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }
    if (passwordStrength < 3) {
      alert("Please create a stronger password (at least Good strength)");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Sign up failed");
      }

      // Redirect to dashboard or verification page
      window.location.href = "/dashboard";
    } catch (error) {
      alert(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Optionally redirect or close the modal
    window.history.back();
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
      case 5:
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
      case 5:
        return "Strong";
      default:
        return "";
    }
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

  if (useExternalAuth) {
    return (
      <>
        <Background />
        <main className="relative min-h-screen bg-[#0E111B] flex items-center justify-center p-4">
          <iframe
            src={`${AUTH_BASE}/signup?redirect_back=https://cashog.com`}
            className="w-full max-w-md h-[650px] rounded-3xl border border-neutral-800 shadow-2xl"
            frameBorder="0"
            title="Sign Up"
          />
        </main>
      </>
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
                {/* Header with Bonus */}
                <div className="relative mb-8 text-center">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Get Instant Bonus
                  </h1>
                  <p className="text-green-400 text-sm font-medium">
                    3671+ users sign up today
                  </p>
                  <div className="absolute top-0 right-0 mt-2 group">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full shadow-lg shadow-yellow-500/30 border border-white/20 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-yellow-500/40 transition-all duration-300">
                      <Gift className="w-3.5 h-3.5 text-white" />
                      <span className="font-bold text-white text-sm">$0.50</span>
                      <Sparkles className="w-3 h-3 text-white/80" />
                    </div>
                  </div>
                </div>

                {/* Social Login */}
                <div className="space-y-3 mb-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSocialSignup("google")}
                    disabled={isLoading}
                    className="w-full group relative overflow-hidden rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center justify-center gap-3 px-4 py-3.5 bg-[#1A1F2E] border-2 border-blue-500/20 group-hover:border-blue-500 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                      <GoogleIcon className="w-5 h-5" />
                      <span>Sign up with Google</span>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSocialSignup("facebook")}
                    disabled={isLoading}
                    className="w-full group relative overflow-hidden rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center justify-center gap-3 px-4 py-3.5 bg-[#1A1F2E] border-2 border-indigo-500/20 group-hover:border-indigo-500 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300">
                      <FacebookIcon className="w-5 h-5" />
                      <span>Sign up with Facebook</span>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSocialSignup("apple")}
                    disabled={isLoading}
                    className="w-full group relative overflow-hidden rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center justify-center gap-3 px-4 py-3.5 bg-[#1A1F2E] border-2 border-gray-500/20 group-hover:border-gray-500 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-gray-500/20 transition-all duration-300">
                      <AppleIcon className="w-5 h-5" />
                      <span>Sign up with Apple</span>
                    </div>
                  </motion.button>
                </div>

                {/* OR Divider */}
                <div className="flex items-center my-6">
                  <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
                  <span className="px-4 text-sm font-semibold text-gray-400">or</span>
                  <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
                </div>

                {/* Continue with Email Button */}
                {!formVisible && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleContinueWithEmail}
                    disabled={isLoading}
                    className="w-full py-3.5 rounded-xl bg-[#1A1F2E] border-2 border-[#2A2F3E] text-white font-medium flex items-center justify-center gap-2 hover:border-green-500 hover:bg-[#2A2F3E] hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Mail className="w-4 h-4 text-gray-400 group-hover:text-green-500" />
                    <span>Continue with Email</span>
                  </motion.button>
                )}

                {/* Email Signup Form */}
                {formVisible && (
                  <>
                    {/* Full Name Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative mb-4"
                    >
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        className="w-full p-4 pl-12 rounded-xl bg-[#1A1F2E] border-2 border-[#2A2F3E] text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors duration-200"
                      />
                    </motion.div>

                    {/* Email Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="relative mb-4"
                    >
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email Address"
                        className="w-full p-4 pl-12 rounded-xl bg-[#1A1F2E] border-2 border-[#2A2F3E] text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors duration-200"
                      />
                    </motion.div>

                    {/* Password Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="relative mb-2"
                    >
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        onFocus={handlePasswordFocus}
                        placeholder="Create Password"
                        className="w-full p-4 pl-12 pr-12 rounded-xl bg-[#1A1F2E] border-2 border-[#2A2F3E] text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-500 transition-colors duration-200"
                      >
                        {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                      </button>
                    </motion.div>

                    {/* Password Strength Indicator */}
                    {showStrength && formData.password && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mb-4 space-y-3 overflow-hidden"
                      >
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
                              animate={{ width: `${(passwordStrength / 5) * 100}%` }}
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
                              Special character (!@#$%^&*)
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Terms Agreement */}
                    <div className="flex items-start gap-2 mb-4">
                      <input
                        type="checkbox"
                        id="terms"
                        className="mt-1 w-4 h-4 rounded border-[#2A2F3E] bg-[#1A1F2E] text-green-500 focus:ring-green-500 focus:ring-offset-0"
                      />
                      <label htmlFor="terms" className="text-xs text-gray-400">
                        I agree to the{" "}
                        <Link href="/terms" className="text-green-500 hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-green-500 hover:underline">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>

                    {/* Warning Notice */}
                    <div className="mb-6 p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
                      <p className="text-xs text-yellow-500 text-center leading-relaxed">
                        Users are prohibited from using multiple accounts, completing offers on another user's account,
                        or using any type of VPN, VPS, or Emulator software.
                      </p>
                    </div>

                    {/* Sign Up Button - Using PrimaryCTA */}
                    <div className="flex justify-center">
                      <PrimaryCTA 
                        href="/dashboard" 
                        translationKey="sign_up"
                        fallback="Sign Up"
                      />
                    </div>

                    {/* Login Link */}
                    <p className="mt-6 text-center text-sm text-gray-400">
                      Already have an account?{" "}
                      <Link href="/login" className="text-green-500 hover:underline font-medium">
                        Log in
                      </Link>
                    </p>
                  </>
                )}
              </AuthPageWrapper>
            </div>
          </CircleBorder>
        </OpeningStyle>
      </main>
    </>
  );
}
