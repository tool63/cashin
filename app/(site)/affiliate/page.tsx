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
  TrendingUp,
  Shield,
  Clock,
  Globe,
  Wallet,
  BarChart3,
  Rocket,
  Crown,
  Gem,
  Diamond,
  Medal,
  ThumbsUp,
  HeartHandshake,
} from "lucide-react";

/* ================= AFFILIATE STATS ================= */
const affiliateStats = [
  {
    label: "Commission Rate",
    value: "15%",
    icon: <DollarSign className="w-6 h-6 text-green-400" />,
    description: "Earn 15% commission on all referrals' earnings",
    trend: "+25% this month",
  },
  {
    label: "Active Affiliates",
    value: "50K+",
    icon: <Users className="w-6 h-6 text-blue-400" />,
    description: "Join thousands of earning affiliates",
    trend: "Growing daily",
  },
  {
    label: "Trustpilot Rating",
    value: "4.7",
    icon: <Star className="w-6 h-6 text-yellow-400" />,
    description: "Excellent rating from 266K+ reviews",
    trend: "Top rated",
  },
];

/* ================= HOW IT WORKS STEPS ================= */
const steps = [
  {
    icon: <User className="w-8 h-8 text-yellow-400" />,
    title: "Invite Your Friends",
    desc: "Create your custom referral link and share it with friends across social media.",
    gradient: "from-yellow-400 to-orange-400",
  },
  {
    icon: <Gift className="w-8 h-8 text-green-400" />,
    title: "They Earn, You Earn",
    desc: "When your friends complete any task, you earn 15% commission on their earnings.",
    gradient: "from-green-400 to-emerald-400",
  },
  {
    icon: <DollarSign className="w-8 h-8 text-yellow-400" />,
    title: "Cashout Together",
    desc: "Withdraw your commissions instantly via PayPal, crypto, or gift cards.",
    gradient: "from-blue-400 to-cyan-400",
  },
];

/* ================= AFFILIATE BONUSES ================= */
const bonuses = [
  {
    icon: <Users className="w-8 h-8 text-purple-400" />,
    title: "Team Bonuses",
    desc: "Earn extra rewards when your team reaches milestone targets together.",
    metric: "Up to +5%",
  },
  {
    icon: <Zap className="w-8 h-8 text-orange-400" />,
    title: "Boosting Events",
    desc: "During special events, earn double or triple commissions on all referrals.",
    metric: "2x-3x Multiplier",
  },
  {
    icon: <Target className="w-8 h-8 text-red-400" />,
    title: "Monthly Contests",
    desc: "Compete with top affiliates for massive bonus prizes and recognition.",
    metric: "$10K Prize Pool",
  },
];

