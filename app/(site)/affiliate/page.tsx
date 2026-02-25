"use client";

import React from "react";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";
import Background from "@/components/Background";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import FAQ from "@/components/faq/FAQ";
import {
  Users,
  Gift,
  DollarSign,
  Trophy,
  Star,
  User,
  Target,
  Zap,
  CheckCircle,
  Copy,
  ExternalLink,
} from "lucide-react";

/* ================= AFFILIATE STATS ================= */
const affiliateStats = [
  {
    label: "Per Referral",
    value: "$13",
    icon: <DollarSign className="w-6 h-6 text-green-400" />,
    description: "Earn $13 for every friend you refer",
  },
  {
    label: "Active Affiliates",
    value: "50K+",
    icon: <Users className="w-6 h-6 text-blue-400" />,
    description: "Join thousands of earning affiliates",
  },
  {
    label: "Trustpilot Rating",
    value: "4.7",
    icon: <Star className="w-6 h-6 text-yellow-400" />,
    description: "Excellent rating from 266K+ reviews",
  },
];

/* ================= HOW IT WORKS STEPS ================= */
const steps = [
  {
    icon: <User className="w-8 h-8 text-yellow-400" />,
    title: "Invite Your Friends",
    desc: "Create your custom referral link on your profile page and share it with friends.",
  },
  {
    icon: <Gift className="w-8 h-8 text-green-400" />,
    title: "Earn As They Play",
    desc: "When they install their first game, you get $2.50. They also earn a bonus.",
  },
  {
    icon: <DollarSign className="w-8 h-8 text-yellow-400" />,
    title: "Cashout Together",
    desc: "When your friend makes their first cashout, you'll earn another $10!",
  },
];

/* ================= AFFILIATE BONUSES ================= */
const bonuses = [
  {
    icon: <Users className="w-8 h-8 text-purple-400" />,
    title: "Group Bonuses",
    desc: "Group Bonus Quests reward you for referring multiple users. Reach your goal to earn a significant extra reward!",
  },
  {
    icon: <Zap className="w-8 h-8 text-orange-400" />,
    title: "Boosting Events",
    desc: "During Boosting Events, you will earn greater rewards for your referrals with exact earning multipliers.",
  },
  {
    icon: <Target className="w-8 h-8 text-red-400" />,
    title: "Play Together",
    desc: "You might unlock a co-op quest, so you and your friend can play & earn together!",
  },
];

/* ================= TESTIMONIALS ================= */
const testimonials = [
  {
    name: "Cryptozeal",
    date: "February 18, 2026",
    content: "The ultimate cashapp side hustle Passive income platform available absolutely brilliant i earned so much in my first week of joining and the affiliate system is great with other side completions etc I really recommend to anyone wanting to earn a litt...",
    rating: 5,
  },
  {
    name: "Michael Raisner",
    date: "February 11, 2026",
    content: "Amazing fun game to play is awesome and I like to refer my friends to the game.It's awesome",
    rating: 5,
  },
  {
    name: "Dx Tik",
    date: "January 30, 2026",
    content: "its very good app i am now share my refer code some people are use and they share with friends maybe we are all like this website.",
    rating: 5,
  },
  {
    name: "Customer",
    date: "February 13, 2026",
    content: "This game is amazing I've had nothing but great things come from it it's one of the very first apps and platforms that actually pay you a decent amount and don't stop paying you as you progress they've good affiliate bonuses and it's just overall pre...",
    rating: 5,
  },
  {
    name: "Nichole",
    date: "January 15, 2026",
    content: "I've cashed out over $100. Awesome affiliate program too 😊❤",
    rating: 5,
  },
  {
    name: "Sarah Johnson",
    date: "February 5, 2026",
    content: "Best affiliate program I've ever joined. Made over $500 in my first month just by sharing with my gaming community!",
    rating: 5,
  },
];

/* ================= FAQ ================= */
const faqs = [
  {
    q: "What do my referrals need to do for me to get paid?",
    a: "Your referrals need to sign up using your link, install their first game, and make their first cashout. You earn $2.50 after their first game install and another $10 after their first cashout.",
  },
  {
    q: "Is there a limit to how many friends I can refer?",
    a: "No, there's no limit! You can refer as many friends as you want and earn $13 for each qualified referral.",
  },
  {
    q: "How can I track my earnings from referrals?",
    a: "You can track all your referral earnings and activity in your dashboard under the 'Invite Friends' section.",
  },
  {
    q: "Why can I not find the affiliate page?",
    a: "Simply login to Cashog and select 'Invite Friends' under the 'Rewards' tab. Here you'll find your personal referral link.",
  },
  {
    q: "Are quests and bonuses always available, and who can receive them?",
    a: "Quests and bonuses are regularly available to all affiliates. Check your dashboard for current active quests.",
  },
  {
    q: "What can I earn from time-limited quests?",
    a: "Time-limited quests offer enhanced rewards and multipliers. During Boosting Events, you can earn significantly more per referral.",
  },
];

