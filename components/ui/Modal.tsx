"use client";

import React, { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 sm:p-0"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#1A1F2B] w-full max-w-md sm:rounded-3xl p-6 sm:p-8 shadow-2xl relative transform transition-all duration-300 scale-95 sm:scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {children}

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white font-bold text-lg"
        >
          ✕
        </button>
      </div>
    </div>,
    document.body
  );
}
