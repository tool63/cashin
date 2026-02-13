"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SeoEngine from "@/components/seo/SeoEngine";
import { Trophy, Gift, Star } from "lucide-react";

type WheelSegment = {
  id: number;
  label: string;
  reward: string;
  color: string;
};

const segments: WheelSegment[] = [
  { id: 1, label: "Free Trial", reward: "$1.50", color: "#FACC15" },
  { id: 2, label: "Bonus Points", reward: "50 Points", color: "#4ADE80" },
  { id: 3, label: "Cash Reward", reward: "$2.00", color: "#F472B6" },
  { id: 4, label: "Gift Card", reward: "$5.00", color: "#60A5FA" },
  { id: 5, label: "Extra Spins", reward: "1 Spin", color: "#F97316" },
  { id: 6, label: "Mystery Reward", reward: "???", color: "#A78BFA" },
];

export default function SpinningWheelPage() {
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<WheelSegment | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const spinWheel = () => {
    if (isSpinning) return;

    const spins = Math.floor(Math.random() * 5) + 5; // 5-9 spins
    const segmentIndex = Math.floor(Math.random() * segments.length);
    const segmentAngle = 360 / segments.length;
    const finalRotation = spins * 360 + segmentIndex * segmentAngle + segmentAngle / 2;

    setIsSpinning(true);
    setRotation(rotation + finalRotation);

    setTimeout(() => {
      setWinner(segments[segmentIndex]);
      setIsSpinning(false);
    }, 4000); // Spin animation duration
  };

  return (
    <>
      <SeoEngine
        title="Spinning Wheel | Cashog"
        description="Spin the Cashog Wheel to win rewards like cash, points, gift cards, and free trials instantly."
      />

      <main className="bg-white dark:bg-zinc-950 text-gray-900 dark:text-white transition-colors duration-300">

        {/* ================= HERO ================= */}
        <section className="relative py-28 px-6 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/40 via-green-200/30 to-yellow-300/40 dark:from-yellow-900/20 dark:via-green-900/10 dark:to-green-800/20 blur-3xl" />

          <motion.div
            className="relative max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Spin the Wheel & Win Rewards
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10">
              Try your luck with Cashog’s spinning wheel. Win cash, points, gift cards, free trials and more instantly.
            </p>

            <motion.button
              onClick={spinWheel}
              className="cta-observer inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-lg hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Spin Now <Trophy size={20} />
            </motion.button>
          </motion.div>
        </section>

        {/* ================= WHEEL ================= */}
        <section className="py-24 px-6 flex flex-col items-center">
          <div className="relative w-80 h-80 md:w-96 md:h-96 mb-10">
            <motion.div
              className="w-full h-full rounded-full border-8 border-gray-200 dark:border-zinc-700 overflow-hidden relative"
              animate={{ rotate: rotation }}
              transition={{ duration: 4, ease: "easeOut" }}
            >
              {segments.map((seg, i) => {
                const rotateDeg = (360 / segments.length) * i;
                return (
                  <div
                    key={seg.id}
                    className="absolute w-1/2 h-1/2 origin-bottom-left top-1/2 left-1/2"
                    style={{
                      transform: `rotate(${rotateDeg}deg) skewY(-${90 - 360 / segments.length}deg)`,
                      backgroundColor: seg.color,
                      clipPath: "polygon(0 0, 100% 0, 100% 100%)",
                    }}
                  >
                    <span className="absolute top-2 left-2 text-xs font-bold text-black dark:text-white" style={{ transform: `rotate(${90 - 360 / segments.length}deg)` }}>
                      {seg.label}
                    </span>
                  </div>
                );
              })}
            </motion.div>

            {/* Pointer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-red-600 rounded-full z-10"></div>
          </div>

          {winner && (
            <motion.div
              className="text-center mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-xl font-bold">🎉 Congratulations! You won:</p>
              <p className="text-3xl font-extrabold text-green-600">{winner.reward}</p>
            </motion.div>
          )}
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="py-28 px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Try Your Luck Again & Earn More Rewards
          </h2>

          <motion.button
            onClick={spinWheel}
            className="cta-observer inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-xl hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Spin Again <Gift size={20} />
          </motion.button>
        </section>
      </main>
    </>
  );
}
