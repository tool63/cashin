// components/cta/FloatingCTA.tsx

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLanguage } from "@/app/[country]/providers/LanguageProvider";
import CircleBorder from "@/components/animations/CircleBorder";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [bounceKey, setBounceKey] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const params = useParams();
  const country = params?.country as string || "us";

  const { getTranslation, isLoading } = useLanguage();

  const text = getTranslation(
    "primarycta",
    "start_earning_now",
    "Start Earning Now"
  );

  // Wait for translation to be ready
  useEffect(() => {
    if (!isLoading && text) {
      setIsReady(true);
    }
  }, [isLoading, text]);

  const letters = isReady ? text.split("") : [];

  // Dynamic href with country parameter
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
    // Only start the interval when the text is ready
    if (!isReady) return;
    
    const interval = setInterval(
      () => setBounceKey((prev) => prev + 1),
      10000
    );
    return () => clearInterval(interval);
  }, [isReady]);

  const ButtonContent = () => (
    <motion.span
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.97 }}
      className="
        inline-flex items-center justify-center gap-0.5
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
      "
    >
      {!isReady ? (
        // Show fallback text while loading
        <span>Start Earning Now</span>
      ) : (
        letters.map((char, index) => (
          <motion.span
            key={`${bounceKey}-${index}`}
            className="inline-block relative"
            animate={
              bounceKey
                ? {
                    y: [0, -8, 2, 0],
                  }
                : {}
            }
            transition={{ duration: 0.6, delay: index * 0.05 }}
          >
            {char === " " ? "\u00A0" : char}
            {bounceKey && (
              <motion.span
                className="absolute top-[-8px] left-1/2 transform -translate-x-1/2 text-sm"
                initial={{ opacity: 0, scale: 0, y: -8 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.2, 0],
                  y: [-8, -14, -20],
                }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                ✨
              </motion.span>
            )}
          </motion.span>
        ))
      )}
    </motion.span>
  );

  // EXACT same WrappedButton pattern as PrimaryCTA
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
      className={`fixed bottom-5 right-5 z-[9999] transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-20 pointer-events-none"
      }`}
      aria-label={text}
    >
      <WrappedButton />
    </Link>
  );
}
