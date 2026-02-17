// app/(auth)/layout.tsx
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="w-full max-w-md max-h-screen overflow-y-auto py-8 px-4 scrollbar-hide">
        {children}
      </div>
    </div>
  );
}
