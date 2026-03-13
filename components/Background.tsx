"use client";

import React from "react";

export default function Background() {
  return (
    <>
      {/* Base Background - Clean White (matches header gradient logic) */}
      <div className="fixed inset-0 bg-white dark:bg-black -z-30" />
      
      {/* Subtle Gradient Overlay - matches header-gradient style */}
      <div 
        className="fixed inset-0 -z-20"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(243,244,246,0.5) 100%)'
        }}
      />
      
      {/* Very Subtle Light Glow - adds depth without blur */}
      <div
        className="fixed w-[1000px] h-[1000px] rounded-full -z-10"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.03) 0%, transparent 70%)',
          bottom: '-20%',
          right: '-10%',
        }}
      />
      
      {/* Secondary Subtle Glow */}
      <div
        className="fixed w-[800px] h-[800px] rounded-full -z-10"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.03) 0%, transparent 70%)',
          top: '-10%',
          left: '-5%',
        }}
      />
    </>
  );
}
