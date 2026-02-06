'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './FloatingCTA.module.css'
import { useLang } from '@/app/providers/LanguageProvider' // ✅ ADD

export default function FloatingCTA() {
  const { t } = useLang() // ✅ GET TRANSLATION
  const [visible, setVisible] = useState(true)
  const [bounceKey, setBounceKey] = useState(0)

  const text = t('floating_cta') // ✅ LANGUAGE TEXT
  const letters = text.split('')

  /* ================= AUTO HIDE / SHOW ================= */
  useEffect(() => {
    const firstCTA = document.querySelector('.cta')
    const lastCTA = document.querySelector('.cta:last-of-type')

    if (!firstCTA || !lastCTA) return

    const observer = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((entry) => entry.isIntersecting)
        setVisible(!anyVisible)
      },
      { threshold: 0.1 }
    )

    observer.observe(firstCTA)
    observer.observe(lastCTA)

    return () => observer.disconnect()
  }, [])

  /* ================= BOUNCE EVERY 10s ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      setBounceKey((prev) => prev + 1)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

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
          className={styles.letter}
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </Link>
  )
}
