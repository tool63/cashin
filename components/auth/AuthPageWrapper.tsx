"use client";

import { ReactNode } from "react";

interface AuthPageWrapperProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export default function AuthPageWrapper({ children, title, subtitle }: AuthPageWrapperProps) {
  return (
    <div className="p-6 bg-[#121B29] rounded-lg shadow-lg max-w-md mx-auto">
      {title && (
        <h2 className="text-3xl font-extrabold text-white mb-3">{title}</h2>
      )}
      {subtitle && (
        <p className="text-gray-400 text-lg mb-6">{subtitle}</p>
      )}
      {children}
    </div>
  );
}
