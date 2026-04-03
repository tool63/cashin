// components/modals/ModalRoot.tsx
"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalRootProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  showCloseButton?: boolean;
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
  showCancelButton?: boolean;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void;
  showConfirm?: boolean;
}

export default function ModalRoot({ 
  isOpen, 
  onClose, 
  children,
  title,
  showCloseButton = true,
  closeOnOutsideClick = true,
  closeOnEsc = true,
  showCancelButton = true,
  cancelText = "Cancel",
  confirmText = "Confirm",
  onConfirm,
  showConfirm = false,
}: ModalRootProps) {
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = "hidden";
      // Prevent scrollbar width shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === "Escape") onClose();
    };

    if (closeOnEsc) {
      window.addEventListener("keydown", handleEsc);
    }
    
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
      if (closeOnEsc) {
        window.removeEventListener("keydown", handleEsc);
      }
    };
  }, [isOpen, onClose, closeOnEsc]);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (closeOnOutsideClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAnimationEnd = () => {
    if (!isOpen) setIsAnimating(false);
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center p-4
        transition-all duration-300 ease-in-out
        ${isOpen && isAnimating ? 'bg-black/70 backdrop-blur-sm' : 'bg-black/0 backdrop-blur-none pointer-events-none'}
      `}
      onClick={handleOutsideClick}
      aria-labelledby={title ? "modal-title" : undefined}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      onTransitionEnd={handleAnimationEnd}
    >
      <div
        className={`
          relative w-full max-w-md
          bg-gradient-to-br from-[#0E111B] to-[#121826]
          rounded-2xl border border-[#2A2F3E]
          shadow-2xl overflow-hidden
          transition-all duration-300 ease-out
          ${isOpen && isAnimating 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
          }
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Title and Close Button */}
        {(title || showCloseButton) && (
          <div className="relative px-6 pt-6 pb-4 border-b border-[#2A2F3E]">
            {showCloseButton && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-1.5 rounded-lg bg-[#1A1F2E] hover:bg-[#2A2F3E] text-gray-400 hover:text-white transition-all duration-200 group"
                aria-label="Close Modal"
              >
                <X className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
            )}
            
            {title && (
              <h2 id="modal-title" className="text-xl font-bold text-white pr-8">
                {title}
              </h2>
            )}
          </div>
        )}

        {/* Modal Content */}
        <div className="p-6">
          {children}
        </div>

        {/* Footer with Action Buttons */}
        {(showCancelButton || showConfirm) && (
          <div className="flex gap-3 px-6 pb-6 pt-2 border-t border-[#2A2F3E]">
            {showCancelButton && (
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-lg bg-[#1A1F2E] hover:bg-[#2A2F3E] text-gray-300 hover:text-white transition-all duration-200 text-sm font-medium"
              >
                {cancelText}
              </button>
            )}
            {showConfirm && onConfirm && (
              <button
                onClick={onConfirm}
                className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium transition-all duration-200 text-sm"
              >
                {confirmText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
