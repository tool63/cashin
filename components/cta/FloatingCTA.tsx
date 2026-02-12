"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./FloatingCTA.module.css";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [bounceKey, setBounceKey] = useState(0);
  const pathname = usePathname();

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

      observer = new IntersectionObserver(
        (entries) => {
          const anyVisible = entries.some((entry) => entry.isIntersecting);
          setVisible(!anyVisible);
        },
        {
          root: null,
          threshold: 0.15, // Lower threshold = more accurate detection
        }
      );

      ctaElements.forEach((el) => observer?.observe(el));
    };

    // Wait until DOM fully painted
    requestAnimationFrame(() => {
      observeCTAs();
    });

    return () => {
      if (observer) observer.disconnect();
    };
  }, [pathname]);

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
