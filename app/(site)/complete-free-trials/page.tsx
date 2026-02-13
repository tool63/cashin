"use client";

import { motion } from "framer-motion";
import SeoEngine from "@/components/seo/SeoEngine";
import {
  CheckCircle,
  Clock,
  CreditCard,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";

type Trial = {
  id: number;
  name: string;
  reward: string;
  duration: string;
  difficulty: string;
};

const trials: Trial[] = [
  { id: 1, name: "Premium Streaming Trial", reward: "+4,500 Coins", duration: "7 Days", difficulty: "Easy" },
  { id: 2, name: "Music App Pro Trial", reward: "+3,000 Coins", duration: "30 Days", difficulty: "Easy" },
  { id: 3, name: "Fitness App Trial", reward: "+6,000 Coins", duration: "14 Days", difficulty: "Medium" },
  { id: 4, name: "Cloud Storage Trial", reward: "+5,200 Coins", duration: "30 Days", difficulty: "Easy" },
];

export default function CompleteFreeTrialsPage() {
  return (
    <>
      <SeoEngine
        title="Complete Free Trials - Earn Rewards"
        description="Complete premium free trials and earn high rewards instantly."
      />

      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-black text-white px-6 py-16">
        
        {/* HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-sm mb-6">
            <Sparkles size={16} />
            Premium Free Trial Offers
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Complete <span className="text-yellow-400">Free Trials</span>  
            <br />
            <span className="text-green-400">Earn Premium Rewards</span>
          </h1>

          <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
            Try premium services for free and get high-value coin rewards.
            Secure, verified, and trusted offers.
          </p>
        </motion.div>

        {/* TRUST BADGES */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: ShieldCheck, text: "Secure & Verified Offers" },
            { icon: CreditCard, text: "Trial-Based Rewards" },
            { icon: CheckCircle, text: "Instant Coin Credit" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 flex items-center gap-4"
            >
              <item.icon className="text-yellow-400" />
              <span className="text-gray-300">{item.text}</span>
            </motion.div>
          ))}
        </div>

        {/* TRIAL LIST */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trials.map((trial, index) => (
            <motion.div
              key={trial.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-yellow-400/10 to-green-400/10 border border-yellow-400/20 rounded-3xl p-6 backdrop-blur-xl hover:border-green-400/40 transition-all"
            >
              <h3 className="text-xl font-semibold mb-3">
                {trial.name}
              </h3>

              <div className="text-green-400 font-bold text-lg mb-4">
                {trial.reward}
              </div>

              <div className="flex items-center text-gray-400 text-sm mb-2 gap-2">
                <Clock size={16} />
                {trial.duration}
              </div>

              <div className="text-gray-400 text-sm mb-6">
                Difficulty: {trial.difficulty}
              </div>

              <button className="w-full bg-gradient-to-r from-yellow-400 to-green-400 text-black font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:scale-105 transition">
                Start Trial <ArrowRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* CTA SECTION */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="max-w-4xl mx-auto mt-20 text-center bg-gradient-to-r from-yellow-400/10 to-green-400/10 border border-green-400/20 rounded-3xl p-10 backdrop-blur-lg"
        >
          <h2 className="text-3xl font-bold mb-4">
            High Reward Opportunities Available
          </h2>
          <p className="text-gray-400 mb-6">
            Complete premium trials and maximize your earnings with exclusive offers.
          </p>
          <button className="bg-gradient-to-r from-yellow-400 to-green-400 text-black font-bold px-8 py-3 rounded-xl hover:scale-105 transition">
            Explore More Trials
          </button>
        </motion.div>

      </div>
    </>
  );
}
