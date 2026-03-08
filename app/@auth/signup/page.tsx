"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
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
  Star
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
import AuthModal from "@/components/modals/AuthModal";
import AuthPageWrapper from "@/components/auth/AuthPageWrapper";

const AUTH_BASE =
  process.env.NEXT_PUBLIC_AUTH_URL || "https://auth.cashog.com";

const useExternalAuth =
  process.env.NEXT_PUBLIC_USE_EXTERNAL_AUTH === "true";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
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
    setFocusedField("password");
    setShowStrength(true);
  };

  const handlePasswordBlur = () => {
    setFocusedField(null);
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
        return "bg-neutral-200 dark:bg-neutral-700";
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
        <main className="relative min-h-screen bg-transparent text-gray-900 dark:text-white">
          <div className="animate-pulse p-8 max-w-md mx-auto">
            <div className="h-96 bg-gray-200/20 dark:bg-gray-700/20 rounded-lg mb-4"></div>
          </div>
        </main>
      </>
    );
  }

  if (useExternalAuth) {
    return (
      <AuthModal>
        {seo && <SeoRenderer seo={seo} />}
        <Background />
        <iframe
          src={`${AUTH_BASE}/signup?redirect_back=https://cashog.com`}
          className="w-full h-[650px] rounded-3xl border border-neutral-800 shadow-2xl"
          frameBorder="0"
        />
      </AuthModal>
    );
  }

  return (
    <>
      {seo && <SeoRenderer seo={seo} />}

      <Background />

      <main className="relative min-h-screen bg-transparent text-gray-900 dark:text-white">

        <OpeningStyle>
          <RevealWithBorder borderColor="border-gradient-rainbow">
            <AuthModal>
              <AuthPageWrapper title="" subtitle="">

                {/* HEADER */}
                <div className="relative mb-10 text-center">
                  <h1 className="text-3xl font-bold text-black dark:text-white">
                    Get Instant Bonus
                  </h1>

                  {/* BONUS BADGE */}
                  <div className="absolute top-full right-0 mt-2 group">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>

                    <div className="relative flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full shadow-lg shadow-yellow-500/30 border border-white/20 dark:border-white/10 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-yellow-500/40 transition-all duration-300">
                      <Gift className="w-3.5 h-3.5 text-white" />
                      <span className="font-bold text-white text-sm">$0.50</span>
                      <Sparkles className="w-3 h-3 text-white/80" />
                    </div>
                  </div>
                </div>

                {/* SOCIAL LOGIN */}
                <div className="space-y-3 mb-4">
                  <button className="w-full group relative overflow-hidden rounded-xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center justify-center gap-3 px-4 py-3.5 bg-white dark:bg-neutral-900 border-2 border-blue-500/20 group-hover:border-blue-500 rounded-xl text-black dark:text-white font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                      <Chrome className="w-5 h-5 text-blue-500" />
                      <span>Sign up with Google</span>
                    </div>
                  </button>

                  <button className="w-full group relative overflow-hidden rounded-xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center justify-center gap-3 px-4 py-3.5 bg-white dark:bg-neutral-900 border-2 border-indigo-500/20 group-hover:border-indigo-500 rounded-xl text-black dark:text-white font-medium hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300">
                      <Facebook className="w-5 h-5 text-indigo-500" />
                      <span>Sign up with Facebook</span>
                    </div>
                  </button>
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
                  <button
                    onClick={handleContinueWithEmail}
                    className="w-full py-3.5 rounded-xl bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 text-black dark:text-white font-medium flex items-center justify-center gap-2 hover:border-green-500 dark:hover:border-green-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 group"
                  >
                    <Mail className="w-4 h-4 text-neutral-500 group-hover:text-green-500" />
                    <span>Continue with Email</span>
                  </button>
                )}

                {/* EMAIL SIGNUP FORM */}
                {formVisible && (
                  <>
                    {/* FULL NAME FIELD */}
                    <div className="relative mb-4">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        className="w-full p-4 pl-12 rounded-xl bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 text-black dark:text-white placeholder-neutral-400 focus:border-green-500 focus:outline-none transition-colors duration-200"
                      />
                    </div>

                    {/* EMAIL FIELD */}
                    <div className="relative mb-4">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email Address"
                        className="w-full p-4 pl-12 rounded-xl bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 text-black dark:text-white placeholder-neutral-400 focus:border-green-500 focus:outline-none transition-colors duration-200"
                      />
                    </div>

                    {/* PASSWORD FIELD */}
                    <div className="relative mb-2">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        onFocus={handlePasswordFocus}
                        onBlur={handlePasswordBlur}
                        placeholder="Create Password"
                        className="w-full p-4 pl-12 pr-12 rounded-xl bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 text-black dark:text-white placeholder-neutral-400 focus:border-green-500 focus:outline-none transition-colors duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-green-500 transition-colors duration-200"
                      >
                        {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                      </button>
                    </div>

                    {/* PASSWORD STRENGTH INDICATOR */}
                    {showStrength && formData.password && (
                      <div className="mb-4 space-y-3">
                        {/* Strength Bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-neutral-500">Password strength:</span>
                            <span className="text-xs font-medium" style={{ 
                              color: passwordStrength <= 1 ? '#ef4444' : 
                                     passwordStrength === 2 ? '#f97316' : 
                                     passwordStrength === 3 ? '#eab308' : '#22c55e' 
                            }}>
                              {getStrengthText()}
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                              style={{ width: `${(passwordStrength / 4) * 100}%` }}
                            />
                          </div>
                        </div>

                        {/* Password Requirements */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center gap-1.5">
                            {passwordRequirements.length ? (
                              <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                            ) : (
                              <XCircle className="w-3.5 h-3.5 text-neutral-300 dark:text-neutral-600" />
                            )}
                            <span className={passwordRequirements.length ? "text-green-500" : "text-neutral-400"}>
                              8+ characters
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {passwordRequirements.number ? (
                              <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                            ) : (
                              <XCircle className="w-3.5 h-3.5 text-neutral-300 dark:text-neutral-600" />
                            )}
                            <span className={passwordRequirements.number ? "text-green-500" : "text-neutral-400"}>
                              Number
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {passwordRequirements.uppercase ? (
                              <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                            ) : (
                              <XCircle className="w-3.5 h-3.5 text-neutral-300 dark:text-neutral-600" />
                            )}
                            <span className={passwordRequirements.uppercase ? "text-green-500" : "text-neutral-400"}>
                              Uppercase
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {passwordRequirements.lowercase ? (
                              <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                            ) : (
                              <XCircle className="w-3.5 h-3.5 text-neutral-300 dark:text-neutral-600" />
                            )}
                            <span className={passwordRequirements.lowercase ? "text-green-500" : "text-neutral-400"}>
                              Lowercase
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 col-span-2">
                            {passwordRequirements.special ? (
                              <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                            ) : (
                              <XCircle className="w-3.5 h-3.5 text-neutral-300 dark:text-neutral-600" />
                            )}
                            <span className={passwordRequirements.special ? "text-green-500" : "text-neutral-400"}>
                              Special character (!@#$%^&*)
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* CREATE ACCOUNT BUTTON */}
                    <button className="relative w-full py-4 px-6 rounded-xl font-bold text-white mt-4 mb-6 bg-gradient-to-r from-green-500 via-green-400 to-blue-500 hover:from-green-600 hover:via-green-500 hover:to-blue-600 transform hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-green-500/25">
                      Create Account
                    </button>
                  </>
                )}

                {/* TRUST BADGES */}
                <div className="flex items-center justify-center gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-1.5 text-black dark:text-white">
                    <Shield className="w-4 h-4 text-blue-500" />
                    <span>Secured</span>
                  </div>

                  <span className="text-neutral-300 dark:text-neutral-600">•</span>

                  <div className="flex items-center gap-1.5 text-black dark:text-white">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>Instant payout</span>
                  </div>

                  <span className="text-neutral-300 dark:text-neutral-600">•</span>

                  <div className="flex items-center gap-1.5 text-black dark:text-white">
                    <Heart className="w-4 h-4 text-rose-500" />
                    <span>Happy</span>
                  </div>
                </div>

                {/* FOOTER */}
                <p className="text-sm text-black dark:text-white mt-6 text-center">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-green-600 dark:text-green-400 font-medium hover:underline"
                  >
                    Log In
                  </Link>
                </p>

                {/* TERMS */}
                <p className="text-xs text-center mt-6 text-neutral-500">
                  By signing up, you agree to our{" "}
                  <Link href="/terms" className="text-green-500 font-medium hover:underline">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-green-500 font-medium hover:underline">
                    Privacy Policy
                  </Link>
                </p>

              </AuthPageWrapper>
            </AuthModal>
          </RevealWithBorder>
        </OpeningStyle>

        <div className="h-12"></div>
      </main>
    </>
  );
}
