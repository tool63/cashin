"use client";

import { ReactNode } from "react";

interface AuthModalProps {
  children: ReactNode;
  onClose?: () => void;
}

export default function AuthModal({ children, onClose }: AuthModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-full max-w-md bg-[#121B29] p-8 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevents closing modal when clicking inside
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
          aria-label="Close Modal"
        >
          ✖
        </button>

        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
}
