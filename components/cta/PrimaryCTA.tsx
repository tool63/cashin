"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface PrimaryCTAProps {
  href: string;
  children: React.ReactNode;
  observer?: boolean;
}

export default function PrimaryCTA({
  href,
  children,
  observer = true,
}: PrimaryCTAProps) {
  return (
    <Link
      href={href}
      className={observer ? "cta-observer inline-block" : "inline-block"}
    >
      <motion.span
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.97 }}
        className="
          inline-flex items-center gap-3
          bg-gradient-to-r from-yellow-400 via-green-400 to-green-500
          text-black px-20 py-7 rounded-3xl
          font-bold text-xl
          shadow-3xl
          hover:shadow-4xl
          transition-all duration-300
        "
      >
        {children}
        <ArrowRight size={24} />
      </motion.span>
    </Link>
  );
}
