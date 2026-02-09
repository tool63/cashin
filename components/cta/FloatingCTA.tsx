"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./FloatingCTA.module.css";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(true);
  const [bounceKey, setBounceKey] = useState(0);

  const text = "Start Earning Now!";
  const letters = text.split("");

  useEffect(() => {
    let observer: IntersectionObserver;

    const observeCTAs = () => {
      // Find all CTA links whose text contains "get started" or "signup"
      const ctas = Array.from(document.querySelectorAll("a")).filter((el) =>
        el.textContent?.toLowerCase().includes("get started") ||
        el.textContent?.toLowerCase().includes("signup")
      ) as HTMLElement[];

      if (!ctas.length) return;

      observer = new IntersectionObserver(
        (entries) => {
          // Hide floating CTA if ANY hero/final CTA is visible
          const anyVisible = entries.some(entry => entry.isIntersecting);
          setVisible(!anyVisible);
        },
        { threshold: 0 } // trigger when partially visible
      );

      ctas.forEach(cta => observer.observe(cta));
    };

    // Wait for next frame to ensure DOM is ready
    const timer = setTimeout(observeCTAs, 100);

    return () => {
      clearTimeout(timer);
      observer?.disconnect();
    };
  }, []);

  // Bounce animation every 10s
  useEffect(() => {
    const interval = setInterval(() => setBounceKey(prev => prev + 1), 10000);
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
