"use client";

import ModalRoot from "@/components/modals/ModalRoot";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-screen min-h-screen bg-[#0B0F1A] overflow-hidden">

      {/* 🌈 Animated Gradient Background */}
      <div className="absolute inset-0 animate-gradient 
                      bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 
                      opacity-20" />

      {/* 💚 Green Glow Blob */}
      <div className="absolute w-72 h-72 bg-green-400/30 rounded-full 
                      blur-3xl animate-float top-20 left-10" />

      {/* 💛 Yellow Glow Blob */}
      <div className="absolute w-96 h-96 bg-yellow-400/30 rounded-full 
                      blur-3xl animate-float animation-delay-2000 
                      bottom-10 right-10" />

      {/* Modal Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <ModalRoot>{children}</ModalRoot>
      </div>
    </div>
  );
}
