"use client";

import React from "react";

/**
 * Global Background Component
 * - Gradient: yellow → green
 * - Glow Blobs
 * - Frosted Overlay
 * Works in both dark and light modes with adjusted opacity
 */
export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">

      {/* ============================
          Gradient Background
      ============================ */}
      <div
        className="absolute inset-0 transition-colors duration-500"
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
      <div className="absolute w-80 h-80 rounded-full blur-[120px] top-10 left-10 animate-blobMove blob-green pointer-events-none"></div>
      <div className="absolute w-96 h-96 rounded-full blur-[140px] bottom-10 right-10 animate-blobMove2 blob-yellow pointer-events-none"></div>

      {/* ============================
          Frosted Overlay
      ============================ */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl pointer-events-none"></div>

    </div>
  );
}
