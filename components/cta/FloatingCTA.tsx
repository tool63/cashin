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

  // Use the same translation key pattern as PrimaryCTA
  const text = getTranslation(
    "primarycta",
    "start_earning_now",
    "Start Earning Now"
  );

  const letters = text.split("");

  // Dynamic href with country parameter (following PrimaryCTA's href processing logic)
  const getProcessedHref = () => {
    const href = `/${country}/signup`;
    
    if (href.startsWith(`/${country}`)) return href;
    if (href.startsWith("http") || href.startsWith("//")) return href;
    
    if (href.startsWith("/")) {
      const noPrefixPaths = ["/api/", "/auth/", "/_next/", "/favicon.ico"];
      if (noPrefixPaths.some(path => href.startsWith(path))) {
        return href;
      }
      return `/${country}${href}`;
    }
    
    if (href.startsWith("#")) return href;
    return `/${country}/${href}`;
  };

  const processedHref = getProcessedHref();

  // Observer logic to show/hide when other CTAs are visible (same as PrimaryCTA's observer pattern)
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

  // Sparkle animation interval (every 10 seconds)
  useEffect(() => {
    const interval = setInterval(
      () => setBounceKey((prev) => prev + 1),
      10000
    );
    return () => clearInterval(interval);
  }, []);

  // Button content with letter animations (matching PrimaryCTA's ButtonContent pattern)
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

  // Wrapped button with CircleBorder (matching PrimaryCTA's WrappedButton pattern exactly)
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
      href={processedHref}
      aria-label={text}
      className={`${styles.floatingCTA} ${visible ? styles.show : styles.hide}`}
    >
      <WrappedButton />
    </Link>
  );
}
