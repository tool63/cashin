'use client';

import { useEffect, useState } from 'react';
import styles from './FloatingCTA.module.css';

export default function FloatingCTA() {
  const [visible, setVisible] = useState(true);
  const [bounce, setBounce] = useState(false);

  // Split text into letters for bounce animation
  const text = 'Start Earning in 60 Seconds';
  const letters = text.split('');

  useEffect(() => {
    const firstCTA = document.querySelector('.cta:first-of-type');
    const lastCTA = document.querySelector('.cta:last-of-type');

    if (!firstCTA || !lastCTA) return;

    // Intersection Observer to hide/show button
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const firstVisible = entries.find(e => e.target === firstCTA)?.isIntersecting;
      const lastVisible = entries.find(e => e.target === lastCTA)?.isIntersecting;
      setVisible(!(firstVisible || lastVisible));
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      threshold: 0.1,
    });

    observer.observe(firstCTA);
    observer.observe(lastCTA);

    return () => observer.disconnect();
  }, []);

  // Trigger bounce after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => setBounce(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href="/signup"
      className={`${styles.floatingCTA} ${visible ? styles.show : styles.hide}`}
    >
      {letters.map((letter, idx) => (
        <span
          key={idx}
          className={`${bounce ? styles.bounce : ''}`}
          style={{ animationDelay: `${idx * 0.05}s` }}
        >
          {letter}
        </span>
      ))}
    </a>
  );
}
