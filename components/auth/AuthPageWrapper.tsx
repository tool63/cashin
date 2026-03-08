"use client";

import { ReactNode } from "react";

interface AuthPageWrapperProps {
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
}

export default function AuthPageWrapper({
  title,
  subtitle,
  children,
}: AuthPageWrapperProps) {
  return (
    <div className="w-full flex flex-col items-center text-center">

      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-2 mb-6 text-sm sm:text-base text-muted max-w-sm">
          {subtitle}
        </p>
      )}

      {/* Content */}
      <div className="w-full">
        {children}
      </div>

    </div>
  );
}
