import { ReactNode } from "react";
import CloseButton from "@/components/ui/CloseButton";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="auth-container bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="auth-card scrollbar-hide relative">
        {/* ONLY ONE close button - in layout */}
        <CloseButton />
        
        {/* Content */}
        {children}
      </div>
    </div>
  );
}
