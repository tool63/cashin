"use client";

import { ReactNode } from "react";
import OpeningStyle from "./openingstyle";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  noAnimation?: boolean;
  asSection?: boolean;
}

function Container({ 
  children, 
  className = "", 
  delay = 0,
  noAnimation = false,
  asSection = true 
}: ContainerProps) {

  const baseClasses = `
    max-w-7xl mx-auto px-6 py-20
    bg-primary dark:bg-secondary
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

export default Container;
