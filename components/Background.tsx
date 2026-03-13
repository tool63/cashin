"use client";

import React from "react";

export default function Background() {
  return (
    <>
      {/* Base Background */}
      <div className="fixed inset-0 bg-white dark:bg-black -z-30" />

      {/* Main Gradient - Yellow & Green Mix */}
      <div
        className="fixed inset-0 -z-20 transition-opacity duration-500"
        style={{
          background: `
            linear-gradient(
              125deg,
              #FBBF24 0%,
              #F59E0B 30%,
              #10B981 70%,
              #059669 100%
            )
          `,
          opacity: 0.7
        }}
      />

      {/* Soft Light Overlay */}
      <div
        className="fixed inset-0 -z-20"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(251, 191, 36, 0.15), transparent 50%),
            radial-gradient(circle at 90% 70%, rgba(16, 185, 129, 0.15), transparent 50%)
          `
        }}
      />

      {/* Glow Blob - Warm Yellow */}
      <div
        className="
          fixed w-[600px] h-[600px] rounded-full blur-[140px] -z-10
        "
        style={{
          background: "#FBBF24",
          top: "10%",
          left: "0%",
          opacity: 0.25,
        }}
      />

      {/* Glow Blob - Fresh Green */}
      <div
        className="
          fixed w-[700px] h-[700px] rounded-full blur-[180px] -z-10
        "
        style={{
          background: "#10B981",
          bottom: "0%",
          right: "0%",
          opacity: 0.25,
        }}
      />

      {/* Glow Blob - Amber Accent */}
      <div
        className="
          fixed w-[450px] h-[450px] rounded-full blur-[120px] -z-10
        "
        style={{
          background: "#F59E0B",
          top: "40%",
          right: "30%",
          opacity: 0.2,
        }}
      />
    </>
  );
}