/* ================= ALL EARNING METHODS ================= */
const allEarningMethods = [
  { name: "Surveys", path: "/surveys", icon: <ClipboardList className="w-5 h-5" />, color: "from-blue-400 to-blue-600", bgColor: "bg-blue-50 dark:bg-blue-950/30", textColor: "text-blue-600 dark:text-blue-400", earnings: "$2-5 per survey" },
  { name: "App Installs", path: "/app-installs", icon: <Smartphone className="w-5 h-5" />, color: "from-green-400 to-green-600", bgColor: "bg-green-50 dark:bg-green-950/30", textColor: "text-green-600 dark:text-green-400", earnings: "$2-4 per install" },
  { name: "Playing Games", path: "/play-games", icon: <Gamepad2 className="w-5 h-5" />, color: "from-purple-400 to-purple-600", bgColor: "bg-purple-50 dark:bg-purple-950/30", textColor: "text-purple-600 dark:text-purple-400", earnings: "$3-10 per game" },
  { name: "Watching Videos", path: "/watch-videos", icon: <Film className="w-5 h-5" />, color: "from-red-400 to-red-600", bgColor: "bg-red-50 dark:bg-red-950/30", textColor: "text-red-600 dark:text-red-400", earnings: "$1-3 per video" },
  { name: "Mining Rewards", path: "/mining-rewards", icon: <Hammer className="w-5 h-5" />, color: "from-yellow-400 to-yellow-600", bgColor: "bg-yellow-50 dark:bg-yellow-950/30", textColor: "text-yellow-600 dark:text-yellow-400", earnings: "$5-20 per task" },
  { name: "Completing Offers", path: "/complete-offers", icon: <CheckSquare className="w-5 h-5" />, color: "from-indigo-400 to-indigo-600", bgColor: "bg-indigo-50 dark:bg-indigo-950/30", textColor: "text-indigo-600 dark:text-indigo-400", earnings: "$2-15 per offer" },
  { name: "Offerwall", path: "/offerwall", icon: <LayoutGrid className="w-5 h-5" />, color: "from-pink-400 to-pink-600", bgColor: "bg-pink-50 dark:bg-pink-950/30", textColor: "text-pink-600 dark:text-pink-400", earnings: "$1-50+ per task" },
  { name: "Surveywall", path: "/surveywall", icon: <ClipboardList className="w-5 h-5" />, color: "from-cyan-400 to-cyan-600", bgColor: "bg-cyan-50 dark:bg-cyan-950/30", textColor: "text-cyan-600 dark:text-cyan-400", earnings: "$2-8 per survey" },
  { name: "Watching Ads", path: "/watch-ads", icon: <Eye className="w-5 h-5" />, color: "from-amber-400 to-amber-600", bgColor: "bg-amber-50 dark:bg-amber-950/30", textColor: "text-amber-600 dark:text-amber-400", earnings: "$0.5-2 per ad" },
  { name: "Micro Tasks", path: "/micro-tasks", icon: <Sparkles className="w-5 h-5" />, color: "from-lime-400 to-lime-600", bgColor: "bg-lime-50 dark:bg-lime-950/30", textColor: "text-lime-600 dark:text-lime-400", earnings: "$1-5 per task" },
  { name: "Free Trials", path: "/complete-free-trials", icon: <Timer className="w-5 h-5" />, color: "from-emerald-400 to-emerald-600", bgColor: "bg-emerald-50 dark:bg-emerald-950/30", textColor: "text-emerald-600 dark:text-emerald-400", earnings: "$5-25 per trial" },
  { name: "Testing Products", path: "/test-products", icon: <FlaskConical className="w-5 h-5" />, color: "from-teal-400 to-teal-600", bgColor: "bg-teal-50 dark:bg-teal-950/30", textColor: "text-teal-600 dark:text-teal-400", earnings: "$10-50 per test" },
  { name: "Reading Emails", path: "/read-emails", icon: <Mail className="w-5 h-5" />, color: "from-orange-400 to-orange-600", bgColor: "bg-orange-50 dark:bg-orange-950/30", textColor: "text-orange-600 dark:text-orange-400", earnings: "$0.5-2 per email" },
  { name: "Visiting Websites", path: "/visit-websites", icon: <Globe className="w-5 h-5" />, color: "from-rose-400 to-rose-600", bgColor: "bg-rose-50 dark:bg-rose-950/30", textColor: "text-rose-600 dark:text-rose-400", earnings: "$0.5-3 per visit" },
  { name: "Review Tasks", path: "/review-tasks", icon: <PenTool className="w-5 h-5" />, color: "from-violet-400 to-violet-600", bgColor: "bg-violet-50 dark:bg-violet-950/30", textColor: "text-violet-600 dark:text-violet-400", earnings: "$3-15 per review" },
  { name: "Spinning Wheel", path: "/spinning-wheel", icon: <Puzzle className="w-5 h-5" />, color: "from-fuchsia-400 to-fuchsia-600", bgColor: "bg-fuchsia-50 dark:bg-fuchsia-950/30", textColor: "text-fuchsia-600 dark:text-fuchsia-400", earnings: "$1-100 per spin" },
  { name: "Loyalty", path: "/loyalty", icon: <Crown className="w-5 h-5" />, color: "from-yellow-400 to-yellow-600", bgColor: "bg-yellow-50 dark:bg-yellow-950/30", textColor: "text-yellow-600 dark:text-yellow-400", earnings: "Exclusive rewards" },
  { name: "Vouchers", path: "/vouchers", icon: <Ticket className="w-5 h-5" />, color: "from-green-400 to-green-600", bgColor: "bg-green-50 dark:bg-green-950/30", textColor: "text-green-600 dark:text-green-400", earnings: "Gift cards & discounts" },
];

/* ================= FEATURES ================= */
const features = [
  {
    icon: <Rocket className="w-6 h-6 text-purple-400" />,
    title: "Instant Payouts",
    desc: "Get your commissions instantly, no waiting periods",
  },
  {
    icon: <Shield className="w-6 h-6 text-green-400" />,
    title: "Secure Platform",
    desc: "Bank-level security for your earnings and data",
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-blue-400" />,
    title: "Real-time Analytics",
    desc: "Track your referrals and earnings in real-time",
  },
  {
    icon: <Wallet className="w-6 h-6 text-yellow-400" />,
    title: "Multiple Payouts",
    desc: "PayPal, crypto, gift cards, and more options",
  },
  {
    icon: <Clock className="w-6 h-6 text-red-400" />,
    title: "24/7 Support",
    desc: "Dedicated support team always ready to help",
  },
  {
    icon: <Globe className="w-6 h-6 text-indigo-400" />,
    title: "Global Program",
    desc: "Available in 100+ countries worldwide",
  },
];

