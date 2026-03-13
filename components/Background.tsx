"use client";

import React from "react";

export default function Background() {
  return (
    <>
      {/* Base Background */}
      <div className="fixed inset-0 bg-white dark:bg-black -z-30" />

      {/* Deep Premium Gradient Layer - Screenshot Colors */}
      <div
        className="fixed inset-0 -z-20 transition-colors duration-500"
        style={{
          background: `
            linear-gradient(
              135deg,
              #667eea 0%,
              #764ba2 100%
            )
          `,
          opacity: 0.65
        }}
      />

      {/* Radial Light Depth — Premium Multi‑Layer 
          Note: not mode‑dependent; same richness in light & dark */}
      <div
        className="fixed inset-0 -z-20"
        style={{
          background: `
            radial-gradient(circle at 15% 15%, rgba(255,230,120,0.30), transparent 55%),
            radial-gradient(circle at 85% 85%, rgba(147,51,234,0.25), transparent 60%),
            radial-gradient(circle at 30% 70%, rgba(102,126,234,0.20), transparent 65%)
          `
        }}
      />

      {/* Glow Blob Large */}
      <div
        className="
          fixed w-[500px] h-[500px] rounded-full blur-[140px] -z-10 animate-blobMove
        "
        style={{
          background: "#667eea",
          top: "5%",
          left: "5%",
          opacity: 0.30,
        }}
      />

      {/* Glow Blob Medium */}
      <div
        className="
          fixed w-[600px] h-[600px] rounded-full blur-[160px] -z-10 animate-blobMove2
        "
        style={{
          background: "#764ba2",
          bottom: "5%",
          right: "5%",
          opacity: 0.30,
        }}
      />

      {/* Glow Blob Small */}
      <div
        className="
          fixed w-[380px] h-[380px] rounded-full blur-[120px] -z-10 animate-blobMove
        "
        style={{
          background: "#667eea",
          top: "30%",
          right: "25%",
          opacity: 0.22,
        }}
      />

      {/* Gradient Animation Keyframes */}
      <style>{`
        @keyframes gradientShift {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </>
  );
}
