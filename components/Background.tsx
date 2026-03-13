"use client";

import React from "react";

export default function Background() {
  return (
    <>
      {/* Base Background - matches header-gradient logic */}
      <div className="fixed inset-0 bg-white dark:bg-black -z-30" />
      
      {/* Header-style gradient - exactly what header-gradient class does */}
      <div 
        className="fixed inset-0 -z-20"
        style={{
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)'
        }}
      />
      
      {/* No additional glows or overlays - keep it clean like header */}
    </>
  );
}