/* ================= TESTIMONIALS ================= */
const testimonials = [
  {
    name: "Cryptozeal",
    date: "February 18, 2026",
    content: "The 15% commission is amazing! I'm earning passive income from my friends' daily activities. Made over $500 in my first month!",
    rating: 5,
    avatar: "👤",
    earnings: "$2,450+",
  },
  {
    name: "Michael Raisner",
    date: "February 11, 2026",
    content: "Great affiliate program! My friends love the platform and I love the recurring commissions.",
    rating: 5,
    avatar: "👤",
    earnings: "$1,280+",
  },
  {
    name: "Dx Tik",
    date: "January 30, 2026",
    content: "I share my link everywhere. Every time my friends complete surveys or install apps, I earn. Best decision ever!",
    rating: 5,
    avatar: "👤",
    earnings: "$3,100+",
  },
  {
    name: "Sarah Johnson",
    date: "February 5, 2026",
    content: "The team bonuses are incredible. Built a team of 50+ active members and earning daily commissions.",
    rating: 5,
    avatar: "👤",
    earnings: "$5,670+",
  },
  {
    name: "Nichole",
    date: "January 15, 2026",
    content: "I've cashed out over $1000 from referrals alone. The 15% commission adds up fast!",
    rating: 5,
    avatar: "👤",
    earnings: "$1,890+",
  },
  {
    name: "David Chen",
    date: "February 20, 2026",
    content: "Boosting events doubled my earnings last month. Best affiliate program I've ever joined.",
    rating: 5,
    avatar: "👤",
    earnings: "$4,230+",
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
    a: "You can track all your referral earnings and activity in your dashboard under the 'Invite Friends' section with real-time analytics.",
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
    a: "You can withdraw your commissions via PayPal, cryptocurrency, gift cards, and more with instant processing.",
  },
];

