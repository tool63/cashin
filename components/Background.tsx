"use client";

import React from "react";

export default function Background() {
  return (
    <>
      {/* Main Background - Exact same gradient as footer */}
      <div 
        className="fixed inset-0 -z-30 transition-colors duration-300"
        style={{
          background: 'linear-gradient(90deg, rgba(250, 204, 21, 0.2) 0%, rgba(74, 222, 128, 0.3) 50%, rgba(34, 197, 94, 0.2) 100%)'
        }}
      />
      
      {/* Dark Mode Background - Exact same as footer dark mode */}
      <div 
        className="fixed inset-0 -z-20 hidden dark:block transition-colors duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.1) 0%, rgba(21, 128, 61, 0.2) 50%, rgba(22, 101, 52, 0.2) 100%)'
        }}
      />
      
      {/* Base white/black layer for fallback */}
      <div className="fixed inset-0 bg-white dark:bg-black -z-40" />
    </>
  );
}
