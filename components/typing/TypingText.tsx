"use client";

import { useEffect, useState } from "react";

type TypingTextProps = {
  words: string[];      // Array of words/phrases to type
  speed?: number;       // Typing speed in ms per character
  pause?: number;       // Pause at the end of a word before deleting
  className?: string;   // Optional custom className for styling
};

export default function TypingText({
  words,
  speed = 80,
  pause = 1500,
  className = "text-indigo-500",
}: TypingTextProps) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(() => {
      if (!deleting) {
        // Add next character
        setText(currentWord.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);

        // If word completed, pause then start deleting
        if (charIndex + 1 === currentWord.length) {
          setTimeout(() => setDeleting(true), pause);
        }
      } else {
        // Remove last character
        setText(currentWord.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);

        // If word deleted, move to next word
        if (charIndex === 0) {
          setDeleting(false);
          setWordIndex((wordIndex + 1) % words.length);
        }
      }
    }, deleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return (
    <span className={className}>
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
}
