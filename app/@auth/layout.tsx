"use client";

import ModalRoot from "@/components/modals/ModalRoot";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-screen min-h-screen bg-[#0B0F1A] overflow-hidden">

      {/* 🌈 Animated Gradient Background */}
      <div className="absolute inset-0 animate-gradient 
                      bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 
                      opacity-20" />

      {/* 💚 Green Glow Blob */}
      <div className="absolute w-72 h-72 bg-green-400/30 rounded-full 
                      blur-3xl animate-float top-20 left-10 mix-blend-screen" />

      {/* 💛 Yellow Glow Blob */}
      <div className="absolute w-96 h-96 bg-yellow-400/30 rounded-full 
                      blur-3xl animate-float animation-delay-2000 
                      bottom-10 right-10 mix-blend-screen" />

      {/* 💜 Optional Purple Glow Blob for depth */}
      <div className="absolute w-60 h-60 bg-purple-400/20 rounded-full 
                      blur-3xl animate-float animation-delay-1000 
                      top-32 right-20 mix-blend-screen" />

      {/* Modal Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <ModalRoot>{children}</ModalRoot>
      </div>
    </div>
  );
}
