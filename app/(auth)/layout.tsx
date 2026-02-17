"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative w-screen min-h-screen flex justify-center items-center bg-gradient-to-tr from-[#0B0F1A] via-[#111827] to-[#0B0F1A]">
      
      {/* ===================== Glassmorphic Card ===================== */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-xl shadow-2xl border border-white/20"
      >
        {children}
      </motion.div>

      {/* ===================== Optional Bottom Accent ===================== */}
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-[#0B0F1A] via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
