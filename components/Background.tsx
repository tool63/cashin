"use client";

import React from "react";

export default function Background() {
  return (
    <>
      {/* ============================
          Main Gradient Background
      ============================ */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-br
          from-yellow-400/20
          via-green-400/30
          to-green-500/20
          dark:from-yellow-400/30
          dark:via-green-500/40
          dark:to-green-600/30
          transition-colors duration-500
          pointer-events-none
        "
      />

      {/* ============================
          Green Glow Blob
      ============================ */}
      <div
        className="
          absolute w-80 h-80
          bg-green-400/25
          dark:bg-green-500/40
          rounded-full
          blur-[120px]
          top-10 left-10
          animate-blobMove
          pointer-events-none
        "
      />

      {/* ============================
          Yellow Glow Blob
      ============================ */}
      <div
        className="
          absolute w-96 h-96
          bg-yellow-400/25
          dark:bg-yellow-500/40
          rounded-full
          blur-[140px]
          bottom-10 right-10
          animate-blobMove2
          pointer-events-none
        "
      />

      {/* ============================
          Frosted Overlay
      ============================ */}
      <div
        className="
          absolute inset-0
          bg-white/5
          dark:bg-transparent
          backdrop-blur-3xl
          pointer-events-none
        "
      />
    </>
  );
}
