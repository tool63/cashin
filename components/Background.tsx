"use client";

import React from "react";

export default function Background() {
  return (
    <>
      {/* ============================
          Base Background Color (Fallback)
      ============================ */}
      <div className="fixed inset-0 bg-white dark:bg-gray-950 -z-20" />

      {/* ============================
          Background Gradient Layer - MORE VISIBLE
      ============================ */}
      <div 
        className="
          fixed inset-0 
          bg-gradient-to-br 
          from-yellow-400/40 
          via-green-400/50 
          to-green-500/40
          dark:from-yellow-500/30 
          dark:via-green-700/40 
          dark:to-green-800/30
          transition-colors duration-500
          -z-10
        "
      />

      {/* ============================
          Glow Blobs - MORE VISIBLE
      ============================ */}
      <div 
        className="
          fixed w-80 h-80 
          bg-green-400/40 
          dark:bg-green-600/30
          rounded-full 
          blur-[120px] 
          top-10 left-10 
          animate-pulse
          -z-10
        "
      />

      <div 
        className="
          fixed w-96 h-96 
          bg-yellow-400/40 
          dark:bg-yellow-500/30
          rounded-full 
          blur-[140px] 
          bottom-10 right-10 
          animate-pulse delay-1000
          -z-10
        "
      />

      <div 
        className="
          fixed w-72 h-72 
          bg-green-500/30 
          dark:bg-green-800/25
          rounded-full 
          blur-[100px] 
          top-1/3 right-1/4 
          animate-pulse delay-500
          -z-10
        "
      />
    </>
  );
}
