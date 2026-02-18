// components/modals/AuthModal.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthLayout from "@/app/(auth)/layout";

export default function AuthModal() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    router.back();
  };

  if (!mounted) return null;

  // Determine which content to show based on path
  const getContent = () => {
    if (pathname?.startsWith('/signup')) {
      return (
        <div className="w-full max-w-md mx-auto">
          <div className="bg-[#0B0F1A] border border-white/10 rounded-2xl p-8">
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            <h1 className="text-3xl font-bold text-center mb-8">Sign Up</h1>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Create a password"
                />
              </div>
              <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                Sign Up
              </button>
            </form>
            <p className="text-center mt-6 text-gray-400">
              Already have an account?{' '}
              <a href="/login?modal=true" className="text-blue-400 hover:underline">
                Log in
              </a>
            </p>
          </div>
        </div>
      );
    }
    
    if (pathname?.startsWith('/login')) {
      return (
        <div className="w-full max-w-md mx-auto">
          <div className="bg-[#0B0F1A] border border-white/10 rounded-2xl p-8">
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            <h1 className="text-3xl font-bold text-center mb-8">Log In</h1>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex justify-end">
                <a href="/reset?modal=true" className="text-sm text-blue-400 hover:underline">
                  Forgot password?
                </a>
              </div>
              <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                Log In
              </button>
            </form>
            <p className="text-center mt-6 text-gray-400">
              Don't have an account?{' '}
              <a href="/signup?modal=true" className="text-blue-400 hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      );
    }
    
    if (pathname?.startsWith('/reset')) {
      return (
        <div className="w-full max-w-md mx-auto">
          <div className="bg-[#0B0F1A] border border-white/10 rounded-2xl p-8">
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            <h1 className="text-3xl font-bold text-center mb-2">Reset Password</h1>
            <p className="text-center text-gray-400 mb-8">
              Enter your email to receive reset instructions
            </p>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                Send Reset Link
              </button>
            </form>
            <p className="text-center mt-6 text-gray-400">
              Remember your password?{' '}
              <a href="/login?modal=true" className="text-blue-400 hover:underline">
                Log in
              </a>
            </p>
          </div>
        </div>
      );
    }
    
    return null;
  };

  const content = getContent();
  if (!content) return null;

  // Just pass the content to AuthLayout without any props
  return <AuthLayout>{content}</AuthLayout>;
}
