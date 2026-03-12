// components/animations/container.tsx
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
    bg-transparent
    ${className}
  `.trim();

  const content = asSection ? (
    <section className={baseClasses}>
      {children}
    </section>
  ) : (
    <div className={baseClasses}>
      {children}
    </div>
  );

  if (noAnimation) return content;

  return <OpeningStyle delay={delay}>{content}</OpeningStyle>;
}

// ===================== Named Exports =====================

// Card component
export function Card({ 
  children, 
  className = "",
  hover = true,
  asLink = false,
  href = "#",
  ...props 
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  asLink?: boolean;
  href?: string;
  [key: string]: any;
}) {
  const baseClasses = `
    group relative rounded-3xl p-6 flex flex-col items-center text-center
    bg-gray-100 dark:bg-white/5
    border border-gray-200 dark:border-white/10
    ${hover ? `
      hover:border-blue-500/40
      hover:shadow-xl
      hover:-translate-y-1
    ` : ''}
    transition-all duration-300
    ${className}
  `.trim();

  if (asLink) {
    return (
      <a href={href} className={baseClasses} {...props}>
        {children}
      </a>
    );
  }

  return <div className={baseClasses} {...props}>{children}</div>;
}

// Card Icon
export function CardIcon({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`text-5xl mb-4 transition-transform duration-300 group-hover:scale-110 ${className}`}>
      {children}
    </div>
  );
}

// Card Title
export function CardTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={`text-lg font-semibold mb-2 ${className}`}>{children}</h3>
  );
}

// Card Description
export function CardDescription({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-sm text-gray-600 dark:text-gray-400 leading-relaxed ${className}`}>
      {children}
    </p>
  );
}

// Card CTA
export function CardCTA({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mt-4 flex items-center gap-1 text-blue-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition ${className}`}>
      {children}
    </div>
  );
}

// Card Grid
export function CardGrid({ 
  children, 
  cols = { default: 1, md: 2, lg: 3 },
  className = "" 
}: { 
  children: ReactNode; 
  cols?: { default?: number; sm?: number; md?: number; lg?: number; xl?: number };
  className?: string;
}) {
  const gridCols = {
    default: cols.default || 1,
    sm: cols.sm,
    md: cols.md || 2,
    lg: cols.lg || 3,
    xl: cols.xl
  };

  const gridClass = `
    grid gap-6
    grid-cols-${gridCols.default}
    ${gridCols.sm ? `sm:grid-cols-${gridCols.sm}` : ''}
    ${gridCols.md ? `md:grid-cols-${gridCols.md}` : ''}
    ${gridCols.lg ? `lg:grid-cols-${gridCols.lg}` : ''}
    ${gridCols.xl ? `xl:grid-cols-${gridCols.xl}` : ''}
    ${className}
  `.trim();

  return <div className={gridClass}>{children}</div>;
}

// Section Header
export function SectionHeader({ 
  icon, 
  title, 
  description,
  className = "" 
}: { 
  icon?: string; 
  title: string; 
  description?: string;
  className?: string;
}) {
  return (
    <div className={`text-center mb-12 ${className}`}>
      {icon && <span className="text-4xl mb-4 block">{icon}</span>}
      <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-green-500 bg-clip-text text-transparent">
        {title}
      </h2>
      {description && (
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}

// ===================== Default Export =====================
export default Container;
