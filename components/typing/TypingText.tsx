"use client";

import { useEffect, useState } from "react";

type TypingTextProps = {
  words?: string[];          // Array of words/phrases to type
  typingSpeed?: number;      // Speed of typing each character (ms)
  deletingSpeed?: number;    // Speed of deleting each character (ms)
  pauseTime?: number;        // Pause at the end of word (ms)
  className?: string;        // CSS classes
};

export default function TypingText({
  words = [
    "Answering Surveys",
    "Installing Apps",
    "Playing Games",
    "Watching Videos",
    "Mining",
    "Completing Offers",
    "Offerwall",
    "Surveywall",
    "Watching Ads",
    "Completing Micro Tasks",
    "Completing Free Trials",
    "Testing Products",
    "Reading Emails",
    "Visiting Websites",
    "Completing Review",
    "Spinning Wheel",
    "Loyalty",
    "Uploading Vouchers",
  ],
  typingSpeed = 90,
  deletingSpeed = 50,
  pauseTime = 1500,
  className = "text-green-500 font-semibold text-[19px]",
}: TypingTextProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing
      if (charIndex < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        }, typingSpeed);
      } else {
        // Pause before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      }
    } else {
      // Deleting
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={className}>
      {displayText}
      <span className="ml-1 animate-pulse">|</span>
    </span>
  );
}
