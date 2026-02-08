"use client";

import TypingText from "@/components/typing/TypingText";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="w-full py-16 px-4">
      <div className="max-w-5xl mx-auto text-center">

        {/* Headline */}
        <h1 className="text-[20px] font-bold text-black mb-3">
          Earn Real Money Online
        </h1>

        {/* Typing text */}
        <div className="mb-8">
          <TypingText />
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
            px-8 py-3 rounded-xl font-semibold
            text-black
            bg-gradient-to-r
            from-red-500 via-yellow-400 via-green-400 via-blue-500 to-purple-500
            bg-[length:300%_300%]
            animate-rainbow
            shadow-lg
          "
        >
          Get Started Now
        </motion.button>

        {/* Local animation only */}
        <style jsx>{`
          @keyframes rainbow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-rainbow {
            animation: rainbow 5s linear infinite;
          }
        `}</style>

      </div>
    </section>
  );
}
