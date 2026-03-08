"use client";

import { ReactNode } from "react";

interface AuthModalProps {
  children: ReactNode;
}

export default function AuthModal({ children }: AuthModalProps) {
  return (
    <div className="relative">
      {children}
    </div>
  );
}
