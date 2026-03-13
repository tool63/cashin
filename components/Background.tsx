"use client";

import React from "react";

export default function Background() {
  return (
    <>
      {/* Base background */}
      <div className="fixed inset-0 bg-primary -z-30" />

      {/* Main gradient using CSS variables */}
      <div
        className="fixed inset-0 -z-20"
        style={{
          background: `linear-gradient(
            120deg,
            var(--gradient-from),
            var(--gradient-via),
            var(--gradient-to)
          )`,
          opacity: 0.35,
        }}
      />

      {/* Glow Blob 1 */}
      <div
        className="fixed w-80 h-80 rounded-full blur-[120px] -z-10 animate-blobMove"
        style={{
          background: "var(--glow-green)",
          top: "40px",
          left: "40px",
          opacity: 0.35,
        }}
      />

      {/* Glow Blob 2 */}
      <div
        className="fixed w-96 h-96 rounded-full blur-[140px] -z-10 animate-blobMove"
        style={{
          background: "var(--glow-yellow)",
          bottom: "40px",
          right: "40px",
          opacity: 0.35,
        }}
      />

      {/* Glow Blob 3 */}
      <div
        className="fixed w-72 h-72 rounded-full blur-[100px] -z-10 animate-blobMove"
        style={{
          background: "var(--glow-green)",
          top: "30%",
          right: "25%",
          opacity: 0.25,
        }}
      />
    </>
  );
}
