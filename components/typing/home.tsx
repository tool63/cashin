"use client";

import { useEffect, useState, useMemo } from "react";

type TypingTextProps = {
  translations?: any;
  countryName?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  className?: string;
};

export default function TypingText({
  translations,
  countryName,
  typingSpeed = 90,
  deletingSpeed = 50,
  pauseTime = 1500,
  className = "text-4xl sm:text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500",
}: TypingTextProps) {
  /* ================= WORDS ================= */

  // ✅ Correct path based on typinghome.json
  const wordsFromTranslations: string[] =
    translations?.typinghome?.typing?.words || [];

  const fallbackWords: string[] = [
    "Answering Surveys",
    "Installing Apps",
    "Playing Games",
    "Watching Videos",
    "Mining",
    "Completing Offers",
    "Offerwall",
    "Surveywall",
    "Watching Ads",
    "Completing Micro Tasks",
    "Completing Free Trials",
    "Testing Products",
    "Reading Emails",
    "Visiting Websites",
    "Completing Review",
    "Spinning Wheel",
    "Loyalty",
    "Uploading Vouchers",
  ];

  const baseWords =
    Array.isArray(wordsFromTranslations) && wordsFromTranslations.length > 0
      ? wordsFromTranslations
      : fallbackWords;

  /* ================= COUNTRY REPLACEMENT ================= */

  const words = useMemo(() => {
    if (!countryName) return baseWords;

    return baseWords.map((word) =>
      word.replace(/\{country\}/g, countryName)
    );
  }, [baseWords, countryName]);

  /* ================= STATE ================= */

  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState("");

  /* ================= EFFECT ================= */

  useEffect(() => {
    if (!words.length) return;

    const currentWord = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (charIndex < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), pauseTime);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    charIndex,
    isDeleting,
    wordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    pauseTime,
  ]);

  /* ================= RENDER ================= */

  return (
    <span className={className}>
      {displayText}
      <span className="ml-1 animate-pulse">|</span>
    </span>
  );
}
