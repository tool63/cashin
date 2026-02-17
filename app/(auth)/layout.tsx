"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative w-screen min-h-screen bg-[#0B0F1A] flex justify-center items-center overflow-hidden">
      
      {/* ===================== Background Gradient ===================== */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-[#0B0F1A] via-[#111827] to-[#0B0F1A] opacity-80"
        animate={{ rotate: [0, 2, -2, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ===================== Subtle Floating Blobs ===================== */}
      <motion.div
        className="absolute w-72 h-72 bg-green-500/10 rounded-full top-16 left-10 filter blur-3xl"
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-yellow-400/10 rounded-full bottom-10 right-10 filter blur-3xl"
        animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

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
