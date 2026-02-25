"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  ChevronDown,
  ClipboardList,
  Gamepad2,
  Film,
  LayoutGrid,
  Eye,
  Sparkles,
  FlaskConical,
  Mail,
  MousePointerClick,
  FileText,
  Award,
  Ticket,
  Hammer,
  CheckSquare,
  Timer,
  Puzzle,
  PenTool,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";

/* ================= AFFILIATE STATS ================= */
const affiliateStats = [
  {
    label: "Commission Rate",
    value: "15%",
    icon: <DollarSign className="w-6 h-6 text-green-400" />,
    description: "Earn 15% commission on all referrals' earnings",
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
    desc: "Create your custom referral link and share it with friends across social media.",
  },
  {
    icon: <Gift className="w-8 h-8 text-green-400" />,
    title: "They Earn, You Earn",
    desc: "When your friends complete any task, you earn 15% commission on their earnings.",
  },
  {
    icon: <DollarSign className="w-8 h-8 text-yellow-400" />,
    title: "Cashout Together",
    desc: "Withdraw your commissions instantly via PayPal, crypto, or gift cards.",
  },
];

/* ================= AFFILIATE BONUSES ================= */
const bonuses = [
  {
    icon: <Users className="w-8 h-8 text-purple-400" />,
    title: "Team Bonuses",
    desc: "Earn extra rewards when your team reaches milestone targets together.",
  },
  {
    icon: <Zap className="w-8 h-8 text-orange-400" />,
    title: "Boosting Events",
    desc: "During special events, earn double or triple commissions on all referrals.",
  },
  {
    icon: <Target className="w-8 h-8 text-red-400" />,
    title: "Monthly Contests",
    desc: "Compete with top affiliates for massive bonus prizes and recognition.",
  },
];

/* ================= ALL EARNING METHODS ================= */
const allEarningMethods = [
  // Main Methods
  { name: "Surveys", path: "/surveys", icon: <ClipboardList className="w-5 h-5" />, color: "text-blue-400", category: "main" },
  { name: "App Installs", path: "/app-installs", icon: <Smartphone className="w-5 h-5" />, color: "text-green-400", category: "main" },
  { name: "Playing Games", path: "/play-games", icon: <Gamepad2 className="w-5 h-5" />, color: "text-purple-400", category: "main" },
  { name: "Watching Videos", path: "/watch-videos", icon: <Film className="w-5 h-5" />, color: "text-red-400", category: "main" },
  { name: "Mining Rewards", path: "/mining-rewards", icon: <Hammer className="w-5 h-5" />, color: "text-yellow-400", category: "main" },
  { name: "Completing Offers", path: "/complete-offers", icon: <CheckSquare className="w-5 h-5" />, color: "text-indigo-400", category: "main" },
  { name: "Offerwall", path: "/offerwall", icon: <LayoutGrid className="w-5 h-5" />, color: "text-pink-400", category: "main" },
  { name: "Surveywall", path: "/surveywall", icon: <ClipboardList className="w-5 h-5" />, color: "text-cyan-400", category: "main" },
  
  // Extra Methods
  { name: "Watching Ads", path: "/watch-ads", icon: <Eye className="w-5 h-5" />, color: "text-amber-400", category: "extra" },
  { name: "Micro Tasks", path: "/micro-tasks", icon: <Sparkles className="w-5 h-5" />, color: "text-lime-400", category: "extra" },
  { name: "Free Trials", path: "/complete-free-trials", icon: <Timer className="w-5 h-5" />, color: "text-emerald-400", category: "extra" },
  { name: "Testing Products", path: "/test-products", icon: <FlaskConical className="w-5 h-5" />, color: "text-teal-400", category: "extra" },
  { name: "Reading Emails", path: "/read-emails", icon: <Mail className="w-5 h-5" />, color: "text-orange-400", category: "extra" },
  { name: "Visiting Websites", path: "/visit-websites", icon: <Monitor className="w-5 h-5" />, color: "text-rose-400", category: "extra" },
  { name: "Review Tasks", path: "/review-tasks", icon: <PenTool className="w-5 h-5" />, color: "text-violet-400", category: "extra" },
  { name: "Spinning Wheel", path: "/spinning-wheel", icon: <Puzzle className="w-5 h-5" />, color: "text-fuchsia-400", category: "extra" },
  { name: "Loyalty", path: "/loyalty", icon: <Award className="w-5 h-5" />, color: "text-yellow-400", category: "extra" },
  { name: "Vouchers", path: "/vouchers", icon: <Ticket className="w-5 h-5" />, color: "text-green-400", category: "extra" },
];

/* ================= TESTIMONIALS ================= */
const testimonials = [
  {
    name: "Cryptozeal",
    date: "February 18, 2026",
    content: "The 15% commission is amazing! I'm earning passive income from my friends' daily activities. Made over $500 in my first month!",
    rating: 5,
  },
  {
    name: "Michael Raisner",
    date: "February 11, 2026",
    content: "Great affiliate program! My friends love the platform and I love the recurring commissions.",
    rating: 5,
  },
  {
    name: "Dx Tik",
    date: "January 30, 2026",
    content: "I share my link everywhere. Every time my friends complete surveys or install apps, I earn. Best decision ever!",
    rating: 5,
  },
  {
    name: "Sarah Johnson",
    date: "February 5, 2026",
    content: "The team bonuses are incredible. Built a team of 50+ active members and earning daily commissions.",
    rating: 5,
  },
  {
    name: "Nichole",
    date: "January 15, 2026",
    content: "I've cashed out over $1000 from referrals alone. The 15% commission adds up fast!",
    rating: 5,
  },
  {
    name: "David Chen",
    date: "February 20, 2026",
    content: "Boosting events doubled my earnings last month. Best affiliate program I've ever joined.",
    rating: 5,
  },
];

