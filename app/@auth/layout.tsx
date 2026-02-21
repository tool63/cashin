"use client";

import ModalRoot from "@/components/modals/ModalRoot";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-screen min-h-screen overflow-hidden">
      
      {/* Modal Content Only */}
      <div className="relative z-50 flex items-center justify-center min-h-screen px-4">
        <ModalRoot>{children}</ModalRoot>
      </div>

    </div>
  );
}
