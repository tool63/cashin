"use client";

import React from "react";

export default function Background() {
  return (
    <>
      {/* ============================
          Background Gradient Layer
      ============================ */}
      <div 
        className="
          fixed inset-0 
          bg-gradient-to-br 
          from-yellow-400/20 
          via-green-400/30 
          to-green-500/20
          dark:from-yellow-500/10 
          dark:via-green-700/20 
          dark:to-green-800/20
          transition-colors duration-500
          pointer-events-none
          -z-10
        "
      />

      {/* ============================
          Glow Blobs
      ============================ */}
      <div 
        className="
          fixed w-80 h-80 
          bg-green-400/25 
          dark:bg-green-700/20
          rounded-full 
          blur-[120px] 
          top-10 left-10 
          animate-pulse
          pointer-events-none
          -z-10
        "
      />

      <div 
        className="
          fixed w-96 h-96 
          bg-yellow-400/25 
          dark:bg-yellow-500/10
          rounded-full 
          blur-[140px] 
          bottom-10 right-10 
          animate-pulse delay-1000
          pointer-events-none
          -z-10
        "
      />

      {/* ============================
          Additional Green Glow Blob for Depth
      ============================ */}
      <div 
        className="
          fixed w-72 h-72 
          bg-green-400/20 
          dark:bg-green-800/15
          rounded-full 
          blur-[100px] 
          top-1/3 left-1/4 
          animate-pulse animation-delay-500
          pointer-events-none
          -z-10
        "
      />

      {/* ============================
          Frosted Overlay (Optional)
      ============================ */}
      <div 
        className="
          fixed inset-0 
          bg-white/5 
          dark:bg-black/10
          backdrop-blur-sm
          pointer-events-none
          -z-10
        "
      />
    </>
  );
}
