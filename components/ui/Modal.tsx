"use client";

import React, { ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {

  // 🔒 Lock scroll when modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-[1000]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[1001] flex items-center justify-center px-4"
          >
            <div className="relative w-full max-w-md bg-white dark:bg-[#0B0E1A] rounded-3xl shadow-2xl p-6 sm:p-10">
              
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-black dark:hover:text-white"
              >
                <X size={22} />
              </button>

              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
