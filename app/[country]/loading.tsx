// app/loading.tsx
"use client";

import GlobalLoading from "@/components/loading/GlobalLoading";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-gray-100 dark:bg-[#070A14] flex items-center justify-center">
      <GlobalLoading />
    </div>
  );
}
