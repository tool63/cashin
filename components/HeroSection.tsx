"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  const phrases = ["Surveys", "App Installs", "Playing Games", "Watching Videos"]
  const [current, setCurrent] = useState(0)
  const [text, setText] = useState("")

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      const phrase = phrases[current]
      setText(phrase.slice(0, i + 1))
      i++
      if (i > phrase.length) {
        setTimeout(() => {
          setText("")
          setCurrent((prev) => (prev + 1) % phrases.length)
        }, 700)
        clearInterval(interval)
      }
    }, 90)

    return () => clearInterval(interval)
  }, [current])

  return (
    <section className="py-24 text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-2">
          Earn Real Money By
        </h1>

        <div className="relative h-[56px] md:h-[64px] mb-4">
          <span className="invisible text-3xl md:text-5xl font-extrabold">
            Watching Videos
          </span>
          <span className="absolute inset-0 flex items-center justify-center text-3xl md:text-5xl font-extrabold text-cyan-400">
            {text}
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
