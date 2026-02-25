// app/(site)/partners/page.tsx

"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";
import Background from "@/components/Background";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import RevealWithBorder from "@/components/animations/RevealWithBorder";
import {
  // Core icons - All verified valid Lucide React exports
  Users,
  Gift,
  DollarSign,
  Trophy,
  Star,
  User,
  Target,
  Zap,
  CheckCircle,
  Globe,
  Shield,
  Clock,
  Wallet,
  BarChart3,
  Rocket,
  Crown,
  Infinity,
  Briefcase,
  Building2,
  Award,
  Gem,
  Diamond,
  Medal,
  TrendingUp,
  Heart,
  Network,
  Sparkles,
  PartyPopper,
  CreditCard,
  PieChart,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
  BadgeCheck,
  Verified,
  ThumbsUp,
  Headphones,
  Mail,
  MessageCircle,
  Phone,
  Video,
  Calendar,
  Timer,
  Watch,
  AlarmClock,
  Hourglass,
  Coffee,
  Moon,
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  Cloudy,
  Wind,
  Compass,
  Map,
  MapPin,
  Navigation,
  Eye,
  EyeOff,
  Scan,
  Search,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Move,
  RotateCw,
  RotateCcw,
  Repeat,
  Shuffle,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Rewind,
  FastForward,
  Volume1,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Radio,
  Music,
  Gamepad2,
  Puzzle,
  Cpu,
  HardDrive,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Keyboard,
  Mouse,
  Printer,
  Camera,
  Webcam,
  Film,
  Tv,
  Bot,
  Brain,
  Fingerprint,
  Key,
  Lock,
  Unlock,
  ShieldCheck,
  ShieldAlert,
  ShieldOff,
  Hammer,
  Wrench,
  Building,
  Home,
  Factory,
  Warehouse,
  Store,
  ShoppingBag,
  ShoppingCart,
  Banknote,
  Coins,
  PiggyBank,
  Beer,
  Wine,
  Utensils,
} from "lucide-react";

/* ================= CUSTOM ICONS ================= */
const Code = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const Code2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const FileText = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const Package = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const Terminal = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

