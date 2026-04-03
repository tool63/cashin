// app/[country]/(auth)/login/page.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Gift,
  Sparkles,
  ArrowRight,
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

export default function LoginPage() {
  const params = useParams();
  const router = useRouter();
  const country = params?.country as string || "us";
  
  const [showPassword, setShowPassword] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  // Mount effect
  useEffect(() => {
    setMounted(true);
    
    // Check for saved email if remember me was checked
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleContinueWithEmail = () => {
    setFormVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Optionally redirect to home page after closing
    // router.push(`/${country}`);
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    try {
      window.location.href = `/api/auth/${provider}?action=login&country=${country}`;
    } catch (error) {
      console.error(`Error logging in with ${provider}:`, error);
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          rememberMe,
          country,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save email if remember me is checked
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      // Redirect to dashboard with country
      window.location.href = `/${country}/dashboard`;
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : "Invalid email or password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push(`/${country}/forgot-password`);
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
            src={`${AUTH_BASE}/login?redirect_back=https://cashog.com/${country}`}
            className="w-full max-w-md h-[650px] rounded-3xl border border-neutral-800 shadow-2xl"
            frameBorder="0"
            title="Login"
          />
        </main>
      </>
    );
  }

  return (
    <>
      <Background />
      <AuthModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Welcome Back"
        subtitle="Sign in to continue earning"
        showCloseButton={true}
        showCancelButton={true}
        cancelText="Cancel"
      >
        <div className="space-y-6">
          {/* Social Login */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSocialLogin("google")}
              disabled={isLoading}
              className="w-full group relative overflow-hidden rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center gap-3 px-4 py-3.5 bg-[#1A1F2E] border-2 border-blue-500/20 group-hover:border-blue-500 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                <GoogleIcon className="w-5 h-5" />
                <span>Continue with Google</span>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSocialLogin("facebook")}
              disabled={isLoading}
              className="w-full group relative overflow-hidden rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center gap-3 px-4 py-3.5 bg-[#1A1F2E] border-2 border-indigo-500/20 group-hover:border-indigo-500 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300">
                <FacebookIcon className="w-5 h-5" />
                <span>Continue with Facebook</span>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSocialLogin("apple")}
              disabled={isLoading}
              className="w-full group relative overflow-hidden rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center gap-3 px-4 py-3.5 bg-[#1A1F2E] border-2 border-gray-500/20 group-hover:border-gray-500 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-gray-500/20 transition-all duration-300">
                <AppleIcon className="w-5 h-5" />
                <span>Continue with Apple</span>
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
            <>
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

              {/* Sign Up Link */}
              <p className="text-center text-sm text-gray-400">
                Don't have an account?{" "}
                <Link href={`/${country}/signup`} className="text-green-500 hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </>
          )}

          {/* Email Login Form */}
          <AnimatePresence>
            {formVisible && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
                onSubmit={handleLogin}
              >
                {/* Email Field */}
                <div className="relative mb-4">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className={`w-full p-4 pl-12 rounded-xl bg-[#1A1F2E] border-2 ${
                      errors.email ? "border-red-500" : "border-[#2A2F3E]"
                    } text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors duration-200`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="relative mb-2">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className={`w-full p-4 pl-12 pr-12 rounded-xl bg-[#1A1F2E] border-2 ${
                      errors.password ? "border-red-500" : "border-[#2A2F3E]"
                    } text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors duration-200`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-500 transition-colors duration-200"
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>

                {/* Forgot Password & Remember Me */}
                <div className="flex items-center justify-between mb-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-[#2A2F3E] bg-[#1A1F2E] text-green-500 focus:ring-green-500 focus:ring-offset-0"
                    />
                    <span className="text-sm text-gray-400">Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-green-500 hover:text-green-400 hover:underline transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* General Error */}
                {errors.general && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-sm text-red-400 text-center">{errors.general}</p>
                  </div>
                )}

                {/* Login Button */}
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
                      <span className="text-lg md:text-xl font-bold text-white">Log In</span>
                      <ArrowRight className="text-white group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </motion.button>

                {/* Sign Up Link inside form */}
                <p className="mt-6 text-center text-sm text-gray-400">
                  Don't have an account?{" "}
                  <Link href={`/${country}/signup`} className="text-green-500 hover:underline font-medium">
                    Sign up
                  </Link>
                </p>

                {/* Warning Notice */}
                <div className="mt-6 p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
                  <p className="text-xs text-yellow-500 text-center leading-relaxed">
                    By logging in, you agree to our Terms of Service and Privacy Policy.
                    Users are prohibited from using multiple accounts or VPNs.
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
