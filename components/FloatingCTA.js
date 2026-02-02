'use client'; // important for Next.js 13+ with app directory

import { useEffect, useState } from 'react';
import styles from './FloatingCTA.module.css';

export default function FloatingCTA() {
  const [hidden, setHidden] = useState(false);

  // Check if element is in viewport
  const isInViewport = (el) => {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  };

  const toggleCTA = () => {
    const firstCTA = document.querySelector('.cta:first-of-type');
    const lastCTA = document.querySelector('.cta:last-of-type');

    if (!firstCTA || !lastCTA) return;

    if (isInViewport(firstCTA) || isInViewport(lastCTA)) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  };

  useEffect(() => {
    toggleCTA(); // initial check
    window.addEventListener('scroll', toggleCTA);
    window.addEventListener('resize', toggleCTA);

    return () => {
      window.removeEventListener('scroll', toggleCTA);
      window.removeEventListener('resize', toggleCTA);
    };
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
