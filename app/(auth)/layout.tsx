// app/(auth)/layout.tsx
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="auth-container bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="auth-card">
        {/* Close button completely removed */}
        {children}
      </div>
    </div>
  );
}
