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

    const checkCTAs = () => {
      const ctas = [
        document.querySelector("section #hero-cta-1 a"),
        document.querySelector("section #hero-cta-2 a")
      ].filter(Boolean) as HTMLElement[];

      if (!ctas.length) return;

      observer = new IntersectionObserver(
        (entries) => {
          const anyVisible = entries.some((entry) => entry.isIntersecting);
          setVisible(!anyVisible); // hide floating CTA if any CTA is visible
        },
        { threshold: 0 } // trigger as soon as element is partially visible
      );

      ctas.forEach(cta => observer.observe(cta));
    };

    // Delay until next tick to ensure DOM exists
    setTimeout(checkCTAs, 100);

    return () => observer?.disconnect();
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
