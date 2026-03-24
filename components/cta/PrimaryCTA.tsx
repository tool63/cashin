"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/app/[country]/providers/LanguageProvider";

interface PrimaryCTAProps {
  href: string;
  translationKey: string;
  observer?: boolean;
  fallback?: string; // ✅ add fallback support
}

export default function PrimaryCTA({
  href,
  translationKey,
  observer = true,
  fallback = "Get Started", // default fallback
}: PrimaryCTAProps) {
  const { getTranslation } = useLanguage();

  const text = getTranslation(
    "primarycta",
    translationKey,
    fallback
  );

  return (
    <Link
      href={href}
      className={observer ? "cta-observer inline-block" : "inline-block"}
      aria-label={text}
    >
      <motion.span
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.97 }}
        className="
          inline-flex items-center gap-3
          bg-gradient-to-r from-yellow-400 via-green-400 to-green-500
          text-black px-10 sm:px-16 md:px-20 py-3 sm:py-5 md:py-7
          rounded-3xl
          font-bold text-lg sm:text-xl md:text-xl
          shadow-3xl
          hover:shadow-4xl
          transition-all duration-300
        "
      >
        {text}
        <ArrowRight size={24} />
      </motion.span>
    </Link>
  );
}
