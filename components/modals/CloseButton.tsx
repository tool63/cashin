// components/modals/CloseButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

interface CloseButtonProps {
  className?: string;
}

export default function CloseButton({ className = '' }: CloseButtonProps) {
  const router = useRouter();

  const handleClose = () => {
    router.back(); // Always goes back to the previous page
  };

  return (
    <button
      onClick={handleClose}
      className={`absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-50 ${className}`}
      aria-label="Close"
    >
      <X size={20} className="text-gray-500 dark:text-gray-400" />
    </button>
  );
}
