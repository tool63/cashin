"use client";


import { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";

import { ArrowRight, ShieldCheck, Zap, Activity, BarChart3, Eye } from "lucide-react";


const steps = [

  {

    title: "Sign Up for Free",

    description: "Create your free Cashooz account in under a minute to start earning.",

    icon: <Zap size={28} />,

  },

  {

    title: "Complete Your Profile",

    description: "Fill in your profile to get matched with high-paying tasks and surveys.",

    icon: <Activity size={28} />,

  },

  {

    title: "Choose Earning Method",

    description: "Select from surveys, app installs, games, and other bonus activities.",

    icon: <BarChart3 size={28} />,

  },

  {

    title: "Start Earning Rewards",

    description: "Complete tasks and redeem your rewards instantly via PayPal, Gift Cards, or Crypto.",

    icon: <ShieldCheck size={28} />,

  },

];


export default function HowToStartEarning() {

  const heroRef = useRef<HTMLDivElement>(null);

  const footerRef = useRef<HTMLDivElement>(null);

  const [showFloating, setShowFloating] = useState(false);


  const handleCTA = () => {

    alert("Sign up now to start earning rewards instantly!");

  };


  const ctaGradient = "bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400";


  /* Floating CTA logic */

  useEffect(() => {

    if (!heroRef.current || !footerRef.current) return;


    const observer = new IntersectionObserver(

      (entries) => {

        const heroVisible = entries.find((e) => e.target === heroRef.current)?.isIntersecting;

        const footerVisible = entries.find((e) => e.target === footerRef.current)?.isIntersecting;

        setShowFloating(!heroVisible && !footerVisible);

      },

      { threshold: 0.3 }

    );


    observer.observe(heroRef.current);

    observer.observe(footerRef.current);


    return () => observer.disconnect();

  }, []);


  return (

    <div className="min-h-screen bg-gradient-to-br from-[#0b101f] via-[#020617] to-black text-white">


      {/* HERO */}

      <section ref={heroRef} className="px-4 pt-24 pb-28 text-center max-w-7xl mx-auto">

        <motion.h1

          initial={{ opacity: 0, y: -20 }}

          animate={{ opacity: 1, y: 0 }}

          className="text-4xl md:text-6xl font-extrabold"

        >

          How to <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">Start Earning</span> on Cashooz

        </motion.h1>


        <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">

          Learn the fastest way to begin earning online rewards with Cashooz.

        </p>


        <div className="mt-10">

          <motion.button

            onClick={handleCTA}

            animate={{ y: [0, -6, 0] }}

            transition={{ repeat: Infinity, duration: 1.6 }}

            className={`inline-flex items-center gap-3 px-12 py-5 rounded-3xl font-bold text-lg ${ctaGradient} shadow-2xl hover:scale-105`}

          >

            Start Earning Now <ArrowRight />

          </motion.button>

        </div>

      </section>


      {/* TRUST STRIP */}

      <section className="bg-white/5 px-4 py-10 max-w-7xl mx-auto">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-gray-300 text-sm">

          <div className="flex gap-2 items-center"><ShieldCheck className="text-emerald-400" size={16} /> Secure & Safe</div>

          <div className="flex gap-2 items-center"><Zap className="text-yellow-400" size={16} /> Fast Rewards</div>

          <div className="flex gap-2 items-center"><Activity className="text-emerald-400" size={16} /> Easy Steps</div>

          <div className="flex gap-2 items-center"><BarChart3 className="text-purple-400" size={16} /> High-Paying Tasks</div>

        </div>

      </section>


      {/* STEP-BY-STEP GUIDE */}

      <section className="px-4 py-20 max-w-7xl mx-auto text-center">

        <h2 className="text-3xl font-bold mb-4">Step-by-Step to Start Earning</h2>

        <p className="text-gray-400 mb-10 max-w-2xl mx-auto">

          Follow these simple steps and begin earning online rewards in minutes.

        </p>


        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {steps.map((step, i) => (

            <motion.div

              key={i}

              whileInView={{ opacity: [0, 1], y: [20, 0] }}

              transition={{ delay: i * 0.1 }}

              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-cyan-400/40 transition"

            >

              <div className="text-cyan-400 mb-4 mx-auto w-fit">{step.icon}</div>

              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>

              <p className="text-gray-400">{step.description}</p>

            </motion.div>

          ))}

        </div>

      </section>


      {/* TIPS / BENEFITS */}

      <section className="px-4 py-20 max-w-7xl mx-auto text-center">

        <h2 className="text-3xl font-bold mb-4">Tips to Maximize Earnings</h2>

        <div className="grid md:grid-cols-2 gap-8 text-gray-300 mt-6">

          <div className="bg-white/5 p-6 rounded-2xl">

            <h3 className="font-semibold mb-2">Check Daily Tasks</h3>

            <p>Complete surveys, app installs, and games daily to maximize rewards.</p>

          </div>

          <div className="bg-white/5 p-6 rounded-2xl">

            <h3 className="font-semibold mb-2">Stay Active</h3>

            <p>Regular activity helps get more matched offers and bonuses.</p>

          </div>

          <div className="bg-white/5 p-6 rounded-2xl">

            <h3 className="font-semibold mb-2">Redeem Frequently</h3>

            <p>Withdraw rewards often to enjoy instant benefits and keep motivation high.</p>

          </div>

          <div className="bg-white/5 p-6 rounded-2xl">

            <h3 className="font-semibold mb-2">Profile Completion</h3>

            <p>Complete your profile for better matching with high-paying surveys and offers.</p>

          </div>

        </div>

      </section>


      {/* FAQ */}

      <section className="px-4 py-20 max-w-7xl mx-auto text-center">

        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>

        <div className="text-gray-400 mt-6 space-y-4">

          <div className="bg-white/5 rounded-xl p-6 cursor-pointer hover:bg-white/10 transition">

            <h3 className="font-semibold">How do I start earning immediately?</h3>

            <p className="mt-2 text-sm">Sign up, complete your profile, and start selecting tasks to earn rewards.</p>

          </div>

          <div className="bg-white/5 rounded-xl p-6 cursor-pointer hover:bg-white/10 transition">

            <h3 className="font-semibold">Do I need skills to earn?</h3>

            <p className="mt-2 text-sm">No, Cashooz is beginner-friendly. You can earn without prior experience.</p>

          </div>

          <div className="bg-white/5 rounded-xl p-6 cursor-pointer hover:bg-white/10 transition">

            <h3 className="font-semibold">How are rewards credited?</h3>

            <p className="mt-2 text-sm">Rewards are credited instantly after task completion and can be redeemed anytime.</p>

          </div>

        </div>

      </section>


      {/* FINAL CTA */}

      <section ref={footerRef} className="px-4 py-28 text-center max-w-7xl mx-auto">

        <h2 className="text-4xl font-extrabold">Ready to Start Earning?</h2>

        <p className="text-gray-300 mt-4 text-lg">Join Cashooz now and begin earning rewards in minutes.</p>

        <motion.button

          onClick={handleCTA}

          animate={{ y: [0, -6, 0] }}

          transition={{ repeat: Infinity, duration: 1.6 }}

          className={`mt-10 inline-flex items-center gap-3 px-14 py-5 rounded-full font-bold text-lg ${ctaGradient} shadow-2xl`}

        >

          Start Earning Now <ArrowRight />

        </motion.button>

      </section>


      {/* FLOATING CTA */}

      {showFloating && (

        <motion.div

          initial={{ opacity: 0, y: 40 }}

          animate={{ opacity: 1, y: 0 }}

          className="fixed bottom-6 right-6 z-50"

        >

          <button

            onClick={handleCTA}

            className={`px-6 py-4 rounded-full font-bold text-lg ${ctaGradient} shadow-2xl hover:scale-105`}

          >

            Start Earning in 60 Seconds

          </button>

        </motion.div>

      )}

    </div>

  );

}

