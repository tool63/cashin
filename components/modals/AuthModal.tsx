// components/modals/AuthModal.tsx
"use client";

import { ReactNode, useEffect, useState } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

interface AuthModalProps {
  children: ReactNode;
  onClose?: () => void;
  isOpen?: boolean;
  title?: string;
  subtitle?: string;
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
}

export default function AuthModal({ 
  children, 
  onClose, 
  isOpen = true,
  title,
  subtitle,
  closeOnOutsideClick = true,
  closeOnEsc = true,
  showCloseButton = true,
}: AuthModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === "Escape" && onClose) {
        onClose();
      }
    };

    if (closeOnEsc) {
      window.addEventListener("keydown", handleEsc);
    }
    
    return () => {
      document.body.style.overflow = "unset";
      if (closeOnEsc) {
        window.removeEventListener("keydown", handleEsc);
      }
    };
  }, [isOpen, onClose, closeOnEsc]);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (closeOnOutsideClick && onClose && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
      onClick={handleOutsideClick}
    >
      <div
        className="relative w-full max-w-md bg-gradient-to-br from-[#0E111B] to-[#121826] rounded-2xl border border-[#2A2F3E] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Title */}
        {(title || subtitle || showCloseButton) && (
          <div className="relative px-6 pt-6 pb-4 border-b border-[#2A2F3E]">
            {showCloseButton && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#1A1F2E] hover:bg-[#2A2F3E] text-gray-400 hover:text-white transition-all duration-200 group"
                aria-label="Close Modal"
              >
                <X className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
            )}
            
            {title && (
              <h2 className="text-2xl font-bold text-white pr-8">{title}</h2>
            )}
            {subtitle && (
              <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
            )}
          </div>
        )}

        {/* Modal Content */}
        <div className="p-6">
          {children}
        </div>

        {/* Optional Footer with Cancel Button */}
        <div className="px-6 pb-6 pt-2 border-t border-[#2A2F3E] mt-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-lg bg-[#1A1F2E] hover:bg-[#2A2F3E] text-gray-300 hover:text-white transition-all duration-200 text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
