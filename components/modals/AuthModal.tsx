"use client";

import { ReactNode } from "react";

interface AuthModalProps {
  children: ReactNode;
  onClose?: () => void; // Add optional onClose prop
}

export default function AuthModal({ children, onClose }: AuthModalProps) {
  return (
    <div className="relative">
      {children}
    </div>
  );
}
