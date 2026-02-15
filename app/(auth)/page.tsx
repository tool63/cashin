"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 flex items-center justify-center px-4">
      
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-6">

        {/* Logo + Branding */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-wide">
            CASHOG
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            Earn. Complete. Get Paid.
          </p>
        </div>

        {/* Headline */}
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold text-gray-800">
            Start Earning Real Cash Today
          </h2>
          <p className="text-sm text-gray-500">
            Join thousands earning daily rewards.
          </p>
        </div>

        {/* Social Buttons */}
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 transition rounded-xl py-3 font-semibold text-gray-700">
            <FcGoogle size={20} />
            Continue with Google
          </button>

          <button className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 transition text-white rounded-xl py-3 font-semibold">
            <FaFacebook size={18} />
            Continue with Facebook
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs text-gray-400 font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Email Form */}
        <form className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Main CTA */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition text-white py-3 rounded-xl font-bold text-lg shadow-lg"
          >
            🎁 Claim My Free Account
          </button>
        </form>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 pt-2">
          <div>🔒 Secure & Encrypted</div>
          <div>⚡ Instant Withdrawals</div>
          <div>🌍 Available Worldwide</div>
          <div>💰 High-Paying Offers</div>
        </div>

        {/* Social Proof */}
        <div className="text-center text-sm font-semibold text-green-600">
          110,780+ signups in last 24 hours
        </div>

        {/* Warning */}
        <div className="text-center text-xs text-red-500">
          ⚠ VPNs & multiple accounts prohibited.
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <span className="text-indigo-600 font-semibold cursor-pointer hover:underline">
            Sign In
          </span>
        </div>

      </div>
    </div>
  );
}
