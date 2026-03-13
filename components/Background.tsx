"use client";

import React from "react";

export default function Background() {
  return (
    <>
      {/* ============================
          Base Background
      ============================ */}
      <div className="fixed inset-0 bg-white dark:bg-black -z-20" />

      {/* ============================
          Main Gradient Layer
      ============================ */}
      <div
        className="
          fixed inset-0
          bg-gradient-to-br
          from-yellow-400/40
          via-green-400/50
          to-green-500/40
          transition-colors duration-500
          -z-10
        "
      />

      {/* ============================
          Glow Blob 1
      ============================ */}
      <div
        className="
          fixed w-80 h-80
          bg-green-400/40
          rounded-full
          blur-[120px]
          top-10 left-10
          animate-pulse
          -z-10
        "
      />

      {/* ============================
          Glow Blob 2
      ============================ */}
      <div
        className="
          fixed w-96 h-96
          bg-yellow-400/40
          rounded-full
          blur-[140px]
          bottom-10 right-10
          animate-pulse
          delay-1000
          -z-10
        "
      />

      {/* ============================
          Glow Blob 3
      ============================ */}
      <div
        className="
          fixed w-72 h-72
          bg-green-500/30
          rounded-full
          blur-[100px]
          top-1/3 right-1/4
          animate-pulse
          delay-500
          -z-10
        "
      />
    </>
  );
}
