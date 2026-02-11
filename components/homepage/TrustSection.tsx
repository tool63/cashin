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
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-[#0f172a] to-[#111827] overflow-hidden"
    >
      {/* Background Decorative Shapes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Trusted by Millions Worldwide
        </h2>

        {/* Subtext */}
        <p className="text-gray-300 max-w-3xl mx-auto mb-16 text-lg md:text-xl leading-relaxed">
          Cashog is one of the most trusted earning platforms, paying users daily
          across the globe with fast, secure, and verified withdrawals.
        </p>

        {/* Stats Grid */}
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
