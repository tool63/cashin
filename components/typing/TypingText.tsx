"use client";

import { useEffect, useState } from "react";

type TypingTextProps = {
  words?: string[];      // Array of words/phrases to display
  displayTime?: number;  // Time each word stays visible in ms
  fadeTime?: number;     // Fade animation time in ms
  className?: string;    // Optional custom className for styling
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
  displayTime = 2000,
  fadeTime = 500,
  className = "text-indigo-500 font-semibold",
}: TypingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false); // start fade out
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setVisible(true); // fade in next word
      }, fadeTime);
    }, displayTime);

    return () => clearTimeout(timeout);
  }, [currentIndex, words.length, displayTime, fadeTime]);

  return (
    <span className="relative inline-block">
      <span
        className={`${className} transition-opacity duration-[${fadeTime}ms]`}
        style={{ opacity: visible ? 1 : 0 }}
      >
        {words[currentIndex]}
      </span>
      {/* Blinking cursor */}
      <span className="absolute right-[-0.25rem] top-0 animate-blink">|</span>

      <style jsx>{`
        @keyframes blink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0; }
        }
        .animate-blink {
          display: inline-block;
          margin-left: 2px;
          animation: blink 1s infinite;
          color: inherit;
        }
      `}</style>
    </span>
  );
}
