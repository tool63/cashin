"use client"

import { useEffect, useState } from "react"

type TypingTextProps = {
  words: string[]
  speed?: number
  pause?: number
}

export default function TypingText({
  words,
  speed = 80,
  pause = 1500,
}: TypingTextProps) {
  const [text, setText] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]

    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(currentWord.slice(0, charIndex + 1))
        setCharIndex(charIndex + 1)

        if (charIndex + 1 === currentWord.length) {
          setTimeout(() => setDeleting(true), pause)
        }
      } else {
        setText(currentWord.slice(0, charIndex - 1))
        setCharIndex(charIndex - 1)

        if (charIndex === 0) {
          setDeleting(false)
          setWordIndex((wordIndex + 1) % words.length)
        }
      }
    }, deleting ? speed / 2 : speed)

    return () => clearTimeout(timeout)
  }, [charIndex, deleting, wordIndex, words, speed, pause])

  return (
    <span className="text-indigo-500">
      {text}
      <span className="animate-pulse">|</span>
    </span>
  )
}
