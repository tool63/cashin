"use client";

import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0E111B] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0E111B] border border-[#2A2F3E] rounded-2xl">
        {children}
      </div>
    </div>
  );
}
