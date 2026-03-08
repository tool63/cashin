"use client";

import { ReactNode } from "react";

interface AuthPageWrapperProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export default function AuthPageWrapper({ children, title, subtitle }: AuthPageWrapperProps) {
  return (
    <div className="p-6">
      {title && (
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      )}
      {subtitle && (
        <p className="text-gray-400 text-sm mb-6">{subtitle}</p>
      )}
      {children}
    </div>
  );
}
