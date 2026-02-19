"use client";

import ModalRoot from "@/components/modals/ModalRoot";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-screen min-h-screen bg-[#0B0F1A] overflow-hidden">

      {/* 🌈 Animated Gradient Background - Yellow/Green Theme */}
      <div className="absolute inset-0 animate-gradient 
                      bg-gradient-to-r from-yellow-400/20 via-green-400/20 to-green-500/20 
                      opacity-30" />

      {/* 💚 Green Glow Blob - Enhanced */}
      <div className="absolute w-96 h-96 bg-green-400/40 rounded-full 
                      blur-3xl animate-float top-20 left-10" />

      {/* 💛 Yellow Glow Blob - Enhanced */}
      <div className="absolute w-[500px] h-[500px] bg-yellow-400/40 rounded-full 
                      blur-3xl animate-float animation-delay-2000 
                      bottom-10 right-10" />

      {/* 🌟 Additional Center Glow for Depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                      w-[600px] h-[600px] bg-gradient-to-r from-yellow-400/10 via-green-400/20 to-green-500/10 
                      rounded-full blur-3xl"></div>

      {/* Modal Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <ModalRoot>{children}</ModalRoot>
      </div>
    </div>
  );
}
