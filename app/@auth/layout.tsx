"use client";

import ModalRoot from "@/components/modals/ModalRoot";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-screen min-h-screen overflow-hidden">

      {/* ✨ Full gradient background similar to Freecash style */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-green-300 to-green-500 opacity-70"></div>

      {/* 🔹 Subtle dark overlay for contrast if needed */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* 🔶 Layered glow highlights */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-yellow-400/40 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-green-500/40 rounded-full blur-3xl animate-float animation-delay-2000"></div>

      {/* 📌 Modal container (kept on top) */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4 py-8">
        {/* Makes modal card stand out above the gradient */}
        <ModalRoot>{children}</ModalRoot>
      </div>
    </div>
  );
}
