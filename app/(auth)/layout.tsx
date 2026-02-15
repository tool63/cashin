"use client";

import React from "react";
import { ThemeProvider } from "next-themes";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function AuthLayout({ children, title = "Cashog - Secure Login & Sign Up", description = "Login or sign up for Cashog and start earning rewards instantly." }: AuthLayoutProps) {
  return (
    <ThemeProvider attribute="class">
      <Meta title={title} description={description} />
      <main className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#070A14] transition-colors duration-300 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-gray-100 dark:bg-[#1A1F2B] rounded-3xl p-8 shadow-xl"
        >
          {children}
        </motion.div>
      </main>
    </ThemeProvider>
  );
}
