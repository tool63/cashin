"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./FloatingCTA.module.css";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(true);
  const [bounceKey, setBounceKey] = useState(0);

  const text = "Start Earning Now!";
  const letters = text.split("");

  /* ================= AUTO HIDE / SHOW ================= */
  useEffect(() => {
    // Automatically find all CTA buttons (Link or button elements)
    const ctaElements = Array.from(document.querySelectorAll("a, button")).filter(
      (el) => el.textContent?.toLowerCase().includes("get started") || el.textContent?.toLowerCase().includes("signup")
    );

    if (!ctaElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // If any CTA is visible on screen, hide the floating CTA
        const anyVisible = entries.some((entry) => entry.isIntersecting);
        setVisible(!anyVisible);
      },
      { threshold: 0.1 }
    );

    ctaElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
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
