"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SeoEngine from "@/components/seo/SeoEngine";
import Background from "@/components/Background";
import Reveal from "@/components/animations/Reveal";
import TypingText from "@/components/typing/TypingText";
import PrimaryCTA from "@/components/cta/PrimaryCTA";

/* ================= REWARDS ================= */
const rewards = [
  "No Win",
  "$0.50",
  "$1.00",
  "$2.00",
  "$3.00",
  "Bonus Spin",
  "$1.50",
  "$0.75",
  "Lucky Try",
];

function getRandomReward() {
  return rewards[Math.floor(Math.random() * rewards.length)];
}

/* ================= TESTIMONIALS ================= */
const testimonials = [
  {
    name: "Alex",
    text: "I spun the wheel and won instantly! Cashog is amazing.",
  },
  {
    name: "Sarah",
    text: "Fun and rewarding experience. I love spinning the wheel!",
  },
  {
    name: "John",
    text: "I got a bonus spin and earned rewards. Highly recommended!",
  },
  {
    name: "Emma",
    text: "Simple, fast, and rewarding. Great experience with Cashog.",
  },
  {
    name: "Michael",
    text: "I didn’t win big, but the experience was exciting and fair.",
  },
];

export default function SpinningWheelPage() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    setTimeout(() => {
      const reward = getRandomReward();
      setResult(reward);
      setSpinning(false);
    }, 3000);
  };

  return (
    <>
      <SeoEngine
        title="Spinning Wheel | Cashog"
        description="Spin the wheel and earn rewards instantly. Modern and exciting reward experience."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        {/* ================= HERO WITH TYPING TEXT ================= */}
        <section className="relative z-10 py-28 px-6 text-center">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Spin the Wheel & Win Rewards
            </h1>

            <div className="text-2xl md:text-3xl font-bold gradient-text mb-6">
              <TypingText />
            </div>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
              Try your luck! Spin the wheel and win instant rewards.
              Fair and exciting reward experience with Cashog.
            </p>

            <PrimaryCTA href="#wheel">
              Start Spinning
            </PrimaryCTA>
          </Reveal>
        </section>

        {/* ================= SPIN WHEEL SECTION ================= */}
        <section id="wheel" className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Spin & Win
            </h2>

            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-12">
              Press the button and let luck decide your reward.
            </p>
          </Reveal>

          {/* SPIN CIRCLE (SHOW CASHOG) */}
          <motion.div
            className="mx-auto w-64 h-64 rounded-full border-8 border-green-400 flex items-center justify-center bg-white dark:bg-[#0a0d16] shadow-lg"
            animate={spinning ? { rotate: 360 } : {}}
            transition={spinning ? { repeat: Infinity, duration: 1 } : {}}
          >
            <span className="text-2xl font-bold text-green-500">
              Cashog
            </span>
          </motion.div>

          {/* RESULT */}
          {result && (
            <motion.div
              className="mt-8 text-xl font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              🎉 Result: <span className="text-green-500">{result}</span>
            </motion.div>
          )}

          {/* SPIN BUTTON */}
          <motion.button
            onClick={handleSpin}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="mt-10 inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-10 py-4 rounded-xl font-semibold shadow"
            disabled={spinning}
          >
            {spinning ? "Spinning..." : "Spin Now"}
          </motion.button>
        </section>

        {/* ================= TESTIMONIALS ================= */}
        <section className="relative z-10 max-w-6xl mx-auto px-6 py-24">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              What Users Say
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-14">
              Real feedback from Cashog users
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-800"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <p className="text-gray-600 dark:text-gray-300 italic">
                  “{item.text}”
                </p>
                <h3 className="mt-4 font-semibold text-green-500">— {item.name}</h3>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section className="relative z-10 max-w-6xl mx-auto px-6 py-24">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              How It Works
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-14">
              Simple and rewarding spinning experience
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Spin the Wheel",
                desc: "Click spin and let luck decide your reward."
              },
              {
                title: "Win Rewards",
                desc: "Get instant rewards based on your result."
              },
              {
                title: "Enjoy & Repeat",
                desc: "Come back and spin again for more rewards."
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-800"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="relative z-10 py-28 px-6 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Spin & Win Rewards?
            </h2>

            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-10">
              Join Cashog and start winning rewards with our spinning experience.
            </p>

            <PrimaryCTA href="/signup">
              Join Cashog Now
            </PrimaryCTA>
          </Reveal>
        </section>
      </main>
    </>
  );
}
