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
    const ctas = [
      document.getElementById("hero-cta-1"),
      document.getElementById("hero-cta-2")
    ].filter(Boolean) as HTMLElement[];

    if (!ctas.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Hide floating CTA if any hero CTA is visible
        const anyVisible = entries.some(entry => entry.isIntersecting);
        setVisible(!anyVisible);
      },
      { threshold: 0 } // trigger when partially visible
    );

    ctas.forEach(cta => observer.observe(cta));

    return () => observer.disconnect();
  }, []);

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
