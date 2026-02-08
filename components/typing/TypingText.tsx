"use client";

import { useEffect, useState } from "react";

type TypingTextProps = {
  words?: string[];
  displayTime?: number;
  fadeTime?: number;
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
  displayTime = 2000,
  fadeTime = 500,
  className = "text-indigo-500 font-semibold",
}: TypingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setVisible(false); // fade out
    }, displayTime);

    const switchTimer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
      setVisible(true); // fade in
    }, displayTime + fadeTime);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(switchTimer);
    };
  }, [currentIndex, words.length, displayTime, fadeTime]);

  return (
    <span className="inline-block">
      <span
        className={`${className} transition-opacity`}
        style={{
          opacity: visible ? 1 : 0,
          transitionDuration: `${fadeTime}ms`,
        }}
      >
        {words[currentIndex]}
      </span>
    </span>
  );
}
