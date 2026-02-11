"use client";

import { useRef, useState, useEffect } from "react";
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
      className="relative py-24 bg-[#0b1120]"
    >
      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-white/5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Trusted by Millions Worldwide
        </h2>

        {/* Subtext */}
        <p className="text-gray-400 max-w-3xl mx-auto mb-16 text-lg leading-relaxed">
          Cashog is one of the most trusted earning platforms, paying users daily
          across the globe with fast, secure, and verified withdrawals.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <Stat title="Total Users" value="25M+" animate={animate} />
          <Stat title="Users Paid" value="3.2M+" animate={animate} />
          <Stat title="Total Payouts" value="$12M+" animate={animate} />
          <Stat title="Trust Rating" value="4.8 ★" animate={animate} />
        </div>
      </div>
    </section>
  );
}
