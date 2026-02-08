"use client";

import { useEffect, useState } from "react";

type TypingTextProps = {
  words?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  className?: string;
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
  className = "",
}: TypingTextProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (charIndex < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, charIndex + 1));
          setCharIndex((p) => p + 1);
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), pauseTime);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, charIndex - 1));
          setCharIndex((p) => p - 1);
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setWordIndex((p) => (p + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span
      className={`
        text-[19px] font-semibold
        bg-gradient-to-r
        from-red-500 via-yellow-400 via-green-400 via-blue-500 to-purple-500
        bg-[length:300%_300%]
        bg-clip-text text-transparent
        animate-rainbow
        ${className}
      `}
    >
      {displayText}
      <span className="ml-1 animate-pulse text-green-400">|</span>

      <style jsx>{`
        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-rainbow {
          animation: rainbow 4s linear infinite;
        }
      `}</style>
    </span>
  );
}