/* ================= FAQ ================= */
const faqs = [
  {
    q: "How does the 15% commission work?",
    a: "You earn 15% commission on everything your referrals earn on Cashog. If they complete surveys, install apps, play games, or do any other task, you get 15% of their earnings automatically.",
  },
  {
    q: "Is there a limit to how many friends I can refer?",
    a: "No, there's no limit! You can refer unlimited friends and earn 15% commission on all their earnings.",
  },
  {
    q: "How can I track my earnings from referrals?",
    a: "You can track all your referral earnings and activity in your dashboard under the 'Invite Friends' section.",
  },
  {
    q: "Do I earn from all earning methods?",
    a: "Yes! You earn 15% commission from every earning method: surveys, app installs, games, videos, mining rewards, offers, offerwall, surveywall, and all extra earning methods.",
  },
  {
    q: "When do commissions get credited?",
    a: "Commissions are credited instantly when your referrals complete tasks and their earnings are confirmed.",
  },
  {
    q: "What payment methods are available?",
    a: "You can withdraw your commissions via PayPal, cryptocurrency, gift cards, and more.",
  },
];

/* ================= EXPANDABLE SECTION ================= */
function ExpandableSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="mb-6">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-white dark:bg-[#0a0d16] rounded-xl border border-gray-200 dark:border-gray-800"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <span className="text-lg font-semibold">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </motion.div>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================= PAGE ================= */
export default function AffiliatePage() {
  const mainMethods = allEarningMethods.filter(m => m.category === "main");
  const extraMethods = allEarningMethods.filter(m => m.category === "extra");

  return (
    <>
      <Meta
        title="Affiliate Program - Earn 15% Commission | Cashog"
        description="Join the #1 affiliate program. Earn 15% commission on everything your referrals earn. Surveys, apps, games, and more!"
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
                Earn <span className="gradient-text">15% Commission</span> <br />
                On Everything
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
                When your friends earn on Cashog, you earn 15% automatically. From surveys and games to offers and tasks - every method counts!
              </p>

              <PrimaryCTA href="/signup">Start Earning 15% Now</PrimaryCTA>
            </div>
          </Reveal>

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
                  Start earning 15% commission in three simple steps
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

          {/* EARNING METHODS SECTION */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
            <Reveal>
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                  Every Method Earns You 15%
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
                  Your referrals earn through these methods - and you earn too!
                </p>
              </>
            </Reveal>

            {/* Main Earning Methods */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Main Earning Methods</h3>
              <div className="grid gap-6 md:grid-cols-4">
                {mainMethods.map((method) => (
                  <Reveal key={method.name}>
                    <motion.a
                      href={method.path}
                      whileHover={{ y: -4 }}
                      className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 flex flex-col items-center text-center group"
                    >
                      <div className={`mb-3 ${method.color}`}>
                        <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          {method.icon}
                        </div>
                      </div>
                      <span className="text-sm font-medium">{method.name}</span>
                      <span className="text-xs text-gray-500 mt-2">15% Commission</span>
                    </motion.a>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Extra Earning Methods (Expandable) */}
            <ExpandableSection title="Extra Earning Methods (Click to Expand)">
              <div className="grid gap-6 md:grid-cols-4">
                {extraMethods.map((method) => (
                  <Reveal key={method.name}>
                    <motion.a
                      href={method.path}
                      whileHover={{ y: -4 }}
                      className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 flex flex-col items-center text-center group"
                    >
                      <div className={`mb-3 ${method.color}`}>
                        <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          {method.icon}
                        </div>
                      </div>
                      <span className="text-sm font-medium">{method.name}</span>
                      <span className="text-xs text-gray-500 mt-2">15% Commission</span>
                    </motion.a>
                  </Reveal>
                ))}
              </div>
            </ExpandableSection>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                That's <span className="font-bold text-green-400">18+ earning methods</span> where you earn 15% commission on everything your referrals do!
              </p>
            </div>
          </section>

          {/* BONUSES SECTION */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
            <Reveal>
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                  Unlock More Bonuses
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
                  Extra rewards on top of your 15% commission
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
                  Hear from Real Users Earning 15%
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

          {/* FAQ SECTION */}
          <section className="relative z-10 max-w-4xl mx-auto px-4 pb-24">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
                Everything you need to know about earning 15% commission
              </p>
            </Reveal>

            <FAQ faqs={faqs} />
          </section>

          {/* FINAL CTA - Now with same background as hero */}
          <section className="relative z-10 text-center py-28">
            <Reveal>
              <div className="text-center">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                  Start Earning 15% Commission Today
                </h2>

                <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-10">
                  Join Cashog's affiliate program and earn from 18+ earning methods
                </p>

                <PrimaryCTA href="/signup">
                  Become an Affiliate Now
                </PrimaryCTA>
              </div>
            </Reveal>
          </section>

        </section>
      </main>
    </>
  );
}
