"use client";

import { ReactNode } from "react";

interface AuthPageWrapperProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthPageWrapper({
  title,
  subtitle,
  children,
}: AuthPageWrapperProps) {
  return (
    <div className="flex flex-col w-full">
      {/* Title */}
      <h2 className="text-3xl font-bold mb-2">{title}</h2>

      {/* Subtitle */}
      <p className="text-neutral-400 mb-6">{subtitle}</p>

      {/* Form / Social Buttons / Other Content */}
      {children}
    </div>
  );
}
