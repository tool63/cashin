"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Stat } from "@/components/homepage/SmallComponents";

export default function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    let hasAnimated = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setAnimate(true);
            hasAnimated = true;
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-gray-50 dark:bg-[#0B0E1A] text-gray-900 dark:text-white"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white"
        >
          Trusted by Millions Worldwide
        </motion.h2>

        {/* Gradient Accent Line */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "6rem" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="h-1 mx-auto mb-8 rounded-full bg-gradient-to-r from-yellow-400 via-green-400 to-green-500"
        />

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-base sm:text-lg md:text-xl mb-16 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          Cashog is a premium earning platform, trusted globally by millions of users for fast,
          secure, and verified payouts every day.
        </motion.p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-10">
          <Stat title="Total Users" value="25M+" animate={animate} />
          <Stat title="Users Paid" value="3.2M+" animate={animate} />
          <Stat title="Total Payouts" value="$12M+" animate={animate} />
          <Stat title="Trust Rating" value="4.8 ★" animate={animate} />
        </div>
      </div>
    </section>
  );
}
