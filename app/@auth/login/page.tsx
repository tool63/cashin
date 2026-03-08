"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Shield,
  Zap,
  Heart,
  Chrome,
  Facebook,
  ArrowRight,
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

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [seo, setSeo] = useState<SEOOutput | null>(null);
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    setMounted(true);
    let mounted = true;

    buildSEO({
      route: "/login",
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContinueWithEmail = () => {
    setFormVisible(true);
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
          src={`${AUTH_BASE}/login?redirect_back=https://cashog.com`}
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
                  Welcome Back
                </h1>
                <p className="text-gray-400 mt-2">
                  Sign in to access your account
                </p>
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
                    <span>Continue with Google</span>
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
                    <span>Continue with Facebook</span>
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

              {/* Email Login Form */}
              {formVisible && (
                <>
                  {/* Email Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
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
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="relative mb-2"
                  >
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Password"
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

                  {/* Remember Me & Forgot Password */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="flex items-center justify-between mt-4 mb-6"
                  >
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded border-[#2A2F3E] bg-[#1A1F2E] text-green-500 focus:ring-green-500 focus:ring-offset-0"
                      />
                      <span className="text-sm text-gray-400">Remember me</span>
                    </label>
                    <Link
                      href="/reset"
                      className="text-sm text-green-500 font-medium hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </motion.div>

                  {/* Sign In Button */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="relative"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      className="group relative w-full rounded-xl px-6 py-4 flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                    >
                      <span className="text-lg md:text-xl font-bold text-black">Sign In</span>
                      <ArrowRight className="text-black group-hover:translate-x-1 transition-transform duration-300" />
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1 text-green-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                        Access your account <ArrowRight size={16} />
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
                transition={{ duration: 0.3, delay: 0.5 }}
                className="text-sm text-gray-300 mt-8 text-center"
              >
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-green-500 font-medium hover:underline"
                >
                  Sign up now
                </Link>
              </motion.p>

              {/* Terms */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="text-xs text-center mt-6 text-gray-500"
              >
                By signing in, you agree to our{" "}
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
