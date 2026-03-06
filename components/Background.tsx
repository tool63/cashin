"use client";

import React, { useEffect, useState } from "react";

export default function Background() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <>
      {/* ============================
          Base Background Color
      ============================ */}
      <div
        className="
          fixed inset-0
          bg-white
          dark:bg-gray-950
          -z-20
        "
      />

      {/* ============================
          Main Gradient Background
      ============================ */}
      <div
        className="
          fixed inset-0
          bg-gradient-to-br
          from-yellow-400/20
          via-green-400/30
          to-green-500/20
          dark:from-yellow-400/30
          dark:via-green-500/40
          dark:to-green-600/30
          transition-colors duration-700
          -z-10
        "
      />

      {/* ============================
          Green Glow Blob
      ============================ */}
      <div
        className="
          fixed w-80 h-80
          bg-green-400/20
          dark:bg-green-500/30
          rounded-full
          blur-[120px]
          top-10 left-10
          animate-blobMove
          transition-colors duration-700
          -z-10
        "
      />

      {/* ============================
          Yellow Glow Blob
      ============================ */}
      <div
        className="
          fixed w-96 h-96
          bg-yellow-400/20
          dark:bg-yellow-500/30
          rounded-full
          blur-[140px]
          bottom-10 right-10
          animate-blobMove2
          transition-colors duration-700
          -z-10
        "
      />

      {/* ============================
          Additional Glow Blob for Depth
      ============================ */}
      <div
        className="
          fixed w-64 h-64
          bg-green-300/15
          dark:bg-green-600/25
          rounded-full
          blur-[100px]
          top-1/2 left-1/3
          animate-blobMove
          transition-colors duration-700
          -z-10
        "
        style={{ animationDelay: "-5s", animationDuration: "35s" }}
      />
    </>
  );
}
