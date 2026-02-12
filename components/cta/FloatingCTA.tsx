"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./FloatingCTA.module.css";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(true);
  const [bounceKey, setBounceKey] = useState(0);
  const pathname = usePathname();

  const text = "Start Earning Now!";
  const letters = text.split("");

  /* ================= CTA VISIBILITY LOGIC ================= */
  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const initObserver = () => {
      const ctaElements = document.querySelectorAll(".cta-observer");

      // If no main CTA exists → show floating CTA
      if (!ctaElements.length) {
        setVisible(true);
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          const anyVisible = entries.some(
            (entry) => entry.isIntersecting
          );

          // Hide floating CTA if main CTA is visible
          setVisible(!anyVisible);
        },
        {
          root: null,
          threshold: 0.25,
        }
      );

      ctaElements.forEach((el) => observer?.observe(el));
    };

    // Delay to ensure page content loads
    const timeout = setTimeout(initObserver, 150);

    return () => {
      clearTimeout(timeout);
      if (observer) observer.disconnect();
    };
  }, [pathname]); // Re-run when route changes

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
      className={`${styles.floatingCTA} ${
        visible ? styles.show : styles.hide
      }`}
    >
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
    </Link>
  );
}
