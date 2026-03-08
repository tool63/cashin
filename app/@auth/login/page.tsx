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
  ArrowRight
} from "lucide-react";

// SEO Imports
import { buildSEO, SEOOutput } from "@/components/SEO/seoEngine";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";
import SeoRenderer from "@/components/SEO/SeoRenderer";

// Auth Components
import AuthPageWrapper from "@/components/auth/AuthPageWrapper";

const AUTH_BASE =
  process.env.NEXT_PUBLIC_AUTH_URL || "https://auth.cashog.com";

const useExternalAuth =
  process.env.NEXT_PUBLIC_USE_EXTERNAL_AUTH === "true";

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
      <div className="animate-pulse p-8">
        <div className="h-96 bg-gray-200/20 dark:bg-gray-700/20 rounded-lg mb-4"></div>
      </div>
    );
  }

  // Handle external auth (iframe)
  if (useExternalAuth) {
    return (
      <AuthPageWrapper title="" subtitle="">
        {seo && <SeoRenderer seo={seo} />}
        <iframe
          src={`${AUTH_BASE}/login?redirect_back=https://cashog.com`}
          className="w-full h-[650px] rounded-3xl border border-neutral-800 shadow-2xl"
          frameBorder="0"
        />
      </AuthPageWrapper>
    );
  }

  // Return ONLY the form content - no backgrounds, no modals, no animations
  return (
    <>
      {seo && <SeoRenderer seo={seo} />}
      
      <AuthPageWrapper title="" subtitle="">

        {/* HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-black dark:text-white">
            Welcome Back
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 mt-2">
            Sign in to access your account
          </p>
        </div>

        {/* SOCIAL LOGIN BUTTONS */}
        <div className="space-y-3 mb-4">
          {/* Google Login Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full group relative overflow-hidden rounded-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center justify-center gap-3 px-4 py-3.5 bg-white dark:bg-neutral-900 border-2 border-blue-500/20 group-hover:border-blue-500 rounded-xl text-black dark:text-white font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
              <Chrome className="w-5 h-5 text-blue-500" />
              <span>Continue with Google</span>
            </div>
          </motion.button>

          {/* Facebook Login Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full group relative overflow-hidden rounded-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center justify-center gap-3 px-4 py-3.5 bg-white dark:bg-neutral-900 border-2 border-indigo-500/20 group-hover:border-indigo-500 rounded-xl text-black dark:text-white font-medium hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300">
              <Facebook className="w-5 h-5 text-indigo-500" />
              <span>Continue with Facebook</span>
            </div>
          </motion.button>
        </div>

        {/* OR DIVIDER */}
        <div className="flex items-center my-8">
          <div className="flex-grow h-px bg-gradient-to-r from-transparent via-green-400/70 to-transparent dark:via-green-500/60"></div>
          <span className="px-4 text-sm font-semibold text-black dark:text-white">
            or
          </span>
          <div className="flex-grow h-px bg-gradient-to-r from-transparent via-blue-400/70 to-transparent dark:via-blue-500/60"></div>
        </div>

        {/* CONTINUE WITH EMAIL BUTTON */}
        {!formVisible && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleContinueWithEmail}
            className="w-full py-3.5 rounded-xl bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 text-black dark:text-white font-medium flex items-center justify-center gap-2 hover:border-green-500 dark:hover:border-green-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 group"
          >
            <Mail className="w-4 h-4 text-neutral-500 group-hover:text-green-500" />
            <span>Continue with Email</span>
          </motion.button>
        )}

        {/* EMAIL LOGIN FORM */}
        {formVisible && (
          <>
            {/* EMAIL FIELD */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="relative mb-4"
            >
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                className="w-full p-4 pl-12 rounded-xl bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 text-black dark:text-white placeholder-neutral-400 focus:border-green-500 focus:outline-none transition-colors duration-200"
              />
            </motion.div>

            {/* PASSWORD FIELD */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="relative mb-2"
            >
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full p-4 pl-12 pr-12 rounded-xl bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 text-black dark:text-white placeholder-neutral-400 focus:border-green-500 focus:outline-none transition-colors duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-green-500 transition-colors duration-200"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </motion.div>

            {/* REMEMBER ME & FORGOT PASSWORD */}
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
                  className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-700 text-green-500 focus:ring-green-500 focus:ring-offset-0 bg-white dark:bg-neutral-900"
                />
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  Remember me
                </span>
              </label>
              <Link
                href="/reset"
                className="text-sm text-green-600 dark:text-green-400 font-medium hover:underline"
              >
                Forgot password?
              </Link>
            </motion.div>

            {/* SIGN IN BUTTON */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="relative"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="group relative w-full rounded-xl px-6 py-4 flex items-center justify-center gap-3
                  bg-gradient-to-r from-yellow-400 via-green-400 to-green-500
                  hover:shadow-xl
                  transition-all duration-300
                  hover:-translate-y-1
                  cursor-pointer"
              >
                <span className="text-lg md:text-xl font-bold text-black">
                  Sign In
                </span>
                <ArrowRight className="text-black group-hover:translate-x-1 transition-transform duration-300" />
                
                {/* Button indicator */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1 text-green-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                  Access your account <ArrowRight size={16} />
                </div>
              </motion.button>
            </motion.div>
          </>
        )}

        {/* TRUST BADGES */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="flex items-center justify-center gap-4 mt-8 text-sm"
        >
          <div className="flex items-center gap-1.5 text-black dark:text-white">
            <Shield className="w-4 h-4 text-blue-500" />
            <span>Secured</span>
          </div>
          <span className="text-neutral-300 dark:text-neutral-600">•</span>
          <div className="flex items-center gap-1.5 text-black dark:text-white">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Instant access</span>
          </div>
          <span className="text-neutral-300 dark:text-neutral-600">•</span>
          <div className="flex items-center gap-1.5 text-black dark:text-white">
            <Heart className="w-4 h-4 text-rose-500" />
            <span>24/7 support</span>
          </div>
        </motion.div>

        {/* FOOTER */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="text-sm text-black dark:text-white mt-8 text-center"
        >
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-green-600 dark:text-green-400 font-medium hover:underline"
          >
            Sign up now
          </Link>
        </motion.p>

        {/* TERMS */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="text-xs text-center mt-6 text-neutral-500"
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
    </>
  );
}
