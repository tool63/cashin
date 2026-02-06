"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLang } from "../app/providers/LanguageProvider"; // ✅ language hook

export default function HeroSection() {
  const { t } = useLang(); // ✅ dynamic translations

  // Words/phrases to type (centralized in LANG file)
  const phrases = [
    t("hero_phrase_surveys"),
    t("hero_phrase_apps"),
    t("hero_phrase_games"),
    t("hero_phrase_videos"),
  ];

  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = phrases[wordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);

        if (charIndex + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 900); // pause before deleting
        }
      } else {
        setText(currentWord.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);

        if (charIndex === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % phrases.length); // loop phrases
        }
      }
    }, isDeleting ? 50 : 90);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, phrases]);

  return (
    <section className="py-24 text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-2">
          {t("hero_title")}
        </h1>

        {/* TYPING EFFECT */}
        <div className="relative h-[56px] md:h-[64px] mb-4">
          {/* Invisible span to keep height consistent */}
          <span className="invisible text-3xl md:text-5xl font-extrabold">
            {t("hero_phrase_videos")}
          </span>

          {/* Typing text */}
          <span className="absolute inset-0 flex items-center justify-center text-3xl md:text-5xl font-extrabold text-cyan-400">
            {text}
            <span className="ml-1 animate-pulse">|</span>
          </span>
        </div>

        <p className="mb-8 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t("hero_description")}
        </p>

        <Link href="/signup">
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black px-10 py-4 rounded-xl font-semibold shadow-lg"
          >
            {t("hero_cta")} <ArrowRight />
          </motion.span>
        </Link>
      </div>
    </section>
  );
}
