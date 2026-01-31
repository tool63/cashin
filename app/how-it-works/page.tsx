"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  BarChart3,
  CheckCircle,
  Wallet,
  Gift,
} from "lucide-react";

export default function HowItWorksPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [showFloating, setShowFloating] = useState(false);

  const ctaGradient =
    "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600";

  useEffect(() => {
    if (!heroRef.current || !footerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const heroVisible = entries.find(
          (e) => e.target === heroRef.current
        )?.isIntersecting;

        const footerVisible = entries.find(
          (e) => e.target === footerRef.current
        )?.isIntersecting;

        setShowFloating(!heroVisible && !footerVisible);
      },
      { threshold: 0.25 }
    );

    observer.observe(heroRef.current);
    observer.observe(footerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-slate-950 text-white relative">

      {/* HERO */}
      <section
        ref={heroRef}
        className="max-w-7xl mx-auto px-6 pt-24 pb-28 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold"
        >
          How <span className="text-blue-500">Cashooz</span> Works
        </motion.h1>

        <p className="text-slate-300 max-w-2xl mx-auto text-lg mt-6">
          Earn real money by completing simple online tasks like surveys,
          playing games, installing apps, and more.
        </p>

        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="mt-10"
        >
          <Link
            href="/register"
            className={`inline-flex items-center gap-3 px-12 py-5 rounded-full font-bold text-lg ${ctaGradient} shadow-2xl`}
          >
            Start Earning Now <ArrowRight />
          </Link>
        </motion.div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-slate-900 py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-slate-300">
          <TrustItem icon={<ShieldCheck />} text="Secure & Safe" />
          <TrustItem icon={<Zap />} text="Instant Rewards" />
          <TrustItem icon={<Activity />} text="Easy Tasks" />
          <TrustItem icon={<BarChart3 />} text="High Quality Offers" />
        </div>
      </section>

      {/* STEPS */}
      <section className="py-20 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Earn in 3 Simple Steps</h2>
        <p className="text-slate-400 mb-12 max-w-2xl mx-auto">
          Getting started with Cashooz takes less than a minute.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <StepCard
            icon={<Zap />}
            title="Sign Up Free"
            desc="Create your Cashooz account in under 60 seconds."
          />
          <StepCard
            icon={<Activity />}
            title="Complete Tasks"
            desc="Choose from surveys, games, apps, and offers."
          />
          <StepCard
            icon={<Wallet />}
            title="Get Paid"
            desc="Withdraw via PayPal, gift cards, or crypto."
          />
        </div>
      </section>

      {/* WAYS TO EARN */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Ways to Earn on Cashooz
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Surveys",
              "Play Games",
              "App Installs",
              "Watch Videos",
              "Offerwall",
              "Surveywall",
              "Mining Rewards",
              "Daily Tasks",
            ].map((item) => (
              <div
                key={item}
                className="bg-slate-800 rounded-xl p-6 flex items-center gap-3"
              >
                <CheckCircle className="text-green-500" size={20} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAYOUTS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Fast & Secure Payouts
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <PayoutCard
              icon={<Wallet />}
              title="PayPal Cash"
              desc="Withdraw earnings directly to PayPal."
            />
            <PayoutCard
              icon={<Gift />}
              title="Gift Cards"
              desc="Amazon, Google Play, Apple, and more."
            />
            <PayoutCard
              icon={<ShieldCheck />}
              title="Crypto"
              desc="Bitcoin, Ethereum, Litecoin & Dogecoin."
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        ref={footerRef}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 py-24 text-center"
      >
        <h2 className="text-4xl font-bold mb-4">
          Ready to Start Earning?
        </h2>
        <p className="text-white/90 mb-8 text-lg">
          Join Cashooz today and earn rewards in minutes.
        </p>

        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        >
          <Link
            href="/register"
            className="inline-flex items-center gap-3 bg-white text-slate-900 px-12 py-5 rounded-full font-bold text-lg"
          >
            Create Free Account <ArrowRight />
          </Link>
        </motion.div>
      </section>

      {/* FLOATING CTA */}
      {showFloating && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Link
            href="/register"
            className={`inline-flex items-center gap-3 px-6 py-4 rounded-full font-bold text-lg ${ctaGradient} shadow-2xl hover:scale-105 transition`}
          >
            Start Earning in 60 Seconds <ArrowRight />
          </Link>
        </motion.div>
      )}
    </main>
  );
}

/* COMPONENTS */

function TrustItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 justify-center">
      <span className="text-blue-500">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function StepCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-slate-900 rounded-2xl p-8 text-center">
      <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-600">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-slate-300">{desc}</p>
    </div>
  );
}

function PayoutCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-slate-900 rounded-2xl p-8 text-center">
      <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-600">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-slate-300">{desc}</p>
    </div>
  );
}
