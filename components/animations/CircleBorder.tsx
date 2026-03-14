"use client";

import { ReactNode } from "react";
import OpeningStyle from "./openingstyle";

interface CircleBorderProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  noAnimation?: boolean;
  asSection?: boolean;
}

export default function CircleBorder({
  children,
  className = "",
  delay = 0,
  noAnimation = false,
  asSection = true,
}: CircleBorderProps) {
  const baseClasses = `
    max-w-7xl mx-auto px-6 py-20
    bg-primary dark:bg-secondary
    relative overflow-hidden
    ${className}
  `.trim();

  const content = asSection ? (
    <section className={baseClasses}>{children}</section>
  ) : (
    <div className={baseClasses}>{children}</div>
  );

  if (noAnimation) return content;

  return <OpeningStyle delay={delay}>{content}</OpeningStyle>;
}
