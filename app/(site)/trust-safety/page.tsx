"use client";

import { useEffect, useRef, useState } from "react";
import {
  ShieldCheck,
  Lock,
  Eye,
  AlertTriangle,
  Fingerprint,
  Server,
} from "lucide-react";
import SeoEngine from "@/components/seo/SeoEngine"; // <-- Your existing component

/* ================= COUNT UP COMPONENT ================= */
function CountUp({ end }: { end: number }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(counter);
  }, [visible, end]);

  return <div ref={ref}>{count.toLocaleString()}</div>;
}

/* ================= PAGE COMPONENT ================= */
export default function TrustSafetyPage() {
  const securityFeatures = [
    {
      icon: <Lock className="h-8 w-8 text-green-600" />,
      title: "Advanced Encryption",
      desc: "Bank-level AES-256 encryption and secure SSL protocols safeguard every transaction.",
    },
    {
      icon: <Fingerprint className="h-8 w-8 text-yellow-500" />,
      title: "Multi-Factor Authentication",
      desc: "Layered identity verification ensures only authorized access.",
    },
    {
      icon: <Eye className="h-8 w-8 text-blue-600" />,
      title: "Real-Time Monitoring",
      desc: "AI-driven monitoring detects and blocks suspicious activity instantly.",
    },
    {
      icon: <Server className="h-8 w-8 text-purple-600" />,
      title: "Secure Infrastructure",
      desc: "Enterprise-grade cloud infrastructure with global redundancy.",
    },
    {
      icon: <AlertTriangle className="h-8 w-8 text-red-500" />,
      title: "Fraud Prevention",
      desc: "Advanced risk scoring and behavioral analysis systems.",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-emerald-600" />,
      title: "Compliance & Regulations",
      desc: "Aligned with international regulatory and financial compliance standards.",
    },
  ];

  const stats = [
    { number: 99.99, label: "System Uptime (%)" },
    { number: 256, label: "Bit Encryption Standard" },
    { number: 24, label: "Security Monitoring (Hours)" },
  ];

  return (
    <>
      {/* ================= META ================= */}
      <SeoEngine
        title="Trust & Safety | Cashog"
        description="Cashog ensures enterprise-grade security with encryption, fraud detection, and compliance systems to protect every transaction."
      />

      <div className="bg-white dark:bg-black text-gray-900 dark:text-white">
        {/* HERO */}
        <section className="relative py-24 px-6 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-100/40 via-yellow-100/30 to-green-200/40 dark:from-green-900/20 dark:via-yellow-900/10 dark:to-green-800/20 blur-3xl" />
          <div className="relative max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Trust & Safety</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Security is at the core of everything we build. Your data and transactions are protected by enterprise-grade systems.
            </p>
          </div>
        </section>

        {/* STATS */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="relative p-8 rounded-3xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-xl text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-green-400 to-yellow-400 rounded-full blur-3xl opacity-20" />
                <h2 className="text-4xl font-extrabold bg-gradient-to-r from-green-600 to-yellow-500 bg-clip-text text-transparent">
                  <CountUp end={stat.number} />
                  {stat.label.includes("%") && "%"}
                </h2>
                <p className="mt-3 text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-24 px-6 bg-gray-50 dark:bg-zinc-900">
          <div className="max-w-6xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Security Framework</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Multi-layered defense systems built for maximum protection.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
            {securityFeatures.map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-3xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-lg hover:shadow-2xl transition duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-5 p-4 rounded-2xl bg-green-50 dark:bg-zinc-700">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
