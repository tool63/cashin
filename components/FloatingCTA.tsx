'use client';

import { useEffect, useState } from 'react';
import styles from './FloatingCTA.module.css';

export default function FloatingCTA() {
  const [visible, setVisible] = useState(true);
  const [bounceKey, setBounceKey] = useState(0); // forces re-animation

  const text = 'Start Earning in 60 Seconds';
  const letters = text.split('');

  // AUTO HIDE / SHOW based on first & last CTA
  useEffect(() => {
    const firstCTA = document.querySelector('.cta:first-of-type');
    const lastCTA = document.querySelector('.cta:last-of-type');

    if (!firstCTA || !lastCTA) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some(entry => entry.isIntersecting);
        setVisible(!isVisible);
      },
      { threshold: 0.1 }
    );

    observer.observe(firstCTA);
    observer.observe(lastCTA);

    return () => observer.disconnect();
  }, []);

  // TRIGGER BOUNCE EVERY 10 SECONDS (FULL SENTENCE)
  useEffect(() => {
    const interval = setInterval(() => {
      setBounceKey(prev => prev + 1); // restart animation
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <a
      href="/signup"
      className={`${styles.floatingCTA} ${visible ? styles.show : styles.hide}`}
    >
      {letters.map((char, index) => (
        <span
          key={`${bounceKey}-${index}`}
          className={styles.letter}
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </a>
  );
}