/* ================= PARTNER STATS ================= */
const partnerStats = [
  {
    label: "Global Partners",
    value: "10K+",
    icon: <Building2 className="w-5 h-5" />,
    trend: "+35%",
    gradient: "from-blue-400 to-indigo-400",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    label: "Revenue Share",
    value: "30%",
    icon: <Percent className="w-5 h-5" />,
    trend: "Top-tier",
    gradient: "from-emerald-400 to-teal-400",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    label: "Avg. Payout",
    value: "$5K",
    icon: <DollarSign className="w-5 h-5" />,
    trend: "+45%",
    gradient: "from-amber-400 to-orange-400",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
];

/* ================= PARTNER TIERS ================= */
const partnerTiers = [
  {
    name: "Bronze",
    icon: <Medal className="w-5 h-5" />,
    revenue: "20%",
    gradient: "from-amber-600 to-amber-400",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    name: "Silver",
    icon: <Award className="w-5 h-5" />,
    revenue: "25%",
    gradient: "from-gray-400 to-gray-300",
    iconColor: "text-gray-600 dark:text-gray-300",
  },
  {
    name: "Gold",
    icon: <Crown className="w-5 h-5" />,
    revenue: "30%",
    gradient: "from-yellow-400 to-amber-400",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    popular: true,
  },
];

/* ================= PARTNER BENEFITS ================= */
const partnerBenefits = [
  { icon: <Rocket className="w-4 h-4" />, title: "Fast Integration", gradient: "from-purple-400 to-pink-400", iconColor: "text-purple-600 dark:text-purple-400" },
  { icon: <Shield className="w-4 h-4" />, title: "Security", gradient: "from-blue-400 to-cyan-400", iconColor: "text-blue-600 dark:text-blue-400" },
  { icon: <BarChart3 className="w-4 h-4" />, title: "Analytics", gradient: "from-green-400 to-emerald-400", iconColor: "text-green-600 dark:text-green-400" },
  { icon: <Wallet className="w-4 h-4" />, title: "Payouts", gradient: "from-amber-400 to-orange-400", iconColor: "text-amber-600 dark:text-amber-400" },
  { icon: <Headphones className="w-4 h-4" />, title: "Support", gradient: "from-red-400 to-rose-400", iconColor: "text-red-600 dark:text-red-400" },
  { icon: <Globe className="w-4 h-4" />, title: "Global", gradient: "from-indigo-400 to-purple-400", iconColor: "text-indigo-600 dark:text-indigo-400" },
];

/* ================= SUCCESS STORIES ================= */
const successStories = [
  { company: "TechCorp", logo: "TC", revenue: "$250K", growth: "+156%", gradient: "from-blue-400 to-cyan-400" },
  { company: "Global Media", logo: "GMG", revenue: "$1.2M", growth: "+243%", gradient: "from-purple-400 to-pink-400" },
  { company: "Innovate", logo: "IS", revenue: "$750K", growth: "+189%", gradient: "from-green-400 to-emerald-400" },
];

/* ================= INTEGRATION OPTIONS ================= */
const integrations = [
  { name: "REST API", icon: <Network className="w-4 h-4" />, gradient: "from-blue-400 to-cyan-400" },
  { name: "Webhooks", icon: <Zap className="w-4 h-4" />, gradient: "from-yellow-400 to-amber-400" },
  { name: "SDK", icon: <Package className="w-4 h-4" />, gradient: "from-purple-400 to-pink-400" },
  { name: "JS", icon: <Code className="w-4 h-4" />, gradient: "from-green-400 to-emerald-400" },
  { name: "Python", icon: <Terminal className="w-4 h-4" />, gradient: "from-blue-400 to-indigo-400" },
  { name: "Ruby", icon: <Gem className="w-4 h-4" />, gradient: "from-red-400 to-rose-400" },
];

/* ================= FAQ ================= */
const faqs = [
  { q: "How to become a partner?", a: "Fill out our application form. Our team reviews within 24 hours." },
  { q: "Revenue share rates?", a: "Tiered from 20% to 30% based on monthly volume." },
  { q: "Payment methods?", a: "Bank transfer, PayPal, and cryptocurrency with monthly payouts." },
];

/* ================= PAGE ================= */
export default function PartnerPage() {
  return (
    <>
      <Meta
        title="Partner Program - Join Our Global Network | Cashog"
        description="Become a Cashog partner and earn up to 30% revenue share. Join 10,000+ partners worldwide."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white overflow-hidden">
        <Background />

        <section className="relative z-10 max-w-7xl mx-auto px-4 py-20">

          {/* HERO SECTION */}
          <RevealWithBorder 
            gradientFrom="from-blue-400"
            gradientVia="via-purple-400" 
            gradientTo="to-pink-400"
            borderColor="border-blue-400/20"
            floatingElements={true}
            rotatingCircle={true}
          >
            <div className="text-center py-12">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full border border-blue-400/20 backdrop-blur-sm mb-6"
              >
                <Heart className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">10K+ Partners Worldwide</span>
                <Heart className="w-4 h-4 text-purple-400" />
              </motion.div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-4 leading-tight">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Partner With Us
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                Join 10,000+ partners and earn up to 30% revenue share
              </p>

              <div className="flex items-center justify-center gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">10K+</div>
                  <div className="text-xs text-gray-500">Partners</div>
                </div>
                <div className="w-px h-6 bg-gray-300 dark:bg-gray-700" />
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">30%</div>
                  <div className="text-xs text-gray-500">Share</div>
                </div>
                <div className="w-px h-6 bg-gray-300 dark:bg-gray-700" />
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">100+</div>
                  <div className="text-xs text-gray-500">Countries</div>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <PrimaryCTA href="/partner/apply">
                  Become a Partner
                </PrimaryCTA>
              </motion.div>
            </div>
          </RevealWithBorder>

          {/* STATS SECTION - With border */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 py-16">
            <RevealWithBorder
              gradientFrom="from-blue-400"
              gradientVia="via-purple-400"
              gradientTo="to-pink-400"
              borderColor="border-blue-400/20"
              floatingElements={false}
              rotatingCircle={true}
            >
              <div className="py-8">
                <div className="flex items-center justify-center gap-12">
                  {partnerStats.map((stat) => (
                    <Reveal key={stat.label}>
                      <motion.div
                        whileHover={{ y: -2 }}
                        className="flex items-center gap-3"
                      >
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${stat.gradient} bg-opacity-10 flex items-center justify-center`}>
                          <div className={stat.iconColor}>
                            {stat.icon}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">{stat.label}</div>
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold">{stat.value}</span>
                            <span className="text-xs text-green-400">{stat.trend}</span>
                          </div>
                        </div>
                      </motion.div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </RevealWithBorder>
          </section>

          {/* PARTNER TIERS - With border */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 pb-16">
            <RevealWithBorder
              gradientFrom="from-purple-400"
              gradientVia="via-pink-400"
              gradientTo="to-red-400"
              borderColor="border-purple-400/20"
              floatingElements={false}
              rotatingCircle={true}
            >
              <div className="py-8">
                <h2 className="text-2xl font-bold text-center mb-8">
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Partner Tiers
                  </span>
                </h2>
                <div className="flex items-center justify-center gap-8">
                  {partnerTiers.map((tier) => (
                    <Reveal key={tier.name}>
                      <motion.div
                        whileHover={{ y: -2 }}
                        className="relative flex items-center gap-3 px-4 py-2 bg-white dark:bg-[#0a0d16] rounded-full border border-gray-200 dark:border-gray-800 shadow-sm"
                      >
                        {tier.popular && (
                          <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gradient-to-r from-yellow-400 to-amber-400 flex items-center justify-center text-[8px] text-black font-bold">
                            ★
                          </div>
                        )}
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${tier.gradient} bg-opacity-10 flex items-center justify-center`}>
                          <div className={tier.iconColor}>
                            {tier.icon}
                          </div>
                        </div>
                        <span className="text-sm font-medium">{tier.name}</span>
                        <span className="text-xs font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          {tier.revenue}
                        </span>
                      </motion.div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </RevealWithBorder>
          </section>

          {/* BENEFITS - With border */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 pb-16">
            <RevealWithBorder
              gradientFrom="from-emerald-400"
              gradientVia="via-teal-400"
              gradientTo="to-cyan-400"
              borderColor="border-emerald-400/20"
              floatingElements={false}
              rotatingCircle={true}
            >
              <div className="py-8">
                <h2 className="text-2xl font-bold text-center mb-8">
                  <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    Benefits
                  </span>
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {partnerBenefits.map((benefit) => (
                    <Reveal key={benefit.title}>
                      <motion.div
                        whileHover={{ y: -2 }}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-[#0a0d16] rounded-full border border-gray-200 dark:border-gray-800 shadow-sm"
                      >
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${benefit.gradient} bg-opacity-10 flex items-center justify-center`}>
                          <div className={benefit.iconColor}>
                            {benefit.icon}
                          </div>
                        </div>
                        <span className="text-xs font-medium">{benefit.title}</span>
                      </motion.div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </RevealWithBorder>
          </section>

          {/* SUCCESS STORIES - With border */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 pb-16">
            <RevealWithBorder
              gradientFrom="from-purple-400"
              gradientVia="via-pink-400"
              gradientTo="to-red-400"
              borderColor="border-purple-400/20"
              floatingElements={false}
              rotatingCircle={true}
            >
              <div className="py-8">
                <h2 className="text-2xl font-bold text-center mb-8">
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Success Stories
                  </span>
                </h2>
                <div className="flex items-center justify-center gap-6">
                  {successStories.map((story) => (
                    <Reveal key={story.company}>
                      <motion.div
                        whileHover={{ y: -2 }}
                        className="flex items-center gap-3"
                      >
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${story.gradient} flex items-center justify-center text-white text-xs font-bold`}>
                          {story.logo}
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-medium">{story.company}</div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold">{story.revenue}</span>
                            <span className="text-[10px] text-green-400">{story.growth}</span>
                          </div>
                        </div>
                      </motion.div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </RevealWithBorder>
          </section>

          {/* INTEGRATIONS - With border */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 pb-16">
            <RevealWithBorder
              gradientFrom="from-blue-400"
              gradientVia="via-cyan-400"
              gradientTo="to-sky-400"
              borderColor="border-blue-400/20"
              floatingElements={false}
              rotatingCircle={true}
            >
              <div className="py-8">
                <h2 className="text-2xl font-bold text-center mb-8">
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Integrations
                  </span>
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {integrations.map((integration) => (
                    <Reveal key={integration.name}>
                      <motion.div
                        whileHover={{ y: -2 }}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-[#0a0d16] rounded-full border border-gray-200 dark:border-gray-800 shadow-sm"
                      >
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${integration.gradient} bg-opacity-10 flex items-center justify-center`}>
                          <div className={`text-${integration.gradient.split(' ')[0].replace('from-', '')}-600 dark:text-white`}>
                            {integration.icon}
                          </div>
                        </div>
                        <span className="text-xs font-medium">{integration.name}</span>
                      </motion.div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </RevealWithBorder>
          </section>

          {/* HOW IT WORKS - With border */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 pb-16">
            <RevealWithBorder
              gradientFrom="from-emerald-400"
              gradientVia="via-teal-400"
              gradientTo="to-cyan-400"
              borderColor="border-emerald-400/20"
              floatingElements={false}
              rotatingCircle={true}
            >
              <div className="py-8">
                <h2 className="text-2xl font-bold text-center mb-8">
                  <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    How It Works
                  </span>
                </h2>
                <div className="flex items-center justify-center gap-8">
                  {[
                    { step: "01", icon: <FileText className="w-4 h-4" />, title: "Apply" },
                    { step: "02", icon: <Code className="w-4 h-4" />, title: "Integrate" },
                    { step: "03", icon: <TrendingUp className="w-4 h-4" />, title: "Earn" },
                  ].map((item) => (
                    <Reveal key={item.step}>
                      <motion.div
                        whileHover={{ y: -2 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 flex items-center justify-center text-white text-xs font-bold">
                          {item.step}
                        </div>
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 flex items-center justify-center">
                          <div className="text-emerald-600 dark:text-emerald-400">
                            {item.icon}
                          </div>
                        </div>
                        <span className="text-sm font-medium">{item.title}</span>
                      </motion.div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </RevealWithBorder>
          </section>

          {/* FAQ - With border */}
          <section className="relative z-10 max-w-3xl mx-auto px-4 pb-16">
            <RevealWithBorder
              gradientFrom="from-orange-400"
              gradientVia="via-amber-400"
              gradientTo="to-yellow-400"
              borderColor="border-orange-400/20"
              floatingElements={false}
              rotatingCircle={true}
            >
              <div className="py-8 px-6">
                <h2 className="text-2xl font-bold text-center mb-6">
                  <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                    FAQs
                  </span>
                </h2>
                <div className="space-y-3">
                  {faqs.map((faq, index) => (
                    <Reveal key={index}>
                      <motion.div
                        whileHover={{ y: -1 }}
                        className="p-3 bg-white/50 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-gray-800"
                      >
                        <div className="flex items-start gap-2">
                          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium mb-1">{faq.q}</h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{faq.a}</p>
                          </div>
                        </div>
                      </motion.div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </RevealWithBorder>
          </section>

          {/* FINAL CTA */}
          <section className="relative z-10 text-center">
            <RevealWithBorder
              gradientFrom="from-blue-400"
              gradientVia="via-purple-400"
              gradientTo="to-pink-400"
              borderColor="border-blue-400/20"
              floatingElements={true}
              rotatingCircle={true}
            >
              <div className="py-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Heart className="w-5 h-5 text-blue-400" />
                  <h2 className="text-3xl font-extrabold">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Ready to Partner?
                    </span>
                  </h2>
                  <Heart className="w-5 h-5 text-purple-400" />
                </div>

                <p className="text-base text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-6">
                  Join 10,000+ partners earning up to 30% revenue share
                </p>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <PrimaryCTA href="/partner/apply">
                    Apply Now
                  </PrimaryCTA>
                </motion.div>

                <p className="text-xs text-gray-500 mt-4">
                  🔒 Free to join • 10,000+ partners
                </p>
              </div>
            </RevealWithBorder>
          </section>

        </section>
      </main>
    </>
  );
}
