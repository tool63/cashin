"use client";

import React from "react";

export default function Background() {
  return (
    <>
      {/* ============================
          Base Background
      ============================ */}
      <div className="fixed inset-0 bg-primary -z-30" />

      {/* ============================
          Main Gradient (Enhanced Light / Softer Dark)
      ============================ */}
      <div
        className="fixed inset-0 -z-20"
        style={{
          background: `
            linear-gradient(
              120deg,
              var(--gradient-from),
              var(--gradient-via),
              var(--gradient-to)
            )
          `,
          opacity: 0.45, // +10% brighter light mode
        }}
      />

      {/* ============================
          Premium Radial Glow Layer
      ============================ */}
      <div
        className="fixed inset-0 -z-20"
        style={{
          background: `
            radial-gradient(
              circle at 20% 20%,
              var(--glow-yellow) 0%,
              transparent 60%
            ),
            radial-gradient(
              circle at 80% 80%,
              var(--glow-green) 0%,
              transparent 60%
            ),
            radial-gradient(
              circle at 70% 30%,
              var(--glow-green) 0%,
              transparent 70%
            )
          `,
          opacity: 0.35,
        }}
      />

      {/* ============================
          Animated Glow Blob 1
      ============================ */}
      <div
        className="fixed w-[420px] h-[420px] rounded-full blur-[140px] -z-10 animate-blobMove"
        style={{
          background: "var(--glow-green)",
          top: "5%",
          left: "5%",
          opacity: 0.35,
        }}
      />

      {/* ============================
          Animated Glow Blob 2
      ============================ */}
      <div
        className="fixed w-[480px] h-[480px] rounded-full blur-[160px] -z-10 animate-blobMove"
        style={{
          background: "var(--glow-yellow)",
          bottom: "5%",
          right: "5%",
          opacity: 0.35,
        }}
      />

      {/* ============================
          Animated Glow Blob 3
      ============================ */}
      <div
        className="fixed w-[360px] h-[360px] rounded-full blur-[130px] -z-10 animate-blobMove"
        style={{
          background: "var(--glow-green)",
          top: "35%",
          right: "25%",
          opacity: 0.25, // reduced ~10% for dark comfort
        }}
      />
    </>
  );
}
