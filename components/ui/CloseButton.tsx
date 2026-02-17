// components/ui/CloseButton.tsx
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
      className="close-button"
      aria-label="Close"
    >
      <X />
    </button>
  );
}
