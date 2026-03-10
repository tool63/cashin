"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./FloatingCTA.module.css";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [bounceKey, setBounceKey] = useState(0);

  const text = "Start Earning Now!";
  const letters = text.split("");

  /* ================= CTA VISIBILITY LOGIC ================= */
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

    // Initial observation
    requestAnimationFrame(observeCTAs);

    // Observe DOM changes for late-loaded buttons (HeroSection, etc.)
    const mutationObserver = new MutationObserver(() => {
      observeCTAs();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // Re-check on window resize
    window.addEventListener("resize", observeCTAs);

    return () => {
      if (observer) observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("resize", observeCTAs);
    };
  }, []);

  /* ================= BOUNCE EVERY 10s ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      setBounceKey((prev) => prev + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Link
      href="/signup"
      className={`${styles.floatingCTA} ${visible ? styles.show : styles.hide}`}
    >
      {letters.map((char, index) => (
        <span
          key={`${bounceKey}-${index}`}
          className={`${styles.letter} ${bounceKey ? styles.sparkle : ""}`}
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </Link>
  );
}
