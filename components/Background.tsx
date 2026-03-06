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
          fixed inset-0
          bg-gradient-to-br
          from-yellow-400/20
          via-green-400/30
          to-green-500/20
          dark:from-yellow-500/20
          dark:via-green-700/30
          dark:to-green-800/30
          -z-10
        "
      />

      {/* ============================
          Green Glow Blob
      ============================ */}
      <div
        className="
          fixed w-80 h-80
          bg-green-400/25
          dark:bg-green-500/30
          rounded-full
          blur-[120px]
          top-10 left-10
          animate-blobMove
          -z-10
        "
      />

      {/* ============================
          Yellow Glow Blob
      ============================ */}
      <div
        className="
          fixed w-96 h-96
          bg-yellow-400/25
          dark:bg-yellow-500/30
          rounded-full
          blur-[140px]
          bottom-10 right-10
          animate-blobMove2
          -z-10
        "
      />

      {/* ============================
          Subtle Overlay for Better Readability
      ============================ */}
      <div
        className="
          fixed inset-0
          bg-white/30
          dark:bg-black/50
          backdrop-blur-sm
          -z-10
        "
      />
    </>
  );
}
