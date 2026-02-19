"use client";

import ModalRoot from "@/components/modals/ModalRoot";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden 
                    bg-white dark:bg-[#0B0F1A]">

      {/* 🔥 Animated Gradient Base Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br 
                      from-yellow-400/10 
                      via-transparent 
                      to-green-500/10 
                      pointer-events-none" />

      {/* 💡 Top Left Glow */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] 
                      bg-yellow-400/20 
                      rounded-full blur-3xl 
                      animate-pulse 
                      pointer-events-none" />

      {/* 💚 Bottom Right Glow */}
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] 
                      bg-green-500/20 
                      rounded-full blur-3xl 
                      animate-pulse 
                      pointer-events-none" />

      {/* 🌈 Subtle Moving Gradient Line */}
      <div className="absolute inset-0 opacity-10 
                      bg-gradient-to-r 
                      from-yellow-400 
                      via-green-400 
                      to-yellow-400 
                      animate-[gradientShift_8s_linear_infinite] 
                      pointer-events-none" />

      {/* 🧊 Modal Content */}
      <div className="relative z-10">
        <ModalRoot>{children}</ModalRoot>
      </div>
    </div>
  );
}
