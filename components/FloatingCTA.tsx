'use client';

import { useEffect, useState } from 'react';
import styles from './FloatingCTA.module.css';

export default function FloatingCTA() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const firstCTA = document.querySelector('.cta:first-of-type');
    const lastCTA = document.querySelector('.cta:last-of-type');

    if (!firstCTA || !lastCTA) return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const firstVisible = entries.find(e => e.target === firstCTA)?.isIntersecting;
      const lastVisible = entries.find(e => e.target === lastCTA)?.isIntersecting;
      setHidden(Boolean(firstVisible || lastVisible));
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      threshold: 0.1,
    });

    observer.observe(firstCTA);
    observer.observe(lastCTA);

    return () => observer.disconnect();
  }, []);

  return (
    <a
      href="/signup"
      className={`${styles.floatingCTA} ${hidden ? styles.hide : ''}`}
    >
      Start Earning in 60 Seconds
    </a>
  );
}
