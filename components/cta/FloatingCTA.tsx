// components/cta/FloatingCTA.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
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
    const interval = setInterval(
      () => setBounceKey((prev) => prev + 1),
      10000
    );
    return () => clearInterval(interval);
  }, []);

  const ButtonContent = () => (
    <div className={styles.buttonContent}>
      {letters.map((char, index) => (
        <span
          key={`${bounceKey}-${index}`}
          className={`${styles.letter} ${
            bounceKey ? styles.sparkle : ""
          }`}
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );

  const WrappedButton = () => (
    <div className={styles.wrapper}>
      <CircleBorder>
        <div className={styles.innerPadding}>
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
