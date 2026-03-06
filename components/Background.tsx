"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function Background() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <>
        <div className="fixed inset-0 bg-white -z-20" />
        <div className="fixed inset-0 bg-gradient-to-br from-yellow-400/20 via-green-400/30 to-green-500/20 -z-10" />
      </>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <>
      {/* Base Background Color */}
      <div
        className="fixed inset-0 -z-20 transition-colors duration-700"
        style={{
          backgroundColor: isDark ? '#030712' : '#ffffff',
        }}
      />

      {/* Main Gradient Background - EXACTLY matching mobile menu gradient */}
      <div
        className="fixed inset-0 -z-10 transition-all duration-700"
        style={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(234,179,8,0.2) 0%, rgba(21,128,61,0.3) 50%, rgba(22,101,52,0.2) 100%)'
            : 'linear-gradient(135deg, rgba(250,204,21,0.2) 0%, rgba(74,222,128,0.3) 50%, rgba(34,197,94,0.2) 100%)',
        }}
      />

      {/* Green Glow Blob */}
      <div
        className="fixed w-80 h-80 rounded-full blur-[120px] top-10 left-10 animate-blobMove -z-10 transition-all duration-700"
        style={{
          backgroundColor: isDark ? 'rgba(34,197,94,0.2)' : 'rgba(74,222,128,0.2)',
        }}
      />

      {/* Yellow Glow Blob */}
      <div
        className="fixed w-96 h-96 rounded-full blur-[140px] bottom-10 right-10 animate-blobMove2 -z-10 transition-all duration-700"
        style={{
          backgroundColor: isDark ? 'rgba(234,179,8,0.15)' : 'rgba(250,204,21,0.2)',
        }}
      />
    </>
  );
}
