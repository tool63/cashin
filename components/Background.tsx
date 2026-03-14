"use client";

import React from "react";

export default function Background() {
  return (
    <>
      {/* Base white/black layer for fallback */}
      <div className="fixed inset-0 bg-white dark:bg-black -z-50" />
      
      {/* Main Background Gradient Layer */}
      <div 
        className="fixed inset-0 -z-40 transition-colors duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.2) 0%, rgba(74, 222, 128, 0.3) 50%, rgba(34, 197, 94, 0.2) 100%)'
        }}
      />
      
      {/* Dark Mode Background Gradient Layer */}
      <div 
        className="fixed inset-0 -z-40 hidden dark:block transition-colors duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.1) 0%, rgba(21, 128, 61, 0.2) 50%, rgba(22, 101, 52, 0.2) 100%)'
        }}
      />

      {/* ============================
          Glow Blobs
      ============================ */}
      {/* Top-left green blob */}
      <div 
        className="fixed w-80 h-80 
          bg-green-400/25 
          rounded-full 
          blur-[120px] 
          top-10 left-10 
          animate-pulse -z-30"
      />
      
      {/* Bottom-right yellow blob */}
      <div 
        className="fixed w-96 h-96 
          bg-yellow-400/25 
          rounded-full 
          blur-[140px] 
          bottom-10 right-10 
          animate-pulse delay-1000 -z-30"
      />
      
      {/* Additional center blob for depth (optional) */}
      <div 
        className="fixed w-60 h-60 
          bg-yellow-400/15 
          rounded-full 
          blur-[100px] 
          top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          animate-pulse delay-500 -z-30"
      />

      {/* ============================
          Frosted Overlay
      ============================ */}
      <div 
        className="fixed inset-0 bg-white/5 dark:bg-black/5 backdrop-blur-[2px] pointer-events-none -z-20"
      />
    </>
  );
}
