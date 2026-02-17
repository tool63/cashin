'use client';

import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

export default function CloseButton() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <button
      onClick={handleClose}
      className="absolute top-4 right-4 z-50 w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:scale-110"
      aria-label="Close"
    >
      <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
    </button>
  );
}
