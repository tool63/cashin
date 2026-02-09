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
    const heroCTA = document.getElementById("hero-cta-button");
    if (!heroCTA) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0].isIntersecting;
        setVisible(!isVisible); // hide floating CTA when hero CTA is visible
      },
      { threshold: 0.1 }
    );

    observer.observe(heroCTA);

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
