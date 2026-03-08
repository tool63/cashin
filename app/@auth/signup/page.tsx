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
  Shield,
  Zap,
  Heart,
  Chrome,
  Facebook,
  ArrowRight,
  Gift,
  Sparkles,
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

// Auth Components
import AuthPageWrapper from "@/components/auth/AuthPageWrapper";

const AUTH_BASE = process.env.NEXT_PUBLIC_AUTH_URL || "https://auth.cashog.com";
const useExternalAuth = process.env.NEXT_PUBLIC_USE_EXTERNAL_AUTH === "true";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [showStrength, setShowStrength] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [seo, setSeo] = useState<SEOOutput | null>(null);

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

  useEffect(() => {
    setMounted(true);
    let mounted = true;

    buildSEO({
      route: "/signup",
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
          src={`${AUTH_BASE}/signup?redirect_back=https://cashog.com`}
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
              {/* Header with Bonus */}
              <div className="relative mb-10 text-center">
                <h1 className="text-3xl font-bold text-white">
                  Get Instant Bonus
                </h1>
                <div className="absolute top-full right-0 mt-2 group">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="relative flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full shadow-lg shadow-yellow-500/30 border border-white/20 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-yellow-500/40 transition-all duration-300">
                    <Gift className="w-3.5 h-3.5 text-white" />
                    <span className="font-bold text-white text-sm">$0.50</span>
                    <Sparkles className="w-3 h-3 text-white/80" />
                  </div>
                </div>
              </div>

              {/* Social Login */}
              <div className="space-y-3 mb-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full group relative overflow-hidden rounded-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center justify-center gap-3 px-4 py-3.5 bg-[#1A1F2E] border-2 border-blue-500/20 group-hover:border-blue-500 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                    <Chrome className="w-5 h-5 text-blue-500" />
                    <span>Sign up with Google</span>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full group relative overflow-hidden rounded-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center justify-center gap-3 px-4 py-3.5 bg-[#1A1F2E] border-2 border-indigo-500/20 group-hover:border-indigo-500 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300">
                    <Facebook className="w-5 h-5 text-indigo-500" />
                    <span>Sign up with Facebook</span>
                  </div>
                </motion.button>
              </div>

              {/* OR Divider */}
              <div className="flex items-center my-8">
                <div className="flex-grow h-px bg-gradient-to-r from-transparent via-green-400/70 to-transparent"></div>
                <span className="px-4 text-sm font-semibold text-white">or</span>
                <div className="flex-grow h-px bg-gradient-to-r from-transparent via-blue-400/70 to-transparent"></div>
              </div>

              {/* Continue with Email Button */}
              {!formVisible && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleContinueWithEmail}
                  className="w-full py-3.5 rounded-xl bg-[#1A1F2E] border-2 border-[#2A2F3E] text-white font-medium flex items-center justify-center gap-2 hover:border-green-500 hover:bg-[#2A2F3E] hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 group"
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
                            Special character (!@#$%^&*)
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Create Account Button */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="relative mt-6 mb-6"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      className="group relative w-full rounded-xl px-6 py-4 flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                    >
                      <span className="text-lg md:text-xl font-bold text-black">Create Account</span>
                      <ArrowRight className="text-black group-hover:translate-x-1 transition-transform duration-300" />
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1 text-green-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                        Get your $0.50 bonus <ArrowRight size={16} />
                      </div>
                    </motion.button>
                  </motion.div>
                </>
              )}

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="flex items-center justify-center gap-4 mt-4 text-sm"
              >
                <div className="flex items-center gap-1.5 text-gray-300">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span>Secured</span>
                </div>
                <span className="text-gray-600">•</span>
                <div className="flex items-center gap-1.5 text-gray-300">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Instant payout</span>
                </div>
                <span className="text-gray-600">•</span>
                <div className="flex items-center gap-1.5 text-gray-300">
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>Happy</span>
                </div>
              </motion.div>

              {/* Footer */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="text-sm text-gray-300 mt-6 text-center"
              >
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-green-500 font-medium hover:underline"
                >
                  Log In
                </Link>
              </motion.p>

              {/* Terms */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="text-xs text-center mt-6 text-gray-500"
              >
                By signing up, you agree to our{" "}
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