/* ================= REFERRAL CARD ================= */
function ReferralCard() {
  const [copied, setCopied] = React.useState(false);
  const referralLink = "https://cashog.com/ref/your-username";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-gradient-to-r from-yellow-400 to-green-400 rounded-2xl p-8 text-center text-black mb-16"
    >
      <h3 className="text-2xl font-bold mb-2">Your Referral Link</h3>
      <p className="mb-6">Share this link with friends to start earning</p>
      
      <div className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur rounded-xl p-2 max-w-xl mx-auto">
        <input
          type="text"
          value={referralLink}
          readOnly
          className="bg-transparent flex-1 px-4 py-2 outline-none text-black placeholder-black/50"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={copyToClipboard}
          className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-lg font-semibold"
        >
          <Copy className="w-4 h-4" />
          {copied ? "Copied!" : "Copy"}
        </motion.button>
      </div>
      
      <div className="flex justify-center gap-4 mt-6">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          href="#"
          className="bg-black text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
        >
          <ExternalLink className="w-4 h-4" />
          Share via WhatsApp
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          href="#"
          className="bg-black text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
        >
          <ExternalLink className="w-4 h-4" />
          Share via Telegram
        </motion.a>
      </div>
    </motion.div>
  );
}

/* ================= PAGE ================= */
export default function AffiliatePage() {
  return (
    <>
      <Meta
        title="Affiliate Program | Cashog"
        description="Join the #1 affiliate program. Earn $13 per referral! Invite friends and earn together."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        <section className="relative z-10 max-w-7xl mx-auto px-4 py-20">

          {/* HERO */}
          <Reveal>
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-400 to-green-400 text-black font-bold rounded-full text-sm mb-4">
                The #1 Affiliate Program
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                Invite Your Friends, <br />
                <span className="gradient-text">Earn $13 Per Referral!</span>
              </h1>

              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="text-2xl font-bold">Excellent</span>
                <div className="flex">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                266,096 reviews on
              </p>
              <p className="text-2xl font-bold mb-8">Trustpilot</p>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10">
                No spending required! Just invite your friends to join Cashog, and earn $13 per referral when they play and cashout.
              </p>

              <PrimaryCTA href="/signup">Start Referring Now</PrimaryCTA>
            </div>
          </Reveal>

          {/* REFERRAL LINK CARD */}
          <ReferralCard />

          {/* STATS SECTION */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
            <Reveal>
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                  Affiliate Program Stats
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
                  Real numbers from our top-earning affiliates
                </p>
              </>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-3">
              {affiliateStats.map((stat) => (
                <Reveal key={stat.label}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 flex flex-col"
                  >
                    <div className="flex justify-center mb-2">{stat.icon}</div>
                    <h3 className="text-sm uppercase tracking-wide text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </h3>
                    <div className="text-4xl font-extrabold mt-2 gradient-text">
                      {stat.value}
                    </div>
                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                      {stat.description}
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
            <Reveal>
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                  How Does the Affiliate Program Work?
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
                  Start earning in three simple steps
                </p>
              </>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-3">
              {steps.map((step) => (
                <Reveal key={step.title}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 flex flex-col"
                  >
                    <div className="flex justify-center mb-4">{step.icon}</div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {step.desc}
                    </p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* BONUSES SECTION */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
            <Reveal>
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                  Unlock More Quests & Bonuses
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
                  Extra rewards for top performers
                </p>
              </>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-3">
              {bonuses.map((bonus) => (
                <Reveal key={bonus.title}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 flex flex-col"
                  >
                    <div className="flex justify-center mb-4">{bonus.icon}</div>
                    <h3 className="text-lg font-semibold mb-2">{bonus.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {bonus.desc}
                    </p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* TESTIMONIALS SECTION */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
            <Reveal>
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                  Hear from Real Users Earning with Friends
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
                  Join thousands of happy affiliates
                </p>
              </>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Reveal key={index}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 flex flex-col"
                  >
                    <div className="flex items-center gap-1 mb-3">
                      {Array(testimonial.rating).fill(0).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-1">
                      "{testimonial.content}"
                    </p>
                    <div className="mt-auto">
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-xs text-gray-500">{testimonial.date}</p>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ================= FAQ ================= */}
          <section className="relative z-10 max-w-4xl mx-auto px-4 pb-24">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
                Still unsure? Get answers to the most commonly asked questions about our affiliate program.
              </p>
            </Reveal>

            <FAQ faqs={faqs} />
          </section>

          {/* FINAL CTA */}
          <section className="relative z-10 text-center py-16">
            <Reveal>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-gradient-to-r from-yellow-400 to-green-400 rounded-3xl p-12 text-black"
              >
                <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
                  Play 5 min and earn up to $20
                </h2>

                <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-8">
                  Join Cashog today and start earning with the #1 affiliate program
                </p>

                <PrimaryCTA href="/signup">
                  Join Now
                </PrimaryCTA>
              </motion.div>
            </Reveal>
          </section>

        </section>
      </main>
    </>
  );
}
