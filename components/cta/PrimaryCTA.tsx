"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/app/[country]/providers/LanguageProvider";

interface PrimaryCTAProps {
  href: string;
  children?: string; // optional now
  observer?: boolean;
  translationKey?: string;
}

export default function PrimaryCTA({
  href,
  children = "",
  observer = true,
  translationKey,
}: PrimaryCTAProps) {
  const { getTranslation } = useLanguage();

  const translatedText = translationKey
    ? getTranslation("primarycta", translationKey, children)
    : children;

  return (
    <Link
      href={href}
      className={observer ? "cta-observer inline-block" : "inline-block"}
      aria-label={translatedText}
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
        {translatedText}
        <ArrowRight size={24} />
      </motion.span>
    </Link>
  );
}
