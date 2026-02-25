"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";
import Background from "@/components/Background";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import RevealWithBorder from "@/components/animations/RevealWithBorder";
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
  ClipboardList,
  LayoutGrid,
  CheckSquare,
  PenTool,
  Ticket,
  FlaskConical,
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

/* ================= AFFILIATE STATS ================= */
const affiliateStats = [
  {
    label: "Commission Rate",
    value: "15%",
    icon: <DollarSign className="w-5 h-5" />,
    trend: "+25%",
    gradient: "from-emerald-400 to-teal-400",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    label: "Active Affiliates",
    value: "50K+",
    icon: <Users className="w-5 h-5" />,
    trend: "Growing",
    gradient: "from-blue-400 to-indigo-400",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    label: "Trustpilot Rating",
    value: "4.7",
    icon: <Star className="w-5 h-5" />,
    trend: "Top rated",
    gradient: "from-amber-400 to-orange-400",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
];

/* ================= HOW IT WORKS STEPS ================= */
const steps = [
  {
    icon: <User className="w-4 h-4" />,
    title: "Invite",
    gradient: "from-amber-400 to-orange-400",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    icon: <Gift className="w-4 h-4" />,
    title: "They Earn",
    gradient: "from-emerald-400 to-teal-400",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: <DollarSign className="w-4 h-4" />,
    title: "You Earn",
    gradient: "from-blue-400 to-indigo-400",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
];

/* ================= AFFILIATE BONUSES ================= */
const bonuses = [
  {
    icon: <Users className="w-4 h-4" />,
    title: "Team Bonuses",
    metric: "+5%",
    gradient: "from-purple-400 to-pink-400",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    icon: <Zap className="w-4 h-4" />,
    title: "Boosting Events",
    metric: "2x-3x",
    gradient: "from-amber-400 to-orange-400",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    icon: <Target className="w-4 h-4" />,
    title: "Monthly Contests",
    metric: "$10K",
    gradient: "from-rose-400 to-red-400",
    iconColor: "text-rose-600 dark:text-rose-400",
  },
];

/* ================= ALL EARNING METHODS ================= */
const allEarningMethods = [
  { name: "Surveys", path: "/surveys", icon: <ClipboardList className="w-4 h-4" />, gradient: "from-blue-400 to-cyan-400", color: "blue" },
  { name: "App Installs", path: "/app-installs", icon: <Smartphone className="w-4 h-4" />, gradient: "from-green-400 to-emerald-400", color: "green" },
  { name: "Playing Games", path: "/play-games", icon: <Gamepad2 className="w-4 h-4" />, gradient: "from-purple-400 to-pink-400", color: "purple" },
  { name: "Watching Videos", path: "/watch-videos", icon: <Film className="w-4 h-4" />, gradient: "from-red-400 to-rose-400", color: "red" },
  { name: "Mining Rewards", path: "/mining-rewards", icon: <Hammer className="w-4 h-4" />, gradient: "from-amber-400 to-orange-400", color: "amber" },
  { name: "Completing Offers", path: "/complete-offers", icon: <CheckSquare className="w-4 h-4" />, gradient: "from-indigo-400 to-purple-400", color: "indigo" },
  { name: "Offerwall", path: "/offerwall", icon: <LayoutGrid className="w-4 h-4" />, gradient: "from-pink-400 to-rose-400", color: "pink" },
  { name: "Surveywall", path: "/surveywall", icon: <ClipboardList className="w-4 h-4" />, gradient: "from-cyan-400 to-blue-400", color: "cyan" },
  { name: "Watching Ads", path: "/watch-ads", icon: <Eye className="w-4 h-4" />, gradient: "from-amber-400 to-yellow-400", color: "amber" },
  { name: "Micro Tasks", path: "/micro-tasks", icon: <Sparkles className="w-4 h-4" />, gradient: "from-lime-400 to-green-400", color: "lime" },
  { name: "Free Trials", path: "/complete-free-trials", icon: <Timer className="w-4 h-4" />, gradient: "from-emerald-400 to-teal-400", color: "emerald" },
  { name: "Testing Products", path: "/test-products", icon: <FlaskConical className="w-4 h-4" />, gradient: "from-teal-400 to-cyan-400", color: "teal" },
  { name: "Reading Emails", path: "/read-emails", icon: <Mail className="w-4 h-4" />, gradient: "from-orange-400 to-amber-400", color: "orange" },
  { name: "Visiting Websites", path: "/visit-websites", icon: <Globe className="w-4 h-4" />, gradient: "from-rose-400 to-pink-400", color: "rose" },
  { name: "Review Tasks", path: "/review-tasks", icon: <PenTool className="w-4 h-4" />, gradient: "from-violet-400 to-purple-400", color: "violet" },
  { name: "Spinning Wheel", path: "/spinning-wheel", icon: <Puzzle className="w-4 h-4" />, gradient: "from-fuchsia-400 to-pink-400", color: "fuchsia" },
  { name: "Loyalty", path: "/loyalty", icon: <Crown className="w-4 h-4" />, gradient: "from-yellow-400 to-amber-400", color: "yellow" },
  { name: "Vouchers", path: "/vouchers", icon: <Ticket className="w-4 h-4" />, gradient: "from-green-400 to-emerald-400", color: "green" },
];

/* ================= FEATURES ================= */
const features = [
  { icon: <Rocket className="w-4 h-4" />, title: "Instant Payouts", gradient: "from-purple-400 to-pink-400", iconColor: "text-purple-600 dark:text-purple-400" },
  { icon: <Shield className="w-4 h-4" />, title: "Secure Platform", gradient: "from-blue-400 to-cyan-400", iconColor: "text-blue-600 dark:text-blue-400" },
  { icon: <BarChart3 className="w-4 h-4" />, title: "Real-time Analytics", gradient: "from-green-400 to-emerald-400", iconColor: "text-green-600 dark:text-green-400" },
  { icon: <Wallet className="w-4 h-4" />, title: "Multiple Payouts", gradient: "from-amber-400 to-orange-400", iconColor: "text-amber-600 dark:text-amber-400" },
  { icon: <Clock className="w-4 h-4" />, title: "24/7 Support", gradient: "from-red-400 to-rose-400", iconColor: "text-red-600 dark:text-red-400" },
  { icon: <Globe className="w-4 h-4" />, title: "Global Program", gradient: "from-indigo-400 to-purple-400", iconColor: "text-indigo-600 dark:text-indigo-400" },
];

/* ================= TESTIMONIALS ================= */
const testimonials = [
  {
    name: "Cryptozeal",
    avatar: "C",
    earnings: "$2,450+",
    gradient: "from-blue-400 to-cyan-400",
  },
  {
    name: "Michael R.",
    avatar: "M",
    earnings: "$1,280+",
    gradient: "from-green-400 to-emerald-400",
  },
  {
    name: "Dx Tik",
    avatar: "D",
    earnings: "$3,100+",
    gradient: "from-purple-400 to-pink-400",
  },
  {
    name: "Sarah J.",
    avatar: "S",
    earnings: "$5,670+",
    gradient: "from-amber-400 to-orange-400",
  },
  {
    name: "Nichole",
    avatar: "N",
    earnings: "$1,890+",
    gradient: "from-red-400 to-rose-400",
  },
  {
    name: "David C.",
    avatar: "D",
    earnings: "$4,230+",
    gradient: "from-indigo-400 to-purple-400",
  },
];

/* ================= FAQ ================= */
const faqs = [
  {
    q: "How does the 15% commission work?",
    a: "You earn 15% commission on everything your referrals earn on Cashog.",
  },
  {
    q: "Is there a limit to how many friends I can refer?",
    a: "No, there's no limit! You can refer unlimited friends.",
  },
  {
    q: "How can I track my earnings from referrals?",
    a: "Track all your referral earnings in your dashboard in real-time.",
  },
  {
    q: "Do I earn from all earning methods?",
    a: "Yes! You earn 15% from every earning method on the platform.",
  },
  {
    q: "When do commissions get credited?",
    a: "Commissions are credited instantly when your referrals complete tasks.",
  },
  {
    q: "What payment methods are available?",
    a: "PayPal, cryptocurrency, gift cards, and more with instant processing.",
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

      <main className="relative min-h-screen text-gray-900 dark:text-white overflow-hidden">
        <Background />

        {/* Premium Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-r from-yellow-400/5 to-green-400/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl" />
        </div>

        <section className="relative z-10 max-w-7xl mx-auto px-4 py-20">

          {/* HERO SECTION - Reduced height, one line */}
          <Reveal>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-3xl mb-20"
            >
              {/* Animated Background */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 180],
                }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-400 to-green-400 opacity-90"
              />
              
              {/* Content - Reduced padding */}
              <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl p-8 m-1">
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="absolute top-10 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl"
                />
                <motion.div
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="absolute bottom-10 right-10 w-32 h-32 bg-green-400/20 rounded-full blur-3xl"
                />
                
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-2 border-yellow-400/20 rounded-full"
                  />
                  
                  <div className="relative text-center">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-400/10 to-green-400/10 rounded-full border border-yellow-400/20 backdrop-blur-sm mb-6"
                    >
                      <Crown className="w-5 h-5 text-yellow-400" />
                      <span className="text-sm font-semibold bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">The #1 Affiliate Program</span>
                      <Crown className="w-5 h-5 text-green-400" />
                    </motion.div>
                    
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-4 leading-tight">
                      <span className="bg-gradient-to-r from-yellow-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
                        Earn 15% On Everything
                      </span>
                    </h1>

                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="flex -space-x-3">
                        {[1,2,3,4,5].map((i) => (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-green-400 flex items-center justify-center text-black font-bold text-xs border-2 border-white dark:border-gray-900 shadow-lg"
                          >
                            {i}
                          </motion.div>
                        ))}
                      </div>
                      <span className="text-lg font-bold">Excellent</span>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map((star) => (
                          <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-6 mb-6">
                      <div className="text-center">
                        <div className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">50K+</div>
                        <div className="text-xs text-gray-500">Affiliates</div>
                      </div>
                      <div className="w-px h-6 bg-gray-300 dark:bg-gray-700" />
                      <div className="text-center">
                        <div className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">15%</div>
                        <div className="text-xs text-gray-500">Commission</div>
                      </div>
                      <div className="w-px h-6 bg-gray-300 dark:bg-gray-700" />
                      <div className="text-center">
                        <div className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">18+</div>
                        <div className="text-xs text-gray-500">Methods</div>
                      </div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-block"
                    >
                      <PrimaryCTA href="/signup">
                        Become An Affiliate
                      </PrimaryCTA>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </Reveal>

          {/* STATS SECTION - With beautiful name */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 py-16">
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
                    Program Performance
                  </span>
                </h2>
                <div className="flex items-center justify-center gap-12">
                  {affiliateStats.map((stat) => (
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

          {/* HOW IT WORKS - With border */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 pb-16">
            <RevealWithBorder
              gradientFrom="from-amber-400"
              gradientVia="via-orange-400"
              gradientTo="to-red-400"
              borderColor="border-amber-400/20"
              floatingElements={false}
              rotatingCircle={true}
            >
              <div className="py-8">
                <h2 className="text-2xl font-bold text-center mb-8">
                  <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                    How It Works
                  </span>
                </h2>
                <div className="flex items-center justify-center gap-8">
                  {steps.map((step, index) => (
                    <Reveal key={step.title}>
                      <motion.div
                        whileHover={{ y: -2 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </div>
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${step.gradient} bg-opacity-10 flex items-center justify-center`}>
                          <div className={step.iconColor}>
                            {step.icon}
                          </div>
                        </div>
                        <span className="text-sm font-medium">{step.title}</span>
                      </motion.div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </RevealWithBorder>
          </section>

          {/* EARNING METHODS - With border */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 pb-16">
            <RevealWithBorder
              gradientFrom="from-yellow-400"
              gradientVia="via-green-400"
              gradientTo="to-emerald-400"
              borderColor="border-yellow-400/20"
              floatingElements={false}
              rotatingCircle={true}
            >
              <div className="py-8">
                <h2 className="text-2xl font-bold text-center mb-8">
                  <span className="bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
                    18+ Ways to Earn
                  </span>
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {allEarningMethods.map((method) => (
                    <Reveal key={method.name}>
                      <motion.a
                        href={method.path}
                        whileHover={{ y: -2 }}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-[#0a0d16] rounded-full border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${method.gradient} bg-opacity-10 flex items-center justify-center`}>
                          <div className={`text-${method.color}-600 dark:text-${method.color}-400`}>
                            {method.icon}
                          </div>
                        </div>
                        <span className="text-xs font-medium">{method.name}</span>
                      </motion.a>
                    </Reveal>
                  ))}
                </div>
              </div>
            </RevealWithBorder>
          </section>

          {/* BONUSES SECTION - With beautiful name and content inside border */}
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
                    Exclusive Bonuses
                  </span>
                </h2>
                <div className="flex items-center justify-center gap-8">
                  {bonuses.map((bonus) => (
                    <Reveal key={bonus.title}>
                      <motion.div
                        whileHover={{ y: -2 }}
                        className="relative flex items-center gap-3 px-4 py-2 bg-white dark:bg-[#0a0d16] rounded-full border border-gray-200 dark:border-gray-800 shadow-sm"
                      >
                        <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center text-[8px] text-white font-bold">
                          ↑
                        </div>
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${bonus.gradient} bg-opacity-10 flex items-center justify-center`}>
                          <div className={bonus.iconColor}>
                            {bonus.icon}
                          </div>
                        </div>
                        <span className="text-sm font-medium">{bonus.title}</span>
                        <span className="text-xs font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          {bonus.metric}
                        </span>
                      </motion.div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </RevealWithBorder>
          </section>

          {/* FEATURES SECTION - With border */}
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
                    Premium Features
                  </span>
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {features.map((feature) => (
                    <Reveal key={feature.title}>
                      <motion.div
                        whileHover={{ y: -2 }}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-[#0a0d16] rounded-full border border-gray-200 dark:border-gray-800 shadow-sm"
                      >
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${feature.gradient} bg-opacity-10 flex items-center justify-center`}>
                          <div className={feature.iconColor}>
                            {feature.icon}
                          </div>
                        </div>
                        <span className="text-xs font-medium">{feature.title}</span>
                      </motion.div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </RevealWithBorder>
          </section>

          {/* TESTIMONIALS SECTION - With border */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 pb-16">
            <RevealWithBorder
              gradientFrom="from-green-400"
              gradientVia="via-emerald-400"
              gradientTo="to-teal-400"
              borderColor="border-green-400/20"
              floatingElements={false}
              rotatingCircle={true}
            >
              <div className="py-8">
                <h2 className="text-2xl font-bold text-center mb-8">
                  <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    50,000+ Affiliates Trust Us
                  </span>
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-6">
                  {testimonials.map((testimonial, index) => (
                    <Reveal key={index}>
                      <motion.div
                        whileHover={{ y: -2 }}
                        className="flex items-center gap-3"
                      >
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${testimonial.gradient} flex items-center justify-center text-white text-xs font-bold`}>
                          {testimonial.avatar}
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-medium">{testimonial.name}</div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold">{testimonial.earnings}</span>
                          </div>
                        </div>
                      </motion.div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </RevealWithBorder>
          </section>

          {/* FAQ SECTION - With border */}
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
                    Frequently Asked Questions
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

          {/* FINAL CTA - Reduced height, one line */}
          <section className="relative z-10 text-center">
            <Reveal>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-3xl"
              >
                {/* Animated Background */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 180],
                  }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-400 to-green-400 opacity-90"
                />
                
                {/* Content - Reduced padding */}
                <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl p-8 m-1">
                  {/* Floating Elements */}
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    className="absolute top-10 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl"
                  />
                  <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    className="absolute bottom-10 right-10 w-32 h-32 bg-green-400/20 rounded-full blur-3xl"
                  />
                  
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-2 border-yellow-400/20 rounded-full"
                    />
                    
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <Crown className="w-8 h-8 text-yellow-400" />
                      <h2 className="text-3xl sm:text-4xl font-extrabold">
                        <span className="bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
                          Ready to Earn 15%?
                        </span>
                      </h2>
                      <Crown className="w-8 h-8 text-green-400" />
                    </div>

                    <p className="text-base text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-4">
                      Join 50,000+ affiliates already earning
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                      {[
                        "⚡ Instant",
                        "🎯 No Limits",
                        "🌍 Global",
                        "💰 15%",
                      ].map((text, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="px-3 py-1.5 bg-gradient-to-r from-yellow-400/10 to-green-400/10 rounded-full text-xs font-semibold backdrop-blur-sm border border-white/20"
                        >
                          {text}
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-block"
                    >
                      <PrimaryCTA href="/signup">
                        Join Now
                      </PrimaryCTA>
                    </motion.div>
                    
                    <p className="text-xs text-gray-500 mt-3">
                      50,000+ active affiliates
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
