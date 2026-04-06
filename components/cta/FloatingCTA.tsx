// components/cta/FloatingCTA.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import styles from "./FloatingCTA.module.css";
import { useLanguage } from "@/app/[country]/providers/LanguageProvider";
import CircleBorder from "@/components/animations/CircleBorder";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [bounceKey, setBounceKey] = useState(0);
  const params = useParams();
  const country = params?.country as string || "us";

  const { getTranslation } = useLanguage();

  const text = getTranslation(
    "primarycta",
    "start_earning_now",
    "Start Earning Now"
  );

  const letters = text.split("");

  const href = `/${country}/signup`;

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const observeCTAs = () => {
      const ctaElements = document.querySelectorAll(".cta-observer");

      if (!ctaElements.length) {
        setVisible(true);
        return;
      }

      if (observer) observer.disconnect();

      observer = new IntersectionObserver(
        (entries) => {
          const anyVisible = entries.some((entry) => entry.isIntersecting);
          setVisible(!anyVisible);
        },
        { root: null, threshold: 0.15 }
      );

      ctaElements.forEach((el) => observer?.observe(el));
    };

    requestAnimationFrame(observeCTAs);

    const mutationObserver = new MutationObserver(() => {
      observeCTAs();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener("resize", observeCTAs);

    return () => {
      if (observer) observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("resize", observeCTAs);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(
      () => setBounceKey((prev) => prev + 1),
      10000
    );
    return () => clearInterval(interval);
  }, []);

  // Updated ButtonContent matching PrimaryCTA's structure
  const ButtonContent = () => (
    <motion.span
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.97 }}
      className="
        inline-flex items-center justify-center
        bg-gradient-to-r from-yellow-400 via-green-400 to-green-500
        text-black 
        px-10 sm:px-16 md:px-20 
        py-3 sm:py-5 md:py-7
        rounded-3xl
        font-bold text-lg sm:text-xl md:text-xl
        shadow-3xl
        hover:shadow-4xl
        transition-all duration-300
        cursor-pointer
        w-full
      "
    >
      {letters.map((char, index) => (
        <span
          key={`${bounceKey}-${index}`}
          className={styles.letter}
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </motion.span>
  );

  // EXACT same pattern as PrimaryCTA
  const WrappedButton = () => (
    <div className="inline-block">
      <CircleBorder>
        <div className="-m-6 md:-m-10">
          <ButtonContent />
        </div>
      </CircleBorder>
    </div>
  );

  return (
    <Link
      href={href}
      aria-label={text}
      className={`${styles.floatingCTA} ${visible ? styles.show : styles.hide}`}
    >
      <WrappedButton />
    </Link>
  );
}
