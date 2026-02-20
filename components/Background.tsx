"use client";

import React from "react";

export default function Background() {
  return (
    <>
      {/* ============================
          Gradient Background
      ============================ */}
      <div
        className="absolute inset-0 pointer-events-none transition-colors duration-500"
        style={{
          background: `linear-gradient(
            to bottom right,
            var(--gradient-from),
            var(--gradient-via),
            var(--gradient-to)
          )`,
        }}
      />

      {/* ============================
          Glow Blobs
      ============================ */}
      <div
        className="absolute w-80 h-80 rounded-full blur-[120px] top-10 left-10 animate-blobMove pointer-events-none"
        style={{
          backgroundColor: "var(--glow-green)",
        }}
      />
      <div
        className="absolute w-96 h-96 rounded-full blur-[140px] bottom-10 right-10 animate-blobMove2 pointer-events-none"
        style={{
          backgroundColor: "var(--glow-yellow)",
        }}
      />

      {/* ============================
          Frosted Overlay (Optional)
      ============================ */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl pointer-events-none" />
    </>
  );
}
