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
          Main Gradient Layer - Ultra Premium Yellow-Green
      ============================ */}
      <div
        className="fixed inset-0 -z-20 transition-colors duration-500"
        style={{
          background: `
            linear-gradient(
              130deg,
              var(--gradient-from) 0%,
              var(--gradient-via) 40%,
              var(--gradient-to) 100%
            )
          `,
          opacity: 0.55,
          backgroundSize: "200% 200%",
          animation: "gradientShift 14s ease infinite",
        }}
      />

      {/* ============================
          Premium Glow Lighting Layer
      ============================ */}
      <div
        className="fixed inset-0 -z-20"
        style={{
          background: `
            radial-gradient(circle at 15% 20%, rgba(255,220,120,0.35), transparent 55%),
            radial-gradient(circle at 80% 80%, rgba(34,197,94,0.30), transparent 60%),
            radial-gradient(circle at 70% 30%, rgba(16,185,129,0.25), transparent 65%)
          `,
        }}
      />

      {/* ============================
          Glow Blobs - Deep, Premium
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

      {/* ============================
          Gradient Animation Keyframes
      ============================ */}
      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </>
  );
}
