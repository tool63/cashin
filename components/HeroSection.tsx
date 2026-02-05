"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  // Words/phrases to type
  const phrases = ["Surveys", "App Installs", "Playing Games", "Watching Videos"]

  const [text, setText] = useState("")        // Current visible text
  const [wordIndex, setWordIndex] = useState(0) // Index of current word
  const [charIndex, setCharIndex] = useState(0) // Index of current character
  const [isDeleting, setIsDeleting] = useState(false) // Typing or deleting

  useEffect(() => {
    const currentWord = phrases[wordIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing effect
        setText(currentWord.slice(0, charIndex + 1))
        setCharIndex((prev) => prev + 1)

        if (charIndex + 1 === currentWord.length) {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 900)
        }
      } else {
        // Deleting effect
        setText(currentWord.slice(0, charIndex - 1))
        setCharIndex((prev) => prev - 1)

        if (charIndex === 0) {
          // Move to next word
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % phrases.length)
        }
      }
    }, isDeleting ? 50 : 90)

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, wordIndex, phrases])

  return (
    <section className="py-24 text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-2">
          Earn Real Money By
        </h1>

        {/* TYPING EFFECT */}
        <div className="relative h-[56px] md:h-[64px] mb-4">
          {/* Invisible span to keep height consistent */}
          <span className="invisible text-3xl md:text-5xl font-extrabold">
            Watching Videos
          </span>

          {/* Typing text */}
          <span className="absolute inset-0 flex items-center justify-center text-3xl md:text-5xl font-extrabold text-cyan-400">
            {text}
            <span className="ml-1 animate-pulse">|</span>
          </span>
        </div>

        <p className="mb-8 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Complete offers, play games, answer surveys and cash out instantly.
        </p>

        <Link href="/signup">
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black px-10 py-4 rounded-xl font-semibold shadow-lg"
          >
            Start Earning Now <ArrowRight />
          </motion.span>
        </Link>
      </div>
    </section>
  )
}
