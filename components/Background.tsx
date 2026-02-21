"use client";

import React from "react";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">

      {/* Main Gradient */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-br
          from-yellow-400/20
          via-green-400/30
          to-green-500/20
          dark:from-yellow-500/10
          dark:via-green-700/20
          dark:to-green-800/20
          transition-colors duration-500
        "
      />

      {/* Green Glow */}
      <div className="absolute w-80 h-80 bg-green-400/25 rounded-full blur-[120px] top-10 left-10 animate-blobMove" />

      {/* Yellow Glow */}
      <div className="absolute w-96 h-96 bg-yellow-400/25 rounded-full blur-[140px] bottom-10 right-10 animate-blobMove2" />

      {/* Frosted Overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl" />

    </div>
  );
}
