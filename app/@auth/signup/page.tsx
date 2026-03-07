"use client";

import { useState, useEffect } from "react";
import AuthModal from "@/components/modals/AuthModal";
import AuthPageWrapper from "@/components/auth/AuthPageWrapper";
import SocialButtons from "@/components/auth/SocialButtons";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Mail,
  User,
  Lock,
  CheckCircle,
  XCircle,
  Coins,
  Gift,
  ArrowRight
} from "lucide-react";

const AUTH_BASE =
  process.env.NEXT_PUBLIC_AUTH_URL || "https://auth.cashog.com";

const useExternalAuth =
  process.env.NEXT_PUBLIC_USE_EXTERNAL_AUTH === "true";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showStrength, setShowStrength] = useState(false);

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

  // Password strength checker
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
        return "bg-neutral-700";
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

  if (useExternalAuth) {
    return (
      <AuthModal>
        <iframe
          src={`${AUTH_BASE}/signup?redirect_back=https://cashog.com`}
          className="w-full h-[650px] rounded-3xl border border-neutral-800 shadow-2xl"
          frameBorder="0"
        />
      </AuthModal>
    );
  }

  return (
    <AuthModal>
      <AuthPageWrapper title="" subtitle="">
        {/* Instant Bonus Title */}
        <div className="text-center mb-2">
          <div className="text-xl font-semibold text-black dark:text-white">
            Get Instant Bonus
          </div>
        </div>

        {/* Coin Badge */}
        <div className="flex items-center justify-center gap-2 text-4xl font-bold mb-6
                        text-black dark:text-white">
          <Coins className="w-7 h-7 text-yellow-400" />
          500
        </div>

        {/* Social Login */}
        <SocialButtons />

        {/* Continue with Email */}
        {!formVisible && (
          <button
            onClick={handleContinueWithEmail}
            className="w-full mt-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800
                       text-white dark:text-black font-medium flex items-center justify-center gap-2
                       hover:border-green-500/50 transition"
          >
            <Mail className="w-4 h-4" />
            Continue with Email
          </button>
        )}

        {/* Form (only visible after clicking email) */}
        {formVisible && (
          <>
            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-neutral-800"></div>
              <span className="text-sm text-neutral-600 px-4">or</span>
              <div className="flex-grow border-t border-neutral-800"></div>
            </div>

            {/* Full Name Field */}
            <div className="relative mb-4 group">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                placeholder="Full Name"
                className="w-full p-4 rounded-xl bg-neutral-900/50 border-2 
                           border-neutral-800 text-black dark:text-white placeholder-neutral-600
                           focus:outline-none focus:border-green-500/50 focus:bg-neutral-900/80
                           transition-all duration-300"
              />
            </div>

            {/* Email Field */}
            <div className="relative mb-4 group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                placeholder="Email Address"
                className="w-full p-4 rounded-xl bg-neutral-900/50 border-2 
                           border-neutral-800 text-black dark:text-white placeholder-neutral-600
                           focus:outline-none focus:border-blue-500/50 focus:bg-neutral-900/80
                           transition-all duration-300"
              />
            </div>

            {/* Password Field */}
            <div className="relative mb-2 group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
                placeholder="Create Password"
                className="w-full p-4 pr-12 rounded-xl bg-neutral-900/50 border-2 
                           border-neutral-800 text-black dark:text-white placeholder-neutral-600
                           focus:outline-none focus:border-purple-500/50 focus:bg-neutral-900/80
                           transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 
                           text-neutral-500 hover:text-purple-400 transition-all"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            {/* Password Strength */}
            {showStrength && formData.password && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex gap-1 flex-1 mr-3">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300
                                   ${i < passwordStrength ? getStrengthColor() : "bg-neutral-800"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-neutral-400">
                    {getStrengthText()}
                  </span>
                </div>

                {/* Requirements */}
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {[
                    { key: "length", text: "8+ characters" },
                    { key: "number", text: "Contains number" },
                    { key: "uppercase", text: "Uppercase letter" },
                    { key: "lowercase", text: "Lowercase letter" },
                    { key: "special", text: "Special character" }
                  ].map(req => (
                    <div
                      key={req.key}
                      className={`flex items-center gap-2 text-xs
                                 ${
                                   passwordRequirements[
                                     req.key as keyof typeof passwordRequirements
                                   ]
                                     ? "text-green-400"
                                     : "text-neutral-600"
                                 }`}
                    >
                      {passwordRequirements[req.key as keyof typeof passwordRequirements] ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <XCircle className="w-3 h-3" />
                      )}
                      <span>{req.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              className="relative w-full py-4 px-6 rounded-xl font-bold text-black group
                         overflow-hidden transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-green-400 to-blue-500" />

              <span className="relative flex items-center justify-center gap-2">
                <Gift className="w-5 h-5" />
                <span>Get Started & Claim $5 Bonus</span>
                <ArrowRight className="w-5 h-5" />
              </span>
            </button>
          </>
        )}

        {/* Trust Section (New) */}
        <div className="text-center mt-6 text-sm text-black dark:text-white">
          <div>Privacy secured</div>
          <div>Instant payout</div>
          <div>Feeling Happy</div>
        </div>

        {/* Terms */}
        <p className="text-base text-black dark:text-white text-center mt-6">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
        </p>
      </AuthPageWrapper>
    </AuthModal>
  );
}
