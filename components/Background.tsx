"use client";

import React from "react";

export default function Background() {
  return (
    <>
      {/* Base Background */}
      <div className="fixed inset-0 bg-white dark:bg-black -z-30" />

      {/* Light Mode Gradient - Yellow & Green Mix */}
      <div
        className="fixed inset-0 -z-20 dark:hidden transition-opacity duration-500"
        style={{
          background: `
            linear-gradient(
              125deg,
              #FDE68A 0%,
              #FBBF24 30%,
              #6EE7B7 70%,
              #34D399 100%
            )
          `,
          opacity: 0.7
        }}
      />

      {/* Dark Mode Gradient - Yellow, Green & Black Mix */}
      <div
        className="fixed inset-0 -z-20 hidden dark:block transition-opacity duration-500"
        style={{
          background: `
            linear-gradient(
              125deg,
              #B45309 0%,
              #065F46 30%,
              #064E3B 70%,
              #111827 100%
            )
          `,
          opacity: 0.9
        }}
      />

      {/* Light Mode Soft Overlay */}
      <div
        className="fixed inset-0 -z-20 dark:hidden"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(251, 191, 36, 0.15), transparent 50%),
            radial-gradient(circle at 90% 70%, rgba(16, 185, 129, 0.15), transparent 50%)
          `
        }}
      />

      {/* Dark Mode Deep Overlay */}
      <div
        className="fixed inset-0 -z-20 hidden dark:block"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(180, 83, 9, 0.25), transparent 55%),
            radial-gradient(circle at 80% 80%, rgba(6, 95, 70, 0.3), transparent 60%),
            radial-gradient(circle at 50% 50%, rgba(17, 24, 39, 0.4), transparent 70%)
          `
        }}
      />

      {/* Light Mode Glow - Yellow */}
      <div
        className="
          fixed w-[600px] h-[600px] rounded-full blur-[140px] -z-10 dark:hidden
        "
        style={{
          background: "#FBBF24",
          top: "10%",
          left: "0%",
          opacity: 0.25,
        }}
      />

      {/* Dark Mode Glow - Deep Yellow */}
      <div
        className="
          fixed w-[600px] h-[600px] rounded-full blur-[140px] -z-10 hidden dark:block
        "
        style={{
          background: "#B45309",
          top: "10%",
          left: "0%",
          opacity: 0.2,
        }}
      />

      {/* Light Mode Glow - Green */}
      <div
        className="
          fixed w-[700px] h-[700px] rounded-full blur-[180px] -z-10 dark:hidden
        "
        style={{
          background: "#10B981",
          bottom: "0%",
          right: "0%",
          opacity: 0.25,
        }}
      />

      {/* Dark Mode Glow - Deep Green */}
      <div
        className="
          fixed w-[700px] h-[700px] rounded-full blur-[180px] -z-10 hidden dark:block
        "
        style={{
          background: "#065F46",
          bottom: "0%",
          right: "0%",
          opacity: 0.2,
        }}
      />

      {/* Light Mode Glow - Amber Accent */}
      <div
        className="
          fixed w-[450px] h-[450px] rounded-full blur-[120px] -z-10 dark:hidden
        "
        style={{
          background: "#F59E0B",
          top: "40%",
          right: "30%",
          opacity: 0.2,
        }}
      />

      {/* Dark Mode Glow - Black Accent */}
      <div
        className="
          fixed w-[450px] h-[450px] rounded-full blur-[120px] -z-10 hidden dark:block
        "
        style={{
          background: "#111827",
          top: "40%",
          right: "30%",
          opacity: 0.3,
        }}
      />
    </>
  );
}