/* ================= PAGE ================= */
export default function AffiliatePage() {
  return (
    <>
      <Meta
        title="Affiliate Program - Earn 15% Commission | Cashog"
        description="Join the #1 affiliate program. Earn 15% commission on everything your referrals earn. Surveys, apps, games, and more!"
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        <section className="relative z-10 max-w-7xl mx-auto px-4 py-20">

          {/* HERO WITH PREMIUM BADGES */}
          <Reveal>
            <div className="text-center mb-20">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-green-400/20 rounded-full border border-yellow-400/30 mb-6"
              >
                <Crown className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-semibold gradient-text">The #1 Affiliate Program</span>
                <Crown className="w-4 h-4 text-yellow-400" />
              </motion.div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 leading-tight">
                Earn <span className="gradient-text bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">15% Commission</span> <br />
                <span className="text-3xl sm:text-4xl md:text-5xl text-gray-600 dark:text-gray-400">On Everything Your Friends Do</span>
              </h1>

              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="flex -space-x-2">
                  {[1,2,3,4,5].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-green-400 flex items-center justify-center text-black font-bold text-xs border-2 border-white dark:border-gray-900">
                      {i}
                    </div>
                  ))}
                </div>
                <span className="text-xl font-bold">Excellent</span>
                <div className="flex">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-2 text-lg">
                <span className="font-bold">266,096+</span> reviews on
              </p>
              <div className="flex items-center justify-center gap-2 mb-8">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">TP</div>
                <span className="text-2xl font-bold">Trustpilot</span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-white/5 rounded-full">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Instant Payouts</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-white/5 rounded-full">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">No Limits</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-white/5 rounded-full">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Global Program</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-white/5 rounded-full">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">24/7 Support</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <PrimaryCTA href="/signup" className="px-8 py-4 text-lg">
                  Start Earning 15% Now
                </PrimaryCTA>
                <motion.a
                  href="#how-it-works"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 text-lg font-semibold rounded-xl bg-white dark:bg-[#0a0d16] border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white hover:shadow-lg transition-all duration-300"
                >
                  Learn More
                </motion.a>
              </div>
            </div>
          </Reveal>

          {/* STATS SECTION WITH PREMIUM CARDS */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
            <Reveal>
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                  Affiliate Program Stats
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
                  Real numbers from our top-earning affiliates
                </p>
              </>
            </Reveal>

            <div className="grid gap-8 md:grid-cols-3">
              {affiliateStats.map((stat) => (
                <Reveal key={stat.label}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-gradient-to-br from-white to-gray-50 dark:from-[#0a0d16] dark:to-[#0f121c] rounded-3xl p-8 text-center border border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 to-green-400/0 group-hover:from-yellow-400/10 group-hover:to-green-400/10 transition-all duration-500" />
                    
                    <div className="relative">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-green-400/20 flex items-center justify-center">
                          {stat.icon}
                        </div>
                      </div>
                      
                      <h3 className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">
                        {stat.label}
                      </h3>
                      
                      <div className="text-5xl font-extrabold mb-3 gradient-text bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        {stat.description}
                      </p>
                      
                      <div className="inline-block px-3 py-1 bg-green-500/10 rounded-full text-xs text-green-400 font-semibold">
                        {stat.trend}
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* HOW IT WORKS WITH PREMIUM CARDS */}
          <section id="how-it-works" className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
            <Reveal>
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                  How Does the Affiliate Program Work?
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
                  Start earning 15% commission in three simple steps
                </p>
              </>
            </Reveal>

            <div className="grid gap-8 md:grid-cols-3">
              {steps.map((step, index) => (
                <Reveal key={step.title}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="relative"
                  >
                    {/* Step Number */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 rounded-2xl bg-gradient-to-r from-yellow-400 to-green-400 flex items-center justify-center text-black font-bold text-xl z-10 shadow-lg">
                      {index + 1}
                    </div>
                    
                    <div className="bg-white dark:bg-[#0a0d16] rounded-3xl p-8 pt-12 border border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300">
                      <div className="flex justify-center mb-6">
                        <div className={`w-20 h-20 rounded-3xl bg-gradient-to-r ${step.gradient} bg-opacity-20 flex items-center justify-center`}>
                          {step.icon}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3 text-center">{step.title}</h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 text-sm text-center leading-relaxed">
                        {step.desc}
                      </p>
                      
                      <div className="mt-6 h-1 w-20 mx-auto bg-gradient-to-r from-yellow-400 to-green-400 rounded-full" />
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ALL EARNING METHODS IN ONE PREMIUM SECTION */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
            <Reveal>
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                  <span className="gradient-text bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">18+ Ways</span> to Earn Commissions
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-4 max-w-2xl mx-auto">
                  Your referrals can earn through these methods - and you earn 15% on everything!
                </p>
                
                <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
                  <div className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-green-400 rounded-full text-black font-semibold text-sm">
                    💰 15% Commission
                  </div>
                  <div className="px-4 py-2 bg-white dark:bg-[#0a0d16] rounded-full border border-gray-200 dark:border-gray-800 text-sm">
                    ⚡ Instant Tracking
                  </div>
                  <div className="px-4 py-2 bg-white dark:bg-[#0a0d16] rounded-full border border-gray-200 dark:border-gray-800 text-sm">
                    🚀 No Limits
                  </div>
                  <div className="px-4 py-2 bg-white dark:bg-[#0a0d16] rounded-full border border-gray-200 dark:border-gray-800 text-sm">
                    🌍 Global
                  </div>
                </div>
              </>
            </Reveal>

            <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {allEarningMethods.map((method) => (
                <Reveal key={method.name}>
                  <motion.a
                    href={method.path}
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="group relative block"
                  >
                    {/* Premium Card Design */}
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-green-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                    
                    <div className="relative bg-white dark:bg-[#0a0d16] rounded-2xl p-5 border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                      {/* Background Gradient */}
                      <div className={`absolute inset-0 ${method.bgColor} opacity-50`} />
                      
                      {/* Content */}
                      <div className="relative">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${method.color} bg-opacity-20 flex items-center justify-center mb-3 mx-auto`}>
                          <div className={method.textColor}>
                            {method.icon}
                          </div>
                        </div>
                        
                        <h3 className="text-sm font-bold text-center mb-1">{method.name}</h3>
                        
                        <div className="text-xs text-center text-gray-500 dark:text-gray-400 mb-2">
                          {method.earnings}
                        </div>
                        
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-xs font-semibold text-green-400">15%</span>
                          <span className="text-xs text-gray-400">commission</span>
                        </div>
                        
                        {/* Hover Indicator */}
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-green-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                      </div>
                    </div>
                  </motion.a>
                </Reveal>
              ))}
            </div>

            <div className="mt-12 text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-400 to-green-400 rounded-2xl text-black font-bold shadow-xl"
              >
                <span className="text-2xl mr-2">🎯</span>
                That's 18+ earning methods - Start referring now!
              </motion.div>
            </div>
          </section>

          {/* BONUSES SECTION WITH PREMIUM CARDS */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
            <Reveal>
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                  Unlock More Bonuses
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
                  Extra rewards on top of your 15% commission
                </p>
              </>
            </Reveal>

            <div className="grid gap-8 md:grid-cols-3">
              {bonuses.map((bonus) => (
                <Reveal key={bonus.title}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="bg-gradient-to-br from-white to-gray-50 dark:from-[#0a0d16] dark:to-[#0f121c] rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
                    
                    <div className="relative">
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400/20 to-pink-400/20 flex items-center justify-center">
                          {bonus.icon}
                        </div>
                        <div className="px-3 py-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full text-xs font-bold text-white">
                          {bonus.metric}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3">{bonus.title}</h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {bonus.desc}
                      </p>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* FEATURES SECTION */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
            <Reveal>
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                  Premium Features
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
                  Everything you need to succeed as an affiliate
                </p>
              </>
            </Reveal>

            <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {features.map((feature) => (
                <Reveal key={feature.title}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-white dark:bg-[#0a0d16] rounded-2xl p-5 text-center border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex justify-center mb-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400/20 to-green-400/20 flex items-center justify-center">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-sm font-bold mb-1">{feature.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {feature.desc}
                    </p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* TESTIMONIALS SECTION WITH PREMIUM CARDS */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
            <Reveal>
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                  Trusted by <span className="gradient-text bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">50,000+</span> Affiliates
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
                  Real earnings from real people
                </p>
              </>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Reveal key={index}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="bg-gradient-to-br from-white to-gray-50 dark:from-[#0a0d16] dark:to-[#0f121c] rounded-3xl p-6 border border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-yellow-400/10 to-green-400/10 rounded-full blur-2xl" />
                    
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-yellow-400 to-green-400 flex items-center justify-center text-2xl">
                            {testimonial.avatar}
                          </div>
                          <div>
                            <h4 className="font-bold">{testimonial.name}</h4>
                            <p className="text-xs text-gray-500">{testimonial.date}</p>
                          </div>
                        </div>
                        <div className="px-3 py-1 bg-green-500/10 rounded-full text-xs font-bold text-green-400">
                          {testimonial.earnings}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 mb-3">
                        {Array(testimonial.rating).fill(0).map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        "{testimonial.content}"
                      </p>
                      
                      <div className="mt-4 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-xs text-gray-500">Verified Affiliate</span>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="relative z-10 max-w-4xl mx-auto px-4 pb-24">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
                Everything you need to know about earning 15% commission
              </p>
            </Reveal>

            <FAQ faqs={faqs} />
          </section>

          {/* FINAL CTA WITH PREMIUM DESIGN */}
          <section className="relative z-10 text-center py-20">
            <Reveal>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-yellow-400 via-yellow-400 to-green-400 p-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-green-400 opacity-90" />
                
                <div className="relative bg-white dark:bg-gray-900 rounded-3xl p-12 m-0.5">
                  <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-400/20 rounded-full blur-3xl" />
                  
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-yellow-400/20 rounded-full"
                    />
                    
                    <div className="flex items-center justify-center gap-2 mb-6">
                      <Crown className="w-8 h-8 text-yellow-400" />
                      <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold">
                        Ready to <span className="gradient-text bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">Earn 15%</span>?
                      </h2>
                      <Crown className="w-8 h-8 text-green-400" />
                    </div>

                    <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                      Join 50,000+ affiliates already earning from 18+ methods
                    </p>
                    
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                      <div className="px-4 py-2 bg-green-500/10 rounded-full text-sm">
                        ⚡ Instant Payouts
                      </div>
                      <div className="px-4 py-2 bg-green-500/10 rounded-full text-sm">
                        🎯 No Limits
                      </div>
                      <div className="px-4 py-2 bg-green-500/10 rounded-full text-sm">
                        🌍 Global
                      </div>
                      <div className="px-4 py-2 bg-green-500/10 rounded-full text-sm">
                        💰 15% Commission
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <PrimaryCTA href="/signup" className="px-8 py-4 text-lg bg-gradient-to-r from-yellow-400 to-green-400 text-black">
                        Become an Affiliate Now
                      </PrimaryCTA>
                      <motion.a
                        href="#"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className="px-8 py-4 text-lg font-semibold rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:shadow-lg transition-all duration-300"
                      >
                        View Dashboard →
                      </motion.a>
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-6">
                      🔒 Free to join • No credit card required • 50,000+ active affiliates
                    </p>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          </section>

        </section>
      </main>
    </>
  );
}
