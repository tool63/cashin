"use client";

import React from "react";

export default function Background() {
  return (
    <>
      {/* Base Background - Clean White */}
      <div className="fixed inset-0 bg-white -z-30" />
      
      {/* Subtle Gray Overlay for Depth */}
      <div 
        className="fixed inset-0 -z-20"
        style={{
          background: 'linear-gradient(180deg, rgba(249,250,251,0.8) 0%, rgba(243,244,246,0.4) 100%)'
        }}
      />
      
      {/* Very Subtle Accent Glow */}
      <div
        className="fixed w-[800px] h-[800px] rounded-full blur-[120px] -z-10"
        style={{
          background: '#F3F4F6',
          bottom: '-10%',
          right: '-5%',
          opacity: 0.5
        }}
      />
    </>
  );
}
