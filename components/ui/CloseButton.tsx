'use client';

import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

export default function CloseButton() {
  const router = useRouter();

  const handleClose = () => {
    // Go back to previous page
    router.back();
  };

  return (
    <button
      onClick={handleClose}
      className="absolute -top-2 -right-2 sm:top-2 sm:right-2 z-50 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:scale-110 group"
      aria-label="Close"
    >
      <X className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-red-500 transition-colors" />
    </button>
  );
}
